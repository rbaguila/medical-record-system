import React, {Component} from 'react';

import {Search} from '../importables';
import {ProceduresTable} from './ProceduresTable';
import {AddProcedure} from './AddProcedure';
import {EditProcedure} from './EditProcedure';

const proceduresAPI = 'http://localhost:3001/api/procedures';

export class Procedures extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            result: null,
            searchTerm: ''
        }

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchTopStories = this.fetchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    setSearchTopStories(result){
        this.setState({ result });
    }

    fetchTopStories(){
        fetch(proceduresAPI)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result));
    }

    componentDidMount(){
        const {searchTerm} = this.state;
        this.fetchTopStories(searchTerm);
    }

    onSearchChange(event){
        this.setState({ searchTerm: event.target.value });
    }
    
    render(){

        const { searchTerm, result } = this.state;
        if(!result){
            return null;
        }

        return(
            <div>
                <h1>Procedures</h1>
                <div className="page">
                    <div className="interactions">

                        <Search
                            value={searchTerm}
                            onChange={this.onSearchChange}
                        >
                            Search
                        </Search>
                    </div>

                    <div>
                        <AddProcedure />
                        
                    </div>

                    <ProceduresTable
                        list={result}
                        pattern={searchTerm}
                   />

                </div>
            </div>

        );
    }
}

export default Procedures;