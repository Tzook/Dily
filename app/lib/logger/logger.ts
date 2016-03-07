import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
    public log(...args: any[]): void {
        console.info.apply(console, args);
    }
    
    public warn(...args: any[]): void {
        console.warn.apply(console, args);
    }
}