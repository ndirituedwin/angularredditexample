import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubredditModel } from './../../../services/subreddit/subreddit-response';
import { Router } from '@angular/router';
import { SubredditService } from './../../../services/subreddit/subreddit.service';
import { PostService } from './../../../services/shared/post.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post-payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm:FormGroup;
  postPayload:CreatePostPayload;
  subreddits:Array<SubredditModel>
  constructor(private router:Router,private PostService: PostService,private SubredditService:SubredditService) {

    this.postPayload={
      postName:'',
      description:'',
      subredditName:'',
      url:''
    }
  }
  ngOnInit(): void {
    this.createPostForm=new FormGroup({
      postName:new FormControl('',Validators.required),
      subredditName:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      url:new FormControl('',Validators.required)
    })
    this.SubredditService.getAllSubreddits().subscribe((data)=>{
      this.subreddits=data
    },error=>{
      throwError(error)
    })
  }
  createPost(){
    this.postPayload.postName=this.createPostForm.get('postName').value
    this.postPayload.description=this.createPostForm.get('description').value
    this.postPayload.subredditName=this.createPostForm.get('subredditName').value
    this.postPayload.url=this.createPostForm.get('url').value
    this.PostService.createPost(this.postPayload).subscribe((data)=>{
      console.log("post data "+data);
      this.router.navigateByUrl('/')
    },error=>{
      throwError(error)
    })
  }
  discardPost(){
    this.router.navigateByUrl('/')
  }
  returntrue(){      }

}
