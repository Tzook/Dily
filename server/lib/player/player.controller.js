'use strict';

/**
 * 
 */
class PlayerController {
    /**
     * verify name value middleware
     */
    verifyPlayerNameMiddleware(socket, next) { // TODO: should use a player object? stuff like dice, bet etc will be inside of it?
        let name = socket.handshake.query.name;
        if (typeof name !== 'string' || name.length < 1 || name.length > 15 || /[^\w ]/.test(name)) {
            next(new Error(`Invalid name provided. Must enter a name with the following: a-z, A-Z, 0-9, _, space. Instead, got ${name}`));
        } else {
            socket.name = name;
            next();
        }
    }
}

module.exports = PlayerController;