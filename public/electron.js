const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const migrations = require("../database/migrations");
const isDev = require("electron-is-dev");
const model = require("../database/model");

const migrate = new migrations();
migrate.init();

// console.log(__dirname + "../build/icons/icon.ico");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 768,
    icon: app.getAppPath() + "\\build\\icons\\icon.ico",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  isDev
    ? win.loadURL("http://localhost:3000")
    : win.loadFile("./renderer/index.html");

  // Open the DevTools.
  if (isDev) win.webContents.openDevTools();

  ipcMain.on("dbDir", (event, arg) => {
    if (isDev) {
      event.returnValue = app.getAppPath() + "\\database";
    } else {
      event.returnValue = app.getAppPath().replace("app.asar", "localStorage");
    }
  });

  ipcMain.on("dialog", (event, arg) => {
    dialog.showMessageBox(null, arg);
  });

  ipcMain.on("dbTrx", async (event, arg) => {
    const dbTrx = await model(arg); // Execute native modules to accessing file system
    event.returnValue = dbTrx; // return value put on event param
  });

  ipcMain.on("controlWindow", (event, arg) => {
    console.log(arg);
  });

  win.on("maximize", () => {
    win.webContents.send("fullWindow", { maximize: true });
  });

  win.on("unmaximize", () => {
    win.webContents.send("fullWindow", { maximize: false });
  });

  // win.webContents("did-finish-load", () => {
  // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
