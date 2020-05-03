const { app, BrowserWindow, Menu, ipcMain, dialog, clipboard } = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');
const gen_excel_template = require('./javascripts/gen_excel_template');
require('update-electron-app')();

let mainWindow, secondwindow;
var second_win_selection, template_file_path;

second_win_selection = {
    app_data: 1,
    Trans_history: 0,
    PTA_data: 1,
    Addr_attr: 0,
    Contunity_data: 1,
    foreign_priority: 0,
    assiginment_data: 0
};
//main menu template
let mainMenu = Menu.buildFromTemplate(require('./javascripts/mainMenu'))

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {



    // window state manage

    let mainWindowState = windowStateKeeper({
        defaultWidth: 900,
        defaultHeight: 700
    });

    // Create the browser window.
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 900,
        minHeight: 700,
        icon: path.join(__dirname, 'icon', 'trident.png'),

        webPreferences: {
            nodeIntegration: true
        },
        frame: true
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'html', 'index.html'));

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
    mainWindow.maximize();

    //setapplication menu
    Menu.setApplicationMenu(mainMenu);

    // Let us register listeners on the window, so we can update the state
    // automatically (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    mainWindowState.manage(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//ipc mech from renderer1 to index.js
ipcMain.on('file-open-msg', (e, a) => {
    console.log(a)
    dialog.showOpenDialog({
        title: "Select excel File",
        properties: ['openFile'],
        defaultPath: clipboard.readText(),
        filters: [
            { name: 'Excel', extensions: ['xls', 'xlsx', 'xlsm'] },
            { name: 'Custom File Type', extensions: ['as'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths[0])
        e.reply('file-open-msg-reply', result.filePaths[0])
    }).catch(err => {
        console.log(err)
    })


});

ipcMain.on('open-second-window', (e, a) => {

    secondwindow = new BrowserWindow({

        width: 600,
        height: 420,
        maxWidth: 600,
        maxHeight: 420,
        minWidth: 500,
        minHeight: 300,
        webPreferences: {
            nodeIntegration: true
        },
        frame: true,
        parent: mainWindow,
        modal: true
    })
    secondwindow.loadFile(path.join(__dirname, 'html', 'select.html'));
    //secondwindow.webContents.openDevTools();

})

ipcMain.on('close-second-window', (e, a) => {
    second_win_selection = a;
    secondwindow.close();
    console.log(second_win_selection);
})

ipcMain.on('Close-main-window', (e, a) => {
    console.log(a);
    mainWindow.close();
})

ipcMain.on('gen_template', (e, a) => {
    console.log(a);
    // path to the excel template generation java script
    //require('./javascripts/gen_excel_template');
    template_file_path = gen_excel_template.xl_tmplate();
    e.reply('tmplt-notification', template_file_path);
})
ipcMain.on('Start_work', (e, a) => {

    e.reply('download-start', second_win_selection)
})

ipcMain.on('Excel-completed', (e, a) => {
    e.reply('tmplt-notification', a);

})