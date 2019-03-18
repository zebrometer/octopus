import React    from "react"
import ReactDOM from "react-dom"

import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App      from "./App"
import reducers from './redux/reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)
