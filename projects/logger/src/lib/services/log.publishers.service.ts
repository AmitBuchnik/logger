import { Injectable } from '@angular/core';

import { Targets } from '../enums/targets.enum';
import { LogConsole } from '../logger-types/log.console';
import { LogLocalStorage } from '../logger-types/log.local-storage';
import { LogPublisher } from '../logger-types/log.publisher';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class LogPublishersService {

  publishers: LogPublisher[] = [];

  constructor(public config: Config) {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Build publishers array
  buildPublishers() {
    for (let pub of this.config.targets) {
      switch (pub) {
        case Targets.Console:
          this.publishers.push(new LogConsole());
          break;
        case Targets.LocaleStorage:
          this.publishers.push(new LogLocalStorage());
          break;
      }
    }
  }
}
