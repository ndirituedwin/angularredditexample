import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from './../../../services/shared/post-model';
import { faArrowDown, faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from './../../../services/vote/vote.service';
import { AuthService } from './../../../services/auth/shared/auth.service';
import { PostService } from './../../../services/shared/post.service';
import { ToastrService } from 'ngx-toastr';
import { VotePayload } from './../../../services/vote/vote-payload';
import { VoteType } from 'src/app/services/vote/vote-type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {



  @Input() post:PostModel
  VotePayload:VotePayload
  faArrowDown=faArrowDown
  faArrowUp=faArrowUp
  faComments=faComments
  upVoteColor:string;
  downVoteColor:string;

  constructor(private VoteService:VoteService,
    private AuthService:AuthService,private PostService:PostService,
    private Toastr:ToastrService
    ){
      this.VotePayload={
                  voteType:undefined,
                  postId:undefined,
      }

   }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost(){
    this.VotePayload.voteType=VoteType.UPVOTE
    this.vote();

  }
  downvotePost(){
       this.VotePayload.voteType=VoteType.DOWNVOTE
       this.vote();
  }
  vote(){
    this.VotePayload.postId=this.post.id
    this.VoteService.vote(this.VotePayload).subscribe(()=>{
      this.updateVoteDetails()
    },error=>{
      this.Toastr.error(error.error.message)
      throwError(error)
    });

  }
  updateVoteDetails(){
   this.PostService.getpost(this.post.id).subscribe((post)=>{
     this.post=post
   });
  }

}
