import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import {Link} from 'react-router-dom';

import * as bootstrap from 'react-bootstrap';
import {Field} from './importables';

import Home from './Home';
import Medicines from './Medicine/Medicines';
import Patients from './Patient/Patients';
import Procedures from './Procedures/Procedures';

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
        this.createPaths = this.createPaths.bind(this);
    }



    createPaths(){

        var browserHistory = createHistory();

        //Add paths here
        ReactDOM.render(
            <Router history={browserHistory}>
                <Home>
                    <Route path="/patients" component={Patients} />
                    <Route path="/medicines" component={Medicines} />
                    <Route path="/procedures" component={Procedures} />
                </Home>
            </Router>
            , document.getElementById('root'));
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
            console.log("Logged in!");
            UserProfile.setUser(loggeduser);
            console.log(UserProfile.getUser());
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
                    bsSize="small"
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
                                    Enter name:
                                    <Field
                                        id="username"
                                        value={this.state.userField}
                                        onChange={this.userChange}
                                    >
                                        e.g. ertzworm
                                    </Field>
                                </div>

                                <div>
                                    Enter password:
                                    <Field
                                        id="password"
                                        value={this.state.passField}
                                        onChange={this.passChange}
                                    >
                                        e.g. 1234
                                    </Field>
                                </div>

                            </div>
                        </bootstrap.Modal.Body>

                        <bootstrap.Modal.Footer>
                            <bootstrap.Button onClick={this.submit} bsStyle="primary"> Submit </bootstrap.Button>
                            <bootstrap.Button onClick={this.close}>Close</bootstrap.Button>
                        </bootstrap.Modal.Footer>
                    </bootstrap.Modal>
                
            </span>
            
        );
    }
}

export default LoginModal;