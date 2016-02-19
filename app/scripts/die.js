(function(namespace) {
'use strict';
namespace.Die = function (locationService) {
    var vm = this;
    // die elements
    var _$wrapper, _$scaler, _$tilter, _$flipper, _$result;
    // die current properties
    var _x = 50, _y = 100, _transx = 0, _transy = 0, _face = 0;
    // die constants
    var _MAX_FACE;
  
    // =============================  
    //      private calculators
    // =============================
    // A random number for each die to roll - so it will look more natural
    function calculateRollTime(power) {
        var time = power + 2 - Math.random() * 4;
        _$flipper.style['animation-duration'] = time + 's';
        _$wrapper.style['animation-duration'] = time + 's';
    }
    
    // calculate the 'rotation' of the die, so they won't all look like they stand the same
    function calculateTilt() {
        var tiltZ = getRandomNumber(0, 360);
        var tiltX = getRandomNumber(20, 35);
        _$tilter.style.transform = 'rotateX(' + tiltX + 'deg) rotateZ(' + tiltZ + 'deg)'; 
    }
    
    function calculateCurrentDiePosition() {
        _x += _transx;
        _y += _transy;
    }
    function calculateNextDiePosition(nextX, nextY) {
        _transx = nextX;
        _transy = nextY;
    }
    function calculatePositions(nextX, nextY) {
        calculateCurrentDiePosition();
        calculateNextDiePosition(nextX, nextY);
        updatePositions();
    }
    
    // =============================
    //      private updaters
    // =============================
    function updatePositions() {
        updateDieTransform();
        updateDiePosition();
    }
    
    function updateDieTransform() {
        _$wrapper.style.transform = 'translate(' + _transx + 'px, ' + _transy + 'px)';
    }
    
    function updateDiePosition() {
        _$wrapper.style.left = _x + 'px';
        _$wrapper.style.top = _y + 'px';
    }
    
    function setHideFaces(hideFaces) {
        _$wrapper.setAttribute('hide-faces', hideFaces);        
    }
    
    function setResult(result) {
        _$result.setAttribute('value', result);        
    }
    
    // =============================
    //      private togglers       
    // =============================
    function toggleFlipAndRoll(toggle) {
        _$flipper.setAttribute('roll', toggle);
        _$wrapper.setAttribute('move', toggle);
    }
    
    // =============================
    //      private getters
    // =============================
    function getDieHtml() {
        return '' +
        '<scaler>' +
            '<tilter>' +
                '<flipper>' +
                    '<result>' +
                        '<face class="six"><dot class="t-l"></dot><dot class="t-r"></dot><dot class="m-l"></dot><dot class="m-r"></dot><dot class="b-l"></dot><dot class="b-r"></dot></face>' +
                        '<face class="one"><dot class="m-m"></dot></face>' +
                        '<face class="three"><dot class="t-l"></dot><dot class="m-m"></dot><dot class="b-r"></dot></face>' +
                        '<face class="four"><dot class="t-l"></dot><dot class="t-r"></dot><dot class="b-l"></dot><dot class="b-r"></dot></face>' +
                        '<face class="two"><dot class="b-l"></dot><dot class="t-r"></dot></face>' +
                        '<face class="five"><dot class="t-l"></dot><dot class="t-r"></dot><dot class="m-m"></dot><dot class="b-l"></dot><dot class="b-r"></dot></face>' +
                    '</result>' +
                '</flipper>' +
            '</tilter>' +
        '</scaler>'
        + '';
    }   
    
    // =============================
    //      helper functions
    // =============================
    function getRandomNumber(start, end) {
        return (Math.random() * (end - start + 1) + start) | 0;
    }
    
    // =============================
    //      public functions 
    // =============================
    vm.createDie = function(maxFace, initialX, initialY, scale) {
        _MAX_FACE = maxFace;
        _$wrapper = document.createElement('die');
        _$wrapper.innerHTML = getDieHtml();
        setHideFaces(true);
        _$scaler = _$wrapper.getElementsByTagName('scaler')[0];
        _$tilter = _$wrapper.getElementsByTagName('tilter')[0];
        _$flipper = _$wrapper.getElementsByTagName('flipper')[0];
        _$result = _$wrapper.getElementsByTagName('result')[0];
        _$scaler.style.transform = 'scale(' + scale + ')';
        _x = initialX;
        _y = initialY;
        updatePositions();        
        return vm;
    };
    
    vm.roll = function(power, nextX, nextY) {
        toggleFlipAndRoll(false);
        // must be in a timeout for the animation to actually kick-in
        setTimeout(function() {
            toggleFlipAndRoll(true);
            calculatePositions(nextX, nextY);
            calculateRollTime(power);
            calculateTilt();
        }, 5);
        return vm;
    };
    
    // result for 0 to hide.
    vm.setResult = function (result) {
        if (result > 0) {
            setResult(result);
            setHideFaces(false);
        } else {
            setHideFaces(true);
        }
    };
    
    vm.getElement = function() {
        return _$wrapper;
    };
    
    vm.getResult = function () {
        return _face;
    };
};
})(window);