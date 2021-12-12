import { TestBed } from '@angular/core/testing';
import { Config } from '../models/config.model';

import { LogService } from './log.service';

describe('MyLibService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        LogService,
        {
          provide: Config,
          useValue: () => new Config()
        }
      ]
    });
    // service = TestBed.inject(LogService);
    service = TestBed.get(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
