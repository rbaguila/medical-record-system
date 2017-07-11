//Returns a bootstrap button and bootstrap modal for adding medicine
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Routes from '../Routes';
import Medicines from './Medicines';

//Imports all importables from react-bootstrap and puts in a variable named bootstrap
//Can be accessed by e.g., bootstrap.Button
import * as bootstrap from 'react-bootstrap';
import {Field} from '../importables';
import UserProfile from '../UserProfile';

const medicineAPI = `http://localhost:3001/api/medicines/`;

export class AddModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            searchTermGeneric: '',
            searchTermBrand: '',
            searchTermDosage: '',
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.onSearchChangeGeneric = this.onSearchChangeGeneric.bind(this);
        this.onSearchChangeBrand= this.onSearchChangeBrand.bind(this);
        this.onSearchChangeDosage = this.onSearchChangeDosage.bind(this);
    }

    submit(){

        if(this.state.searchTermBrand === '' || this.state.searchTermGeneric === '' || this.state.searchTermDosage
        === ''){
            console.log("Fields cannot be empty");
            this.close();
        }else{
             axios.post(medicineAPI, {
                brandName: this.state.searchTermBrand ,
                genericName: this.state.searchTermGeneric,
                dosage: this.state.searchTermDosage
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
        var user = UserProfile.getUser();
        console.log(user.username);
    }

    close(){
        this.setState({ showModal: false});
    }

    //Dynamic change on button value
    onSearchChangeGeneric(event) {
        this.setState({ searchTermGeneric: event.target.value });
    }

    onSearchChangeBrand(event) {
        this.setState({ searchTermBrand: event.target.value });
    }

    onSearchChangeDosage(event) {
        this.setState({ searchTermDosage: event.target.value });
    }

    render(){
        return(
            <div>
                <bootstrap.Button
                    bsStyle="success"
                    onClick={this.open}
                    bsSize="small"
                >
                    Add Medicine
                </bootstrap.Button>


                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Add Medicine</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <div>
                            <Field
                                name="genericField"
                                value={this.state.searchTermGeneric}
                                onChange = {this.onSearchChangeGeneric}
                            >
                                Generic Name
                            </Field>

                            <Field
                                name="brandField"
                                value={this.state.searchTermBrand}
                                onChange = {this.onSearchChangeBrand}
                            >
                                Brand Name
                            </Field>

                            <Field
                                name="dosageField"
                                value={this.state.searchTermDosage}
                                onChange = {this.onSearchChangeDosage}
                            >
                                Dosage
                            </Field>
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


export default AddModal;