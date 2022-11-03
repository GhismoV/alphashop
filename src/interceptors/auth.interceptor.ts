import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthappService, sess_authToken } from 'src/services/authapp.service'
import { AuthappJwtService/*, sess_authToken*/ } from 'src/services/authappjwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //constructor(private authSvc : AuthappService) {}
  constructor(private authSvc : AuthappJwtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
    let uid = "Ghismo"
    let pwd = "banana"
    let authHeader = "Basic " + window.btoa(uid + ":" + pwd)
    */
   /*
    let authToken : string | null = sessionStorage.getItem(sess_authToken)
    let authHeader : string = ""
    if(authToken) authHeader = authToken
    */
    if(this.authSvc.isLogged()) {
      request = request.clone({
        setHeaders: { Authorization : this.authSvc.getAuthToken()}
       })
    }
    return next.handle(request);
  }
}
