var arduino = require('duino');
var board   = new arduino.Board({
        debug: true
    });
var _       = require('lodash');
var torrentApi = require('./torrentapi');
//setup

var leds = _.range(4, 13 + 1);
var ledObj = [];
var internalLed = [];
var infiniteLoop = true;


leds.forEach(function(l) {
    ledObj.push(new arduino.Led({
        board: board,
        pin: l
    }));

    internalLed.push({
        state: 'off',
        pin: l
    });
});

var resetLeds = function(leds) {
    for(var i = 0; i < leds.length; i++) {
        leds[i].state = 'off';
    }

    return leds;
};

var processLeds = function(leds, skip) {
    internalLed.forEach(function(val, idx) {
        if(leds[idx].state === val.state || _.contains(skip, idx)) {

        } else {
            if(leds[idx].state == 'on') {
                ledObj[idx].on();
            }

            if(leds[idx].state == 'off') {
                ledObj[idx].off();
            }
        }
    });
};

var customBlink = function(idx) {
    if(internalLed[idx].state != 'blink') {
        internalLed[idx].state = 'blink';
    }

    if(!internalLed[idx].cur) {
        internalLed[idx].cur = 'off';
    }

    if(internalLed[idx].cur == 'off') {
        internalLed[idx].cur = 'on';
        ledObj[idx].on();
    } else {
        internalLed[idx].cur = 'off';
        ledObj[idx].off();
    }
};
//get data
board.on('ready', function() {
    var count = 0;

    setInterval(function() {
        torrentAPI.listTorrents('downloading', function(response) {
            var internalClone = _.cloneDeep(internalLed);
            count++;
            var skip = [];
            var data = 100;
            var completedBlock = Math.floor(data / 10);

            internalClone = resetLeds(internalClone);

            //turn on correct LEDs
            for(var i = 0; i < completedBlock; i++) {
                internalClone[i].state = 'on';
            }

            customBlink(completedBlock);
            skip.push(completedBlock);
            processLeds(internalClone, skip);
        });
    }, 500);
});
