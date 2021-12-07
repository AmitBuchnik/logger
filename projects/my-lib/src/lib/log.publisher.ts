import { IMessage } from "./interfaces/meassgae.interface";

export abstract class LogPublisher {
    location: string;
    abstract log(message: IMessage): void;
}