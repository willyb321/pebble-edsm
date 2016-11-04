var Settings = require('settings');
var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig, null, {autoHandleEvents: false});

Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (e && !e.response) {
    return;
  }
  var dict = clay.getSettings(e.response);

  // Save the Clay settings to the Settings module. 
  Settings.option(dict);
});
var shittypiss = clay.getAllItems();
var UI = require('ui');
var request = new XMLHttpRequest();
var method = 'GET';
var url = 'https://www.edsm.net/api-logs-v1/get-position/commanderName/' + shittypiss + '/showCoords/1';
var x = [];
request.open(method, url);
request.send();
// Specify the callback for when the request is completed
request.onload = function() {
  // The request was successfully completed!
  console.log('Got response: ' + this.responseText);
  var nah = JSON.parse(this.responseText);
  var nahnahnah = ['x: ', JSON.parse(nah.coordinates.x), '\n', 'y: ', JSON.parse(nah.coordinates.y), '\n', 'z: ', JSON.parse(nah.coordinates.z)];
  var menu = new UI.Menu();
  var items = ['Location', 'Coordinates'];
for(var i in nah) {
    x[i] = nah[i];
  console.log(x[i]);
}
 
for(var l=1;l<4;l++) {
var section = {
title: 'Another section',
items: [{
  title: items[l-1]
}]
};
menu.section(l, section);
}
menu.show();
menu.on('select', function(event) {
  console.log(event.itemIndex);
if (event.item.title === 'Location') {
  // Show a card with clicked item details
  var detailCard = new UI.Card({
    title: event.item.title,
    body: nah.system
  });
  detailCard.show();
} else if (event.item.title === 'Coordinates') {
  var detailCard2 = new UI.Card({
    title: event.item.title,
    body: nahnahnah.join("")
  });
  detailCard2.show();
}
  console.log(nah.system);
//   for (var q; q < x.length; q++) {
//    detailCard.body = x[1];
//   }
  // Show the new Card
});
};
