import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import * as bootstrap from 'react-bootstrap';
import {Field} from './importables';


const medicineAPI = `http://localhost:3001/api/medicines/`;
let medicineTable;

export class SamplePage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            result: null,
            searchTerm: '',
            showModal: false,
            
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.onSearchChangeGeneric = this.onSearchChangeGeneric.bind(this);
        this.onSearchChangeBrand= this.onSearchChangeBrand.bind(this);
        this.onSearchChangeDosage = this.onSearchChangeDosage.bind(this);
        this.update = this.update.bind(this);
    }

    open(){
        this.setState({ showModal: true});
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

    update(){
        this.fetchSearchTopstories();
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

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
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
                </tr>
            );
        })

        return(


            <div>
                <div>

                </div>
                <bootstrap.PageHeader>Medical Record System <small>Medicine</small></bootstrap.PageHeader>
                <bootstrap.Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Add Some Shit
                </bootstrap.Button>

                <bootstrap.Table responsive striped bordered condensed hover>
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

                {/* Modal functions*/}
                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Add Some Shit</bootstrap.Modal.Title>
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

export default SamplePage;