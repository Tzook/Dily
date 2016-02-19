(function(namespace) {
'use strict';
namespace.Bet = function () {
    var vm = this;
    
    var _die;
    // elements    
    var _$wrapper, _$count;
    
    // =============================
    //      public functions 
    // =============================
    vm.init = function() {
        _$wrapper = document.createElement('div');
        _$wrapper.className = 'bet';
        _$wrapper.hidden = true;
        _$wrapper.innerHTML = getElement();
        _$count = _$wrapper.getElementsByTagName('h1')[0];
        _die = new namespace.Die();
        _die.createDie(6, 0, 0, 1);
        _$wrapper.appendChild(_die.getElement());
        document.body.appendChild(_$wrapper);
    };
    
    vm.show = function() {
        _$wrapper.hidden = false;
    };
    
    vm.setBet = function(bet) {
        _die.setResult(bet.die);
        _$count.innerText = bet.count; 
    };

    function getElement() {
        return '' +
            '<h2>Current bet</h2>' +
            '<h1>0</h1>' +
        '';
    }
};
})(window);