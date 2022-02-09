import { Component, OnInit } from '@angular/core';
import { PostModel } from './../../../services/shared/post-model';
import { CommentPayload } from './../../../comments/comment.payload';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './../../../services/comment/comment.service';
import { PostService } from './../../../services/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username:string;
  posts:PostModel[]
  comments:CommentPayload[];
  postLength:number;
  commentLength:number;

  constructor(private activeroute:ActivatedRoute,private PostService: PostService,private CommentService:CommentService) {
    this.username=this.activeroute.snapshot.params['username'];
    this.PostService.getallpostsforauser(this.username).subscribe((data)=>{
      this.posts=data;
      this.postLength=data.length;
    })
    this.CommentService.getallcommentsforauser(this.username).subscribe((data)=>{
      this.comments=data;
      this.commentLength=data.length;
    })
   }

  ngOnInit(): void {
  }

}
