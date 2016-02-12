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
    } else if (socket.rooms[roomNumber] !== undefined && socket.rooms[roomNumber].playing) {
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
        while (socket.rooms[random = getRandomNumber(1, 99999)] !== undefined) {
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
            users: new Map()
        });
    }
    next();
});

// adding user to room middleware
io.use(function(socket, next) {
    var room = rooms.get(socket.roomNumber);
    room.users.set(socket.id, socket);
    socket.room = room;
    next();
});

io.on('connection', function(socket) {
    console.log('connected!');
    socket.emit('room', { room: socket.roomNumber });
    
    emitUsers(socket);
    
    socket.on('disconnect', function() {
        socket.room.users.delete(socket.id);
        emitUsers(socket);
        console.log(`The socket ${socket.name} has disconnected.`);
    });
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