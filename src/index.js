import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

import Home from './Home';
import Medicines from './Medicine/Medicines';
import Patients from './Patient/Patients';
import './index.css';

var browserHistory = createHistory();


//Add routes here
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <Route path="/patients" component={Patients} />
            <Route path="/medicines" component={Medicines} />
        </Route>
    </Router>, 
    
    document.getElementById('root'));
registerServiceWorker();

