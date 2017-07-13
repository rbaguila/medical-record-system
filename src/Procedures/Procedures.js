import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as bootstrap from 'react-bootstrap';
import axios from 'axios';
import "../BasePage.css";

import {Search} from '../importables';
import {AddProcedure} from './AddProcedure';
import {EditProcedure} from './EditProcedure';
import {DismissProcedure} from './DismissProcedure';

import aw2 from "../images/aw2.png";
import avatar from "../images/avatar.png";

const procedureAPI = `http://localhost:3001/api/procedures/`;

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


let procedureTable;

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
    fetch(procedureAPI)
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
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase());
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

        procedureTable = result.filter(this.isSearched(searchTerm)).map(item =>{
            return(
                <tr key={item._id}>
                    <th>{item.name}</th>
                    <th>{item.description}</th>
                    <th>{item.fee}</th>
                    <th>
                        <bootstrap.ButtonToolbar>
                            <EditProcedure item={item} />
                            <DismissProcedure item={item} />
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
                            <Link to="/patients" className="btn btn-primary">Patients</Link>
                            <Link to="/medicines" className="btn btn-primary">Medicines</Link>
                            <Link to="/procedures" className="btn btn-primary active">Procedures</Link>

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
                            <bootstrap.Panel header="Procedures" bsStyle="info">

                                <bootstrap.ButtonToolbar>
                                    <AddProcedure />
									
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
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>fee</th>
                                            <th colspan="2">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {procedureTable}
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