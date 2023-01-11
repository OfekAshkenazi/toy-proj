import { combineReducers, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './toy.reducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose

const rootReducer = combineReducers({
    toyModule: toyReducer,
   
})

export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
   
})