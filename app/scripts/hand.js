(function(namespace) {
'use strict';
namespace.Hand = function () {
    var vm = this;
    // hand elements
    var _$hand;
    // hand properties
    var _dice = [];
    
    // =============================
    //      public functions 
    // =============================
    vm.createHand = function (amount) {
        _$hand = document.createElement('hand');
        var y = window.innerHeight - 130;
        for (var i = 0; i < amount; i++) {
            var die = new namespace.Die();
            var x = i * 100 + 50;
            die.createDie(6, x, y);
            _dice.push(die);
            _$hand.appendChild(die.getElement());
        }
        return vm;
    };
    
    vm.roll = function(power) {
        for (var i = 0; i < _dice.length; i++) {
            var die = _dice[i];
            die.roll(power, 0, 0);
        }
    };
    
    vm.getElement = function () {
        return _$hand;
    };
};
})(window);