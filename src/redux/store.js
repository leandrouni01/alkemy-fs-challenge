import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth'
import operations from './reducers/operations'

export function initStore() {
    const reducers = combineReducers({
        auth,
        operations
    });

    const store = createStore(reducers, applyMiddleware(thunk));

    return store; 
}