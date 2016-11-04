var UI = require('ui');
var Vector2 = require('vector2');
var request = new XMLHttpRequest();
var method = 'GET';
var url = 'https://www.edsm.net/api-logs-v1/get-position/commanderName/willyb321';
// Specify the callback for when the request is completed
request.onload = function() {
  // The request was successfully completed!
  console.log('Got response: ' + this.responseText);
  var nah = JSON.parse(this.responseText);
 var nahnah = nah;
  var menu = new UI.Menu();
  var items = ['Location', 'Coordinates'];
  var x = [];
for(var i in nahnah) {
    x[i] = nahnah[i];
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

  // Show a card with clicked item details
  var detailCard = new UI.Card({
    title: items[event.selectedIndex],
  });
  for (var q; q < x.length; q++) {
   detailCard.body = x[q];
  }
  // Show the new Card
  detailCard.show();
});
 };
request.open(method, url);
request.send();
