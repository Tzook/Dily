'use strict';

// External dependencies
var express 		= require('express'),
    http			= require('http'),
    socketio		= require('socket.io'),
	compression		= require('compression');
__dirname = __dirname.slice(0, -7); // slice the /server folder prefix

// Express dependencies
var app = express();
app.use(compression({level: 1}));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
	res.sendFile('app/index.html', { root: __dirname });
});

var server = http.createServer(app).listen(app.get('port'));
console.log("\t+*+*+ New server on localhost:" + app.get('port') + " +*+*+");

var io = socketio(server);
// The rooms object that handles the rooms of the users.
// It doesn't function as needed since the packets that are emitted are not distributed only to the room - they go to everyone.
// Need to integrate and use the built-in feature that Socket.io has regarding rooms - it works good. 
var rooms = new Map();

// verify room value middleware
io.use(function(socket, next) {
    var room = socket.handshake.query.room;
    // must be 1-999999, otherwise will set it to 0 and a new room will be created
    var roomNumber = getRoomValue(room); 
    if (roomNumber === -1) {
        next(new Error("Invalid room number provided: " + room));
    } else if (rooms.has(roomNumber) && rooms.get(roomNumber).playing) {
        next(new Error(`The room ${roomNumber} is already in playing!`));
    } else {
        socket.roomNumber = roomNumber;
        next();
    }
});

// verify name value middleware
io.use(function(socket, next) {
    var name = socket.handshake.query.name;
    if (typeof name !== 'string' || name.length < 1 || name.length > 15 || /[^\w ]/.test(name)) {
        next(new Error(`Invalid name provided. Must enter a name with the following: a-z, A-Z, 0-9, _, space. Instead, got ${name}`));
    } else {
        socket.name = name;
        next();
    }
});

// set a valid room number if it's 0
io.use(function(socket, next) {
    if (socket.roomNumber === 0) {
        var random;
        while (rooms.has(random = getRandomNumber(1, 99999))) {
            ; // continue until you find an empty room
        }
        socket.roomNumber = random;
    }
    next();
});

// verify room existance middleware
io.use(function(socket, next) {
    if (!rooms.has(socket.roomNumber)) {
        rooms.set(socket.roomNumber, {
            playing: false,
            users: new Map(),
            totalRolls: 0
        });
    }
    next();
});

// adding user to room middleware
io.use(function(socket, next) {
    var room = rooms.get(socket.roomNumber);
    room.users.set(socket.id, socket);
    socket.dice = 5;
    socket.room = room;
    next();
});

// begin
io.on('connection', function(socket) {
    var room = socket.room;
    console.log(`Connected the socket ${socket.name}!`);
    // tell the user the room number so he can ensure his url is correct
    socket.emit('room', { room: socket.roomNumber });
    emitUsers(socket);
    
    socket.on('disconnect', function() {
        room.users.delete(socket.id);
        // update the new user list to everyone
        emitUsers(socket);
        if (room.users.size === 0) {
            console.log(`Removing room ${socket.roomNumber}`);
            rooms.delete(room);
        }
        console.log(`The socket ${socket.name} has disconnected.`);
    });
    socket.on('start', function() {
        // begin the game.
        io.emit('start');
        console.log(`Starting room ${socket.roomNumber}!`);
        room.playing = true;
    });
    socket.on('roll', function() {
        console.log(`Rolling for ${socket.name}`);
        socket.result = [];
        var publicResult = [];
        for (var i = 0; i < socket.dice; i++) {
            socket.result[i] = getRandomNumber(1, 6);
            publicResult[i] = 0;
        }
        socket.emit('roll', {
            result: socket.result,
            id: socket.id
        });
        console.log(`Roll for ${socket.name} is: ${JSON.stringify(socket.result)}`);
        socket.broadcast.emit('roll', {
            result: publicResult,
            id: socket.id
        });
        if (++room.totalRolls >= room.users.size) {
            console.log(`Begin bets for room ${socket.roomNumber} in 2 seconds!`);
            setTimeout(function() {
                io.emit('begin-bets');
                room.turns = room.users.keys();
                nextTurn(0, 0);
            }, 2000);
        }
    });
    
    socket.on('bet', function(data) {
        if (!room.bet) {
            console.log(`No bet provided, but 'bet' packet recieved by ${socket.name}.`);
            return;
        }
        var valid = true;
        var die = data.die, count = data.count;
        var currentDie = room.bet.die, currentCount = room.bet.count;
        if (room.turn.value !== socket.id) {
            console.log(`Recieved 'bet' packet not in turn by ${socket.name}.`);
            valid = false;
        }
        // check for invalid data
        if (valid && !count || !die || count < 1 || die < 1 || die > 6) {
            console.log(`Recieved invalid 'bet' packet by ${socket.name}.`);
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
            console.log(`Recieved 'bet' values that are not well by ${socket.name}.`);
            console.log(`current count/die: ${currentCount}/${currentDie}.`);
            console.log(`recieved count/die: ${count}/${die}.`);
            socket.emit('turn', {
                id: room.turn.value,
                bet: room.bet
            });
        } else {
            nextTurn(count, die);
        }
    });
    
    function nextTurn(count, die) {
        console.log(`Setting bet to count/die: ${count}/${die}.`);
        room.bet = { count, die };
        room.lastTurn = room.turn;
        console.log(`Last turn belongs to ${room.lastTurn && room.users.get(room.lastTurn.value).name}.`);
        room.turn = room.turns.next();
        if (room.turn.done) {
            console.log(`Looping on turns finished. starting again.`);
            room.turns = room.users.keys();
            room.turn = room.turns.next();
        }
        console.log(`New turn belongs to ${room.users.get(room.turn.value).name}.`);
        io.emit('turn', {
            id: room.turn.value, 
            bet: room.bet
        });
    }
    
    socket.on('lying', function() {
        if (!room.lastTurn || room.turn.value !== socket.id) {
            console.log(`A 'lying' packet recieved by ${socket.name}, but not in turn OR in first turn.`);
            return;
        }
        var die = room.bet.die, count = room.bet.count;
        var results = getResults();
        console.log(`Game results: ${JSON.stringify(results)}.`);        
        if (results[die] >= count) {
            // socket loses a die
            console.log(`The guy was not lying! there are ${results[die]} times die ${die}.`);        
            loseDie(socket);
        } else {
            console.log(`The guy was indeed lying! there are ${results[die]} times die ${die}.`);        
            var user = room.users.get(room.lastTurn.value);
            loseDie(user);
        }
    });
    
    function getResults() {
        var results = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
        room.users.forEach(function(user) {
            for (var i in user.result) {
                var num = user.result[i];
                results[num]++;
            }
        });
        return results;
    }
    
    function loseDie(loserSocket) {
        emitResults();
        socket.on('next', next); 
        function next() {
            loserSocket.dice--;
            console.log(`User ${loserSocket.name} lost a die. Now he has ${loserSocket.dice}.`);        
            io.emit('lose-die', {
                id: loserSocket.id
            });
            io.emit('start');
            socket.room.totalRolls = 0;
            socket.removeListener('next', next); 
        } 
    }
    function emitResults() {
        room.users.forEach(function(user) {
            console.log(`Result for ${user.name} was: ${JSON.stringify(user.result)}.`);        
            user.broadcast.emit('roll', {
                result: user.result,
                id: user.id
            });
        });
        io.emit('results', {
            id: socket.id
        });
    }
});


function emitUsers(socket) {
    io.emit('users', {
        users: getUsers(socket.room.users),
        id: socket.id
    });
}
    
function getRoomValue(str) {
    var num = +str;
    if (Number.isInteger(num) && num >= 0 && num < 100000) {
        return num;
    }
    return -1;
}

function getUsers(users) {
    var result = {};
    users.forEach(function(user, userId) {
        result[userId] = user.name;
    });
    console.log(`Sending the list of users:  ${JSON.stringify(result)}.`);        
    return result;
}


function getRandomNumber(start, end) {
    return (Math.random() * (end - start + 1) + start) | 0;
}