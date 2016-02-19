(function(namespace) {
'use strict';
namespace.Game = function () {
    var vm = this;
    
    var _socket, _players, _actions, _bet;
    
    vm.init = function(socket) {
        _socket = socket;
        
        _players = new namespace.PlayersList();
        _actions = new namespace.GameActions();
        _bet = new namespace.Bet();
        listenToServer();
    };
    function listenToServer() {
        // HANDSHAKE APPROVED
        _socket.on('connect', function() {
            _socket.removeListener('connect');
            _players.init();
            _bet.init();
            _actions.init(_socket);
            start();
        });
        
        _socket.on('error', function(data) {
            alert(data);
        });
        
        _socket.on('room', function(data) {
            _socket.removeListener('room');
            window.location.hash = data.room;
        });
        
        _socket.on('users', function(data) {
            _players.setList(data.users, "/#" + _socket.id);
        });
        
        _socket.on('roll', function(data) {
            _players.roll(data.id, data.result);
        });
        
        function start() {
            _socket.on('start', function(data) {
                _socket.removeListener('start');
                _actions.start();
                waitForRolls();
            });
        }
        
        function waitForRolls() {
            
            _socket.on('begin-bets', function() {
                _socket.removeListener('begin-bets');
                _actions.beginBets();
                _bet.show();
                waitForTurns();
            });
        }
        function waitForTurns() {
            _socket.on('turn', function(data) {
                _players.setTurn(data.id);
                _bet.setBet(data.bet);
                if ("/#" + _socket.id == data.id) {
                    _actions.turn(data.bet);
                }
            });
            
            _socket.on('results', function(data) {
                _socket.removeListener('turn');
                _socket.removeListener('results');
                start();
                _actions.playAgain("/#" + _socket.id == data.id);
                waitForDieToBeLost();
            });
        }
        function waitForDieToBeLost() {
            _socket.on('lose-die', function(data) {
                _players.removeDie(data.id);
            });
        };
    }
};
})(window);