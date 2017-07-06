import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';

import Home from './Home';

import LoginRegister from './LoginRegister';
import Medicines from './Medicine/Medicines';
import Patients from './Patient/Patients';
import Procedures from './Procedures/Procedures';


const browserHistory = createHistory();

export class Routes extends Component{
    render(){
        return(

            <Router history={browserHistory}>
                <Home>
                    <Route path="/login" component={LoginRegister} />
                    <Route path="/medicines" component={Medicines} />
                    <Route path="/patients" component={Patients} />
                    <Route path="/procedures" component={Procedures} />
                </Home>
            </Router>
        );
    }
}

export default Routes;