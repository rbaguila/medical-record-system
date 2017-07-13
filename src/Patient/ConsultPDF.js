//A button + Modal that generates the consultation process

import React, {Component} from 'react';
import * as bootstrap from 'react-bootstrap';
import './ConsultPDF.css';
import * as newjs from './sample.js';
import {Field} from '../importables';

var jsPDF = require('jspdf');

export class ConsultPDF extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: props.item,
            showModal: false,
            value: "Mr/Ms. " + props.item.lastName+ "\n\n" +newjs.consultValue,
            fieldValue: ''
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.generateConsultation = this.generateConsultation.bind(this);
        this.textChange = this.textChange.bind(this);
        this.fieldChange = this.fieldChange.bind(this);
        this.addPres = this.addPres.bind(this);
    }

    open(){
        this.setState({ showModal: true });
    }

    close(){
        this.setState({ showModal: false });
    }

    generateConsultation(){
        var pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFont("times");
        pdf.setFontSize("10");
        pdf.text(30,30, this.state.value);
        pdf.save("consultation.pdf");
    }

    textChange(){
        this.setState({ value: this.state.value +"\n"+ this.state.fieldValue});
        this.setState({ fieldValue: ''});
    }

    fieldChange(event){
        this.setState({ fieldValue: event.target.value })
    }

    addPres(){
        if(this.state.fieldValue === ''){
            //Cannot be empty!
            console.log("Cannot be empty!");
        }else{ 
            this.textChange();
        }
        
    }

    render(){

       

        return(
            <div>
                <bootstrap.Button
                    bsStyle="success"
                    bsSize="small"
                    onClick={this.open}
                >
                    Generate Consultation
                </bootstrap.Button>

                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Consultation</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <div className="textDiv">
                            <textarea
                                value={this.state.value}
                                onChange={this.textChange}
                                className="myText"
                                disabled>
                               
                            </textarea>
                        </div>

                        <div className="addPres">
                            <Field
                                value={this.state.fieldValue}
                                onChange={this.fieldChange}
                            >
                        
                            </Field>

                            <bootstrap.Button
                                bsSize="small"
                                onClick={this.addPres}
                            >
                                Add 
                            </bootstrap.Button>
                        </div>
                    </bootstrap.Modal.Body>
                    
                    <bootstrap.Modal.Footer>
                        <bootstrap.Button bsStyle="primary" bsSize="small" onClick={this.generateConsultation}> Generate and Save </bootstrap.Button>
                        <bootstrap.Button bsStyle="danger" bsSize="small" onClick={this.close}> Cancel </bootstrap.Button>
                    </bootstrap.Modal.Footer>
                </bootstrap.Modal>
            </div>

        );
    }
}

export default ConsultPDF;