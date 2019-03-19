import './styles/item-details.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import classnames  from 'classnames'

import { Placeholder } from 'semantic-ui-react'

import metadata  from '../redux/metadata'

class ItemDetails extends React.Component {
  static propTypes = {
    data:    PropTypes.object.isRequired,
    match:   PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
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
    const { initted } = this.state
    const { id, category } = this.props.match.params

    const items = data[category] || []
    const item  = items.find((item) => String(item.id) === String(id))

    if (!item) {
      return this.renderNoData()
    }

    const categoryMetadata = metadata[category]
    const title            = categoryMetadata.name(item)
    const properties       = categoryMetadata.properties || []
    const linkProperties   = categoryMetadata.linkProperties || []

    const className = classnames('item-details', { initted })

    return (
      <div className={className}>
        <h1>{ title }</h1>

        {
          properties.length > 0 && (
            <div className="properties">
              {
                properties.map(({ linkTo, propName, label }, index) => {
                  const prop = item[propName]

                    if (prop && linkTo) {
                        const key      = item[propName]
                        const category = linkTo.category

                        const linkedCategoryItems = data[category]
                        const linkedItem          = linkedCategoryItems.find((linkedCategoryItem) => {
                            return linkedCategoryItem[linkTo.destinationPropName] === key
                        })
                        const linkedItemTitle = metadata[category].name(linkedItem)

                        const handleLink = (event) => {
                            event.preventDefault()
                            this.handleLink(linkedItem, category)
                        }
                        return (
                            <div className="property" key={index}>
                                <div className="prop-name">{ label }</div>
                                <a href="/" key={/*linkedItem.id*/index} onClick={handleLink}>{ linkedItemTitle }</a>
                            </div>
                        )
                    }
                  
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
                linkProperties.map((linkProp, index) => {
                  if (item[linkProp.propName] && linkProp.singleton) {
                    const key      = item[linkProp.propName]
                    const category = linkProp.category

                    const linkedCategoryItems = data[category]
                    const linkedItem          = linkedCategoryItems.find((linkedCategoryItem) => {
                      return linkedCategoryItem[linkProp.destinationPropName] === key
                    })

                    if (linkedItem) {
                      const linkedItemTitle = metadata[category].name(linkedItem)

                      const handleLink = (event) => {
                        event.preventDefault()
                        this.handleLink(linkedItem, category)
                      }

                      return <a href="/" key={/*linkedItem.id*/index} onClick={handleLink}>{ linkedItemTitle }</a>
                    }
                  } else if (item[linkProp.propName]) {
                      const category = linkProp.category
                      const linkedCategoryItems = data[category]

                      return (
                        <div className="subcategory-container">
                          <h2>{linkProp.title}</h2>
                          {
                            linkedCategoryItems
                              .filter((linkedItem) => linkedItem[linkProp.destinationPropName] === item[linkProp.propName])
                              .map((linkedItem) => {
                                const linkedItemTitle = metadata[category].name(linkedItem)
                                const handleLink      = (event) => {
                                  event.preventDefault()
                                  this.handleLink(linkedItem, category)
                                }
                                return (
                                  <div>
                                    <a href="/" key={/*linkedItem.id*/index} onClick={handleLink}>{ linkedItemTitle }</a>
                                  </div>
                                )
                            })}
                        </div>
                    )
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