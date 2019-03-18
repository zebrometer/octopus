import './styles/item-list.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import Item            from './Item'
import Searchbar       from './Searchbar'
import metadata        from '../redux/metadata'

class ItemList extends React.Component {
  static propTypes = {
    data:             PropTypes.object.isRequired,
    filterCriteria:   PropTypes.object.isRequired,
    selectedCategory: PropTypes.string.isRequired,
  }

  handleItemSelected = (item) => {}

  render() {
    const { selectedCategory, filteredItems, filterCriteria } = this.props

    const categoryItems = filteredItems
    const renderProps   = metadata[selectedCategory]

    return (
      <div className="item-list">
        <Searchbar />

        {
          categoryItems.map((item) => {
            return <Item
              key={item.id}
              item={item}
              renderProps={renderProps}
              filterCriteria={filterCriteria}
              onItemSelected={this.handleItemSelected} />
          })
        }
      </div>
    )
  }
}

const mapDispatchToProps = {  
  // setSelectedCategory,
}
const mapStateToProps = (state) => ({
  selectedCategory: state.items.selectedCategory,
  data:             state.items.data,
  filteredItems:    state.items.filteredItems,
  filterCriteria:   state.items.filterCriteria,
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)