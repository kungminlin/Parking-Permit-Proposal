const electron = require('electron');
const path = require('path');
const url = require('url');

//process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow, mapWindow, selectionWindow;

app.on('ready', function(){
  mainWindow = new BrowserWindow({});
  
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
});

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