'use strict';

/**
 * 
 */
class RoomsModel {
    constructor () {
        this.players = new Set(); // object are the keys
    }
    
    get players () {
        return this.players.enteries;
    }
    
    get size () {
        return this.players.size;
    }
    
    add (playerKey) {
        this.players.add(playerKey);
    }
    
    remove (playerKey) {
        this.players.delete(playerKey);
    }
    
    removeAll () {
        this.players.clear();
    }
    
    has (playerKey) {
        this.players.has(playerKey);
    }
}