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
    vm.createHand = function (amount, scale) {
        _$hand = document.createElement('hand');
        for (var i = 0; i < amount; i++) {
            var die = new namespace.Die();
            var x = (i * 100) * scale;
            die.createDie(6, x, 0, scale);
            _dice.push(die);
            _$hand.appendChild(die.getElement());
        }
        return vm;
    };
    
    vm.roll = function(result) {
        for (var i = 0; i < _dice.length; i++) {
            var die = _dice[i];
            die.toggleDie(result[i]);
            die.roll(5, 0, 0);
        }
    };
    
    vm.getElement = function () {
        return _$hand;
    };
    
    vm.removeDie = function () {
        if (_dice.length > 0) {
            var die = _dice.pop();
            die.getElement().remove();
        }
        return _dice.length;
    };
    
    // diceNumbers is an object: 
    // keys are the die number (0-4), and the value is the die result (1-6)
    vm.toggleDice = function (diceNumbers) {
        for (var dieNumber in diceNumbers) {
            var dieResult = diceNumbers[dieNumber];
            _dice[dieNumber].toggleDie(dieResult);
        }
    };
    
    vm.hideDice = function() {
        var die = {};
        for (var i in [0, 1, 2, 3, 4]) {
            die[i] = 0;
        }
        vm.toggleDice(die);
    };
 };
})(window);