import { Injectable } from '@angular/core';

import { asyncScheduler } from 'rxjs';

import { LogPublisher } from '../logger-types/log.publisher';
import { LogPublishersService } from './log.publishers.service';
import { Config } from '../models/config.model';
import { LogLevel } from '../enums/log-levels.enum';
import { LogEntry } from '../models/log-entry.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  publishers: LogPublisher[];

  constructor(private config: Config,
    private publishersService: LogPublishersService) {
    // Set publishers
    this.publishers = this.publishersService.publishers;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let entry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.config.logWithDate;
      entry.logStackTrace = this.config.logStackTrace;
      entry.timestampFormat = this.config.messageFormat?.timestampFormat ?? '';

      for (let logger of this.publishers) {
        if (this.config.useQueue) {
          const task = () => logger.log(entry);
          asyncScheduler.schedule(task, this.config.flushTiming);
        } else {
          logger.log(entry);
        }
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if (this.config?.environment?.production &&
      ((level >= this.config.level && level !== LogLevel.Off) || this.config.level === LogLevel.All)) {
      ret = true;
    }
    return ret;
  }
}
