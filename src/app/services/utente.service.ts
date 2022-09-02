import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Utente } from '../utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }


  constructor(private http: HttpClient) { }

  getUtenti(): Observable<any> {
    console.log('GET...');
    return this.http.get('http://192.168.3.139:8080/rubricarest/utente', { withCredentials: true }).pipe(
      map((res) => { return res }),
      catchError(this.handleError)
    );
  }

  deleteUtente(id: number): Observable<any> {
    console.log('DELETE...');
    return this.http.delete('http://192.168.3.139:8080/rubricarest/utente/' + id, { withCredentials: true }).pipe(
      map(res=>{return res})
    );
  }

  postUtente(obj: Utente): Observable<any> {
    console.log('POST...');
    return this.http.post('http://192.168.3.139:8080/rubricarest/utente', obj, this.httpOptions).pipe(
      map(res=>{return res}),
      catchError(this.handleError)
    );
  }

  putUtente(id: number, newObject: Utente): Observable<any> {
    console.log('PUT...');
    return this.http.put('http://192.168.3.139:8080/rubricarest/utente/' + id.toString(), JSON.stringify(newObject), this.httpOptions).pipe(
      map(res=>{return res}),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse){
    document.getElementById('utenteContent').innerHTML = '<h4 style="text-align:center; opacity: 0.8"><i class="fas fa-exclamation-circle"></i> '+err.status +' - '+err.statusText+'</h4>';
    return throwError(err);
  }
}
