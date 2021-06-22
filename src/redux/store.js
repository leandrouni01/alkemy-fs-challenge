import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export function initStore() {
    const reducers = combineReducers({
        rentals,
        rental
    });

    const store = createStore(reducers, applyMiddleware(thunk));

    return store; 
}