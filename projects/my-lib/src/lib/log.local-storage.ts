import { IMessage } from "./interfaces/meassgae.interface";
import { LogPublisher } from "./log.publisher";

export class LogLocalStorage extends LogPublisher {

    constructor() {
        super();

        this.location = "logging";
    }

    // Append log entry to local storage
    log(message: IMessage) {
        let values: IMessage[];

        try {
            // Get previous values from local storage
            values = JSON.parse(<string>localStorage.getItem(this.location)) || [];

            // Add new log entry to array
            values.push(message);

            // Store array into local storage
            localStorage.setItem(this.location, JSON.stringify(values));
        } catch (ex) {
            // Display error in console
            console.log(ex);
        }
    }
}