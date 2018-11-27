### Electron


[Homepage](https://electronjs.org) + [Documentation](https://electronjs.org/docs)

Electron is a HTML + CSS + JS framework for creating cross-platform desktop
applications. It packages Node.js + Chromium into a single architecture that can
be deployed across many operating systems.

1. [Writing your first app](https://electronjs.org/docs/tutorial/first-app)
2. [Main + renderer processes](https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes)
3. [Electron for beginners](http://jlord.us/essential-electron/)

Electron apps are basically Node.js apps!

- `npm install --save-dev electron`

```bash
electron-app/
├── package.json
├── main.js
└── index.html
```

All the features necessary to use Electron are found in the `electron` module.
I.e. `const electron = require('electron')`.

##### Main process

```javascript
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Inside the _package.json_ will be a `main` script that is run on the `main process`.
Electron apps have only one main process.

The main process creates web pages by creating `BrowserWindow` instances (i.e.
  `let window = new BrowserWindow( ... );`). Each `BrowserWindow` runs the web page
in its own _renderer process_.


##### Node.js

Impt: Electron exposes the full Node API. This means that anything available in Node
is automatically available in Electron.

(There are a small number of Node modules that require native compilation. These must
  be compiled along with the electron app).

##### Debugging

--> https://electronjs.org/docs/tutorial/application-debugging

To debug a renderer process you can use the Chromium [developer tools](https://developers.google.com/web/tools/chrome-devtools/?utm_source=dcc&utm_medium=redirect&utm_campaign=2018Q2)

```javascript
const { BrowserWindow } = require('electron')

let window = new BrowserWindow()
window.webContents.openDevTools()
```

Debugging the main process is supposedly more [difficult](https://nodejs.org/en/docs/guides/debugging-getting-started/).

##### Packaging

If using a third party build tool (e.g. `electron-forge`) then packaging will be handled for you. Otherwise you need to
use [asar](https://github.com/electron/asar) `$ npm install -g asar; asar pack your-app app.asar;`

##### InterProcess Communication (`IPC`)

Enables you to pass messages between the main and renderer processes.

##### BrowserWindow

###### Multithreading

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

**This section requires more work**

I'm pretty sure you can just use web workers as you normally would (`let worker = new Worker( ... )`)
however you won't have access to the Electron api's within the worker thread. Also note
that Node doesn't really support multithreading since it is event based, however you can specify
separate processes.

##### `app`

Controls the [event lifecycle](https://electronjs.org/docs/api/app). `const {app} = require('electron')`

**Events**

- `ready`
- `window-all-closed`
- `quit`
- `open-file` / `open-url`
- `login`

**Methods**

- `app.quit()` / `app.exit()`
- `app.focus()` / `app.hide()` / `app.show()`
- `app.isInApplicationsFolder()` / `app.moveToApplicationsFolder()`


Can use the `app.isPackaged` property to determine whether it's in dev or production.



##### Notes:

- [ ] Add some notes on `Chromium`
- [ ] sharing information between webpages


<!-- end -->
