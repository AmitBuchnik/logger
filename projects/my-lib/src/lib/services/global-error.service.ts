import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from './log.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService implements ErrorHandler {
  constructor(private logService: LogService) { }

  handleError(error: any) {
    let errorMsg = '';

    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      errorMsg = `Error: ${error}`;
    } else {
      errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }

    this.logService.log({
      message: errorMsg,
      stackTrace: Error().stack,
      timestamp: new Date()
    });
  }
}