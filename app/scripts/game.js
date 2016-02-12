(function(namespace) {
'use strict';
namespace.Game = function () {
    var vm = this;
    
    var _socket, _players;
    
    vm.init = function(socket) {
        _socket = socket;
        
        _players = new namespace.PlayersList();
        // HANDSHAKE APPROVED
        socket.on('connect', function() {
            socket.removeListener('connect');
            _players.init();
            console.log('connected!!');
        });
        
        socket.on('room', function(data) {
            socket.removeListener('room');
            window.location.hash = data.room;
        });
        
        socket.on('users', function(data) {
            console.log(data);
            _players.setList(data.users, "/#" + socket.id);
        });
    };
};
})(window);