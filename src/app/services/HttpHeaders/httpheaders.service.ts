import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class HttpheadersService {

  constructor(private HttpClient:HttpClient,private LocalStorage:LocalStorageService) { }

  headers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.LocalStorage.retrieve('authenticationToken')});
      let options={headers:headers}
      return options;
  }
}
