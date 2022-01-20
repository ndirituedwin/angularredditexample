import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from './../../../../../../angular-reddit-clone-master/angular-reddit-clone-master/src/app/auth/signup/singup-request.payload';
import { map, Observable, tap, throwError } from 'rxjs';
import { LoginRequestPayload } from './../../../components/auth/login/login.request.payload';
import { LoginResponse } from './../../../components/auth/login/login-response.payloads';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpheadersService } from './../../HttpHeaders/httpheaders.service';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl=environment.baseUrl
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(
    private http: HttpClient,private localstorage:LocalStorageService,private HttpheadersService:HttpheadersService) {

  }

  signUp(signupRequestPayload: SignupRequestPayload):Observable<any>{
    // const signupurl=`http://localhost:9090/api/auth/signup`
    const signupurl=this.baseUrl+`api/auth/signup`
      return this.http.post(signupurl,signupRequestPayload,{responseType:'text'});
  }
  login(loginrequestpayloead:LoginRequestPayload):Observable<boolean>{
    // const loginurl=`http://localhost:9090/api/auth/login`
    const loginurl=this.baseUrl+`api/auth/login`
    return this.http.post<LoginResponse>(loginurl,loginrequestpayloead).pipe(map(data=>{
      this.localstorage.store("authenticationToken",data.authenticationToken)
      this.localstorage.store("username",data.username)
      this.localstorage.store("refreshToken",data.refreshToken)
      this.localstorage.store("expiresAt",data.expiresAt)
       this.loggedIn.emit(true)
       this.username.emit(data.username)
      return true;
    }));
  }
  getJwttoken(){
     this.localstorage.retrieve("authenticationToken");
  }
  refreshToken() {
    // const refreshtokenurl=`http://localhost:9090/api/auth/refreshtoken`
    const refreshtokenurl=this.baseUrl+`api/auth/refreshtoken`
    return this.http.post<LoginResponse>(refreshtokenurl,
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localstorage.clear('authenticationToken');
        this.localstorage.clear('expiresAt');
        this.localstorage.store('authenticationToken',
          response.authenticationToken);
        this.localstorage.store('expiresAt', response.expiresAt);
      }));
  }
  getRefreshToken() {
    return this.localstorage.retrieve('refreshToken');
  }
  getUserName() {
    return this.localstorage.retrieve('username');
  }
  isLoggedIn(): boolean {
    // return this.getJwttoken() !==null;
    const jwt=this.getJwttoken();
    if(jwt !==null){
                return true;
    }else{

      return false;
    }
    // return this.getJwttoken() != null;


  }
  logout(){
    // const logouturl=`http://localhost:9090/api/auth/logout`
    const logouturl=this.baseUrl+`api/auth/logout`

    // this.http.post(logouturl,this.refreshTokenPayload,this.HttpheadersService.headers(),{responseType:'text'}).subscribe((data)=>{
     this.http.post(logouturl,this.refreshTokenPayload,{responseType:'text'}).subscribe((data)=>{
      console.log(data)
     },error=>{
       throwError(error)
     })
     this.localstorage.clear('authenticationToken')
     this.localstorage.clear('refreshToken')
     this.localstorage.clear('expiresAt')
     this.localstorage.clear('username')

  }
}
