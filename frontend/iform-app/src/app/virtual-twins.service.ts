import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {CookieService} from 'ngx-cookie-service';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VirtualTwinsService {

  // we are hosting both front and backend at the same place
  api_addr = './'
  // api_addr = 'http://127.0.0.1:5000/';


  runSubmission(id:string){
    console.log('Running submission:' + id);
    let url = this.api_addr + 'runSubmission';
    let http_observable = this.http.post(url, {id:id})
    return http_observable;
  }

  // auth stuff
  checkToken() {
    return this.cookieService.check('token');
  }



  getToken() {
    return this.cookieService.get('token');
  }

  loginWithUsernameAndPassword(userName: string, password: string) {
    let formData = new FormData();
    formData.set('username',userName);
    formData.set('password',password);
    return this.http.post<any>(this.api_addr + '/login',
      formData
      );
  }

  logout() {
    this.cookieService.delete('token');
    
  }

  isLoggedIn() {
    return this.cookieService.check('token');
  }


  constructor(private http: HttpClient, public cookieService: CookieService) {}

}


import { HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private virtualTwinService: VirtualTwinsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (this.auth.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.virtualTwinService.getToken()}`
        }
      });
    // }

    return next.handle(request);
  }
}
