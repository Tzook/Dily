'use strict';

/**
 * Player object
 */
class Player {
    /**
     * 
     */
    constructor (socket) {
        this._socket = socket; // socket.id
        this._dice = 5;
        this._playing = true;
        this._result = [];
        this._name = 'Placeholder'; // randomize a name!
    }
    
    /**
     * use this socket.id for identification
     */
    get socket () {
        return this._socket;
    }
    
    /**
     * 
     */
    get dice () {
        return this._dice;
    }
    
    /**
     * if player has no more dice, should stop playing
     */
    loseDice (amount) {
        if ((this._dice - amount) > 0)
            this._dice -= amount;
        else {
            this._playing = false;
            this._socket.emit('lost-game');
        }  
    }
    
    /**
     * 
     */
    get result () {
        return this._result;
    }
    
    /**
     * @param {Array} outcome
     */
    set result (outcome) {
        this._result = outcome;
    }
    
    /**
     * 
     */
    get name () {
        return this._name;
    }
    
    /**
     * @parma {String} newName
     */
    set name (newName) {
        this._name = newName;
    }
}

module.exports = Player;