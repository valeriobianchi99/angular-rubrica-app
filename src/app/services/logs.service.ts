import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }

  getLogs(): Observable<any> {
    console.log('GET...');
    return this.http.get('http://192.168.3.139:8080/rubricarest/log', { withCredentials: true }).pipe(
      map(res => { return res }),
      catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse){
    document.getElementById('logContent').innerHTML = '<h4 style="text-align:center; opacity: 0.8"><i class="fas fa-exclamation-circle"></i> '+err.status +' - '+err.statusText+'</h4>';
    return throwError(err);
  }
}
