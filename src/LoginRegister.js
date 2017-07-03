import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import {Link} from 'react-router-dom';

import * as bootstrap from 'react-bootstrap';

import Medicines from './Medicine/Medicines';
import Home from './Home';
import Patients from './Patient/Patients';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

import './login.css';
import aw2 from './aw2.png';

export class LoginRegister extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="body">
                <div className="centerIcon">
                    <img src={aw2} alt={"aw2"} className="fadeIn" />

                    <div className="getStarted">
                        <LoginModal />
                        <RegisterModal />
                    </div>

                </div>
            </div>


        ); 
    }
}

export default LoginRegister;