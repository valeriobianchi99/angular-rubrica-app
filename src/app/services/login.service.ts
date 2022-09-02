import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
   withCredentials: true
  }

  constructor(private http: HttpClient, private router: Router) {}

  doLogin():Observable<any>{
    var currentLogin = JSON.parse(sessionStorage.getItem('currentLogin'));
    let body = `username=${currentLogin.username}&password=${currentLogin.password}`;
    return this.http.post<Observable<any>>('http://192.168.3.139:8080/rubricarest/login', body, this.httpOptions).pipe(
      map(
        res=>{
          this.router.navigate(['app']);
          return res;
        }
      ),
      catchError(this.handleError)
    );

  }

  handleError(err: HttpErrorResponse):any{
    document.getElementById('wrapper').innerHTML = '<br><p style="color: red; font-weight: 30; font-size: 20px; text-align: center;"><i class="fas fa-exclamation-circle"></i> '+err.status+' - '+err.statusText+'<br> Redirecting...</p>';
    setTimeout(()=>window.location.reload(),2100);
    sessionStorage.clear();
    return throwError(err);
  }

}