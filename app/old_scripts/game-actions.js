(function(namespace) {
'use strict';
namespace.GameActions = function () {
    var vm = this;
    // private variables
    var _socket, _bet;
    // elements    
    var _$wrapper, _$start, _$leave, _$roll, _$bet, _$die, _$count, _$lying, _$next;
    
    // =============================
    //      public functions 
    // =============================
    vm.init = function(socket) {
        _socket = socket;
        _$wrapper = document.createElement('div');
        _$wrapper.className = 'actions';
        _$wrapper.innerHTML = getElement();
        
        _$start = _$wrapper.getElementsByClassName('start')[0];
        _$leave = _$wrapper.getElementsByClassName('leave')[0];
        _$roll = _$wrapper.getElementsByClassName('roll')[0];
        _$die = _$wrapper.getElementsByClassName('die')[0];
        _$count = _$wrapper.getElementsByClassName('count')[0];
        _$bet = _$wrapper.getElementsByClassName('bet')[0];
        _$lying = _$wrapper.getElementsByClassName('lying')[0];
        _$next = _$wrapper.getElementsByClassName('next')[0];
        
        addEvents();
        document.body.appendChild(_$wrapper);
    };
    
    vm.start = function() {
        hide([_$start, _$leave, _$next]);
        show([_$roll]);
        enable([_$roll]);
    };
    
    vm.beginBets = function() {
        hide([_$roll]);
        show([_$die, _$count, _$bet, _$lying]);
    };
    
    vm.turn = function(bet) {
        _bet = bet;
        enable([_$bet]);
        if (bet.die > 0) {
            enable([_$lying]);            
        }
    };
    
    vm.playAgain = function(showNext) {
        hide([_$die, _$count, _$bet, _$lying]);
        if (showNext) {
            show([_$next]);
            enable([_$next]);
        }
    };
    
    function addEvents() {
        _$start.addEventListener('click', function() {
            _socket.emit('start');
        });
        _$leave.addEventListener('click', function() {
            window.location.href = '';
        });
        _$roll.addEventListener('click', function() {
            disable([_$roll]);
            _socket.emit('roll');
        });
        _$bet.addEventListener('click', function() {
            var die = +_$die.value;
            var count = +_$count.value;
            if (die < 1 || die > 6) {
                alert("The die has to be between 1 to 6");
            } else if (count <= 0) {
                alert("The amount has to be at least 1");
            } else if (count < _bet.count) {
                alert("The amount has to be at least " + _bet.count);
            } else if (count == _bet.count && die <= _bet.die) {
                alert("If the amount is similar, the provided die has to be higher");
            } else {
                _$die.value = '';
                _$count.value = '';
                disable([_$bet, _$lying]);
                _socket.emit('bet', { count: count, die: die });
            }
        });
        _$lying.addEventListener('click', function() {
            disable([_$bet, _$lying]);
            _socket.emit('lying');
        });
        
        _$next.addEventListener('click', function() {
            disable([_$next]);
            _socket.emit('next');
        });
    }
    
    function hide($elements) {
        toggleButton($elements, 'hidden', true);
    }
    function show($elements) {
        toggleButton($elements, 'hidden', false);
    }
    function disable($elements) {
        toggleButton($elements, 'disabled', true);
    }
    function enable($elements) {
        toggleButton($elements, 'disabled', false);
    }
    function toggleButton($elements, type, on) {
        for (var i in $elements) {
            $elements[i][type] = on;
        }
    }

    function getElement() {
        return '' + 
        '<button class="start">start</button>' +
        '<button class="leave">exit</button>' +
        '<button class="roll" hidden>roll</button>' +
        '<div class="bet-values">' +
            '<input class="count" type="number" min="1" max="99" hidden>' +
            '<input class="die" type="number" min="1" max="6" hidden>' +
        '</div>' +
        '<button class="bet" hidden disabled>bet</button>' +
        '<button class="lying" hidden disabled>lying!</button>' +
        '<button class="next" hidden>Continue</button>' +
        '';
    }
};
})(window);