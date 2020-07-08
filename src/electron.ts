// eslint-disable-next-line node/no-unpublished-import
import {app, BrowserWindow} from 'electron';

let browserWindow: BrowserWindow | undefined;

const createWindow = () => {
  browserWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  browserWindow.loadURL('https://chuntaoliu.com/video-player/');
  browserWindow.on('closed', () => {
    browserWindow = undefined;
  });
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
  if (browserWindow === null) {
    createWindow();
  }
});
