import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/shared/auth.service';
import { LoginRequestPayload } from './login.request.payload';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  loginRequestpayload:LoginRequestPayload
  registerSuccessMessage:string
  iserror:boolean
  constructor(private authservice:AuthService,private activatedRoute: ActivatedRoute,private router:Router,private toast: ToastrService) {
    this.loginRequestpayload={
      username:'',
      password:'',
    }
  }

  ngOnInit(): void {

    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
    this.activatedRoute.queryParams
    .subscribe(params => {
      // if (params.registered !== undefined && params.registered === 'true') {
      if (params['registered'] !== undefined && params['registered'] === 'true') {
        this.toast.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    });
  }
  login(){
    this.loginRequestpayload.username=this.loginForm.get('username').value;
    this.loginRequestpayload.password=this.loginForm.get('password').value;

    this.authservice.login(this.loginRequestpayload).subscribe(data=>{
      // console.log('Login successful',data)
        if(data){
          this.iserror=false
          this.router.navigateByUrl('/')
          this.toast.success('Login successfull')
        }else{
          this.iserror=true
        }
    })
  }

}
