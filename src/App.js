import './styles/app.scss'

import React     from 'react'
import PropTypes from 'prop-types'

import { Route, Switch, withRouter } from 'react-router'

import Bootstrap from './Bootstrap'
import Navbar    from './components/Navbar'
import ItemList  from './components/ItemList'

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    const { history } = this.props

    return (
      <div className="app">
        <Bootstrap />

        <div className="content">
          <Navbar history={history} />

          <div className="item-list-container">
            <ItemList />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
