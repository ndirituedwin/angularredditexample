import { Component, Input, OnInit } from '@angular/core';
import { PostService } from './../../../services/shared/post.service';
import {faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from './../../../services/shared/post-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {

  faComments=faComments
  // posts:Array<PostModel>=[]
  @Input() posts: PostModel[]
  constructor(private Router:Router ) {}
  // constructor(private PostService:PostService,private Router:Router ) {
  //   this.PostService.getallposts().subscribe((post)=>{
  //          this.posts=post
  //   });
  //  }
  ngOnInit(): void {
  }
  goToPost(id){
    this.Router.navigateByUrl('/view-post/'+id);

  }

}
