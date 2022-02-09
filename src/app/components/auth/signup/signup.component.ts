import { Component, OnInit } from '@angular/core';

import {FormGroup,Validators,FormControl} from '@angular/forms'
import { SignupRequestPayload } from './../signup-request.payload';
import { AuthService } from './../../../services/auth/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  signupRequestPayload:SignupRequestPayload;
  constructor(private AuthService:AuthService,private toastr:ToastrService,private router:Router) {
   this.signupRequestPayload={
     username:'',
     email:'',
     password:''
   };
  }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      username:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
    })
  }
  signup(){
    this.signupRequestPayload.username=this.signupForm.get('username').value;
    this.signupRequestPayload.email=this.signupForm.get('email').value;
    this.signupRequestPayload.password=this.signupForm.get('password').value;
    console.log("signupRequestPayload before signup",this.signupRequestPayload);
    this.AuthService.signup(this.signupRequestPayload).subscribe((data)=>{
      this.router.navigate(['/login'],{queryParams:{registered:true}});

      console.log("data returned after successful signup",data)
    },()=>{
      this.toastr.error("Registration has failed,pease try again");
    }
    );

  }

}
