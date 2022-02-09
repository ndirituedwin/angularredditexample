import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable, tap, throwError } from 'rxjs';
import { SignupRequestPayload } from './../../../components/auth/signup-request.payload';
import { LoginRequestPayload } from './../../../components/auth/login/login.request.payload';
import { LoginResponse } from './../../../components/auth/login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from './../../../environment/environment';

const signupurl=`api/auth/signup`;
const signinurl=`api/auth/login`;
const tokennurl=`api/auth/refreshToken`;
const logout=`api/auth/logout`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl=environment.baseUrl
  @Output() loggedIn:EventEmitter<boolean>=new EventEmitter;
  @Output() username:EventEmitter<string>=new EventEmitter;
  refreshTokenPayload={
    refreshToken:this.getRefreshToken(),
    username:this.getUsername()
  }
  constructor(private httpClient:HttpClient,private localstorage:LocalStorageService) { }

  signup(SignupRequestPayload:SignupRequestPayload):Observable<any>{
    return this.httpClient.post(this.baseUrl+signupurl,SignupRequestPayload,{responseType:'text'});
  }
  login(loginrequestpayloead:LoginRequestPayload):Observable<boolean>{
    return this.httpClient.post<LoginResponse>(this.baseUrl+signinurl,loginrequestpayloead).pipe(map(data=>{
      this.localstorage.store("authenticationToken",data.authenticationToken)
      this.localstorage.store("username",data.username)
      this.localstorage.store("refreshToken",data.refreshToken)
      this.localstorage.store("expiresAt",data.expiresAt)
      this.loggedIn.emit(true);
      this.username.emit(data.username)
      return true;
    }));
  }
  logout(){
    this.httpClient.post(this.baseUrl+logout,this.refreshTokenPayload,{responseType:'text'}).subscribe((data)=>{
        console.log("logout",data)
        this.localstorage.clear("authenticationToken")
        this.localstorage.clear("username")
        this.localstorage.clear("refreshToken")
        this.localstorage.clear("expiresAt")
        return true;
    },error=>{
      throwError(error)
    })
  }

  getJwtToken() {
    return this.localstorage.retrieve('authenticationToken');
  }
  refreshToken() {
    const RefreshTokenPayload={
      refreshToken:this.getRefreshToken(),
      username:this.getUsername()
    }
    return this.httpClient.post<LoginResponse>(this.baseUrl+tokennurl,RefreshTokenPayload)
    .pipe(tap(response=>{
      this.localstorage.store('authenticationToken',
        response.authenticationToken);
        this.localstorage.store('expiresAt',response.expiresAt)
    }));
  }
  getUsername() {
    return this.localstorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localstorage.retrieve('refreshToken');
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() !=null
  }

}
