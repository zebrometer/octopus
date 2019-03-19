import './styles/item-list.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import Item      from './Item'
import Searchbar from './Searchbar'
import metadata  from '../redux/metadata'

class ItemList extends React.Component {
  static propTypes = {
    data:             PropTypes.object.isRequired,
    history:          PropTypes.object.isRequired,
    filterCriteria:   PropTypes.object.isRequired,
    selectedCategory: PropTypes.string.isRequired,
  }

  handleItemSelected = (item) => {
    const { selectedCategory } = this.props
    this.props.history.push(`/category/${selectedCategory}/item/${item.id}`)
  }

  render() {
    const { selectedCategory, filteredItems, filterCriteria, data } = this.props

    const categoryItems    = filteredItems
    const categoryMetadata = metadata[selectedCategory]

    return (
      <div className="item-list">
        <Searchbar />

        {
          categoryItems.map((item) => {
            const key=`${selectedCategory}-${item.id}`

            return <Item              
              key={key}
              item={item}
              data={data}
              compact={false}
              metadata={metadata}
              categoryMetadata={categoryMetadata}
              filterCriteria={filterCriteria}
              onItemSelected={this.handleItemSelected} />
          })
        }
      </div>
    )
  }
}

const mapDispatchToProps = {}
const mapStateToProps = (state) => ({
  selectedCategory: state.items.selectedCategory,
  data:             state.items.data,
  filteredItems:    state.items.filteredItems,
  filterCriteria:   state.items.filterCriteria,
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)