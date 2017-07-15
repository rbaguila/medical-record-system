import React, {Component} from 'react';
import {Router, Route, Redirect} from 'react-router';
import createHistory from 'history/createBrowserHistory';

import Home from './Home';

import LoginRegister from './LoginRegister';
import Medicines from './Medicine/Medicines';
import Patients from './Patient/Patients';
import Procedures from './Procedures/Procedures';

import UserProfile from './UserProfile';


const browserHistory = createHistory();

console.log(UserProfile.isAuth());

function requireAuth(nextState, replace){
    if(!UserProfile.isAuth()){
       replace({
           pathname: '/login',
           state: {nextPathname: nextState.location.pathname}
       })
    }
}


export class Routes extends Component{



    render(){
        return(

            <Router history={browserHistory}>
                <Home>
                    <Route exact path="/" render={() => (
                        <Redirect to="/login"/>
                    )}/>
                    <Route path="/medicines" component={Medicines} onEnter={requireAuth} />
                    <Route path="/patients" component={Patients} onEnter={requireAuth}/>
                    <Route path="/procedures" component={Procedures} onEnter={requireAuth}/>
                    <Route path="/login" component={LoginRegister} />
                </Home>
            </Router>
        );
    }
}

export default Routes;