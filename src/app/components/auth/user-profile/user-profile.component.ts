import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from './../../../services/shared/post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentPayload } from './../../subreddit/view-post/commentPayload';
import { PostService } from './../../../services/shared/post.service';
import { CommentService } from './../../../services/comments/comment.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

   name:string;
   posts:PostModel[]
   comments:CommentPayload[]
   postLength:number
   commentLength:number
  constructor(private ActivatedRoute:ActivatedRoute,private PostService:PostService,private CommentService:CommentService) {
      this.name=this.ActivatedRoute.snapshot.params['name'];
      this.PostService.getallpostsByUser(this.name).subscribe((data)=>{
        this.posts=data;
        this.postLength=data.length;
      })
      this.CommentService.getAllCommentsByUser(this.name).subscribe((data)=>{
        this.comments=data
        this.commentLength=data.length
      });
  }

  ngOnInit(): void {

  }

}
