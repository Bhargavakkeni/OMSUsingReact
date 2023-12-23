import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Paths from './pages/routes'

/*
This is what gets rendered when 'npm start' command given.
Here we are rendering routes.js component where we define paths or routes for remaining components.
It first create 'root' element and loads the 'index.html' which is in public folder.
In 'index.html' we can define any extra links like bootstrap and so on.  
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Paths />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
