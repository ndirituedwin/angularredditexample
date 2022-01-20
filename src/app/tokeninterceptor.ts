

import { AuthService } from "./services/auth/shared/auth.service";
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './components/auth/login/login-response.payloads';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwttoken();

        if (jwtToken !==null) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);

    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwttoken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }

}
















// import { Injectable } from "@angular/core";
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable } from "rxjs";
// import { AuthService } from "./services/auth/shared/auth.service";
// import { catchError, switchMap, take, filter } from 'rxjs/operators';
// import { LoginResponse } from './components/auth/login/login-response.payloads';
// import { nextTick } from "process";

// @Injectable({
//   providedIn:'root'
// })
// export class TokenInterceptor implements HttpInterceptor{

//   isTokenRefreshing = false;
//   refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
//   constructor(public authservice: AuthService){
//   }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//      if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
//       return next.handle(req);
//   }
//   const jwtToken = this.authservice.getJwttoken();
//     if(jwtToken !==null){
//       console.log("Fro token intercepror the jwttoken is available "+jwtToken)

//      return next.handle(this.addToken(req,jwtToken))
//      .pipe(catchError(error=>{
//        if(error instanceof HttpErrorResponse && error.status===403 ){
//          return this.handleAuthErrors(req,next);
//        }else{
//         //  return throwError(error)
//         console.log(error);
//        }
//      }));

//     }
//     return next.handle(req);
//     }


//     private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
//         : Observable<HttpEvent<any>> {
//         if (!this.isTokenRefreshing) {
//             this.isTokenRefreshing = true;
//             this.refreshTokenSubject.next(null);

//             return this.authservice.refreshToken().pipe(
//                 switchMap((refreshTokenResponse: LoginResponse) => {
//                     this.isTokenRefreshing = false;
//                     this.refreshTokenSubject
//                         .next(refreshTokenResponse.authenticationToken);
//                     return next.handle(this.addToken(req,
//                         refreshTokenResponse.authenticationToken));
//                 })
//             )
//               // }
//         } else {
//             return this.refreshTokenSubject.pipe(
//                 filter(result => result !== null),
//                 take(1),
//                 switchMap((res) => {
//                     return next.handle(this.addToken(req,
//                         this.authservice.getJwttoken()))
//                 })
//             );
//         }
//     }

//      addToken(req:HttpRequest<any>,jwtToken:any){
//            return req.clone({
//              headers:req.headers.set('Authorization','Bearer '+jwtToken)
//            });
//      }





// }

