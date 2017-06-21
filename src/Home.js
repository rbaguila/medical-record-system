import React, {Component} from 'react';
import {Router, Route, Link} from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import * as bootstrap from 'react-bootstrap';


export class Home extends Component{

    render(){
        return(
            <div>
                <Link to="/archives">
                    <bootstrap.Button
                        bsStyle="danger"
                        bsSize="small">
                        Archives
                    </bootstrap.Button>
                </Link>
                <Link to="/app">
                    <bootstrap.Button
                        bsStyle="success"
                        bsSize="small"
                    >
                        App
                    </bootstrap.Button>
                </Link>

                <LoginModal style="border-right: 10px" />
                <RegisterModal />

                {this.props.children}
            
            </div>    
        );
    }
}

export default Home;