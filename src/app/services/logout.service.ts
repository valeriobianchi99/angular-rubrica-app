import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
   withCredentials: true
  }

  constructor(private http: HttpClient, private router: Router) { }

  doLogout():Observable<any>{
    return this.http.post('http://192.168.3.139:8080/rubricarest/logout', {}, this.httpOptions).pipe(
      map(
        res=>{
          this.router.navigate(['']);
          sessionStorage.clear();
          return res;
        }
      ),
      catchError(this.handleError)
    );

  }

  handleError(err: HttpErrorResponse):any{
    document.getElementById('wrapper').innerHTML = '<br><p style="color: red; font-weight: 30; font-size: 20px; text-align: center;"><i class="fas fa-exclamation-circle"></i> '+err.status+' - '+err.statusText+'<br> Redirecting...</p>';
    setTimeout(()=>window.location.reload(),2100);
    return throwError(err);
  }

}