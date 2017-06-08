import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import {Field} from './importables';
import {Table} from './importables';
import {Search} from './importables';
import {Button} from './importables';


// We can use it later to make fetching of data more dynamic 
// const DEFAULT_QUERY = 'redux';
// const PATH_BASE = 'https://hn.algolia.com/api/v1';
// const PATH_SEARCH = '/search';
// const PARAM_SEARCH = 'query=';
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
const medicineAPI = `http://localhost:3001/api/medicines/`;
let Editid;
let newGen;
let newBrand;
let newDosage;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: '',
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.editItems = this.editItems.bind(this);
    this.addMed = this.addMed.bind(this);
    this.editMed = this.editMed.bind(this);
  }

  
  setSearchTopstories(result) {
    this.setState({ result });
  }

  fetchSearchTopstories(searchTerm) {
    //convert fetching of data to axios command
    fetch(medicineAPI)
    .then(response => response.json())
    .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  //make this function work then onert in delete function
  //Dito ka magfetch
  onDismiss(id) {
    axios.delete(`http://localhost:3001/api/medicine/` + id);
    window.location.reload();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  addMed(){
    
    let brandName = document.getElementById("brandField").value;
    let genericName = document.getElementById("genericField").value;
    let dosage = document.getElementById("dosageField").value;

    console.log(brandName, genericName, dosage);

    if(brandName === '' || genericName === '' || dosage === ''){
      console.log("Field cannot be empty!");
    }else{
      axios.post(medicineAPI, {
        brandName: brandName,
        genericName: genericName,
        dosage: dosage
      }).then(function(response){
        console.log(response);
      }).catch(function(error){
        console.log(error);
      });

      window.location.reload();
    }
  }

  editItems(item){
    newGen = document.getElementById("newGeneric");
    newBrand = document.getElementById("newBrand");
    newDosage = document.getElementById("newDosage");

    newGen.value = item.genericName;
    newBrand.value = item.brandName;
    newDosage.value = item.dosage;

    Editid = item._id;
  }

  editMed(Editid){
    console.log(Editid);

    let newGen2 = document.getElementById("newGeneric").value;
    let newBrand2 = document.getElementById("newBrand").value;
    let newDosage2 = document.getElementById("newDosage").value;


    axios.put(`http://localhost:3001/api/medicine/` + Editid,{
      genericName: newGen2,
      brandName: newBrand2,
      dosage: newDosage2
    }).then(function(response){
      console.log(response);
    }).then(function(error){
      console.log(error);
    })

    window.location.reload();
  }


  render() {
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    return (                                                                            
      <div className="page">
        <div className="interactions">
          <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          >
          Search
          </Search>
        </div>

        
        <Field
          name="genericField"
        >
        Generic Name
        </Field>

        <Field
          name="brandField"
        >
        Brand Name
        </Field>

        <Field 
         name="dosageField"
        >
        Dosage
        </Field>

        <br />


        <Button
            onClick= {() => this.addMed()}
            className="sample-button"
            bsStyle="primary"
          >
            Add Medicine
          </Button>

          <Table 
            list={result}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
            editItems={this.editItems}
          />


          <Field
            name="newGeneric"
          >
            New Generic Name
          </Field>

          <Field
            name="newBrand"
          >
            New Brand Name
          </Field>

          <Field
            name="newDosage"
          >
            Enter new dosage
          </Field>

          <br />
          <Button
            onClick ={() => this.editMed(Editid)}
            className="sample-button"
          >
            Edit medicine
          </Button>



      </div>
    );
  }
}


export default App;
