import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
    public log(...args: any[]) {
        console.info.apply(console, args);
    }
    
    public warn(...args: any[]) {
        console.warn.apply(console, args);
    }
}