import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VotePayload } from './vote-payload';
import { Observable } from 'rxjs';
import { HttpheadersService } from '../HttpHeaders/httpheaders.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
 baseUrl=environment.baseUrl
  constructor(private HttpClient:HttpClient,private Httpheaders: HttpheadersService ) {}

    vote(VotePayload: VotePayload):Observable<any>{
      // const voteurl=`http://localhost:9090/api/votes/`
      const voteurl=this.baseUrl+`api/votes/`
      return this.HttpClient.post(voteurl,VotePayload,this.Httpheaders.headers())
    }

}
