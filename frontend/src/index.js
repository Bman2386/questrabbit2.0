import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session'
import './stylesheets/application.css';
import './stylesheets/account.css';
import './stylesheets/adv_reviews.css';
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
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

async function tokenCheck(){
  if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
  ) {
 const session = await store.dispatch(sessionActions.restoreSession());
    if (session.ok){
      renderApplication();
    } else {
      tokenCheck();
      }
  } else {
  renderApplication();
  };
};

tokenCheck();


