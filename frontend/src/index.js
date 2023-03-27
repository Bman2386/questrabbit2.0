import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import './stylesheets/application.css';
import './stylesheets/account.css';
import './stylesheets/calendar.css';
import './stylesheets/category_show.css';
import './stylesheets/footer.css';
import './stylesheets/icon.css';
import './stylesheets/inter_form.css';
import './stylesheets/navbar.css';
import './stylesheets/quest_form.css';
import './stylesheets/session_form.css';
import './stylesheets/splash.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )};

const renderApplication = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  )};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
  ) store.dispatch(sessionActions.restoreSession());
renderApplication();



