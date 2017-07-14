//Returns a bootstrap button and bootstrap modal for adding patient
import React, { Component } from 'react';
import axios from 'axios';

//Imports all importables from react-bootstrap and puts in a variable named bootstrap
//Can be accessed by e.g., bootstrap.Button
import * as bootstrap from 'react-bootstrap';
import {Field} from '../importables';
import {FieldGroup} from '../importables';

const patientAPI = `http://localhost:3001/api/patients/`;

export class AddPatient extends Component{

    constructor(props){
        super(props);
        this.state = {
            fetchData: props.fetchData,
            updateResult: props.updateResult,
            newSearch: props.newSearch,
            force: props.force,
            showModal: false,
            searchFirstName: '',
            searchMiddleName: '',
            searchLastName: '',
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.onSearchFirstName = this.onSearchFirstName.bind(this);
        this.onSearchMiddleName= this.onSearchMiddleName.bind(this);
        this.onSearchLastName = this.onSearchLastName.bind(this);

    }

    submit(){

        if(this.state.searchFirstName === '' || this.state.searchMiddleName === '' || this.state.searchLastName
        === ''){
            console.log("Fields cannot be empty");
            this.close();
        }else{
             axios.post(patientAPI, {
                firstName: this.state.searchFirstName ,
                middleName: this.state.searchMiddleName,
                lastName: this.state.searchLastName
            }).then(function(response){
                console.log(response);
            }).catch(function(error){
                console.log(error);
            });
            this.close();
            

        }
    }

    open(){
        this.setState({ showModal: true});
    }

    close(){
        this.setState({ showModal: false});
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
            <div>
                <bootstrap.Button
                    bsStyle="success"
                    onClick={this.open}
                    bsSize="small"
                >
                    Add Patient
                </bootstrap.Button>


                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Add Patient</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <div>
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="First name"
                                placeholder="Enter first name"
                                value={this.state.searchFirstName}
                                onChange={this.onSearchFirstName}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Middle name"
                                placeholder="Enter middle name"
                                value={this.state.searchMiddleName}
                                onChange={this.onSearchMiddleName}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Last name"
                                placeholder="Enter last name"
                                value={this.state.searchLastName}
                                onChange={this.onSearchLastName}
                            />
                        </div>

                    </bootstrap.Modal.Body>

                    <bootstrap.Modal.Footer>
                        <bootstrap.Button onClick={this.submit} bsStyle="primary">Submit</bootstrap.Button>
                        <bootstrap.Button onClick={this.close}>Close</bootstrap.Button>
                    </bootstrap.Modal.Footer>

                </bootstrap.Modal>
            </div>
        );
    }

}


export default AddPatient;