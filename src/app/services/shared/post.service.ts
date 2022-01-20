import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { SubredditModel } from './../subreddit/subreddit-response';
import { CreatePostPayload } from './../../components/subreddit/create-post/create-post-payload';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    baseUrl=environment.baseUrl
  constructor(private Http:HttpClient,private LocalStorage:LocalStorageService) {

  }
  getallposts():Observable<Array<PostModel>>{
    // const postsurl=`http://localhost:9090/api/posts/getallposts`;
    const postsurl=this.baseUrl+`api/posts/getallposts`;
    console.log(postsurl+"post url is this");
    return this.Http.get<Array<PostModel>>(postsurl);
  }
  // getsubreddits():Observable<Array<SubredditModel>>{
  //   const postsurl=`http://localhost:9090/api/subreddit`;
  //   console.log(postsurl+"subreddit url is this");
  //   return this.Http.get<Array<SubredditModel>>(postsurl);
  // }
  createPost(CreatePostPayload:CreatePostPayload):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.LocalStorage.retrieve('authenticationToken')});
      let options={headers:headers}
      console.log("headers returned "+headers.get('Authorization'))
      // const postsurl=`http://localhost:9090/api/posts/savepost`;
      const postsurl=this.baseUrl+`api/posts/savepost`;
      // return this.Http.post(postsurl,CreatePostPayload)
    return this.Http.post(postsurl,CreatePostPayload,options)

  }
  getpost(postId:number):Observable<PostModel>{
    // const postsurl=`http://localhost:9090/api/posts/${postId}`;
    const postsurl=this.baseUrl+`api/posts/${postId}`;
    return this.Http.get<PostModel>(postsurl);

  }
  getallpostsByUser(name:string):Observable<PostModel[]>{
    // const postsurl=`http://localhost:9090/api/posts/by_user/${name}`;
    const postsurl=this.baseUrl+`api/posts/by_user/${name}`;
    return this.Http.get<PostModel[]>(postsurl);
  }

}
