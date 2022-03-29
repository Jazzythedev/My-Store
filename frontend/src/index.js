import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'              /* to assist with linking store to app */
import store from './store'                     /* stores info in global memory fo rquick accessing */
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.css'

ReactDOM.render(
  <Provider store={store}>               {/* Provider says here is the store we are providing for the whole application. here is the store fuction that fires the creatstore. Now store is available to every application. */}{/* this is a temporary store in your browser used by your apploication alone. */}
    <App />
 </Provider> 
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
