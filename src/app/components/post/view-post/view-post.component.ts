import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './../../../services/shared/post.service';
import { PostModel } from './../../../services/shared/post-model';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from './../../../comments/comment.payload';
import { CommentService } from './../../../services/comment/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId:number;
  post:PostModel;
  commentForm:FormGroup
  commentpayoad:CommentPayload;
  comments:CommentPayload[];
  constructor(private CommentService:CommentService, private postService:PostService,private activatedroute:ActivatedRoute) {
     this.postId=this.activatedroute.snapshot.params['id'];
     this.commentForm=new FormGroup({
       text:new FormControl('',Validators.required)
     });
     this.commentpayoad={
       text:'',
       postId:this.postId
     }
   }

  ngOnInit(): void {
    this.getPostbyId();
    this.getCommentsForPost();
  }
  postComment(){
    this.commentpayoad.text=this.commentForm.get('text').value
    this.CommentService.postComment(this.commentpayoad).subscribe((data)=>{
      console.log("comment saved ",data);
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    },error=>{
      throwError(error);
    })
  }
  getCommentsForPost() {
    this.CommentService.getallcommentsforpost(this.postId).subscribe((data)=>{
      this.comments=data;
    },error=>{
      throwError(error)
    });
  }
  getPostbyId() {
    this.postService.getpost(this.postId).subscribe((data)=>{
      this.post=data
    },error=>{
      throwError(error)
    });
  }

}
