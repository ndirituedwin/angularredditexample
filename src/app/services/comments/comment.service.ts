import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentPayload } from './../../components/subreddit/view-post/commentPayload';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
 baseUrl=environment.baseUrl
  constructor(private HttpClient:HttpClient,private LocalStorage:LocalStorageService) {

   }
   getAllCommentsForPost(postId:number):Observable<CommentPayload[]>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.LocalStorage.retrieve('authenticationToken')});
      let options={headers:headers}
      // const commentsforapost=`http://localhost:9090/api/comments/commentsforpost/${postId}`
      const commentsforapost=this.baseUrl+`api/comments/commentsforpost/${postId}`
      return this.HttpClient.get<CommentPayload[]>(commentsforapost,options)
   }
   postComment(commentPayload:CommentPayload):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.LocalStorage.retrieve('authenticationToken')});
      let options={headers:headers}
      console.log("headers returned "+headers.get('Authorization'))
      // const commentsave=`http://localhost:9090/api/comments/savecomment/`
      const commentsave=this.baseUrl+`api/comments/savecomment/`
      return this.HttpClient.post<any>(commentsave,commentPayload,options)

   }
   getAllCommentsByUser(name:string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.LocalStorage.retrieve('authenticationToken')});
      let options={headers:headers}
      // const commentsget=`http://localhost:9090/api/comments/commentsforuser/${name}`
    const commentsget=this.baseUrl+`api/comments/commentsforuser/${name}`
      return this.HttpClient.get<CommentPayload[]>(commentsget,options)
  }
}
