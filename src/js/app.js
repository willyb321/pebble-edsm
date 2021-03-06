/*jshint esversion:6*/
var Settings = require('settings');
var Clay = require('./clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig, null, {autoHandleEvents: false});
var bala = [];
var rankVerbose = [];
var UI = require('ui');
var internet_status;
function isOnline(yes,no){
    var xhr = XMLHttpRequest;
    xhr.onload = function(){
        if(yes instanceof Function){
            yes();
        }
    };
    xhr.onerror = function(){
        if(no instanceof Function){
            no();
        }
    };
	xhr.open("GET","https://google.com",true);
    xhr.send();
}

Pebble.addEventListener('ready', function() {
	isOnline(
    function(){
        internet_status = false;
    },
    function(){
        internet_status = true;
		var plsconfig = new UI.Card({
    		title: "Please connect.",
    		body: "Please connect to the internet before opening the app! \n Thanks.",
			scrollable: true
  		});
  		plsconfig.show();
    }
);
	
});
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
var cmdr = Settings.option('cmdrname');
var api = Settings.option('EDSMAPI');
var system = [];
var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var request3 = new XMLHttpRequest();
var request4 = new XMLHttpRequest();
var method = 'GET';
var url = 'https://www.edsm.net/api-logs-v1/get-position/commanderName/' + cmdr + '/showCoords/1';
var url2 = 'https://www.edsm.net/api-commander-v1/get-credits/commanderName/' + cmdr + '/apiKey/' + api;
var url4 = 'https://www.edsm.net/api-commander-v1/get-ranks/commanderName/' + cmdr + '/apiKey/' + api;
var x = [];
request.open(method, url);
request.send();
request2.open(method, url2);
request2.send();
request4.open(method, url4);
request4.send();
request2.onload = function() {
	console.log('Got response: ' + this.responseText);
	var cmdrcred = JSON.parse(this.responseText);
	var bal = cmdrcred.credits[0].balance;
	console.log(bal);
	bala[0] = bal;
	
};
// Specify the callback for when the request is completed
request.onload = function() {
  // The request was successfully completed!
  console.log('Got response: ' + this.responseText);
if (this.responseText === "{\"msgnum\":201,\"msg\":\"Missing commander name\"}") {
	var plsconfig = new UI.Card({
    title: "Please Configure",
    body: "Please use the configuration on your phone before attempting to use this app! \n Thanks.",
	scrollable: true
  });
  plsconfig.show();
}
  var nah = JSON.parse(this.responseText);
  var nahnahnah = ['x: ', JSON.parse(nah.coordinates.x), '\n', 'y: ', JSON.parse(nah.coordinates.y), '\n', 'z: ', JSON.parse(nah.coordinates.z)];
  var menu = new UI.Menu();
  var items = ['Location', 'Coordinates', 'Balance', 'Within 30ly', 'Ranks'];
  var url3 = 'https://www.edsm.net/api-v1/cube-systems/systemName/' + nah.system + '/size/30';
	request3.open(method, url3);
	request3.send();
	request3.onload = function() {
		var cube = JSON.parse(this.responseText);
		system[0] = Object.keys(cube).length;
	};
for(var i in nah) {
    x[i] = nah[i];
  console.log(x[i]);
}
 
for(var l=0;l<5;l++) {
var section = {
title: 'Another section',
items: [{
  title: items[l]
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
} else if (event.item.title === 'Balance') {
  var detailCard3 = new UI.Card({
    title: event.item.title,
    body: bala[0] + '\n Credits' 
  });
  detailCard3.show();
} else if (event.item.title === 'Within 30ly') {
  var detailCard4 = new UI.Card({
    title: event.item.title,
    body: system[0] + ' System(s) within 30ly of ' + nah.system 
  });
  detailCard4.show();
} else if (event.item.title === 'Ranks') {
  	var detailCard5 = new UI.Card({
    title: event.item.title,
	body: 'Your Ranks are: ' + rankVerbose.join('\n'),
		scrollable: true
  });
  detailCard5.show();
}
});
};
request4.onload = function () {
	var rankObj = JSON.parse(this.responseText);
	var rank = rankObj.ranksVerbose;
	Object.keys(rank).forEach(function (key) {
      console.log( key , rank[key] );
	rankVerbose.push(key + ": " + rank[key]);
});
for (var i; i < rank.length; i++) {
console.log(rankVerbose[i]);
}
};
