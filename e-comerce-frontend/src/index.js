import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importing the main stylesheet
import App from './App'; // Importing the main App component

import { Provider } from 'react-redux'; // Importing the Provider component from react-redux
import store from './redux/store'; // Importing the Redux store

// Rendering the root of the React app and wrapping it with the Redux Provider
ReactDOM.render(
  <Provider store={store}> {/* Wrapping the App with Provider to give it access to the Redux store */}
    <React.StrictMode> {/* Enabling strict mode to catch potential issues in the app */}
      <App /> {/* Rendering the main App component */}
    </React.StrictMode>
  </Provider>,
  document.getElementById('root') // Targeting the HTML element where the app will be mounted
);
