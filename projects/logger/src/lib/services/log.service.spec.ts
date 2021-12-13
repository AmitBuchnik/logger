import { inject, TestBed } from '@angular/core/testing';
import { LogLevel } from '../enums/log-levels.enum';
import { CONFIG_TOKEN, provideConfig } from '../logger.module';
import { Config } from '../models/config.model';

import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        {
          provide: CONFIG_TOKEN,
          useValue: new Config()
        },
        {
          provide: Config,
          useFactory: provideConfig,
          deps: [CONFIG_TOKEN]
        }
      ]
    });
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Debug', () => {
  it('should call writeToLog with Debug', inject(
    [LogService],
    (logger: LogService) => {
      const logSpy = spyOn(<any>logger, 'writeToLog');

      logger.debug('message');

      expect(logSpy).toHaveBeenCalledWith('message', LogLevel.Debug, []);
    }
  ));
});

describe('Info', () => {
  it('should call writeToLog with Info', inject(
    [LogService],
    (logger: LogService) => {
      const logSpy = spyOn(<any>logger, 'writeToLog');

      logger.info('message');

      expect(logSpy).toHaveBeenCalledWith('message', LogLevel.Info, []);
    }
  ));
});

describe('Warn', () => {
  it('should call writeToLog with Warn', inject(
    [LogService],
    (logger: LogService) => {
      const logSpy = spyOn(<any>logger, 'writeToLog');

      logger.warn('message');

      expect(logSpy).toHaveBeenCalledWith('message', LogLevel.Warn, []);
    }
  ));
});

describe('Error', () => {
  it('should call writeToLog with Error', inject(
    [LogService],
    (logger: LogService) => {
      const logSpy = spyOn(<any>logger, 'writeToLog');

      logger.error('message');

      expect(logSpy).toHaveBeenCalledWith('message', LogLevel.Error, []);
    }
  ));
});

describe('Fatal', () => {
  it('should call writeToLog with Fatal', inject(
    [LogService],
    (logger: LogService) => {
      const logSpy = spyOn(<any>logger, 'writeToLog');

      logger.fatal('message');

      expect(logSpy).toHaveBeenCalledWith('message', LogLevel.Fatal, []);
    }
  ));
});

describe('All', () => {
  it('should call writeToLog with All', inject(
    [LogService],
    (logger: LogService) => {
      const logSpy = spyOn(<any>logger, 'writeToLog');

      logger.log('message');

      expect(logSpy).toHaveBeenCalledWith('message', LogLevel.All, []);
    }
  ));
});
