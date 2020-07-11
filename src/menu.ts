import {
  app,
  Menu,
  shell,
  dialog,
  MenuItemConstructorOptions,
  BrowserWindow,
  // eslint-disable-next-line node/no-unpublished-import
} from 'electron';

import pkg from '../package.json';

const productName = pkg.build.productName;

const createTemplate = (browserWindow: BrowserWindow) => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteAndMatchStyle'},
        {role: 'delete'},
        {role: 'selectAll'},
      ],
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forceReload'},
        {role: 'toggleDevTools'},
        {type: 'separator'},
        {role: 'resetZoom'},
        {role: 'zoomIn'},
        {role: 'zoomOut'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
      ],
    },
    {
      role: 'window',
      submenu: [{role: 'minimize'}, {role: 'close'}],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://github.com/tylerlong/video-player');
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about', label: `About ${productName}`},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide', label: `Hide ${productName}`},
        {role: 'hideOthers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit', label: `Quit ${productName}`},
      ],
    });

    // Edit menu
    (template[1]!.submenu! as MenuItemConstructorOptions[]).push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [{role: 'startSpeaking'}, {role: 'stopSpeaking'}],
      }
    );

    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'},
    ];
  }

  if (process.platform === 'win32' || process.platform === 'linux') {
    // Help menu
    (template[3]!.submenu! as MenuItemConstructorOptions[]).push(
      {type: 'separator'},
      {
        label: 'About',
        click() {
          dialog.showMessageBox(browserWindow, {
            type: 'info',
            title: 'About',
            message: productName,
            detail: `Version ${pkg.version} (${pkg.version})`,
          });
        },
      }
    );
  }
  return template;
};

export const setApplicationMenu = (browserWindow: BrowserWindow) => {
  const menu = Menu.buildFromTemplate(createTemplate(browserWindow));
  Menu.setApplicationMenu(menu);
};
