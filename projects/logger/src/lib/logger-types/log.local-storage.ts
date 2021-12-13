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
        let values: LogEntry[] = [];

        try {
            // Get previous values from local storage
            values = JSON.parse(<string>localStorage.getItem(this.location)) || [];

            // Add new log entry to array
            values.push(entry);

            // Store array into local storage
            localStorage.setItem(this.location, JSON.stringify(values));

            // Set return value
            ret = true;
        } catch (ex: any) {
            // Display error in console
            console.log(ex);

            if (ex.code === "22" || ex.code === "1024") {
                // data wasn't successfully saved due to quota exceed
                values.splice(0, 5);

                // Store array into local storage
                localStorage.setItem(this.location, JSON.stringify(values));
            }
        }
    }

    clear() {
        localStorage.removeItem(this.location);
    }
}