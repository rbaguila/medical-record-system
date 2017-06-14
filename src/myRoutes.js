import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import {Home} from './Home';
import {App} from './App';


var browserHistory = createHistory();

export class myRoutes extends Component{
    render(){
        return(
            <Router history={browserHistory}>
                <Route path="/" component={Home} />
                    <Route path="app" component={App}></Route>

            
             </Router>
        );   
    }
}

export default myRoutes;