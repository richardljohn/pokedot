import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "../src/index.css"

// Update this line to use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
