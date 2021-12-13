import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '../services/log.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private logger: LogService) { }

  handleError(error: any) {
    let errorMsg = '';

    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      errorMsg = error;
    } else {
      errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }

    this.logger.error(errorMsg);
  }
}