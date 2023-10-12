import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './@app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const application = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
createRoot(document.getElementById('root')).render(
  <React.StrictMode>{application}</React.StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
