import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import {
  loadItems,
} from './redux/actions/items'

class Bootstrap extends React.Component {
  static propTypes = {
    loadItems: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadItems()
  }

  render() {
    return null
  }
}

const mapDispatchToProps = {
  loadItems,
}
const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap)