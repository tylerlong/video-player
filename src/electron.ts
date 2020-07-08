// eslint-disable-next-line node/no-unpublished-import
import {app, BrowserWindow} from 'electron';
import path from 'path';

let browserWindow: BrowserWindow | undefined;

const createWindow = () => {
  browserWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  browserWindow.loadURL(
    path.join('file://', __dirname, '..', '..', 'docs', 'index.html')
  );
  browserWindow.on('closed', () => {
    browserWindow = undefined;
  });
  browserWindow.setAlwaysOnTop(true);
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (browserWindow === undefined) {
    createWindow();
  }
});
