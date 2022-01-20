import { Component, OnInit } from '@angular/core';
import { SubredditService } from './../../../services/subreddit/subreddit.service';
import { SubredditModel } from './../../../services/subreddit/subreddit-response';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits:Array<SubredditModel>
  constructor(private SubredditService:SubredditService) { }

  ngOnInit(): void {
    this.SubredditService.getAllSubreddits().subscribe((data)=>{
      this.subreddits=data;
    },error=>{
      throwError(error)
    })
  }

}
