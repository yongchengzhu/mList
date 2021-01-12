import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './AuthReducer';
import bookReducer from './BookReducer';
import contextMenuReducer from './ContextMenuReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  context: contextMenuReducer,
  form: formReducer,
});

export default rootReducer;
