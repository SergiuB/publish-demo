# Demo article publishing application based on electron-react-boilerplate

Demo article publishing application based on
[Electron](http://electron.atom.io/), [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [React Router](https://github.com/reactjs/react-router), [Webpack](http://webpack.github.io/docs/), [React Transform HMR](https://github.com/gaearon/react-transform-hmr)

## Features

* see a list of articles rendered as Material UI cards
* create a new article
* remove an article
* edit an article
* for each article choose a photo, which is resized (client side) in 3 different dimensions
* all articles are persisted in localStorage
* validation for non-empty author, title, content and featuredImage fields
* INTERNATIONALIZATION SUPPORT - use the menu in the title bar to switch between English and French

## Technical details

* state is managed by Redux
* persistence of state in localStorage thanks to redux-localstorage
* Roboto font is loaded locally thanks to roboto-fontface npm package
* React Router manages navigation between the 3 pages: HomePage, AddArticlePage and EditArticlePage
* react-router-redux keeps the URL in sync with the Redux store
* material-ui provides the widgets
* resizing the images client side is done using a canvas element
* resized images are saved as data URL strings (base64). Saving them as ArrayBuffer or Blob would have complicated the serialization in localStorage as these objects don't have a toString implementation
* the "high res" 200px image is shown on the card (yeah, it does not look to good) and the med res 150px image is shown in the article editor
* internationalization is done without any 3rd party package. See [this commit](https://github.com/SergiuB/publish-demo/commit/c25cbaafa7b44f543def368bf1db318f2f226d3c) for details. Translations are located in the i18n folder.

## Install

First, clone the repo via git:

```bash
git clone git@github.com:SergiuB/publish-demo.git
```

And then install dependencies.

```bash
$ cd publish-demo && npm install
```

## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

*Note: requires a node version >= 4 and an npm version >= 2.*


## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
$ UPGRADE_EXTENSIONS=1 npm run dev

# For Windows
$ set UPGRADE_EXTENSIONS=1 && npm run dev
```

## Package

```bash
$ npm run package
```

To package apps for all platforms:

```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.


## License
MIT © [Sergiu Buciuc](https://github.com/sbuciuc)
