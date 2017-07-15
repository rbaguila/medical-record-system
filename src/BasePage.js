import React, {Component} from 'react';

import axios from 'axios';

import {AddModal} from './Medicine/AddModal';
import {EditModal} from './Medicine/EditModal';
import {DismissModal} from './Medicine/DismissModal';
import {PDFButton} from './Medicine/PDFButton';
import {Search} from './importables';

import "./BasePage.css";
import * as bootstrap from 'react-bootstrap';
import aw2 from "./images/aw2.png";
import avatar from "./images/avatar.png";

const medicineAPI = `http://localhost:3001/api/medicines/`;




const optionstt = (
    <bootstrap.Tooltip id="tooltip"><strong>Preferences</strong></bootstrap.Tooltip>
);
const messagestt = (
    <bootstrap.Tooltip id="tooltip"><strong>Messages</strong></bootstrap.Tooltip>
);
const helptt = (
    <bootstrap.Tooltip id="tooltip"><strong>Help</strong></bootstrap.Tooltip>
);

const signout = (
    <bootstrap.Glyphicon glyph="glyphicon glyphicon-user" className="glyphs"/>
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

		this.isSearched = this.isSearched.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
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
  
	isSearched(searchTerm) {return function(item) {
		return !searchTerm ||
			item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.brandName.toLowerCase().includes(searchTerm.toLowerCase());
		}
	}

	onSearchChange(event){
		this.setState({ searchTerm: event.target.value });
	}




    render(){


        const {searchTerm, result} = this.state;
        if(!result){
            return null;
        }

        medicineTable = result.filter(this.isSearched(searchTerm)).map(item =>{
            return(
                <tr key={item._id}>
                    <th>{item.genericName}</th>
                    <th>{item.brandName}</th>
                    <th>{item.dosage}</th>
                    <th>
                        <bootstrap.ButtonToolbar>
                            <EditModal item={item} />
                            <DismissModal item={item} />
                        </bootstrap.ButtonToolbar>
                        
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
                            <h2> Hello, name </h2>
                            <p>
                                <em>Ptr number: 041475654</em>
                            </p>
                            <p>    
                                <em>License number: 0413218</em>
                            </p>
                        </div>
                    </div>

                    <div className="myLinks">
                        <bootstrap.ButtonGroup vertical block>
                            <bootstrap.Button bsStyle="primary"> Patients </bootstrap.Button>
                            <bootstrap.Button bsStyle="primary" active> Medicines </bootstrap.Button>
                            <bootstrap.Button bsStyle="primary"> Procedures </bootstrap.Button>

                        </bootstrap.ButtonGroup>
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

                                <bootstrap.DropdownButton bsSize="large" title={signout}>
                                    <bootstrap.MenuItem>View Patchnotes</bootstrap.MenuItem>
                                    <bootstrap.MenuItem>View Account</bootstrap.MenuItem>
                                    <bootstrap.MenuItem>Activity Log</bootstrap.MenuItem>
                                    <bootstrap.MenuItem divider/>
                                    <bootstrap.MenuItem>Sign-out</bootstrap.MenuItem>
                                </bootstrap.DropdownButton>
                            </div>
                           
                        </bootstrap.Col>
                        
                    </div>


                    <center><hr className="divider" /></center>

                    <div className="tables">
                        <div className="container">
                            <bootstrap.Panel header="Medicine" bsStyle="info">

                                <bootstrap.ButtonToolbar>
                                    <AddModal />
                                    <PDFButton />
									
                                </bootstrap.ButtonToolbar>

								<div className="searchDiv">
									<Search 
										value={searchTerm}
										onChange={this.onSearchChange}
										
									>
										Search
									</Search>
								</div>
                                

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