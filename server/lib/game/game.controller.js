'use strict';

let rooms       = require('../rooms/rooms.service'),
    MathHelper  = require('../math/utils');

/**
 * 
 */
class GameController {
    constructor(io, socket) {
        this.io         = io;
        this.socket     = socket;
        this.mathHelper = new MathHelper();
    }
    
    /**
     * 
     */
    disconnect () {
        let room = this.socket.room;
        room.removePlayer(this.socket.id);
        this.socket.leave(this.socket.roomKey);
        this.emitPlayers(); // update the new user list to everyone
        if (room.size === 0) {
            console.info(`Removing room ${this.socket.roomKey}`);
            rooms.removeRoom(this.socket.roomKey);
        }
        console.info(`The socket ${this.socket.name} has disconnected from room ${this.socket.roomKey}.`);
    }
    
    /**
     * begin the game.
     */
    start () {
        this.io.to(this.socket.roomKey).emit('start');
        this.socket.room.isPlaying = true;
        console.info(`Starting room ${this.socket.roomKey}!`);
    }
    
    /**
     * 
     */
    roll () {
        console.info(`Rolling for ${this.socket.name}`);
        this.socket.result = [];
        let publicResult = [];
        for (let i = 0; i < this.socket.dice; i++) {
            this.socket.result[i] = this.mathHelper.getRandomNumber(1, 6);
            publicResult[i] = 0;
        }
        this.socket.emit('roll', {
            result: this.socket.result,
            id: this.socket.id
        });
        console.info(`Roll for ${this.socket.name} is: ${JSON.stringify(this.socket.result)}`);
        this.socket.to(this.socket.roomKey).emit('roll', {
            result: publicResult,
            id: this.socket.id
        });
        let room = this.socket.room;
        if (++room.totalRolls >= room.size) {
            console.info(`Begin bets for room ${this.socket.roomKey} in 2 seconds!`);
            setTimeout(() => {
                this.io.to(this.socket.roomKey).emit('begin-bets');
                room.turns = room.players.keys();
                this.nextTurn(0, 0);
            }, 2000);
        }
    }
    
    /**
     * 
     */
    bet (data) {
        let room = this.socket.room;
        if (!room.bet) {
            console.info(`No bet provided, but 'bet' packet recieved by ${this.socket.name}.`);
            return;
        }
        let valid = true;
        let die = data.die, count = data.count;
        let currentDie = room.bet.die, currentCount = room.bet.count;
        if (room.turn.value !== this.socket.id) {
            console.info(`Recieved 'bet' packet not in turn by ${this.socket.name}.`);
            valid = false;
        }
        // check for invalid data
        if (valid && !count || !die || count < 1 || die < 1 || die > 6) {
            console.info(`Recieved invalid 'bet' packet by ${this.socket.name}.`);
            valid = false;
        }
        // check for invalid values
        if (valid) {
            if (count < currentCount) {
                valid = false;
            } else if (count == currentCount) {
                valid = die > currentDie;
            }
        }
        if (!valid) {
            console.info(`Recieved 'bet' values that are not well by ${this.socket.name}.`);
            console.info(`current count/die: ${currentCount}/${currentDie}.`);
            console.info(`recieved count/die: ${count}/${die}.`);
            this.socket.emit('turn', {
                id: room.turn.value,
                bet: room.bet
            });
        } else {
            this.nextTurn(count, die);
        }
    }
    
    /**
     * 
     */
    lying () {
        let room = this.socket.room;
        if (!room.lastTurn || room.turn.value !== this.socket.id) {
            console.info(`A 'lying' packet recieved by ${this.socket.name}, but not in turn OR in first turn.`);
            return;
        }
        let die = room.bet.die, count = room.bet.count;
        let results = this.getResults();
        console.info(`Game results: ${JSON.stringify(results)}.`);        
        if (results[die] >= count) {
            // socket loses a die
            console.info(`The guy was not lying! there are ${results[die]} times die ${die}.`);        
            this.loseDie(this.socket);
        } else {
            console.info(`The guy was indeed lying! there are ${results[die]} times die ${die}.`);        
            let player = room.getPlayer(room.lastTurn.value);
            this.loseDie(player);
        }
    }
    
    /**
     * 
     */
    emitPlayers () {
        this.io.to(this.socket.roomKey).emit('users', {
            users: this.getPlayers(this.socket.room.players),
            id: this.socket.id
        });
    }
    
    /**
     * 
     */
    getPlayers (players) {
        let result = {};
        players.forEach((player, playerId) => {
            result[playerId] = player.name;
        });
        console.info(`Sending the list of players for room ${this.socket.roomKey}:  ${JSON.stringify(result)}.`);        
        return result;
    }
    
    /**
     * 
     */
    nextTurn(count, die) {
        let room = this.socket.room;
        console.info(`Setting bet to count/die: ${count}/${die}.`);
        room.bet = { count, die };
        room.lastTurn = room.turn;
        console.info(`Last turn belongs to ${room.lastTurn && room.getPlayer(room.lastTurn.value).name}.`);
        room.turn = room.turns.next();
        if (room.turn.done) {
            console.info(`Looping on turns finished. starting again.`);
            room.turns = room.players.keys();
            room.turn = room.turns.next();
        }
        console.info(`New turn belongs to ${room.getPlayer(room.turn.value).name}.`);
        this.io.to(this.socket.roomKey).emit('turn', {
            id: room.turn.value, 
            bet: room.bet
        });
    }
    
    /**
     * 
     */
    getResults () {
        let results = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
        this.socket.room.players.forEach((player) => {
            for (let i in player.result) {
                let num = player.result[i];
                results[num]++;
            }
        });
        return results;
    }
    
    /**
     * 
     */
    loseDie(loserSocket) {
        this.socket.room.players.forEach((player) => {
            console.info(`Result for ${player.name} was: ${JSON.stringify(player.result)}.`);        
            player.to(player.roomKey).broadcast.emit('roll', {
                result: player.result,
                id: player.id
            });
        });
        this.io.to(this.socket.roomKey).emit('results', {
            id: this.socket.id
        });
        // actual lose dice action
        let next = (function () {
            loserSocket.dice--;
            console.info(`Player ${loserSocket.name} lost a die. Now he has ${loserSocket.dice}.`);        
            this.io.to(this.socket.roomKey).emit('lose-die', {
                id: loserSocket.id
            });
            this.io.to(this.socket.roomKey).emit('start');
            this.socket.room.totalRolls = 0;
            this.socket.removeListener('next', next); 
        }).bind(this);
        
        this.socket.on('next', next);
    }
}

module.exports = GameController;