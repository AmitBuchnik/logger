import { LogEntry } from "../models/log-entry.model";
import { LogPublisher } from "./log.publisher";

export class LogConsole extends LogPublisher {

    constructor() {
        super();
        this.location = "console";
    }

    log(entry: LogEntry) {
        console.log(entry.buildLogString());
    }
}