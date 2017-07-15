import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import {Link} from 'react-router-dom';


import * as bootstrap from 'react-bootstrap';
import {FieldGroup} from './importables';

import Home from './Home';
import Medicines from './Medicine/Medicines';
import Patients from './Patient/Patients';
import Procedures from './Procedures/Procedures';
import LoginRegister from './LoginRegister';

import UserProfile from './UserProfile';

const usersAPI = `http://localhost:3001/api/users`;



export class LoginModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            userField: '',
            passField: '',
            result: null,
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.submit = this.submit.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
    }

    setResponseData(result){

        var loggeduser;
        var loggedIn = false;
        var passwordIn = false;

        this.setState({result});

         for(var i=0; i<result.length; i++){
            if(result[i].username === this.state.userField){
                if(result[i].password === this.state.passField){
                    loggedIn = true;
                    loggeduser = result[i];
                }else{
                    passwordIn = true;
                }
            }
        }

        if(loggedIn === true){
            UserProfile.setUser(loggeduser);
        }else{
            if(loggedIn === false && passwordIn === true){
                console.log("You have entered a wrong password");
            }else if(loggedIn === false && passwordIn === false){
                console.log("Wrong username or password");
            }
        }

        this.close();
    }

    submit(){
        // Make a request for a user with a given ID
        fetch(usersAPI)
          .then(response => response.json())
          .then(result => this.setResponseData(result));


    }

    userChange(event){
        this.setState({ userField: event.target.value });
    }

    passChange(event){
        this.setState({ passField: event.target.value });
    }

    open(){
        this.setState({ showModal: true });
    }

    close(){
        this.setState({ showModal: false});
    }



    render(){
        return(
            <span>
                <bootstrap.Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                    >
                    Login
                </bootstrap.Button>

                    <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                        <bootstrap.Modal.Header closeButton>
                            <bootstrap.Modal.Title>Sign-in</bootstrap.Modal.Title>
                        </bootstrap.Modal.Header>

                        <bootstrap.Modal.Body>
                            <div>
                                <div>
                                   
                                  
                                    <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Username"
                                        placeholder="Enter username"
                                        value={this.state.userField}
                                        onChange={this.userChange}
                                    />
                                                                        
                                </div>

                                <div>
                                    <FieldGroup
                                        id="formControlsText"
                                        type="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        value={this.state.passField}
                                        onChange={this.passChange}
                                    />
                                   
                                </div>

                            </div>
                        </bootstrap.Modal.Body>

                        <bootstrap.Modal.Footer>
                            <Link onClick={this.submit} to="/patients" className="btn btn-primary">Submit</Link>
                            <bootstrap.Button onClick={this.close}>Close</bootstrap.Button>
                        </bootstrap.Modal.Footer>
                    </bootstrap.Modal>
                
            </span>
            
        );
    }
}

export default LoginModal;