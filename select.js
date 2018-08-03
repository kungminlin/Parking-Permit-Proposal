const {ipcRenderer} = require('electron');

$("#selection_form").submit(function(e) {
  e.preventDefault();
  selectEntries();
})

function selectEntries() {
  var seniority = $('#by_seniority').is(':checked');
  var distance = $('#by_distance').is(':checked');
  var name = $('#by_name').is(':checked');
  ipcRenderer.send('select_entries', {seniority: seniority, distance, distance, name, name});
}

ipcRenderer.on('entries', (event, arg) => {
  console.log(arg);
});

function exportCSV(array) {
  let csvContent = "data:text/csv;charset=utf-8,";
  array.forEach(function(rowArray){
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
}
