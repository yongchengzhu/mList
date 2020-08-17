import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './AuthReducer';
import bookReducer from './BookReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  form: formReducer,
});

export default rootReducer;
