(function(namespace) {
'use strict';
namespace.PlayerItem = function () {
    var vm = this;
    // elements
    var _$player, _$name, _$hand;
    
    // =============================
    //      public functions 
    // =============================
    vm.createElement = function(name) {
        _$player = document.createElement('li');
        _$player.className = "player";
        _$player.innerHTML = getPlayerHtml(name);
        _$name = _$player.getElementsByClassName('name')[0];        
        _$hand = new namespace.Hand();
        _$hand.createHand(5, 0.5, true);
        _$player.appendChild(_$hand.getElement());
    };
    
    vm.getElement = function () {
        return _$player;
    };
    
    vm.roll = function(result) {
        _$hand.roll(result);
    };
    
    vm.remove = function() {
        _$player.remove();
    };
    
    vm.setTurn = function(turn) {
        _$name.setAttribute('turn', turn);
    };
    
    vm.removeDie = function() {
        var diceLeft = _$hand.removeDie();
        if (diceLeft === 0) {
            alert("A player lost!!");
        }
    };
    
    function getPlayerHtml(name) {
        return '' + 
            '<span class="name">' + name + '</span>' +
        '';
    }
};
})(window);