import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/services/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private loaderSvc : LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderSvc.show()
    return next.handle(request).pipe(
      finalize( () => this.loaderSvc.hide() )
    )
  }
}
