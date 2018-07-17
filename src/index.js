import React from 'react'
import ReactDOM from 'react-dom'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
    module.hot.accept()
}