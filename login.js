const {ipcRenderer} = require('electron');
const csv = require("fast-csv");
const fs = require("fs");

$('#login').submit(function(e){
  e.preventDefault();
  var API_KEY = $("#api_key").val();
  var TABLE_ID = $("#table_id").val();
  fs.writeFile('params.txt', TABLE_ID + ',' + API_KEY, function(err) {});
  ipcRenderer.send('login', {API_KEY: API_KEY, TABEL_ID: TABLE_ID});
});
