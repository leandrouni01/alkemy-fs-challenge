import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth'

export function initStore() {
    const reducers = combineReducers({
        auth
    });

    const store = createStore(reducers, applyMiddleware(thunk));

    return store; 
}