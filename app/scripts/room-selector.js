(function(namespace) {
'use strict';
namespace.RoomSelector = function (requestToJoinRoom) {
    var vm = this;
    // private elements
    var _$wrapper, _$name, _$room, _$join, _$create;
    
    function bindEvents() {
        _$join.onclick = function() {
            var err = '';
            var room = getRoomValue(_$room.value);
            if (room === -1) {
                err += "Must enter a room number in order to join a room. ";
            }
            joinRoomIfNameValid(err, room, _$name.value);
        };
        _$create.onclick = function() {
            joinRoomIfNameValid('', 0, _$name.value);
        };
        
    }
    function joinRoomIfNameValid(err, room, name) {
        if (!isValid(name)) {
            err += "Name is invalid. Must provide a name with 1-15 characters. Valid characters are: a-z, A-Z, 0-9, _, space.";
        }
        if (err) {
            alert(err);
        } else {
            requestToJoinRoom(name, room);
            return true;
        }
    }
    
    function isValid(name) {
        return !(typeof name !== 'string' || name.length < 1 || name.length > 15 || /[^\w ]/.test(name));
    }
        
    // =============================
    //      private getters
    // =============================
    function getSelectHtml() {
        return '' +
        '<h1>~Dilly~</h1>' +
        '<input class="name" type="text" placeholder="Name">' +
        '<input class="room" type="number" placeholder="Room" max="999999" min="0" size="5">' +
        '<button class="join">Join room</button>' +
        '<p>OR</p>' +
        '<button class="create">Create room</button>' +
        '';
    }   
    
    function getRoomValue(str) {
        var num = +str;
        if (Number.isInteger(num) && num > 0 && num < 100000) {
            return num;
        }
        return -1;
    }
    
    // =============================
    //      public functions 
    // =============================        
    vm.showSelectRoom = function () {
        if (_$wrapper) {
            return;
        }
        _$wrapper = document.createElement('main');
        _$wrapper.innerHTML = getSelectHtml();
        _$name = _$wrapper.getElementsByClassName('name')[0];
        _$room = _$wrapper.getElementsByClassName('room')[0];
        _$join = _$wrapper.getElementsByClassName('join')[0];
        _$create = _$wrapper.getElementsByClassName('create')[0];
        
        bindEvents();
        document.body.appendChild(_$wrapper);
    };
    
    vm.hideSelectRoom = function() {
        if (_$wrapper) {
            _$wrapper.remove();
            _$wrapper = null;
        }
    };
    
    vm.getRoomByUrl = function () {
        var hash = window.location.hash;
        if (hash) {
            return getRoomValue(hash.substring(1));
        }
        return -1;
    };
    
    vm.joinRoomIfNameValid = joinRoomIfNameValid;
};
})(window);