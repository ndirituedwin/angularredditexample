import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  baseUrl=environment.baseUrl

  constructor(private http: HttpClient,private LocalStorage:LocalStorageService) {
  }
  
  getAllSubreddits():Observable<Array<SubredditModel>> {
    // const suburl=`http://localhost:9090/api/subreddit/`;
    const suburl=this.baseUrl+`api/subreddit/`;
    return this.http.get<Array<SubredditModel>>(suburl);

  }
  createSubreddit(SubredditModel:SubredditModel):Observable<SubredditModel>{
    // const savesurl=`http://localhost:9090/api/subreddit`;
    const savesurl=this.baseUrl+`api/subreddit`;
    // return this.http.p ost<SubredditModel>(savesurl,SubredditModel);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.LocalStorage.retrieve('authenticationToken')});
      let options={headers:headers}
      console.log("headers returned "+headers.get('Authorization'))
      return this.http.post<SubredditModel>(savesurl,SubredditModel,options);
      // return this.http.post<SubredditModel>(savesurl,SubredditModel);
    // return this.http.post<SubredditModel>(savesurl,SubredditModel,headers)

  }
}
