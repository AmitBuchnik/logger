import { Inject, Injectable } from '@angular/core';

import { CONFIG } from '../const';
import { Targets } from '../enums/targets.enum';
import { LogConsole } from '../log.console';
import { LogLocalStorage } from '../log.local-storage';
import { LogPublisher } from '../log.publisher';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class LogPublishersService {

  constructor() {

  }

  // Build publishers array
  getPublishers(targets: Targets[]): LogPublisher[] {
    const publishers: LogPublisher[] = [];

    for (let pub of targets) {
      switch (pub) {
        case Targets.Console:
          publishers.push(new LogConsole());
          break;
        case Targets.LocaleStorage:
          publishers.push(new LogLocalStorage());
          break;
      }
    }
    return publishers;
  }
}
