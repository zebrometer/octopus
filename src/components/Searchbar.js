import './styles/searchbar.scss'

import React       from 'react'
import PropTypes   from 'prop-types'

import { connect } from 'react-redux'
import { Input, }  from 'semantic-ui-react'

// import metadata      from '../redux/metadata'
import { setFilter } from '../redux/actions/items'

class Searchbar extends React.Component {
  static propTypes = {
    // data:              PropTypes.object.isRequired,
    // setFilter:         PropTypes.func.isRequired,
    // selectedCategory:  PropTypes.string.isRequired,
    filterCriteria: PropTypes.object.isRequired,
  }

  // state = {
  //   filter: '',
  //   searchItems:  [],
  // }

  // constructor(props) {
  //   super(props)
  //   this.state = this.stateFromProps(props)
  // }

  // componentWillReceiveProps(props) {
  //   this.setState(this.stateFromProps(props))
  // }

  handleSearchChange = (_, { value }) => {
    this.props.setFilter(value)

    // this.setState({ filter: value }, () => {
    //   const searchItems = this.getFilteredItems()
    //   this.setState({ searchItems })    
    // })
  }

  // getSearchItems(props=this.props) {
  //   const { data, selectedCategory } = props

  //   const items       = data[selectedCategory] || []
  //   const renderProps = metadata[selectedCategory]

  //   return items.map((item) => {
  //     return { title: item[renderProps.titlePropName] }
  //   })
  // }

  // getFilteredItems(props=this.props) {
  //   const searchItems = this.getSearchItems(props)

  //   return searchItems.filter((item) => {
  //     return item.title.indexOf(this.state.filter) >= 0
  //   })
  // }

  // stateFromProps(props) {
  //   return { ...this.state, searchItems: this.getSearchItems(props) }
  // }

  render() {
    const { filterCriteria } = this.props

    return (
      <div className="search-bar">
        <Input
          icon='search'
          placeholder='Search...'
          value={filterCriteria.filter || ''}
          onChange={this.handleSearchChange}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  setFilter,
}
const mapStateToProps = (state) => ({
  // selectedCategory: state.items.selectedCategory,
  // data:             state.items.data,
  filterCriteria:   state.items.filterCriteria,
})

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)