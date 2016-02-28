import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
    log(...args:any[]) {
        console.info.apply(console, args);
    }
    warn(...args:any[]) {
        console.warn.apply(console, args);
    }
}