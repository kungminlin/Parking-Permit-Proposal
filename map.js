const {ipcRenderer} = require('electron');
const fs = require('fs');

var API_KEY, TABLE_ID;

function initMap() {

  fs.readFile('params.txt', 'utf8', function(err, data) {
    var params = data.split(',');
    API_KEY = params[1];
    TABLE_ID = params[0];
    syncMap();
  });
}

function syncMap() {

  const {boundary} = require('./app');

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.3866556, lng: -122.1111336},
    zoom: 13
  });



  boundary.setMap(map);

  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'What is your street address?\'',
      from: TABLE_ID
    }
  });

  console.log(layer);

  layer.setMap(map);
}
