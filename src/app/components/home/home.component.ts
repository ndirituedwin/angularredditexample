import { Component, OnInit } from '@angular/core';
import { PostModel } from './../../services/shared/post-model';
import { PostService } from './../../services/shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:Array<PostModel>=[]

 constructor(private postService:PostService){
   this.postService.getallposts().subscribe((data)=>{
     this.posts=data
   });
 }

  ngOnInit(): void {
  }

}
