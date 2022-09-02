import { Component, OnInit } from '@angular/core';
import { Toast } from '../toast.model';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { subscribeOn } from 'rxjs/operators';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  alert: boolean = false;
  toast: Toast;
  sub: Subscription;

  constructor(private tServ: ToastService, private logoutServ: LogoutService) {
    this.sub = this.tServ.getToastS().subscribe(
      a=>this.toast=a
    );
    this.sub = this.tServ.getViewValue().subscribe(
      a=>{
        this.alert=a;
        if(this.alert) this.close();
      }
    );
   }

  ngOnInit() {
    this.alert = this.tServ.getView();
    this.toast = this.tServ.getToast();
  }

  close() {
    setTimeout(() => this.alert = false, 2100);
  }

  logout(){
    this.sub=this.logoutServ.doLogout().subscribe();
  }


}
