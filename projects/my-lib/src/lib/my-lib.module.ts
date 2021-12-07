import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpErrorStatusInterceptor } from './interceptors/http-error-status.interceptor';
import { GlobalErrorService } from './services/global-error.service';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ],
  providers: [
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorService,
    },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorStatusInterceptor, multi: true }
  ]
})
export class MyLibModule { }
