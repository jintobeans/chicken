// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
- Play audio from an amusing scene between Luke Skywalker, R2-D2 and Yoda
- When the audio reaches the end, play it again from the beginning.
*********************************************/

var path = require('path');
var av = require('tessel-av');
var mp3 = path.join(__dirname, 'chickendancesong.mp3');
var sound = new av.Player(mp3);
var rfid = require('../rfid/rfid.js');

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    console.log('UID:', card.uid.toString('hex'))
    sound.play();

    rfid.stopListening(() => {
      console.log('ive stopped listening');
    })
  });
});

rfid.on('error', function (err) {
  console.error(err);
});

sound.on('ended', function(seconds) {
  sound.play();
});

// module.exports = sound;
// console.log(module.exports)
