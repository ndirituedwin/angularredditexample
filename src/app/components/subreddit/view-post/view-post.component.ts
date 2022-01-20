import { Component, OnInit } from '@angular/core';
import { PostService } from './../../../services/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from './../../../services/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from './commentPayload';
import { CommentService } from './../../../services/comments/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId:number;
  post:PostModel;
  commentForm:FormGroup
  commentPayload:CommentPayload
  comments:CommentPayload[]
  constructor(private PostService:PostService,private ActivatedRoute:ActivatedRoute
    ,private CommentService:CommentService,private router:Router) {
    this.postId=this.ActivatedRoute.snapshot.params['id'];
    this.PostService.getpost(this.postId).subscribe((data)=>{
      this.post=data;
    },error=>{
      throwError(error)
    })
    this.commentPayload={
      text:'',
      postId:this.postId
    }

   }

  ngOnInit(): void {
        this.commentForm=new FormGroup({
      text:new FormControl('',Validators.required),
    })
    this.getPostById()
    this.getCommentsForPost()
  }
  postComment(){
    this.commentPayload.text=this.commentForm.get('text').value;
    console.log("comment ayload "+ this.commentPayload.text);
    this.CommentService.postComment(this.commentPayload).subscribe((data)=>{
      this.commentForm.get('text').setValue('')
      this.getCommentsForPost()
    },error=>{
      throwError(error)
    })
  }
  getPostById(){
    this.PostService.getpost(this.postId).subscribe((data)=>{
      this.post=data
    },error=>{
      throwError(error)
    })
  }
  getCommentsForPost(){
    this.CommentService.getAllCommentsForPost(this.postId).subscribe((data)=>{
      this.comments=data
    },error=>{
      throwError(error)
    });
  }

}
