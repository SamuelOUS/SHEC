const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    autoHideMenuBat: true,
    width: 1500,
    height: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  });


  win.loadURL('http://localhost:4200');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
