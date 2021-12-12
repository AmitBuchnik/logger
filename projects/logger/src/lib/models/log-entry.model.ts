import { DatePipe } from "@angular/common";
import { LogLevel } from "../enums/log-levels.enum";

export class LogEntry {

    level = LogLevel.Debug;
    entryDate = new Date();
    message = "";
    extraInfo: any[] = [];
    logWithDate = true;
    logStackTrace = true;
    timestampFormat = 'M/d/yy, h:mm a';

    buildLogString(): string {
        let ret = "";

        if (this.logWithDate) {
            const datePipe = new DatePipe('en');
            ret = `${datePipe.transform(Date.now(), this.timestampFormat)} - `;
        }

        ret += `Type: ${LogLevel[this.level]}`;
        ret += ` - Message: ${this.message}`;

        if (this.extraInfo.length) {
            ret += ` - Extra Info: ${this.formatParams(this.extraInfo)}`;
        }

        if (this.logStackTrace) {
            ret += ` - Stack trace: ${Error().stack}`;
        }
        return ret;
    }

    private formatParams(params: any[]): string {
        let ret = params.join(",");

        // Is there at least one object in the array?
        if (params.some(p => typeof p == "object")) {
            ret = "";

            // Build comma-delimited string
            for (let item of params) {
                ret += JSON.stringify(item) + ",";
            }
        }
        return ret;
    }
}