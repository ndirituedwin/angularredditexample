import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from './../../../services/shared/post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from './../../../services/shared/vote-payload';
import { VoteService } from './../../../services/shared/vote.service';
import { AuthService } from './../../../services/auth/shared/auth.service';
import { PostService } from './../../../services/shared/post.service';
import { ToastrService } from 'ngx-toastr';
import { VoteType } from 'src/app/services/shared/VoteType';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post:PostModel
  votePayload:VotePayload
  faArrowUp=faArrowUp
  faArrowDown=faArrowDown
  upvoteColor:string
  downvoteColor:string
  constructor(private VoteService:VoteService,private AuthService:AuthService,private PostService:PostService,private toastr:ToastrService) {
    this.votePayload={
      voteType:undefined,
      postId:undefined
    }
   }

  ngOnInit(): void {
     this.updateVoteDetails()
  }
  upvotePost(){
    this.votePayload.voteType=VoteType.UPVOTE
         this.vote()
  }

  downvotePost(){
     this.votePayload.voteType=VoteType.DOWNVOTE
     this.vote()
  }
  vote(){
    this.votePayload.postId=this.post.id
    this.VoteService.vote(this.votePayload).subscribe((data)=>{
      this.updateVoteDetails()
    },error=>{
      this.toastr.error(error.error.message)
      throwError(error)
    })
  }
  updateVoteDetails(){
    this.PostService.getpost(this.post.id).subscribe((data)=>{
      this.post=data
    })
  }


}
