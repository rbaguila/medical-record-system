import React, {Component} from 'react';
import {Field} from './importables';
import * as bootstrap from 'react-bootstrap';
import axios from 'axios';

const addUserAPI = `http://localhost:3001/api/users/`;

export class RegisterModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            userField: 'ertzworm',
            passField: '041895',
            firstNameField: 'Justine',
            middleNameField: 'Bungay',
            lastNameField: 'Guiao',
            officeAddressField: 'Dolores Homesite',
            ptrField: 201229193,
            licenseField: 5991,
            phoneNumberField: 9165000418,
            timeSlotField: '7 AM - 7 PM',
            sexField: 'Male',
            ageField: '22',
            birthField: Date(),
            referralField: 'Roinand Aguila',
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
                    bsSize="small"
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
                            <Field
                                value={this.state.userField}
                                onChange={this.userChange}
                            >

                            e.g. jdlcruz
                            
                            </Field>

                            <Field
                                value={this.state.passField}
                                onChange={this.passChange}
                            >
                            e.g. 1234
                            </Field>

                             <Field
                                value={this.state.firstNameField}
                                onChange={this.firstNameChange}
                             >
                            e.g. Juan
                            </Field>

                             <Field
                                value={this.state.middleNameField}
                                onChange={this.middleNameChange}
                            >
                            e.g. De la
                            </Field>

                             <Field
                                value={this.state.lastNameField}
                                onChange={this.lastNameChange}
                            >
                            e.g. Cruz
                            </Field>

                            <Field
                                value={this.state.officeAddressField}
                                onChange={this.officeAddressChange}
                            >
                            e.g. #102 Dolores Homesite
                            </Field>

                            <Field
                                value={this.state.ptrField}
                                onChange={this.ptrChange}

                            >
                            e.g. 123456-ptr
                            </Field>

                            <Field
                                value={this.state.licenseField}
                                onChange={this.licenseChange}
                            >
                            e.g. 54321-license
                            </Field>

                            <Field
                                value={this.state.phoneNumberField}
                                onChange={this.phoneNumberChange}
                            >
                            e.g. 09165000418
                            </Field>

                            <Field
                                value={this.state.timeSlotField}
                                onChange={this.timeSlotChange}
                            >
                            e.g. 8-9 PM
                            </Field>

                            <Field
                                value={this.state.sexField}
                                onChange={this.sexChange}
                            >
                            e.g. Male, Female
                            </Field>

                            <Field
                                value={this.state.ageField}
                                onChange={this.ageChange}
                            >
                            e.g. 18
                            </Field>

                            <Field
                                value={this.state.birthField}
                                onChange={this.birthChange}
                            >
                            e.g. 04/18/95
                            </Field>

                            <Field
                                value={this.state.referralField}
                                onChange={this.referralChange}
                            >
                            e.g. by Leo Angelo Meguiso
                            </Field>
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