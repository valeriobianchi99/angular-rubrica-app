import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { UtenteService } from '../services/utente.service';
import { Utente } from '../utente.model';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { User } from '../user.model';

@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent implements OnInit {

  utenti: Utente[];
  user = new Utente();
  subscription: Subscription;
  data: boolean = false;
  edit: boolean = false;
  small: boolean = false;
  idPadre: number;
  currentFather = new Utente();
  confirmElim = false;
  userToEliminate = new Utente();

  constructor(private utenteS: UtenteService, private toast: ToastService) {
    console.clear();
    this.get();
  }

  get(): void {
    this.subscription = this.utenteS.getUtenti().subscribe(
      res => {
        console.log('Utenti V');
        console.log(res);
        this.utenti = res;
      }
    );
  }

  confirmElimination(obj: Utente) {
    this.confirmElim = true;
    this.userToEliminate = obj;
  }

  createMode(): void {
    this.data = true;
    this.edit = false;
  }

  editMode(obj: Utente): void {
    this.data = true;
    this.edit = true;
    this.user = obj;
    if (obj.padre != undefined) this.currentFather = obj.padre;
  }

  back() {
    this.data = false;
    this.user = new Utente();
    this.currentFather = new Utente();
  }

  delete(id: number) {
    this.utenteS.deleteUtente(id).subscribe({
      next(response) {
        let index = this.utenti.indexOf(response);
        let newUtenti = this.utenti.splice(index);
        this.utenti = newUtenti;
      },
      error(err) {
        console.log('There was an error => (' + err.status + ' - ' + err.statusText + ')');
      }
    });
    this.toast.setValues('Utente eliminato!', 'success');
    this.confirmElim = false;
    setTimeout(() => this.get(), 300);
  }

  createUtente(obj: Utente) {
    obj.padre = this.utenti.find(el => el.id == this.idPadre);
    this.utenteS.postUtente(obj).subscribe(response =>
      this.toast.setValues('Utente creato!', 'success')
    );
    setTimeout(() => this.get(), 300);
    this.data = false;
  }

  modificaUtente(obj: Utente) {
    debugger
    if (this.idPadre == undefined || this.idPadre.toString() == 'null') {
      obj.padre = null;
    }
    else if (this.idPadre != this.currentFather.id) {
      obj.padre = this.utenti.find(el => el.id == this.idPadre);
    }
    this.utenteS.putUtente(obj.id, obj).subscribe(response =>
      this.toast.setValues('Utente aggiornato!', 'success')
    );
    setTimeout(() => this.get(), 300);
    this.data = false;
  }



  ngOnInit() {

  }

}
