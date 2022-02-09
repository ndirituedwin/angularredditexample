import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from './../../environment/environment';

const allsubredditsurl=`api/subreddit/getall`;
const savesubredditsurl=`api/subreddit/save`;

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  baseUrl=environment.baseUrl


  constructor(private httpClient:HttpClient,private localstorage:LocalStorageService) { }

  getallsubreddits():Observable<Array<SubredditModel>>{
    return this.httpClient.get<Array<SubredditModel>>(this.baseUrl+allsubredditsurl)
  }
  createSubreddit(subredditModel: SubredditModel):Observable<SubredditModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.localstorage.retrieve('authenticationToken')});
      let options={headers:headers}
    return this.httpClient.post<SubredditModel>(this.baseUrl+savesubredditsurl,subredditModel,options);
  }
}
