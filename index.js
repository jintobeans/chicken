'use strict';
//UID: 2b802e0d
// Import the interface to Tessel hardware
const tessel = require('tessel');
var path = require('path');
var av = require('tessel-av');
var mp3 = path.join(__dirname, 'chickendancesong.mp3');
var sound = new av.Player(mp3);
var rfidlib = require('rfid-pn532');
var totalMins = require('./app.js')

var rfid = rfidlib.use(tessel.port['A']);
// rfid.setPollPeriod(3000, (err) => { console.error(err) })

let playing = false;
let alarmTime = new Date();

Date.prototype.addMins = function (m) {
  this.setTime(this.getTime() + (m * 60 * 1000));
  return this;
};



rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');
  console.log('totalmins', totalMins)
  if (totalMins) {
    alarmTime = alarmTime.addMins(totalMins);
  } else {
    alarmTime = alarmTime.addMins(1);
  }
  console.log('alarmTime', alarmTime);

  rfid.on('data', function (card) {
    console.log('UID:', card.uid.toString('hex'))
    if (!playing) {
      playing = true;
      console.log('playing:', playing);
      let updatedDate = new Date();
      console.log('updatedDate', updatedDate)
      while (updatedDate < alarmTime) {
        updatedDate = new Date();
      }
      sound.play();
    } else if (playing) {
      playing = false;
      console.log('playing:', playing);
      sound.pause();
    }
  });
});

rfid.on('error', function (err) {
  console.error(err);
});

sound.on('ended', function (seconds) {
  sound.play();
});

// Turn one of the LEDs on to start.
tessel.led[2].on();
tessel.led[3].on();

// Blink!
if (alarmTime) {
  setInterval(() => {
    tessel.led[2].toggle();
    tessel.led[3].toggle();
  }, 100);
  console.log("I'm blinking! (Press CTRL + C to stop)");
}

