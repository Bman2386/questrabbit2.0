import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import './stylesheets/application.css';
import './stylesheets/calendar.css';
import './stylesheets/footer.css';
import './stylesheets/icon.css';
import './stylesheets/quest_form.css';
import './stylesheets/session_form.css';


const store = configureStore();
// this will need to get updated as the store function is going to be depricated
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
};

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

if ( // this condition is needed to ensure session tokens are generated for the user even if they are not loggedin
  // sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
  ) store.dispatch(sessionActions.restoreSession());
renderApplication();



