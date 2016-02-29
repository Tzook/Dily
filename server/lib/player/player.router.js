'use strict';

let Router              = require('../../base/router'),
    PlayerController    = require('./player.controller');

/**
 * 
 */
class PlayerRouter extends Router {
    /**
     * 
     */
    init() {
        console.log('player router inited');
        let playerController = new PlayerController();
        this.io.use(playerController.verifyPlayerNameMiddleware);
    }
}

module.exports = PlayerRouter;