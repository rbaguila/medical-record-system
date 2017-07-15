//Returns a bootstrap button and bootstrap modal for adding patient
import React, { Component } from 'react';
import axios from 'axios';

//Imports all importables from react-bootstrap and puts in a variable named bootstrap
//Can be accessed by e.g., bootstrap.Button
import * as bootstrap from 'react-bootstrap';
import {Field} from '../importables';
import {FieldGroup} from '../importables';
import {ProceduresTable} from './ProceduresTable';
import {Procedures} from './Procedures';

const procedureAPI = `http://localhost:3001/api/procedures/`;

export class AddProcedure extends Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            searchName: '',
            searchDescription: '',
            searchFee: '',
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.onSearchName = this.onSearchName.bind(this);
        this.onSearchDescription= this.onSearchDescription.bind(this);
        this.onSearchFee = this.onSearchFee.bind(this);
    }

    submit(){

        if(this.state.searchName === '' || this.state.searchDescription === '' || this.state.searchFee
        === ''){
            console.log("Fields cannot be empty");
            this.close();
        }else{
             axios.post(procedureAPI, {
                name: this.state.searchName ,
                description: this.state.searchDescription,
                fee: this.state.searchFee
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
    onSearchName(event) {
        this.setState({ searchName: event.target.value });
    }

    onSearchDescription(event) {
        this.setState({ searchDescription: event.target.value });
    }

    onSearchFee(event) {
        this.setState({ searchFee: event.target.value });
    }

    render(){
        return(
            <div>
                <bootstrap.Button
                    bsStyle="success"
                    onClick={this.open}
                    bsSize="small"
                >
                    Add Procedure
                </bootstrap.Button>


                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Add Procedure</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <div>
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Procedure name"
                                placeholder="Enter procedure name"
                                value={this.state.searchName}
                                onChange={this.onSearchName}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Description"
                                placeholder="Enter description"
                                value={this.state.searchDescription}
                                onChange={this.onSearchDescription}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Fee"
                                placeholder="Enter fee"
                                value={this.state.searchFee}
                                onChange={this.onSearchFee}
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


export default AddProcedure;