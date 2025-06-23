import { app, BrowserWindow } from "electron";
import { installExtension, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import path from "node:path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools()
}

///// Opens window when app loads
app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
        .then((ext) => console.log(`Added Extension:  ${ext.name}`))
        .catch((err) => console.log('An error occurred: ', err));
  createWindow();

  app.on("activate", () => {
    // for macOS as app runs in the background if window is closed
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

///// Quits the app when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
