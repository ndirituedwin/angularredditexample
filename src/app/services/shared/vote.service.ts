import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-payload';
import { environment } from './../../environment/environment';

const  savevote=`api/votes/save`;
@Injectable({
  providedIn: 'root'
})
export class VoteService {
  baseurl=environment.baseUrl


  constructor(private httpClient:HttpClient) {

   }
   vote(votepayload:VotePayload):Observable<any>{
        return this.httpClient.post(this.baseurl+savevote,votepayload)
   }
}
