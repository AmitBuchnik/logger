import { Targets } from "../enums/targets.enum";

export class Config {

    environment: IEnvironment;

    targets: Targets[];

    messageFormat: IMessageFormat = {
        timestampFormat: 'HH:mm:ss.SSS'
    };

    flushTiming = 5;

    useQueue = false;
}

export interface IEnvironment {

    production: boolean;
}

export interface IMessageFormat {

    timestampFormat: string;
}