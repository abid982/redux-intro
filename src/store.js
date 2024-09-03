import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

/**
 *  MAKING AN API CALL WITH REDUX THUNKS
 *  In order to use this middleware we need to follow three steps
 * 1. First we need to install the middleware package
 * 2. Then we apply that middleware to our store
 * 3. And finally we use the middleware in our action creator functions
 */

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// const store = createStore(rootReducer);
// So with this we basically told our redux/store that we want to use the thunk middleware in our application.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
