//Returns a boostrap Button and a bootstrap modal for editing patient

import React, { Component } from 'react';
import axios from 'axios';

//Imports all importables from react-bootstrap and puts in a variable named bootstrap
//Can be accessed by e.g., bootstrap.Button
import * as bootstrap from 'react-bootstrap';
import {Field} from '../importables';

export class EditPatient extends Component{

    //Constructor is used to substitute for getInitialState();
    constructor(props){
        super(props);
        //console.log(props.item.genericName)
        this.state = {
            //Show modal should be set to false
            showModal: false,
            item: props.item,
            searchFirstName: props.item.firstName,
            searchMiddleName: props.item.middleName,
            searchLastName: props.item.lastName,
            
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.onSearchFirstName = this.onSearchFirstName.bind(this);
        this.onSearchMiddleName= this.onSearchMiddleName.bind(this);
        this.onSearchLastName = this.onSearchLastName.bind(this);
        
    };

    //Submit function for edit
    submit(){

        axios.put(`http://localhost:3001/api/patient/` + this.state.item._id, {
            firstName: this.state.searchFirstName ,
            middleName: this.state.searchMiddleName,
            lastName: this.state.searchLastName
        }).then(function(response){
           console.log(response);
        }).then(function(error){
          console.log(error);
        })

        this.close();
        window.location.reload();
    }

    //Required to open and close modal
    close(){
        this.setState({showModal: false});
    }

    open(){
        this.setState({ showModal: true});
    }

   //Dynamic change on button value
    onSearchFirstName(event) {
        this.setState({ searchFirstName: event.target.value });
    }

    onSearchMiddleName(event) {
        this.setState({ searchMiddleName: event.target.value });
    }

    onSearchLastName(event) {
        this.setState({ searchLastName: event.target.value });
    }

    render(){

        
        return(
            //Button  
            <div>
                <bootstrap.Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.open}
                >
                    Edit
                </bootstrap.Button>


                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Edit Patient</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <div>
                            <p>Enter new first name: </p>
                            <Field
                                name="firstNameField"
                                value={this.state.searchFirstName}
                                onChange = {this.onSearchFirstName}
                            >
                                First Name
                            </Field>


                            <p>Enter new middle name: </p>
                            <Field
                                name="middleNameField"
                                value={this.state.searchMiddleName}
                                onChange = {this.onSearchMiddleName}
                            >
                                Middle Name
                            </Field>

                            <p>Enter new last name: </p>
                            <Field
                                name="lastNameField"
                                value={this.state.searchLastName}
                                onChange = {this.onSearchLastName}
                            >
                                Last Name
                            </Field>
                        </div>
                    </bootstrap.Modal.Body>

                    <bootstrap.Modal.Footer>
                        <bootstrap.Button onClick={this.submit} bsStyle="primary"> Submit </bootstrap.Button>
                        <bootstrap.Button onClick={this.close}>Close</bootstrap.Button>
                    </bootstrap.Modal.Footer>

                </bootstrap.Modal>
            </div>
            
        );
    }
}

export default EditPatient;