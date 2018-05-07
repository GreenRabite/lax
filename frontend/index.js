import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
// import configureStore from './store/configureStore';

document.addEventListener('DOMContentLoaded',()=>{
  const root = document.getElementById('root');
  ReactDOM.render(<Root/>,root);
});
