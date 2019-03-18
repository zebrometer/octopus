import './styles/item.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import classnames  from 'classnames'
import { Icon }    from 'semantic-ui-react'

export default class Item extends React.Component {
  static propTypes = {
    item:           PropTypes.object.isRequired,
    renderProps:    PropTypes.object.isRequired,
    filterCriteria: PropTypes.object.isRequired,
    onItemSelected: PropTypes.func.isRequired,
  }

  state = {
    loaded: false,
  }

  renderHighlight = (label, value, key) => {
    // const highlight = this.props.searchCriteria.sortProperty === proprtyName
    // const className = classnames('ui mini message', { highlight })

    const { filterCriteria } = this.props

    const isFiltered = filterCriteria.filter && value.toLowerCase().indexOf(filterCriteria.filter.toLowerCase()) >= 0
    
    const className  = classnames('ui mini message', { highlight: isFiltered })

    return (
      <div className={className} key={key}>
        <span className="title">{ label }</span>
        <span className="message">{ value }</span>
      </div>
    )
  }

  handleImageLoaded = () => {
    this.setState({ loaded: true })
  }

  handleImageClick = () => {
    const { item, onItemSelected } = this.props

    onItemSelected(item)
  }

  handleEdit = () => {
    alert('edit')
  }

  render() {
    const { item, renderProps } = this.props

    const title      = item[renderProps.titlePropName]
    const properties = renderProps.properties || []

    return (
      <div className="item">
        <div className="content">
          <div className="title">
            { title }
          </div>

          {
            properties.length > 0 && (
              <div className="properties">
                {
                  properties.map(({ propName, label }, index) => {
                    const prop = item[propName]
    
                    return prop
                      ? this.renderHighlight(label, prop, index)
                      : null
                  })
                }
              </div>  
            )
          }
        </div>

        <div className="actions">
          <Icon name="edit" onClick={this.handleEdit} />
        </div>


        {/* <div className={imageClass} onClick={this.handleImageClick}>
          <img alt='leotard' src={item.image} onLoad={this.handleImageLoaded}></img>
        </div> */}

        {/* <div className="details">
          <div className="product-header">
            <div className="product-title">{ item.title }</div>
            <div className="product-price">{ `$${item.price}` }</div>
          </div>
          <div className="product-highlights">
            { this.renderHighlight(`${item.n_stones} Stones`, 'n_stones') }
            { this.renderHighlight(`Posted By: ${item.owner}`, 'owner')   }
            { this.renderHighlight(`Size: ${item.size}`,       'size')    }

            { item['4rent'] && this.renderHighlight('For Rent', '4rent')  }
          </div>
          <div className="product-description">{ item.description }</div>
        </div> */}
      </div>
    )
  }
}
