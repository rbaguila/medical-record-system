//Returns a boostrap Button and a bootstrap modal for editing medicine

import React, { Component } from 'react';
import axios from 'axios';

//Imports all importables from react-bootstrap and puts in a variable named bootstrap
//Can be accessed by e.g., bootstrap.Button
import * as bootstrap from 'react-bootstrap';
import {Field} from '../importables';

export class EditModal extends Component{

    //Constructor is used to substitute for getInitialState();
    constructor(props){
        super(props);
        //console.log(props.item.genericName)
        this.state = {
            //Show modal should be set to false
            showModal: false,
            item: props.item,
            searchTermGeneric: props.item.genericName,
            searchTermBrand: props.item.brandName,
            searchTermDosage: props.item.dosage
            
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onSearchChangeGeneric = this.onSearchChangeGeneric.bind(this);
        this.onSearchChangeBrand= this.onSearchChangeBrand.bind(this);
        this.onSearchChangeDosage = this.onSearchChangeDosage.bind(this);
        this.submit = this.submit.bind(this);
        
    };

    //Submit function for edit
    submit(){

        axios.put(`http://localhost:3001/api/medicine/` + this.state.item._id, {
            genericName: this.state.searchTermGeneric,
            brandName: this.state.searchTermBrand,
            dosage: this.state.searchTermDosage
        }).then(function(response){
           console.log(response);
        }).then(function(error){
          console.log(error);
        })

        this.close();
    }

    //Required to open and close modal
    close(){
        this.setState({showModal: false});
    }

    open(){
        this.setState({ showModal: true});
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
                        <bootstrap.Modal.Title>Edit Medicine</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <div>
                            <p>Enter new generic name: </p>
                            
                            
                            <Field
                                name="genericField"
                                value={this.state.searchTermGeneric}
                                onChange = {this.onSearchChangeGeneric}
                            >
                                Generic Name
                            </Field>


                            <p>Enter new brand name: </p>
                            <Field
                                name="brandField"
                                value={this.state.searchTermBrand}
                                onChange = {this.onSearchChangeBrand}
                            >
                                Brand Name
                            </Field>

                            <p>Enter new dosage: </p>
                            <Field
                                name="dosageField"
                                value={this.state.searchTermDosage}
                                onChange = {this.onSearchChangeDosage}
                            >
                                Dosage Name
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

export default EditModal;