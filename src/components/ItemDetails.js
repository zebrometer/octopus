import './styles/item-details.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import { Placeholder } from 'semantic-ui-react'

import metadata  from '../redux/metadata'

class ItemDetails extends React.Component {
  static propTypes = {
    data:    PropTypes.object.isRequired,
    match:   PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  renderNoData = () => {
    return (
      <div className="item-details">
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </div>
    )
  }

  handleLink = (linkedItem, category) => {
    this.props.history.push(`/category/${category}/item/${linkedItem.id}`)
  }

  render() {
    const { data } = this.props
    const { id, category } = this.props.match.params

    const items = data[category] || []
    const item  = items.find((item) => String(item.id) === String(id))

    if (!item) {
      return this.renderNoData()
    }

    const categoryMetadata = metadata[category]
    const title            = item[categoryMetadata.titlePropName]
    const properties       = categoryMetadata.properties || []
    const linkProperties   = categoryMetadata.linkProperties || []

    return (
      <div className="item-details">
        <h1>{ title }</h1>

        {
          properties.length > 0 && (
            <div className="properties">
              {
                properties.map(({ propName, label }, index) => {
                  const prop = item[propName]
                  
                  return prop && (
                    <div className="property" key={index}>
                      <div className="prop-name">{ label }</div>
                      <div className="prop-value">{ prop }</div>
                    </div>
                  )
                })
              }
            </div>  
          )
        }

        {
          linkProperties.length > 0 && (
            <div className="links">
              {
                linkProperties.map((linkProp) => {
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

                      const text = `${linkedItemTitle} (${categoryName})`

                      const handleLink = (event) => {
                        event.preventDefault()
                        this.handleLink(linkedItem, category)
                      }

                      return <a href="/" key={linkedItem.id} onClick={handleLink}>{ text }</a>

                    }
                  }
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

const mapDispatchToProps = {}
const mapStateToProps = (state) => ({
  data: state.items.data,
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails)