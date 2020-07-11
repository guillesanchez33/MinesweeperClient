import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";


declare var jquery: any;
declare var $: any;
declare var swal: any;

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("1.intercept");

    var token: string = localStorage.getItem('sessionId');
    if (token == null ) {
        token = "";
    }
    console.log("2.intercept>  token: " + token);
    request = request.clone({headers: request.headers.set('Accept', 'application/json, text/plain, */*')});
    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    //if (token) {
        request = request.clone({headers: request.headers.set('sessionId', token/*"13686d31-bb92-406a-bcf6-45aa23e6774c"*/)});
    //}
    console.log("3.intercept");

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            //console.log(event.body);
            const body= JSON.parse(event.body);
            localStorage.setItem('sessionId', body.session);
          }
        }
        return event;
      }));
  }
}