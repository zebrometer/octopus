import './styles/item.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import classnames  from 'classnames'
import { Icon }    from 'semantic-ui-react'

import metadata from '../redux/metadata'

export default class Item extends React.Component {
  static propTypes = {
    item:             PropTypes.object.isRequired,    
    data:             PropTypes.object.isRequired,
    filterCriteria:   PropTypes.object.isRequired,
    onItemSelected:   PropTypes.func.isRequired,
    categoryMetadata: PropTypes.object.isRequired,
  }

  state = {
    loaded: false,
  }

  renderHighlight = (label, value, key) => {
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
    const { item, categoryMetadata, data } = this.props

    const title      = item[categoryMetadata.titlePropName]
    const properties = categoryMetadata.properties || []
    
    const linkProperties = categoryMetadata.linkProperties || []
    console.log('linkProperties', linkProperties)

    return (
      <div className="item">
        <div className="content">
          <div className="header">
            <div className="title">
              { title }
            </div>

            <div className="links">
            {
              linkProperties && linkProperties.map((linkProp) => {
                if (item[linkProp.propName]) {
                  const key      = item[linkProp.propName]
                  const category = linkProp.category                  

                  const linkedCategoryItems = data[category]
                  const linkedItem          = linkedCategoryItems.find((linkedCategoryItem) => {
                    return linkedCategoryItem[linkProp.destinationPropName] === key
                  })

                  if (linkedItem) {
                    const titlePropName   = metadata[category].titlePropName
                    const linkedItemTitle = linkedItem[titlePropName]
                    const categoryName    = metadata[category].displayName
                                        
                    return <a key={key} href="/">{ `${linkedItemTitle} (${categoryName})`  }</a>
                  }                  
                }
              })
            }
            </div>
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
      </div>
    )
  }
}
