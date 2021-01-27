//

import { combineReducers } from 'redux';
// need to import all other reducers to the root reducer
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

export default combineReducers({
    alert,
    auth,
    profile,
    post
});