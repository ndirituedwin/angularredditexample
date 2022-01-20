import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/shared/auth.service';
import { SignupRequestPayload } from './../../../../../../angular-reddit-clone-master/angular-reddit-clone-master/src/app/auth/signup/singup-request.payload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload:SignupRequestPayload
  signupForm:FormGroup
  constructor(private authservice:AuthService, private toastr: ToastrService,private router:Router) {
    this.signupRequestPayload={
      email:'',
      username:'',
      password:''
    };
   }

  ngOnInit(): void {
    this.signupForm=new  FormGroup({
      username:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      password:new FormControl('',)
    });
  }
  signUp(){
    this.signupRequestPayload.email=this.signupForm.get('email')?.value;
    this.signupRequestPayload.username=this.signupForm.get('username')?.value;
    this.signupRequestPayload.password=this.signupForm.get('password')?.value;
              // console.log(this.signupRequestPayload);
    this.authservice.signUp(this.signupRequestPayload)
    .subscribe(data=>{
      // console.log(data);
     this.router.navigate(['/login'],{
       queryParams:{registered:true}

     })
    },()=>{
      this.toastr.error("registration failed! please try again");
    })
  }

}
