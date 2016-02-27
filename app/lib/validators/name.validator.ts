import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';

const MIN_LENGTH = 1;
const MAX_LENGTH = 15;

@Injectable()
export class NameValidator {
    constructor(private _logger:Logger) {}
    
    isValid(name:string) : boolean {
        var isValid = typeof name === 'string'
            && name.length >= MIN_LENGTH 
            && name.length <= MAX_LENGTH 
            && !/[^\w ]/.test(name); // doesn't have anything other than words and space
        this._logger.log(`Checking if name ${name} is valid. Result is ${isValid}.`);
        return isValid;
    }
}