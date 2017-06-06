import React, { Component } from 'react';
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
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
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
