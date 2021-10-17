const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const publicIP = require('public-ip');
let win;

function createWindow() {
    win = new BrowserWindow({
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
});

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

async function getIPV4() {
    return publicIP.v4();
}

ipcMain.on("send-ipv4", () => {
    getIPV4().then((ipv4) => {
        win.webContents.send("receive-ipv4", ipv4);
    }).catch(err => console.log(err));
});