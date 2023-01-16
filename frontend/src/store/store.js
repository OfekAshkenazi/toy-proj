import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toy.reducer'
import { userReducer } from './user.reducer'
import { reviewReducer } from './review.reducer'

// const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
// let middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,

})

export const store = createStore(rootReducer)
// , middleware

store.subscribe(() => {

})