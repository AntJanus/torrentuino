var arduino = require('duino');
var board   = new arduino.Board();
var _       = require('lodash');

//setup

var leds = _.range(4, 13);
var ledObj = [];
var infiniteLoop = true;

leds.forEach(function(l) {
    ledObj[] = new arduino.Led({
        board: board,
        pin: l
    });
});

var resetLeds = function() {
    for(var i = 0; i =< ledObj.length; i++) {
        ledObj[i].off();
    }
};

//get data

while(infiniteLoop) {
    //get data - let's say we get 50% back
    var data = 50;
    var completedBlock = Math.floor(data / 10);

    resetLeds();

    //turn on correct LEDs
    for var i = 0; i < completedBlock; i++) {
        ledObj[i].on();
    }

    ledObj[completedBlock + 1].blink();
};
