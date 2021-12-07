import { Inject, Injectable } from '@angular/core';

import { CONFIG } from '../const';
import { IMessage } from '../interfaces/meassgae.interface';
import { LogPublisher } from '../log.publisher';
import { LogPublishersService } from './log.publishers.service';
import { Config } from '../models/config';
import { asyncScheduler, config, of, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  publishers: LogPublisher[];

  constructor(@Inject(CONFIG) public config: Config,
    private publishersService: LogPublishersService) {
    // Set publishers
    this.publishers = this.publishersService.getPublishers(this.config.targets);
  }

  log(message: IMessage) {
    if (this.canLog()) {
      for (let logger of this.publishers) {
        if (this.config.useQueue) {
          const task = () => logger.log(message);
          asyncScheduler.schedule(task, this.config.flushTiming);
        } else {
          logger.log(message);
        }
      }
    }
  }

  canLog() {
    return this.config?.environment?.production;
  }
}
