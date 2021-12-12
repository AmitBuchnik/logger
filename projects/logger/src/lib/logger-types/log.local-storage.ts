import { LogEntry } from "../models/log-entry.model";
import { LogPublisher } from "./log.publisher";

export class LogLocalStorage extends LogPublisher {

    constructor() {
        super();
        this.location = "logging";
    }

    // Append log entry to local storage
    log(entry: LogEntry) {
        let ret: boolean = false;
        let values: LogEntry[];

        try {
            // Get previous values from local storage
            values = JSON.parse(<string>localStorage.getItem(this.location)) || [];

            // Add new log entry to array
            values.push(entry);

            // Store array into local storage
            localStorage.setItem(this.location, JSON.stringify(values));

            // Set return value
            ret = true;
        } catch (ex) {
            // Display error in console
            console.log(ex);
        }
    }

    clear() {
        localStorage.removeItem(this.location);
    }
}