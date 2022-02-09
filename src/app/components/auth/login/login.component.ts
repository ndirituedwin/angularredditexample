import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login.request.payload';
import { AuthService } from './../../../services/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerSuccessMessage:string
  isError:boolean
  loginForm:FormGroup
  loginRequestPayload:LoginRequestPayload
  constructor(private AuthService:AuthService,private activatedroute:ActivatedRoute,private router:Router,private toastr:ToastrService) {
 this.loginRequestPayload={
   username:'',
   password:''
 };
  }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
    });
    this.activatedroute.queryParams.subscribe((params)=>{
      if(params['registered'] !== undefined && params['registered']==='true'){
        this.toastr.success('signup successfull')
        this.registerSuccessMessage="Please check your inbox for activation link";
      }
    });
  }
  login(){
    this.loginRequestPayload.username=this.loginForm.get('username').value;
    this.loginRequestPayload.password=this.loginForm.get('password').value;
    this.AuthService.login(this.loginRequestPayload).subscribe((data)=>{
      console.log("login successful",data);
      if(data){
        this.isError=false;
        this.router.navigateByUrl('/')
        this.toastr.success('Login successfull ')
      }else{
        this.isError=true;
      }
    });

  }

}
