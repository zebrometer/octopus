import data from '../data.json'

export const SELECTED_CATEGORY = 'SELECTED_CATEGORY'
export function setSelectedCategory(category) {
  return (dispatch, getState) => {
    const filterCriteria = {
      category,
      filter: '',
    }
    dispatch({ type: SELECTED_CATEGORY, value: category })
    dispatch({ type: FILTER, value: filterCriteria })
  }
}

export const ITEMS      = 'ITEMS'
export const LOAD_ITEMS = 'LOAD_ITEMS'
export function loadItems() {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_ITEMS })

    const state = getState()

    const filterCriteria = {
      category: state.items.selectedCategory,
      filter: '',
    }

    setTimeout(() => {
      dispatch({ type: ITEMS,  value: data })
      dispatch({ type: FILTER, value: filterCriteria })
    }, 0)
  }  
}

export const FILTER = 'FILTER'
export function setFilter(filter) {
  return (dispatch, getState) => {
    const state = getState()
    
    const filterCriteria = {
      category: state.items.selectedCategory,
      filter
    }
    dispatch({ type: FILTER, value: filterCriteria })
  }
}
