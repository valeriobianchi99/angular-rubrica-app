import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // Properties
  view: boolean;
  viewValue = new Subject<boolean>();
  toast: Toast;
  toastS= new Subject<Toast>();

  constructor() { }

  setValues(s: string, t: string){
    this.view = true;
    var obj = new Toast(s, t);
    this.toast = obj;
    this.toastS.next(obj);
    this.viewValue.next(true);
  }

  getToast(){
    return this.toast;
  }

  getToastS(){
    return this.toastS.asObservable();
  }

  getView(){
    return this.view;
  }

  getViewValue(){
    return this.viewValue.asObservable();
  }




}

