'use strict';

const MIN_ROOM = 0;
const MAX_ROOM = 99999;

/**
 * 
 */
class RoomsService {
    /**
     * 
     */
    constructor () {
        this.rooms = new Map();
    }
    
    /**
     * 
     */
    getRoom (roomKey) {
        return this.rooms.get(roomKey);
    }
    
    /**
     * 
     */
    setRoom (roomKey, room) {
        this.rooms.set(roomKey, room);
    }
    
    /**
     * 
     */
    removeRoom (roomKey) {
        this.rooms.delete(roomKey);
    }
    
    /**
     * 
     */
    hasRoom(roomKey) {
        return this.rooms.has(roomKey);
    }
       
    /**
     *
     */    
    getRoomValueFromSocket(str) {
        let num = +str;
        if (Number.isInteger(num) && num >= 0 && num <= MAX_ROOM) {
            return num;
        }
        return -1;
    }
    
    /**
     * 
     */
    get maxRoomNumber () {
        return MAX_ROOM;
    }
    
    /**
     * 
     */
    get minRoomNumber () {
        return MIN_ROOM;
    }
}

let roomsServiceSingleton = new RoomsService();

module.exports = roomsServiceSingleton;