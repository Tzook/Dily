'use strict';

class RoomsService {
    constructor () {
        this.rooms = new Map();
    }
    
    getRoom (roomKey) {
        this.rooms.get(roomKey);
    }
    
    setRoom (roomKey, room) {
        this.rooms.set(roomKey, room);
    }
}

let roomsServiceSingleton = new RoomsService();

module.export = roomsServiceSingleton;