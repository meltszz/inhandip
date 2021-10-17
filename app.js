const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: false,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "/windows/main/mainpreload.js")
        }
    });
  
    win.loadFile('windows/main/main.html')
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })