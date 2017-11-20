'use strict';

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');
// var sound = require('../audio/audio.js')

var rfid = rfidlib.use(tessel.port['A']);

// rfid.setPollPeriod(3000, function(err){
//     console.error(err);
//   });

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    console.log('UID:', card.uid.toString('hex'))
    // sound.play();

    rfid.stopListening(() => {
      console.log('ive stopped listening');
    })
  });
});

rfid.on('error', function (err) {
  console.error(err);
});

//UID: 2b802e0d

module.exports = rfid;
