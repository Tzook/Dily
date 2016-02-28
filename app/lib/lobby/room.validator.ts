import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';

const MIN_ROOM = 1;
const MAX_ROOM = 99999;

@Injectable()
export class RoomValidator {
    constructor(private _logger:Logger) {}

    isValid(room:string) : boolean {
        var roomNumber = +room;
        var isValid = roomNumber === (roomNumber | 0) // is integer
            && roomNumber >= MIN_ROOM 
            && roomNumber <= MAX_ROOM;
        this._logger.log(`Checking if room ${roomNumber} is valid. Result is ${isValid}.`);
        return isValid;
    }
}