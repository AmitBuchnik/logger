import { LogEntry } from "../models/log-entry.model";

export abstract class LogPublisher {
    location: string;
    abstract log(entry: LogEntry): void;
    abstract clear(): void;
}