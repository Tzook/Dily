(function(namespace) {
'use strict';
namespace.PlayerItem = function () {
    var vm = this;
    // elements
    var _$player;
    // properties
    var _player;
    
    // =============================
    //      public functions 
    // =============================
    vm.createElement = function(name) {
        _$player = document.createElement('li');
        _$player.className = "player";
        _$player.innerHTML = getPlayerHtml(name);        
    };
    
    vm.getElement = function () {
        return _$player;
    };
    
    function getPlayerHtml(name) {
        return '<span class="name">' + name + '</span>';
    }
};
})(window);