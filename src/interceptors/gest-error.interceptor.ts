import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ResponseResult } from 'src/app/models/response-result';

@Injectable()
export class GestErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError( err => {
        console.log("ghismo tmp interceptor errori: " + JSON.stringify(err))

        let respOp : ResponseResult
        if(Array.isArray(err.error)) {
          respOp = err.error[0];
        } else {
          respOp = err.error;
        }

        let errorMsg : string;
        //if(err.status !== 0) {
          if(err.status === 404) {
            errorMsg = "Impossibile trovare l'elemento oggetto della ricerca!"
          } else {
            errorMsg = respOp && respOp.message ? respOp.message : 'Errore Generico. Impossibile Proseguire!'
          }

          respOp = {
            code: "99",
            date: new Date(),
            message: errorMsg
          }
        //}

        respOp.message = "Intercepted Error: ---" + respOp.message + "---";

        if ([403].indexOf(err.status) !== -1) {
            this.router.navigate(['forbidden']);
        }

        return throwError( () => respOp )
      })
    )
  }
}
