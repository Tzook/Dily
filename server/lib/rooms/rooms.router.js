'use strict';

let Router = require('../../base/router'),
    rooms = require('./rooms.service'),
    Room = require('./rooms.model'),
    MathHelper = require('../math/utils');

/**
 * 
 */
class RoomsRouter extends Router {
    /**
     * 
     */
    init() {
        console.info('rooms router inited');
        this.registerMiddlewares();
        this.mathHelper = new MathHelper();   
    }
    
    /**
     * 
     */
    registerMiddlewares () {
        // verify room value middleware
        this.io.use((socket, next) => {
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
        });
        
        // set a valid room number if it's 0
        this.io.use((socket, next) => {
            if (socket.roomKey === 0) {
                let random;
                while (rooms.hasRoom(random = this.mathHelper.getRandomNumber(rooms.minRoomNumber, rooms.maxRoomNumber))) {
                    ; // continue until you find an empty room
                }
                socket.roomKey = random;
            }
            next();
        });

        // verify room existance middleware
        this.io.use((socket, next) => {
            if (!rooms.hasRoom(socket.roomKey)) {
                rooms.setRoom(socket.roomKey, new Room());
            }
            next();
        });

        // adding user to room middleware
        this.io.use((socket, next) => {
            let room = rooms.getRoom(socket.roomKey);
            room.addPlayer(socket.id, socket); // TODO: player instead of socket
            socket.dice = 5;
            socket.room = room; // TODO: should do this? 
            next();
        });
    }
}

module.exports = RoomsRouter;