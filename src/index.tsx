import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from './Theme';
import App from './App';
import ScrollToTop from './utils/ScrollToTop';
import store from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { fetchEvents } from './store/actions/eventActions';

store.dispatch(fetchEvents());

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
