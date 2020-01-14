import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
