import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import {Home} from './Home';
import {App} from './App';


export class myRoutes extends Component{
    render(){
        return(
            <Router>
                <Route path="/" component={Home}>
                    <Route path="app" component={App}></Route>

                </Route>
             </Router>
        );   
    }
}

export default myRoutes;