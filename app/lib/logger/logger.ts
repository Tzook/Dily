import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
    log(...args:any[]) {
        console.log.apply(console, args);
    }
}