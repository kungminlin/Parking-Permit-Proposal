const {ipcRenderer} = require('electron');
const {API_KEY, TABLE_ID, DESTINATION, mapsClient, updateEligibility} = require('./app');

var users = [];
var sortedEligibility = false;
var sortedName = false;

function sync() {
    users = [];
    $('#user-data').find('tbody').empty();

    var query = "SELECT * FROM " + TABLE_ID;
    var encodedQuery = encodeURIComponent(query);

    var url = ['https://www.googleapis.com/fusiontables/v2/query'];
    url.push('?sql=' + encodedQuery);
    url.push('&key=' + API_KEY);
    url.push('&callback=?');

    $.ajax({
        url: url.join(''),
        dataType: 'jsonp',
        success: function (data) {
            var index = 0;
            for (var i=0; i<data.columns.length; i++) {
                if (data.columns[i].includes("street address")) index = i;
            }
            initializeData(data.rows);
            getMapData(users);
        },
        failure: function (data) {
            console.log(data);
        }
    });
}

function initializeData(data) {
    if (data.length == users.length) return;
    for (var i=0; i<data.length; i++) {
        users.push({email: data[i][1], first_name: data[i][2], last_name: data[i][3], address: data[i][4], legit: data[i][5], reason: data[i][6], eligible: null});
        updateEligibility(i);
    }
}

function getMapData(users) {
    var addresses = [];
    for (var i=0; i<users.length; i++) addresses.push(users[i].address);
    mapsClient.distanceMatrix({
        origins: addresses,
        destinations: DESTINATION
        })
        .asPromise()
        .then((response) => {
            initialize(response.json.rows);
        })
        .catch((err) => {
            console.log(err);
        });
}

function initialize(distances) {
    var error = false;
    for (var i=0; i<users.length; i++) {
        if (users[i].eligible == null) {
            error = true;
            break;
        }
        $('#user-data').find('tbody').append("<tr data-eligible=" + users[i].eligible + "><td class='name'>" + users[i].last_name + ", " + users[i].first_name + "</td><td class='email'>" + users[i].email + "</td><td class='address'>" + users[i].address + "</td><td class='distance'>" + Math.round(distances[i].elements[0].distance.value*0.000621371*100)/100 + "</td><td class='reason'>" + (users[i].legit === "No" ? "None" : users[i].reason) + "</td></tr>");
    }
    if (error) sync();
}

ipcRenderer.on('sort:eligibility', function() {
    sortByEligibility();
});

ipcRenderer.on('sort:name', function() {
    sortByName();
})

ipcRenderer.on('sort:clear', function() {
    sortedEligibility = false;
    sortedName = false;
})

function sortByEligibility() {
    var table = $('#user-data').find('tbody');
    table.find('tr').sort(function(a, b) {
        return ($(a).data('eligible') === $(b).data('eligible'))? 0: $(a).data('eligible')? -1: 1;
    }).appendTo(table);
    sortedEligibility = true;
}

function sortByName() {
    var table = $('#user-data').find('tbody');
    var sortField;
    if (sortedEligibility) {
        sortName(table.find('tr[data-eligible=true]'));
        sortName(table.find('tr[data-eligible=false]'));
    }
    else {
        sortName(table.find('tr'));
    }
    function sortName(field) {
        field.sort(function(a, b) {
            return $(a).find('.name').text().localeCompare($(b).find('.name').text());
        }).appendTo(table);
    }
    
    sortedName = true;
}

sync();