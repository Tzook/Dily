(function(namespace) {
'use strict';
namespace.PlayersList = function () {
    var vm = this;
    // elements
    var _$list;
    // properties
    var _players, _turn;
    
    // =============================
    //      public functions 
    // =============================
    vm.init = function() {
        _players = {};
        _$list = document.createElement('ul');
        _$list.className = "players";
        document.body.appendChild(_$list);
    };
    
    vm.setList = function (players, myId) {
        players[myId] += ' (me)';
        // remove gone players
        for (var id in _players) {
            if (players[id] === undefined) {
                _players[id].remove();
                delete _players[id];
            }
        }
        // add new players
        for (var id in players) {
            if (_players[id] === undefined) {
                var playerItem = new namespace.PlayerItem();
                playerItem.createElement(players[id]);
                var element = playerItem.getElement();
                _players[id] = playerItem;
                _$list.appendChild(element);
            }
        }
    };
    
    vm.roll = function(id, result) {
        _players[id].roll(result);
    };
    
    vm.setTurn = function(id) {
        if (_turn && id != _turn) {
            _players[_turn].setTurn(false);
        }
        _players[id].setTurn(true);
        _turn = id;
    };
    
    vm.removeDie = function(id) {
        _players[id].removeDie();
    };
};
})(window);