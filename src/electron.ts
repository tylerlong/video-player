// eslint-disable-next-line node/no-unpublished-import
import {app, BrowserWindow} from 'electron';
import path from 'path';
import {autoUpdater} from 'electron-updater';
import electronLog from 'electron-log';

import {setApplicationMenu} from './menu';

electronLog.transports.file.level = 'info';
autoUpdater.logger = electronLog;
autoUpdater.checkForUpdatesAndNotify();
setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify();
}, 3600000); // check for updates every hour

let browserWindow: BrowserWindow | undefined;

const createWindow = () => {
  browserWindow = new BrowserWindow({
    width: 920,
    height: 540,
    webPreferences: {
      nodeIntegration: false,
    },
    frame: false,
  });
  browserWindow.loadURL(
    path.join('file://', __dirname, '..', 'docs', 'index.html')
  );
  browserWindow.on('closed', () => {
    browserWindow = undefined;
  });
  browserWindow.setAlwaysOnTop(true);
};

app.on('ready', () => {
  createWindow();
  setApplicationMenu(browserWindow!);
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
