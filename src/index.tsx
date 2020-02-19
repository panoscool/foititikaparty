import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from './Theme';
import App from './App';
import history from './history';
import store from './store/configureStore';
import ScrollToTop from './utils/ScrollToTop';
import * as serviceWorker from './serviceWorker';

const app = (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider>
        <CssBaseline />
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
