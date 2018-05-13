import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

//helper methods
import * as APISession from './utils/session_api_utils';
import {login, logout, signup, receiveCurrentUser, receiveErrors } from './actions/session_actions';

document.addEventListener('DOMContentLoaded',()=>{
  const root = document.getElementById('root');
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {
      session: {
        currentUser: window.currentUser
      }
    };
  }
  const store = configureStore(preloadedState);
  window.store = store;
  window.dispatch = store.dispatch;
  // window.login = APISession.login;
  // window.logout = APISession.logout;
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  ReactDOM.render(<Root store={store}/>,root);
});
