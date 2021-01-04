import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import Reducer from './Reducers';

// localStorage.js
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


// localStorage.js
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};


const logger = ({ getState }) => {
    return next => action => {
        console.log('will dispatch', action)

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

// store.js
const persistedState = loadState();

const store = createStore(Reducer, persistedState,  applyMiddleware(logger, thunk));

store.subscribe(() => {
    saveState({
        posts: store.getState().posts,
        user: store.getState().user,
        isAdmin: store.getState().isAdmin

    });
});

export default store;