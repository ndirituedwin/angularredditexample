import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './../../services/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser=faUser;
  username: string
  isLoggedIn: boolean;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean)=>this.isLoggedIn=data)
    this.authService.username.subscribe((data:string)=>this.username=data)
  }
  logout(){
    this.authService.logout()
    this.isLoggedIn=false
    this.router.navigateByUrl('')
  }
gotouserprofile(){
   this.router.navigateByUrl('/user-profile/'+this.username)
}
}
