import { Component } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  user = new User();
  showPassword: boolean = false;
  type: string = 'password';

  constructor(private serv:RegisterService, private router: Router, private toast: ToastService) { 
    console.clear();
  }

  register():void {
    this.serv.registra(this.user).subscribe(
      res=>{
        this.toast.setValues('Utente registrato!','success');
        setTimeout(()=>this.router.navigate(['']),1500);
      }
    );
  }

  showthePassword():void{
    this.showPassword=!this.showPassword;
    (this.type=='password')? this.type='text':this.type='password';
  }

}
