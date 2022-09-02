import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from './services/loader.service';
import { Injectable } from '@angular/core';

@Injectable()



export class TokenInterceptor implements HttpInterceptor {

    csrf: string;

    constructor(private loaderServ: LoaderService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Add CSRF Token header, if is not-null
        if (this.csrf) {
            req = req.clone({
                setHeaders: {
                    'X-CSRF-TOKEN': this.csrf
                }
            });
        }

        // Show/hide loader
        this.loaderServ.show();
        setTimeout(() => this.loaderServ.hide(), 1300);

        return next.handle(req).pipe(

            // Map to HTTP events
            map((event: HttpEvent<any>) => {
                
                if (event instanceof HttpResponse) {
                    // IF there is HTTP response, gets the CSRF Token header into a local var
                    if (event.headers.has('CSRF-TOKEN')) {
                        this.csrf = event.headers.get('CSRF-TOKEN');
                        console.warn('Token: ', this.csrf);
                    }
                }
                return event;
            })
            // End of map

        );
    }
}