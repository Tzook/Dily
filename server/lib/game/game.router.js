'use strict';

let Router          = require('../../base/router'),
    GameController  = require('./game.controller');
    // rooms = require('../rooms/rooms.service'),
    // MathHelper = require('../math/utils');

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
        gameController.emitPlayers();
        
        socket.on('disconnect', (gameController.disconnect).bind(gameController));
        socket.on('start', (gameController.start).bind(gameController));
        socket.on('roll', (gameController.roll).bind(gameController));
        socket.on('bet', (gameController.bet).bind(gameController));
        socket.on('lying', (gameController.lying).bind(gameController));
        
        
        // let room = socket.room;
        // let io = this.io;
        
        
        // socket.on('disconnect', () => {
        //     room.removePlayer(socket.id);
        //     socket.leave(socket.roomKey);
        //     // update the new user list to everyone
        //     emitPlayers(io, socket);
        //     if (room.size === 0) {
        //         console.log(`Removing room ${socket.roomKey}`);
        //         rooms.removeRoom(room);
        //     }
        //     console.log(`The socket ${socket.name} has disconnected from room ${socket.roomKey}.`);
        // });
        // socket.on('start', () => {
        //     // begin the game.
        //     io.to(socket.roomKey).emit('start');
        //     console.log(`Starting room ${socket.roomKey}!`);
        //     room.isPlaying = true;
        // });
        
        // socket.on('roll', () => {
        //     console.log(`Rolling for ${socket.name}`);
        //     socket.result = [];
        //     var publicResult = [];
        //     for (var i = 0; i < socket.dice; i++) {
        //         socket.result[i] = this.mathHelper.getRandomNumber(1, 6);
        //         publicResult[i] = 0;
        //     }
        //     socket.to(socket.roomKey).emit('roll', {
        //         result: socket.result,
        //         id: socket.id
        //     });
        //     console.log(`Roll for ${socket.name} is: ${JSON.stringify(socket.result)}`);
        //     socket.to(socket.roomKey).broadcast.emit('roll', {
        //         result: publicResult,
        //         id: socket.id
        //     });
        //     if (++room.totalRolls >= room.size) {
        //         console.log(`Begin bets for room ${socket.roomKey} in 2 seconds!`);
        //         setTimeout(() => {
        //             io.to(socket.roomKey).emit('begin-bets');
        //             room.turns = room.players.keys();
        //             nextTurn(0, 0);
        //         }, 2000);
        //     }
        // });

        // socket.on('bet', (data) => {
        //     if (!room.bet) {
        //         console.log(`No bet provided, but 'bet' packet recieved by ${socket.name}.`);
        //         return;
        //     }
        //     var valid = true;
        //     var die = data.die, count = data.count;
        //     var currentDie = room.bet.die, currentCount = room.bet.count;
        //     if (room.turn.value !== socket.id) {
        //         console.log(`Recieved 'bet' packet not in turn by ${socket.name}.`);
        //         valid = false;
        //     }
        //     // check for invalid data
        //     if (valid && !count || !die || count < 1 || die < 1 || die > 6) {
        //         console.log(`Recieved invalid 'bet' packet by ${socket.name}.`);
        //         valid = false;
        //     }
        //     // check for invalid values
        //     if (valid) {
        //         if (count < currentCount) {
        //             valid = false;
        //         } else if (count == currentCount) {
        //             valid = die > currentDie;
        //         }
        //     }
        //     if (!valid) {
        //         console.log(`Recieved 'bet' values that are not well by ${socket.name}.`);
        //         console.log(`current count/die: ${currentCount}/${currentDie}.`);
        //         console.log(`recieved count/die: ${count}/${die}.`);
        //         socket.to(socket.roomKey).emit('turn', {
        //             id: room.turn.value,
        //             bet: room.bet
        //         });
        //     } else {
        //         nextTurn(count, die);
        //     }
        // });        
        
        // function nextTurn(count, die) {
        //     console.log(`Setting bet to count/die: ${count}/${die}.`);
        //     room.bet = { count, die };
        //     room.lastTurn = room.turn;
        //     console.log(`Last turn belongs to ${room.lastTurn && room.getPlayer(room.lastTurn.value).name}.`);
        //     room.turn = room.turns.next();
        //     if (room.turn.done) {
        //         console.log(`Looping on turns finished. starting again.`);
        //         room.turns = room.players.keys();
        //         room.turn = room.turns.next();
        //     }
        //     console.log(`New turn belongs to ${room.getPlayer(room.turn.value).name}.`);
        //     io.to(socket.roomKey).emit('turn', {
        //         id: room.turn.value, 
        //         bet: room.bet
        //     });
        // }
        
        // socket.on('lying', function() {
        //     if (!room.lastTurn || room.turn.value !== socket.id) {
        //         console.log(`A 'lying' packet recieved by ${socket.name}, but not in turn OR in first turn.`);
        //         return;
        //     }
        //     var die = room.bet.die, count = room.bet.count;
        //     var results = getResults();
        //     console.log(`Game results: ${JSON.stringify(results)}.`);        
        //     if (results[die] >= count) {
        //         // socket loses a die
        //         console.log(`The guy was not lying! there are ${results[die]} times die ${die}.`);        
        //         loseDie(socket);
        //     } else {
        //         console.log(`The guy was indeed lying! there are ${results[die]} times die ${die}.`);        
        //         var player = room.getPlayer(room.lastTurn.value);
        //         loseDie(player);
        //     }
        // });
        
        // function getResults() {
        //     var results = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
        //     room.players.forEach((player) => {
        //         for (var i in player.result) {
        //             var num = player.result[i];
        //             results[num]++;
        //         }
        //     });
        //     return results;
        // }
        
        // function loseDie(loserSocket) {
        //     emitResults();
        //     socket.on('next', next); 
        //     function next() {
        //         loserSocket.dice--;
        //         console.log(`Player ${loserSocket.name} lost a die. Now he has ${loserSocket.dice}.`);        
        //         io.to(socket.roomKey).emit('lose-die', {
        //             id: loserSocket.id
        //         });
        //         io.to(socket.roomKey).emit('start');
        //         socket.room.totalRolls = 0;
        //         socket.removeListener('next', next); 
        //     } 
        // }
        // function emitResults() {
        //     room.players.forEach((player) => {
        //         console.log(`Result for ${player.name} was: ${JSON.stringify(player.result)}.`);        
        //         player.to(player.roomKey).broadcast.emit('roll', {
        //             result: player.result,
        //             id: player.id
        //         });
        //     });
        //     io.to(socket.roomKey).emit('results', {
        //         id: socket.id
        //     });
        // }
        // function emitPlayers (io, socket) {
        //     io.to(socket.roomKey).emit('users', {
        //         users: getPlayers(socket.room.players),
        //         id: socket.id
        //     });
        // }

        // function getPlayers(players) {
        //     var result = {};
        //     players.forEach((user, userId) => {
        //         result[userId] = user.name;
        //     });
        //     console.log(`Sending the list of players:  ${JSON.stringify(result)}.`);        
        //     return result;
        // }
    }
}

module.exports = GameRouter;