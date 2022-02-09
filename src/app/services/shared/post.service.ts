import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from 'src/app/components/post/create-post/create-post.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { environment } from './../../environment/environment';

const getallposts=`api/posts`;
const getallpostsbyuser=`api/posts/by-username/`;
const getpostbyid=`api/posts/`;
const createpost=`api/posts`;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  baseUrl=environment.baseUrl

  constructor(private httpCient:HttpClient,private localStorage:LocalStorageService,private router:Router) {

   }
   getallpostsforauser(username: string):Observable<PostModel[]> {
     return this.httpCient.get<PostModel[]>(this.baseUrl+getallpostsbyuser+username)
  }

   getallposts():Observable<Array<PostModel>>{
     return this.httpCient.get<Array<PostModel>>(this.baseUrl+getallposts)
   }
   createPost(postPayload: CreatePostPayload):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.localStorage.retrieve('authenticationToken')});
      let options={headers:headers}
     return this.httpCient.post<any>(this.baseUrl+createpost,postPayload,options);
  }
  discardPost(){
    this.router.navigateByUrl('/')
  }
  getpost(postId: number):Observable<PostModel> {
    return this.httpCient.get<PostModel>(this.baseUrl+getpostbyid+postId);
  }
}
