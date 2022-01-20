import { Component, OnInit, Output } from '@angular/core';
import { PostService } from './../../services/shared/post.service';
import { PostModel } from './../../services/shared/post-model';
import { SubredditModel } from './../../services/subreddit/subreddit-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // posts$: Array<PostModel>=[];
  posts:Array<PostModel>= []
  subreddits:Array<SubredditModel>=[]

  constructor(private PostService:PostService) {
    this.PostService.getallposts().subscribe((data)=>{
      this.posts=data
    })

   }

  ngOnInit(): void {
  }

}
