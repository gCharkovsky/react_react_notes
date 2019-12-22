import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('content'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Search this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
