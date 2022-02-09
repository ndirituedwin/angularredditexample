import { Component, OnInit } from '@angular/core';
import { SubredditService } from './../../../services/subreddit/subreddit.service';
import { SubredditModel } from './../../../services/subreddit/subreddit-response';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits:Array<SubredditModel>
  displayviewAll:boolean
  constructor(private subredditService:SubredditService) {
    this.subredditService.getallsubreddits().subscribe((data)=>{
      if(data.length>=4){
        this.subreddits=data.splice(0,3);
        this.displayviewAll=true;
      }else{
        this.subreddits=data;
      }
    });
   }

  ngOnInit(): void {
  }

}
