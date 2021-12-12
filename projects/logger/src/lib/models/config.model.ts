import { Injectable } from "@angular/core";

import { LogLevel } from "../enums/log-levels.enum";
import { Targets } from "../enums/targets.enum";
import { IConfig, IEnvironment, IMessageFormat } from "../interfaces/config.interface";

@Injectable({
    providedIn: "root"
})
export class Config implements IConfig {

    level = LogLevel.All;

    environment: IEnvironment;

    targets = [Targets.Console, Targets.LocaleStorage];

    messageFormat: IMessageFormat = {
        timestampFormat: 'M/d/yy, h:mm a'
    };

    flushTiming = 5000;

    useQueue = true;

    logWithDate = true;

    logStackTrace = true;
}