'use strict';

let Router          = require('../../base/router'),
    GameController  = require('./game.controller');

/**
 * In the feature this should be an interface to different games
 */
class GameRouter extends Router {
    /**
     * 
     */
    init() {
        console.log('game router inited');
        // this.mathHelper = new MathHelper();
        this.onConnection((this.gameStart).bind(this));
    }
    
    /**
     * 
     */
    gameStart(socket) {
        console.info(`Connected the socket ${socket.name}!`);
        let gameController = new GameController(this.io, socket);
        
        socket.emit('room', { room: socket.roomKey }); // tell the player the room number so he can ensure his url is correct
        // TODO we have to do this in a way that we know the client is ready with all his events
        setTimeout(() => {
            gameController.emitPlayers();
        }, 500);
        
        socket.on('disconnect', (gameController.disconnect).bind(gameController));
        socket.on('start', (gameController.start).bind(gameController));
        socket.on('roll', (gameController.roll).bind(gameController));
        socket.on('bet', (gameController.bet).bind(gameController));
        socket.on('lying', (gameController.lying).bind(gameController));
    }
}

module.exports = GameRouter;