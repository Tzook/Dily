(function(namespace) {
    'use strict';

    var roomSelector = new namespace.RoomSelector(requestToJoinRoom);
    var room = roomSelector.getRoomByUrl();
    if (room > 0) {
        var name = prompt("Please enter your name", "n00b");
        var zeroes = "00";
        while (!roomSelector.joinRoomIfNameValid("", room, name)) {
            zeroes += "00";
            name = prompt("Please enter your name", "n" + zeroes + "b");
        }
    } else {
        roomSelector.showSelectRoom();
    }
    
    function requestToJoinRoom(name, room) {
        roomSelector.hideSelectRoom();
        var socket = window.io(window.location.host, {query: "room=" + room + "&name=" + name});
        var game = new namespace.Game();
        game.init(socket);
    };
})(window);