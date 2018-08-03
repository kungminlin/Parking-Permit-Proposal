const electron = require('electron');
const request = require('request');
const path = require('path');
const url = require('url');
const fs = require('fs');
const csv = require('fast-csv');
//const api = require('./app');

//process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow, loginWindow, mapWindow, selectionWindow;

app.on('ready', function(){
  fs.readFile('params.txt', function(err, data) {
    if (err) throw err;
    if (data=="") createLoginWindow();
    else createMainWindow();
  });
});

function createLoginWindow() {
  loginWindow = new BrowserWindow({width: 600, height: 400, 'web-preferences': {'web-security': false}});

  loginWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'login.html'),
    protocol: 'file:',
    slashes: true
  }));

  loginWindow.on('closed', function() {
    loginWindow = null;
  })
}

function createMainWindow() {
  mainWindow = new BrowserWindow({'web-preferences': {'web-security': false}});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));
  mainWindow.maximize();
  mainWindow.on('closed', function(){
    app.quit();
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function createMapWindow() {
  mapWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Map'
  });
  //mapWindow.setMenu(null);
  mapWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'map.html'),
    protocol: 'file:',
    slashes:true
  }));
  mapWindow.on('close', function() {
    mapWindow = null;
  })
}

function createSelectionWindow() {
  selectionWindow = new BrowserWindow({
    width: 500,
    height: 400,
    title: 'Selection'
  });

  selectionWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'select.html'),
    protocol: 'file:',
    slashes:true
  }));
  selectionWindow.on('close', function() {
    selectionWindow = null;
  })
}

ipcMain.on('login', (event, arg) => {
  loginWindow.close();
  createMainWindow();
})

ipcMain.on('select_entries', (event, arg) => {
  console.log(arg);
  mainWindow.webContents.send('sort:clear');
  mainWindow.webContents.send('sort:eligibility');
  if (arg.seniority) mainWindow.webContents.send('sort:seniority');
  if (arg.distance) mainWindow.webContents.send('sort:distance');
  if (arg.name) mainWindow.webContents.send('sort:name');
  event.sender.send('entries', 'hi');
})

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Map',
        accelerator:process.platform == 'darwin' ? 'Command+M' : 'Ctrl+M',
        click() {
          if (mapWindow != null) mapWindow.close();
          createMapWindow();
        }
      }
    ]
  },
  {
    label: 'Sort',
    submenu: [
      {
        label: 'Sort by Eligibility',
        click() {
          mainWindow.webContents.send('sort:eligibility');
        }
      },
      {
        label: 'Sort by Name',
        click() {
          mainWindow.webContents.send('sort:name');
        }
      },
      {
        label: 'Sort by Seniority',
        click() {
          mainWindow.webContents.send('sort:seniority');
        }
      },
      {
        label: 'Sort by Distance',
        click() {
          mainWindow.webContents.send('sort:distance');
        }
      },
      {
        label: 'Clear Sorting Restrictions',
        accelerator:process.platform == 'darwin' ? 'Command+Shift+C' : 'Ctrl+Shift+C',
        click() {
          mainWindow.webContents.send('sort:clear');
        }
      }
    ]
  },
  {
    label: 'Select',
    click() {
      createSelectionWindow();
    }
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
