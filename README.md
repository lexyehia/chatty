React Boilerplate
=====================

A minimal and light dev environment for ReactJS.

### Layout

This is a version of the Chatter app written in TypeScript on both front and back ends. The
project is neatly divided into `client` and `server` subdirectories. Within each, the TypeScript source is found in the `src` directory, while the transpiled JavaScript is emitted to the `dist` directory.

### Start

The TypeScript is already transpiled (using WebPack for the client-side, and the regular tsc for the server-side). A simple `npm install` followed by `npm start` will run parallel processes of both client and server servers (yes, that's TWO servers!). You do not need to open a new terminal tab/window.

If you need to recompile the server TypeScript code, `npm run compile` will take care of that (However, WebPack deals with the client-side transpilation).

### Features

##### Live Chat

The 

### Dependencies

* React
* Webpack
* tsc (TypeScript Compiler)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
