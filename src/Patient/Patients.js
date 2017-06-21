import React, { Component } from 'react';
import '../App.css';

import {Search} from '../importables';

import {ConsultPDF} from './ConsultPDF';

import {PatientsTable} from './PatientsTable';
import {AddPatient} from './AddPatient';

const patientAPI = 'http://localhost:3001/api/patients';


export class Patients extends Component{

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
        console.log(result);
    }

    fetchTopStories(){
        fetch(patientAPI)
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
                <h1>Patients</h1>
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
                        <AddPatient />
                        
                    </div>

                    <PatientsTable
                        list={result}
                        pattern={searchTerm}
                   />

                </div>
            </div>    
        );
    }
}

export default Patients;