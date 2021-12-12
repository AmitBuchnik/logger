import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Config } from '../public-api';
import { HttpErrorStatusInterceptor } from './interceptors/http-error-status.interceptor';
import { IConfig } from './interfaces/config.interface';
import { GlobalErrorHandler } from './interceptors/global-error.service';

export const CONFIG_TOKEN = new InjectionToken<IConfig>("loggerConfig");

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
      useClass: GlobalErrorHandler,
    },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorStatusInterceptor, multi: true }
  ]
})
export class LoggerModule {
  // I setup the module providers for the root application.
  static forRoot(config?: IConfig): ModuleWithProviders<LoggerModule> {
    return ({
      ngModule: LoggerModule,
      providers: [
        {
          provide: CONFIG_TOKEN,
          useValue: config
        },
        {
          provide: Config,
          useFactory: provideConfig,
          deps: [CONFIG_TOKEN]
        }
      ]
    });
  }
}

export function provideConfig(config?: IConfig): Config {

  let c = new Config();

  // If the optional options were provided via the .forRoot() static method, then apply
  // them to the MyServiceOptions Type provider.
  if (config) {
    c.environment = config.environment;
    c.level = config.level;
    c.targets = config.targets;

    if (config.useQueue) {
      c.useQueue = config.useQueue;
    }

    if (config.flushTiming) {
      c.flushTiming = config.flushTiming;
    }

    if (config.logWithDate) {
      c.logWithDate = config.logWithDate;
    }

    if (config.logStackTrace) {
      c.logStackTrace = config.logStackTrace;
    }

    if (config.messageFormat) {
      c.messageFormat = config.messageFormat;
    }
  }
  return c;
}
