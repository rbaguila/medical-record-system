import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import {LoginRegister} from './LoginRegister';

import Home from './Home';
import Medicines from './Medicine/Medicines';
import Patients from './Patient/Patients';
import './index.css';

var browserHistory = createHistory();


//Add routes here
ReactDOM.render(
    <LoginRegister />, 
    
    document.getElementById('root'));
registerServiceWorker();

