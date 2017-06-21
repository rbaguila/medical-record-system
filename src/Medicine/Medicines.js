import React, { Component } from 'react';
import '../App.css';

import {MedicinesTable} from './MedicinesTable';
import {Search} from '../importables';
import {AddModal} from './AddModal';
import {PDFButton} from './PDFButton';



// We can use it later to make fetching of data more dynamic 
// const DEFAULT_QUERY = 'redux';
// const PATH_BASE = 'https://hn.algolia.com/api/v1';
// const PATH_SEARCH = '/search';
// const PARAM_SEARCH = 'query=';
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
const medicineAPI = `http://localhost:3001/api/medicines/`;

export class Medicines extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: '',
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    return (

      <div>
        <h1>Medicines</h1>
        <div className="page">

          
          <div className="interactions">
            
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              >
              Search
            </Search>
          </div>

          <div className="MainButtons">
            <AddModal  />
            <PDFButton />
            
          </div>
            <MedicinesTable 
              list={result}
              pattern={searchTerm}
            />
        </div>
      </div>                                                                            
      
    );
  }
}


export default Medicines;
