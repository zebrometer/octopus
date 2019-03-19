import './styles/item.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import classnames  from 'classnames'

export default class Item extends React.Component {
  static propTypes = {
    item:               PropTypes.object.isRequired,    
    data:               PropTypes.object.isRequired,
    filterCriteria:     PropTypes.object.isRequired,
    onItemSelected:     PropTypes.func.isRequired,
    categoryMetadata:   PropTypes.object.isRequired,    
  }

  state = {
    initted: false,
  }

  componentDidMount() {
    this.setState({ initted: false }, () => {
      setTimeout(() => {
        this.setState({ initted: true })
      }, 0)
    })    
  }

  renderHighlight = (label, value, key) => {
    const { filterCriteria } = this.props
    
    const isFiltered = filterCriteria.filter && String(value).toLowerCase().indexOf(filterCriteria.filter.toLowerCase()) >= 0
    
    const className  = classnames('ui mini message', { highlight: isFiltered })

    return (
      <div className={className} key={key}>
        <span className="title">{ label }</span>
        <span className="message">{ value }</span>
      </div>
    )
  }

  handleItemSelected = () => {
    const { onItemSelected, item } = this.props
    onItemSelected(item)
  }

  render() {
    const { item, categoryMetadata } = this.props
    const { initted } = this.state

    const title      = categoryMetadata.name(item)
    const properties = categoryMetadata.properties || []

    const alarmProps = categoryMetadata.alarmProperties || []
    const hasAlarms  = alarmProps.find(({ propertyName, propertyValue }) => item[propertyName] === propertyValue)

    const className = classnames('xitem', { initted, alarm: hasAlarms })

    return (
      <div className={className} onClick={this.handleItemSelected}>
        <div className="content">
          <div className="header">
            <div className="title">
              { title }
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
      </div>
    )
  }
}
