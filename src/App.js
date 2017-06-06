import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://samplereact',
    author: 'Jordan Walk',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://sampleredux',
    author: 'Dan Abramov',
    num_comments: 2,
    points: 5,
    objectID: 1,

  }
];


function isSearched(searchTerm){
  return function(list){
    return !searchTerm ||
      list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.author.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);

  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const {searchTerm, list } = this.state
    return (
      <div className="App">
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={this.onSearchChange}
          />
        </form>

        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
          <div key = {item.objectID}>
            <span>
              <a href={item.url}> {item.title} </a>
            </span>

            <span> {item.author} </span>
            <span> {item.num_comments} </span>
            <span> {item.points} </span>
          </div>
        )}

      </div>
    );
  }
}

export default App;
