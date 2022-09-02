import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router, CanActivate } from '@angular/router';
import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {

  constructor(private login:LoginService, private router:Router, private logoutServ: LogoutService) { }

  canActivate():boolean{
    if(sessionStorage.getItem('currentLogin')){
      return true;
    }
    else{
      this.router.navigate(['']);
      this.logoutServ.doLogout().subscribe();
      document.getElementById('wrapper').innerHTML = '<br><p style="font-weight: 80; font-size: 20px; text-align: center;">Sessione scaduta, reindirizzamento...</p>';
      setTimeout(()=>{
        window.location.reload();
       },1800);
      return false;
    }
  }

}
