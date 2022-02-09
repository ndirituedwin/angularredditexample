import { Injectable } from '@angular/core';
import { CommentPayload } from 'src/app/comments/comment.payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environment/environment';

const savecommenturl=`api/comments/save`;
const commentsforaposturl=`api/comments/commentsforpost/`;
const commentsforauser=`api/comments/commentsforuser/`;


@Injectable({
  providedIn: 'root'
})
export class CommentService {
baseUrl=environment.baseUrl

  constructor(private httpclient:HttpClient) { }
  postComment(commentpayoad: CommentPayload):Observable<any> {
     return this.httpclient.post<any>(this.baseUrl+savecommenturl,commentpayoad);
  }
  getallcommentsforpost(postid:number):Observable<CommentPayload[]>{
    return this.httpclient.get<CommentPayload[]>(this.baseUrl+commentsforaposturl+postid);
  }
  getallcommentsforauser(username: string) {
    return this.httpclient.get<CommentPayload[]>(this.getallcommentsforauser+username)
  }

}
