import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private Router:Router) { }

  ngOnInit(): void {
  }

  goToCreatePost(){
       this.Router.navigateByUrl('/create-post')
  }
  goToCreateSubreddit(){
    this.Router.navigateByUrl('/create-subreddit')

  }

}
