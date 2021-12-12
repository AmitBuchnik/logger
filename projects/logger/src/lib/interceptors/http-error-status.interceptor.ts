import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';

import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { LogService } from '../services/log.service';

@Injectable()
export class HttpErrorStatusInterceptor implements HttpInterceptor {

    constructor(private router: Router, private logger: LogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
                // console.log('this is client side error');
                errorMsg = `Error: ${error.error.message}`;
            }
            else {
                // console.log('this is server side error');
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }

            this.logger.log(errorMsg);
            throw error;
        }));
    }
}