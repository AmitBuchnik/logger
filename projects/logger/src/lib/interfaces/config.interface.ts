import { LogLevel } from "../enums/log-levels.enum";
import { Targets } from "../enums/targets.enum";

export interface IConfig {

    level: LogLevel;

    environment: IEnvironment;

    targets: Targets[];

    messageFormat?: IMessageFormat;

    flushTiming?: number

    useQueue?: boolean

    logWithDate?: boolean

    logStackTrace?: boolean
}

export interface IEnvironment {

    production: boolean;
}

export interface IMessageFormat {

    timestampFormat: string;
}

