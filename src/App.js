import './styles/app.scss'

import React     from 'react'
import PropTypes from 'prop-types'

import { Route, Switch, withRouter } from 'react-router'

import Bootstrap   from './Bootstrap'
import Navbar      from './components/Navbar'
import ItemList    from './components/ItemList'
import ItemDetails from './components/ItemDetails'

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
            <Switch>
              <Route exact path="/" component={ItemList} />
              <Route path="/category/:category/item/:id" component={ItemDetails} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
