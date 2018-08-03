const {ipcRenderer} = require('electron');
const {DESTINATION, mapsClient, updateEligibility} = require('./app');
const fs = require('fs');

// var TABLE_ID = "1JjE7hElrszOg4GWq24XTw2BK1JPe9SXVPlafJSu4";
// var API_KEY = "AIzaSyCmSC9FYCsAMxhdtGABVsUcxPx2r7GsH-4";

// let API_KEY, TABLE_ID;

var users = [];
var sorted = {eligibility: false, name: false, seniority: false, distance: false};

fs.readFile('params.txt', 'utf8', function(err, data) {
  console.log(data);
  var params = data.split(',');
  API_KEY = params[1];
  TABLE_ID = params[0];
  console.log(API_KEY);
  console.log(TABLE_ID);
  sync();
})

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
    error: function (data) {
      console.log(data);
    }
  });
}

function initializeData(data) {
  if (data.length == users.length) return;
  for (var i=0; i<data.length; i++) {
    users.push({email: data[i][1], first_name: data[i][2], last_name: data[i][3], address: data[i][4], legit: data[i][5], reason: data[i][6], eligible: null});
    updateEligibility(API_KEY, i);
  }
}

function getMapData(users) {
  var addresses = [];
  for (var i=0; i<users.length; i++) addresses.push(users[i].address);
  mapsClient(API_KEY).distanceMatrix({
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

ipcRenderer.on('sort:seniority', function() {
  sortBySeniority();
});

ipcRenderer.on('sort:distance', function() {
  sortByDistance();
})

ipcRenderer.on('sort:clear', function() {
  sorted.eligibility = false;
  sorted.name = false;
  sorted.seniority = false;
  sorted.distance = false;
})

function sortByEligibility() {
  var table = $('#user-data').find('tbody');
  table.find('tr').sort(function(a, b) {
    return ($(a).data('eligible') === $(b).data('eligible'))? 0: $(a).data('eligible')? -1: 1;
  }).appendTo(table);
  sorted.eligibility = true;
}

function sortByName() {
  if (sorted.name || sorted.seniority || sorted.distance) return;

  var table = $('#user-data').find('tbody');
  if (sorted.eligibility) {
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

  sorted.name = true;
}

function sortBySeniority() {
  if (sorted.name || sorted.seniority || sorted.distance) return;

  // Temporary sorting mechanism based off of email assignment

  var table = $('#user-data').find('tbody');
  if (sorted.eligibility) {
    sortSeniority(table.find('tr[data-eligible=true]'));
    sortSeniority(table.find('tr[data-eligible=false]'));
  }
  else {
    sortSeniority(table.find('tr'));
  }
  sortSeniority(table.find('tr'));
  function sortSeniority(field) {
    field.sort(function(a, b) {
      return $(a).find('.email').text().localeCompare($(b).find('.email').text());
    }).appendTo(table);
  }

  sorted.seniority = true;
}

function sortByDistance() {
  if (sorted.name || sorted.seniority || sorted.distance) return;

  var table=$('#user-data').find('tbody');
  if (sorted.eligibility) {
    sortDistance(table.find('tr[data-eligible=true]'));
    sortDistance(table.find('tr[data-eligible=false]'));
  }
  else {
    sortDistance(table.find('tr'));
  }
  function sortDistance(field) {
    field.sort(function(a, b) {
      return -$(a).find('.distance').text().localeCompare($(b).find('.distance').text());
    }).appendTo(table);
  }

  console.log('sorted by distance');
  sorted.distance = true;
}
