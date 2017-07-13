import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import * as bootstrap from 'react-bootstrap';

import UserProfile from './UserProfile';

//These are the buttons that are always present
export class Home extends Component{

    constructor(props){
        super(props);
    }

    render(){

        var name = UserProfile.getUser().username;

        return(
            <div className="body">
                {this.props.children}
            
            </div>    
        );
    }
}

export default Home;