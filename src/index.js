import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

import Routes from './Routes';
import './index.css';

var browserHistory = createHistory();


//Add routes here
ReactDOM.render(
    <Routes />, 
    
    document.getElementById('root'));
registerServiceWorker();

