import './styles/navbar.scss'

import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'

import { setSelectedCategory } from '../redux/actions/items'

class Navbar extends React.Component {
  static propTypes = {
    history:             PropTypes.object.isRequired,
    categories:          PropTypes.array.isRequired,
    selectedCategory:    PropTypes.string,
    setSelectedCategory: PropTypes.func.isRequired,
  }

  handleCategorySelected = (key) => {
    this.props.history.push('/')
    this.props.setSelectedCategory(key)
  }

  render() {
    const { categories, selectedCategory } = this.props

    return (
      <div className="navbar-component">
        <Menu secondary stackable>
          <Menu.Menu position='left'>
            {
              categories.map(({ key, label }) => {
                const handleCategorySelected = () => this.handleCategorySelected(key)
                const active = key === selectedCategory

                return <Menu.Item
                  key={key}
                  name={label}
                  active={active}
                  onClick={handleCategorySelected}
                />
              })
            }
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setSelectedCategory,
}
const mapStateToProps = (state) => ({
  categories:       state.items.categories,
  selectedCategory: state.items.selectedCategory,
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)