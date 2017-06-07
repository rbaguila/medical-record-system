import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// We can use it later to make fetching of data more dynamic 
// const DEFAULT_QUERY = 'redux';
// const PATH_BASE = 'https://hn.algolia.com/api/v1';
// const PATH_SEARCH = '/search';
// const PARAM_SEARCH = 'query=';
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
const medicineAPI = `http://localhost:3001/api/medicines/`;

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

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
    
    this.addMed = this.addMed.bind(this);
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
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
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


      fetch(medicineAPI, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brandName: brandName,
          genericName: genericName,
          dosage: dosage
        })
      })

      //Reloads the window
      window.location.reload();    
    }
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
          >
            Add Medicine
          </Button>


        <Table 
          list={result}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />

      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
  {children}
  </button>

const Field = ({name, children}) =>
  <form>
    <input
      id={name}
      type="text"
      placeholder = {children}
      />
  </form>



const Table = ({ list, pattern, onDismiss}) =>

  <div className="table">
      { list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '30%' }}>{item.genericName}</span>
          <span style={{ width: '30%' }}>{item.brandName}</span>
          <span style={{ width: '10%' }}>{item.dosage}</span>
          
          <span style={{ width: '10%' }}>
          <Button 
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
          </span>
        </div>
      )}
    </div>


export default App;
