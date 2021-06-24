import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth'
import operations from './reducers/operations'
import operation from './reducers/operation';

export function initStore() {
    const reducers = combineReducers({
        auth,
        operations,
        operation
    });

    const store = createStore(reducers, applyMiddleware(thunk));

    return store; 
}