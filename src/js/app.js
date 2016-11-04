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
 var nahnah = nah.system;
  var menu = new UI.Menu();

var section = {
title: 'Another section',
items: [{
  title: 'Location'
}]
};
menu.section(0, section); 
menu.show();
menu.on('select', function(event) {

  // Show a card with clicked item details
  var detailCard = new UI.Card({
    title: 'Location',
    body: nahnah
  });

  // Show the new Card
  detailCard.show();
});
 };
request.open(method, url);
request.send();
