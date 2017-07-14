import React, {Component} from 'react';
import {FieldGroup} from './importables';
import {Field} from './importables';
import * as bootstrap from 'react-bootstrap';
import axios from 'axios';

const addUserAPI = `http://localhost:3001/api/users/`;

export class RegisterModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            userField: '',
            passField: '',
            firstNameField: '',
            middleNameField: '',
            lastNameField: '',
            officeAddressField: '',
            ptrField: '',
            licenseField: '',
            phoneNumberField: '',
            timeSlotField: '',
            sexField: '',
            ageField: '',
            birthField: '',
            referralField: '',
            showModal: false,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);

        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.middleNameChange = this.middleNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.officeAddressChange = this.officeAddressChange.bind(this);
        this.ptrChange = this.ptrChange.bind(this);
        this.licenseChange = this.licenseChange.bind(this);
        this.phoneNumberChange = this.phoneNumberChange.bind(this);
        this.timeSlotChange = this.timeSlotChange.bind(this);
        this.sexChange = this.sexChange.bind(this);
        this.ageChange = this.ageChange.bind(this);
        this.birthChange = this.birthChange.bind(this);
        this.referralChange = this.referralChange.bind(this);
    }

    userChange(event){
        this.setState({ userField: event.target.value });
    }

    passChange(event){
        this.setState({ passField: event.target.value });
    }

    firstNameChange(event){
        this.setState({ firstNameField: event.target.value });
    }

    middleNameChange(event){
        this.setState({ middleNameField: event.target.value });
    }

    lastNameChange(event){
        this.setState({ lastNameField: event.target.value });
    }

    officeAddressChange(event){
        this.setState({ officeAddressField: event.target.value });
    }

    ptrChange(event){
        this.setState({ ptrField: event.target.value });
    }

    licenseChange(event){
        this.setState({ licenseField: event.target.value });
    }

    phoneNumberChange(event){
        this.setState({ phoneNumberField: event.target.value });
    }

    timeSlotChange(event){
        this.setState({ timeSlotField: event.target.value });
    }

    sexChange(event){
        this.setState({ sexField: event.target.value});
    }

    ageChange(event){
        this.setState({ ageField: event.target.value});
    }

    birthChange(event){
        this.setState({ birthField: event.target.field });
    }

    referralChange(event){
        this.setState({ referralField: event.target.value });
    }

    open(){
        this.setState({ showModal: true });
    }

    close(){
        this.setState({ showModal: false });
    }

    submit(){
        axios.post(addUserAPI,{
            username: this.state.userField,
            password: this.state.passField,
            firstName: this.state.firstNameField,
            middleName: this.state.middleNameField,
            lastName: this.state.lastNameField,
            officeAddress: this.state.officeAddressField,
            ptrNumber: this.state.ptrField,
            licenseNumber: this.state.licenseField,
            phoneNumber: this.state.phoneNumber,
            timeSlot: this.state.timeSlotField,
            sex: this.state.sexField,
            age: this.state.ageField,
            birthDate: this.state.birthField,
            refferedBy: this.state.referralField,
        }).then(function(response){
            console.log(response);
        }).then(function(error){
            console.log(error);
        })

        console.log("Succesfully registered!");
        this.close();
    }

    render(){
        return(

            <span>
                <bootstrap.Button
                    bsStyle="info"
                    bsSize="large"
                    onClick={this.open}
                >
                    Register
                </bootstrap.Button>

                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Register</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <div>

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Username"
                                placeholder="Enter username"
                                value={this.state.userField}
                                onChange={this.userChange}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                value={this.state.passField}
                                onChange={this.passChange}
                            />

                            <bootstrap.Form inline>

                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    placeholder="First name"
                                    value={this.state.firstNameField}
                                    onChange={this.firstNameChange}
                                />

                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    placeholder="Middle name"
                                    value={this.state.middleNameField}
                                    onChange={this.middleNameChange}
                                />

                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    placeholder="Last name"
                                    value={this.state.lastNameField}
                                    onChange={this.lastNameChange}
                                />

                            </bootstrap.Form>
                            <br />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Office Address"
                                placeholder="Enter address"
                                value={this.state.officeAddressField}
                                onChange={this.officeAddressChange}
                            />

                            <bootstrap.Form inline>
                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    placeholder="Ptr Number"
                                    value={this.state.ptrField}
                                    onChange={this.ptrChange}
                                />



                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    placeholder="License Number"
                                    value={this.state.licenseField}
                                    onChange={this.licenseChange}
                                />
                            </bootstrap.Form>
                            <br />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Phone Number"
                                placeholder="Enter phone number"
                                value={this.state.phoneNumberField}
                                onChange={this.phoneNumberChange}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Time Slot"
                                placeholder="Enter time slot e.g. (7 AM - 7 PM)"
                                value={this.state.timeSlotField}
                                onChange={this.timeSlotChange}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Sex"
                                placeholder="Enter sex e.g. Male, Female"
                                value={this.state.sexField}
                                onChange={this.sexChange}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Age"
                                placeholder="Enter age"
                                value={this.state.ageField}
                                onChange={this.ageChange}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Birthdate"
                                placeholder="Enter birthdate e.g. 04/18/1995"
                                value={this.state.birthField}
                                onChange={this.birthChange}
                            />

                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Referred By"
                                placeholder="e.g. Leo Angelo"
                                value={this.state.referralField}
                                onChange={this.referralChange}
                            />
                        </div>
                    </bootstrap.Modal.Body>

                    <bootstrap.Modal.Footer>
                        <bootstrap.Button onClick={this.submit} bsStyle="success">Register</bootstrap.Button>
                        <bootstrap.Button onClick={this.close}>Cancel</bootstrap.Button>
                    </bootstrap.Modal.Footer>

                </bootstrap.Modal>

            </span>

        );
    }
}

export default RegisterModal;