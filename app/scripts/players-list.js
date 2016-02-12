(function(namespace) {
'use strict';
namespace.PlayersList = function () {
    var vm = this;
    // elements
    var _$list;
    // properties
    var _players;
    
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
        players[myId] = 'Me';
        // remove gone players
        for (var id in _players) {
            if (players[id] === undefined) {
                _players[id].element.remove();
                delete _players[id];
            }
        }
        // add new players
        for (var id in players) {
            if (_players[id] === undefined) {
                var playerItem = new namespace.PlayerItem();
                playerItem.createElement(players[id]);
                var element = playerItem.getElement();
                _players[id] = {
                    object: playerItem,
                    element: element
                };
                _$list.appendChild(element);
            }
        }
    };
};
})(window);