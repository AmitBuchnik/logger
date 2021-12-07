import { IMessage } from "./interfaces/meassgae.interface";
import { LogPublisher } from "./log.publisher";

export class LogConsole extends LogPublisher {

    log(message: IMessage) {
        console.log(message);
    }
}