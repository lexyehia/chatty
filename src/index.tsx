// Application entrypoint.

// Load up the application styles
require('../styles/application.scss')

// Render the top-level React component
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'


//ReactDOM.render(<App />, document.getElementById('react-root'))
ReactDOM.render(<App />, document.getElementById('root'))
