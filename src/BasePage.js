import React, {Component} from 'react';

import axios from 'axios';


import {AddModal} from './Medicine/AddModal';
import {DismissModal} from './Medicine/DismissModal';

import "./BasePage.css";
import * as bootstrap from 'react-bootstrap';
import aw2 from "./images/aw2.png";

const medicineAPI = `http://localhost:3001/api/medicines/`;
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

                <bootstrap.Col md={2} className="leftNav">
                    <div className="welcomeIcon">
                        <center>Welcome, Bruce Wayne</center>
                    </div>

                    <div className="myLinks">
                     


                    </div>
                </bootstrap.Col>

                <bootstrap.Col md={10} className="rightNav">
                    <div className="navIcon">
                        <bootstrap.Col md={4}>
                            
                        </bootstrap.Col>

                        <bootstrap.Col md={4}>
                            <center><img src={aw2} className="myLogo"/></center>
                        </bootstrap.Col>

                        <bootstrap.Col md={4}>
                            <div className="rightNavIcons">
                                <bootstrap.Button bsSize="large" ><bootstrap.Glyphicon glyph="glyphicon glyphicon-cog" className="glyphs"/></bootstrap.Button>
                                <bootstrap.Button bsSize="large"><bootstrap.Glyphicon glyph="glyphicon glyphicon-question-sign" className="glyphs"/></bootstrap.Button>
                            </div>
                           
                        </bootstrap.Col>
                        
                    </div>


                    <center><hr className="divider" /></center>

                    <div className="basicInfo">

                    </div>

                    <div className="tables">
                        <center><AddModal /></center>

                        <div className="container">
                            <bootstrap.Panel header="Medicine" bsStyle="info" className="panels">
                                <bootstrap.Table responsive striped bordered  >
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