'use strict';

/**
 * Room object
 */
class Room {
    /**
     * 
     */
    constructor () {
        this.playerList = new Map(); // key is socket.id, maybe should use something more lasting
        this.playing = false;
        this.totalRolls = 0;
    }
    
    /**
     * needed?
     */
    get players () {
        return this.playerList;
    }
    
    /**
     * 
     */
    get isPlaying () {
        return this.playing;
    }
    
    /**
     * 
     */
    set isPlaying (state) {
        this.playing = state;
    }
    
    /**
     * 
     */
    get size () {
        return this.playerList.size;
    }
    
    /**
     * 
     */
    addPlayer (playerKey, player) {
        this.playerList.set(playerKey, player);
    }
    
    /**
     * 
     */
    getPlayer (playerKey) {
        return this.playerList.get(playerKey);
    }
    
    /**
     * 
     */
    removePlayer (playerKey) {
        this.playerList.delete(playerKey);
    }
    
    /**
     * 
     */
    removeAllPlayers () {
        this.playerList.clear();
    }
    
    /**
     * 
     */
    hasPlayer (playerKey) {
        this.playerList.has(playerKey);
    }
}

module.exports = Room;