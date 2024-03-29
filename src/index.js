import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom"
import store from './Redux/store';
import {Provider} from 'react-redux'
import Axios from "./utils/api";

Axios();

ReactDOM.render(
  <Provider store = {store}>
  <React.Fragment>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
