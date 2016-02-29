'use strict';

let Router          = require('../../base/router'),
    RoomsController = require('./rooms.controller');

/**
 * 
 */
class RoomsRouter extends Router {
    /**
     * 
     */
    init() {
        console.info('rooms router inited');
        let roomsController = new RoomsController();
        // register middlewares
        this.io.use(roomsController.verfiyRoomValueMiddleware);
        this.io.use((roomsController.setValidRoomNumberMiddleware).bind(roomsController));
        this.io.use(roomsController.verifyRoomExistanceMiddleware);
        this.io.use(roomsController.addingPlayerToRoomMiddleware);
    }
}

module.exports = RoomsRouter;