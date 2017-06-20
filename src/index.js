import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {myRoutes} from './myRoutes';
import Home from './Home';
import Archives from './Archives';
import Main from './Main'
import Pdf from './Pdf';
import './index.css';

var browserHistory = createHistory();

ReactDOM.render(
    <Router history={browserHistory}>
        <Home>
            <Route path="/archives" component={Archives} />
            <Route path="/app" component={App} />
        </Home>
    </Router>, 
    
    document.getElementById('root'));
registerServiceWorker();


// ReactDOM.render(<Pdf />, document.getElementById('root2'));