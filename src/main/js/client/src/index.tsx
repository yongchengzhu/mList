import ReactDOM from 'react-dom';
import { createStore, Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './redux/reducers';
import { initialAuthState } from './redux/reducers/AuthReducer';

const store: Store = createStore(
  rootReducer,
  {
    auth: {
      ...initialAuthState,
      isLoggedIn: !!localStorage.getItem('mList-token'),
    },
  },
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
