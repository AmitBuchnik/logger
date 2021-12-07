import { IMessage } from "./interfaces/meassgae.interface";
import { LogPublisher } from "./log.publisher";

export class LogConsole extends LogPublisher {

    constructor() {
        super();

        this.location = "console";
    }

    log(message: IMessage) {
        console.log(message);
    }
}