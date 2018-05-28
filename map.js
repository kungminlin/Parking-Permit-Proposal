const {ipcRenderer} = require('electron');

function initMap() {

    const {boundary, TABLE_ID} = require('./app');

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.3866556, lng: -122.1111336},
        zoom: 13
    });

    console.log(boundary);
    boundary.setMap(map);

    var layer = new google.maps.FusionTablesLayer({
        query: {
            select: '\'What is your street address?\'',
            from: TABLE_ID
        }
    });

    layer.setMap(map);
}