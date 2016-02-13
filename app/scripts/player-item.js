(function(namespace) {
'use strict';
namespace.PlayerItem = function () {
    var vm = this;
    // elements
    var _$player, _$hand;
    
    // =============================
    //      public functions 
    // =============================
    vm.createElement = function(name) {
        _$player = document.createElement('li');
        _$player.className = "player";
        _$player.innerHTML = getPlayerHtml(name);        
        _$hand = new namespace.Hand();
        _$hand.createHand(5, 0.5, true);
        _$player.appendChild(_$hand.getElement());
    };
    
    vm.getElement = function () {
        return _$player;
    };
    
    function getPlayerHtml(name) {
        return `
        <span class="name">${name}</span>
        `;
    }
};
})(window);