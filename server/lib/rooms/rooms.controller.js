'use strict';

let rooms       = require('./rooms.service'),
    Room        = require('./rooms.model'),
    MathHelper  = require('../math/utils');

/**
 * 
 */
class RoomsController {
    /**
     * 
     */
    constructor(){
        this.mathHelper = new MathHelper();
    }
    
    /**
     * 
     */
    verfiyRoomValueMiddleware(socket, next) {
        // must be 1-999999, otherwise will set it to 0 and a new room will be created
        let roomKey = rooms.getRoomValueFromSocket(socket.handshake.query.room); 
        if (roomKey === -1) {
            next(new Error("Invalid room number provided: " + socket.handshake.query.room));
        } else if (rooms.hasRoom(roomKey) && rooms.getRoom(roomKey).playing) {
            next(new Error(`The room ${roomKey} is already in playing!`));
        } else {
            socket.roomKey = roomKey;
            next();
        }
    }
    
    /**
     * set a valid room number if it's 0
     */
    setValidRoomNumberMiddleware(socket, next) {
        if (socket.roomKey === 0) {
            let random;
            while (rooms.hasRoom(random = this.mathHelper.getRandomNumber(rooms.minRoomNumber, rooms.maxRoomNumber))) {
                ; // continue until you find an empty room
            }
            socket.roomKey = random;
        }
        next();
    }
    
    /**
     * 
     */
    verifyRoomExistanceMiddleware(socket, next) {
        if (!rooms.hasRoom(socket.roomKey)) {
            rooms.setRoom(socket.roomKey, new Room());
        }
        next();
    }
    
    /**
     * 
     */
    addingPlayerToRoomMiddleware(socket, next) {
        let room = rooms.getRoom(socket.roomKey);
        room.addPlayer(socket.id, socket); // TODO: player object instead of socket
        socket.dice = 5;
        socket.room = room; // TODO: should do this? 
        socket.join(socket.roomKey); // join to a socket.io room
        console.info(`Socket ${socket.id} has join room ${socket.roomKey}!`);
        next();
    }
}

module.exports = RoomsController;