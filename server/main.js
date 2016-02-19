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
var rooms = new Map();

// verify room value middleware
io.use(function(socket, next) {
    var room = socket.handshake.query.room;
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

io.on('connection', function(socket) {
    var room = socket.room;
    console.log('connected!');
    socket.emit('room', { room: socket.roomNumber });
    
    emitUsers(socket);
    
    socket.on('disconnect', function() {
        room.users.delete(socket.id);
        emitUsers(socket);
        console.log(`The socket ${socket.name} has disconnected.`);
    });
    socket.on('start', function() {
        io.emit('start');
        console.log('starting!');
        room.playing = true;
    });
    socket.on('roll', function() {
        console.log('rolling');
        socket.result = {};
        var publicResult = {};
        for (var i = 0; i < socket.dice; i++) {
            socket.result[i] = getRandomNumber(1, 6);
            publicResult[i] = 0;
        }
        socket.emit('roll', {
            result: socket.result,
            id: socket.id
        });
        socket.broadcast.emit('roll', {
            result: publicResult,
            id: socket.id
        });
        if (++room.totalRolls >= room.users.size) {
            console.log('begin bets!');
            setTimeout(function() {
                io.emit('begin-bets');
                room.turns = room.users.keys();
                nextTurn(0, 0);
            }, 2000);
        }
    });
    
    socket.on('bet', function(data) {
        if (!room.bet) {
            return;
        }
        var valid = true;
        var die = data.die, count = data.count;
        var currentDie = room.bet.die, currentCount = room.bet.count;
        if (room.turn.value !== socket.id) {
            valid = false;
        }
        // check for invalid data
        if (valid && !count || !die || count < 1 || die < 1 || die > 6) {
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
            socket.emit('turn', {
                id: room.turn.value,
                bet: room.bet
            });
        } else {
            nextTurn(count, die);
        }
    });
    
    function nextTurn(count, die) {
        room.bet = { count, die };
        room.lastTurn = room.turn;
        room.turn = room.turns.next();
        if (room.turn.done) {
            room.turns = room.users.keys();
            room.turn = room.turns.next();
        }
        io.emit('turn', {
            id: room.turn.value, 
            bet: room.bet
        });
    }
    
    socket.on('lying', function() {
        if (!room.lastTurn || room.turn.value !== socket.id) {
            return;
        }
        var die = room.bet.die, count = room.bet.count;
        var results = getResults();
        if (results[die] >= count) {
            // socket loses a die
            loseDie(socket);
        } else {
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
    return result;
}


function getRandomNumber(start, end) {
    return (Math.random() * (end - start + 1) + start) | 0;
}