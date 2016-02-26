'use strict';

let Router = require('../../base/router');

/**
 * 
 */
class PlayerRouter extends Router {
    /**
     * 
     */
    init() {
        console.log('player router inited');
        this.registerMiddlewares();
    }
    
    /**
     * 
     */
    registerMiddlewares() {
        // verify name value middleware
        this.io.use((socket, next) => {
            let name = socket.handshake.query.name;
            if (typeof name !== 'string' || name.length < 1 || name.length > 15 || /[^\w ]/.test(name)) {
                next(new Error(`Invalid name provided. Must enter a name with the following: a-z, A-Z, 0-9, _, space. Instead, got ${name}`));
            } else {
                socket.name = name;
                next();
            }
        });
    }
}

module.exports = PlayerRouter;