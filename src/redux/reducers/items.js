import {
  ITEMS,
  FILTER,
  LOAD_ITEMS,
  SELECTED_CATEGORY,
} from '../actions/items'

import metadata from '../metadata'

const CATEGORIES = [  
  { key: 'dataSystems',  label: 'Data Systems' },
  { key: 'dataTypes',    label: 'Data Types'   },
  // { key: 'dataSources',  label: 'Data Sources' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'transactions', label: 'Transactions' },
]

const initialState = {
  categories:       CATEGORIES,
  selectedCategory: 'dataSystems',
  dataLoading:    false,
  data:           {},
  filterCriteria: {},
  filteredItems:  [],
}

function getFilteredItems(filterCriteria, data) {
  const unfiltered = data[filterCriteria.category] || []

  const filterProps = metadata[filterCriteria.category].filterProperties

  const filtered = unfiltered.filter((item) => {
    return filterProps.find((filterProp) => {
      return item[filterProp]
        && item[filterProp].toLowerCase().indexOf(filterCriteria.filter.toLowerCase()) >= 0
    })
  })

  console.log('filtered', filtered)
  return filtered
}

export default function products(state = initialState, action) {
  switch (action.type) {
    case SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.value }
    case LOAD_ITEMS:
      return { ...state, dataLoading: true }
    case ITEMS:
      return { ...state, dataLoading: false, data: action.value }
    case FILTER:
      const filterCriteria = action.value
      const filteredItems  = getFilteredItems(filterCriteria, state.data)

      return { ...state, filterCriteria, filteredItems }
    default:
      return state
  }
}