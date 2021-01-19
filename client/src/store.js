// Set up a redux store for DevConnector
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // import root reducer from reducers/index.js

// init state
const initialState = {};
// add the middleware to the store
const middleware = [thunk];
// set up a store
const store = createStore(
    rootReducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)
    ));

// export the redux store
export default store;