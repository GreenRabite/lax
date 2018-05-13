import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
// import configureStore from './store/configureStore';

document.addEventListener('DOMContentLoaded',()=>{
  const root = document.getElementById('root');
  let preloadedState = undefined;
  // const store = configureStore(preloadedState);
  // window.store = store;
  ReactDOM.render(<Root/>,root);
  // ReactDOM.render(<Root store={store}/>,root);
});
