import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  user = new User();
  showPassword: boolean = false;
  type: string = 'password';

  constructor(private loginServ: LoginService) { 
    console.clear();
  }

  ngOnInit(){
    sessionStorage.clear();
  }

  login():void {
    sessionStorage.setItem('currentLogin',JSON.stringify(this.user));
    this.loginServ.doLogin().subscribe({
      next(res){
        console.log('Successful login.');
      },
      error(err){
        sessionStorage.clear();
      }
    });
  }

  showthePassword():void{
    this.showPassword=!this.showPassword;
    (this.type=='password')? this.type='text':this.type='password';
  }

}
