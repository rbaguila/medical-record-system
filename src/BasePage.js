import React, {Component} from 'react';

import axios from 'axios';


import {AddModal} from './Medicine/AddModal';
import {DismissModal} from './Medicine/DismissModal';

import "./BasePage.css";
import * as bootstrap from 'react-bootstrap';
import aw2 from "./images/aw2.png";
import avatar from "./images/avatar.png";

const medicineAPI = `http://localhost:3001/api/medicines/`;


const optionstt = (
    <bootstrap.Tooltip id="tooltip"><strong>Options</strong></bootstrap.Tooltip>
);
const messagestt = (
    <bootstrap.Tooltip id="tooltip"><strong>Messages</strong></bootstrap.Tooltip>
);
const helptt = (
    <bootstrap.Tooltip id="tooltip"><strong>Help</strong></bootstrap.Tooltip>
);


let medicineTable;

export class BasePage extends Component{

    constructor(props){
        super(props);

        this.state = {
            result: null,
            searchTerm: '',
            showModal: false,
            
        }
    }


    setSearchTopstories(result) {
        this.setState({ result });
    }

  fetchSearchTopstories() {
    //convert fetching of data to axios command
    fetch(medicineAPI)
    .then(response => response.json())
    .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories();
  }

  componentWillUpdate(nextProps, nextState){
      this.fetchSearchTopstories();
  }


    render(){


        const {searchTerm, result} = this.state;
        if(!result){
            return null;
        }

        medicineTable = result.map(item =>{
            return(
                <tr key={item._id}>
                    <th>{item.genericName}</th>
                    <th>{item.brandName}</th>
                    <th>{item.dosage}</th>
                    <th>
                        <bootstrap.Button bsStyle="primary">Edit</bootstrap.Button>
                        <bootstrap.Button bsStyle="danger">Delete</bootstrap.Button>
                    </th>
                </tr>
            );
        })



        return(

            <div>

                <bootstrap.Col sm={2} md={2} className="leftNav">
                    <div className="overhead">
                        
                    </div>

                    <div className="welcomeIcon">
                        <div className="sampleBox">
                            <img src= {avatar} />
                            <h2> Hello, first name </h2>
                            <p>
                                <em>Ptr number: 041475654</em>
                            </p>
                                <em>License number: 0413218</em>    
                        </div>
                    </div>

                    <div className="myLinks">
                        Medicine
                        Patients
                        Procedures
                    </div>

                    <div className="underhead">

                    </div>
                </bootstrap.Col>

                <bootstrap.Col sm={10} md={10} className="rightNav">
                    <div className="navIcon">
                        <bootstrap.Col sm= {4} md={4}>
                            <div className="leftNavIcons">
                                <bootstrap.OverlayTrigger placement="bottom" overlay={messagestt}>
                                    <bootstrap.Button bsSize="large" ><bootstrap.Glyphicon glyph="glyphicon glyphicon-envelope" className="glyphs"/></bootstrap.Button>
                                </bootstrap.OverlayTrigger>
                                
                                 <bootstrap.OverlayTrigger placement="bottom" overlay={helptt}>
                                     <bootstrap.Button bsSize="large"><bootstrap.Glyphicon glyph="glyphicon glyphicon-question-sign" className="glyphs"/></bootstrap.Button>
                                </bootstrap.OverlayTrigger>
                            </div>
                        </bootstrap.Col>

                        <bootstrap.Col sm={4} md={4}>
                            <center><img src={aw2} className="myLogo"/></center>
                        </bootstrap.Col>

                        <bootstrap.Col sm={4} md={4}>
                            <div className="rightNavIcons">
                                <bootstrap.OverlayTrigger placement="bottom" overlay={optionstt}>
                                    <bootstrap.Button bsSize="large" ><bootstrap.Glyphicon glyph="glyphicon glyphicon-cog" className="glyphs"/></bootstrap.Button>
                                </bootstrap.OverlayTrigger>

                                <bootstrap.Button bsSize="large"><bootstrap.Glyphicon glyph="glyphicon glyphicon-user" className="glyphs"/></bootstrap.Button>
                            </div>
                           
                        </bootstrap.Col>
                        
                    </div>


                    <center><hr className="divider" /></center>

                    <div className="tables">
                        <div className="container">
                            <bootstrap.Panel header="Medicine" bsStyle="info">
                                <bootstrap.Table responsive striped bordered>
                                    <thead>
                                        <tr>
                                            <th>Generic Name</th>
                                            <th>Brand Name</th>
                                            <th>Dosage</th>
                                            <th colspan="2">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {medicineTable}
                                    </tbody>

                                </bootstrap.Table>
                            </bootstrap.Panel>
                        </div>
                    </div>
                </bootstrap.Col>


            </div>

        );
    }
}

export default BasePage;