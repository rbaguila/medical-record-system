import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import * as bootstrap from 'react-bootstrap';
import './Home.css';

//These are the buttons that are always present
export class Home extends Component{

    render(){
        return(
            <div>
                <Link to="/patients">
                    <bootstrap.Button
                        bsStyle="danger"
                        bsSize="small">
                        Patients
                    </bootstrap.Button>
                </Link>
                <Link to="/medicines">
                    <bootstrap.Button
                        bsStyle="success"
                        bsSize="small"
                    >
                        Medicines
                    </bootstrap.Button>
                </Link>

                <div className="loginregister">
                    <LoginModal/>
                    <RegisterModal />
                </div>
                

                {this.props.children}
            
            </div>    
        );
    }
}

export default Home;