import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { User } from '../user.model';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private http: HttpClient) { }
  

  registra(obj: User):Observable<User>{
    return this.http.post<User>('http://192.168.3.139:8080/rubricarest/createUser', obj, this.httpOptions).pipe(
      map(res=>{return res}),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse){
    document.getElementById('wrapper').innerHTML = '<br><p style="color: red; font-weight: 30; font-size: 20px; text-align: center;"><i class="fas fa-exclamation-circle"></i> '+err.status+' - '+err.statusText+'<br> Redirecting...</p>';
    setTimeout(()=>window.location.reload(),2100);
    return throwError(err);
  }
}
