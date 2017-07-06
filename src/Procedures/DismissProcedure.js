//Returns a boostrap Button and a bootstrap modal for deleting procedures

import React, { Component } from 'react';
import axios from 'axios';

//Imports all importables from react-bootstrap and puts in a variable named bootstrap
//Can be accessed by e.g., bootstrap.Button
import * as bootstrap from 'react-bootstrap';


export class DismissProcedure extends Component{
    
    //Accepts an item and sets it as its own
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            item: props.item
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
    }

    //Delete function
    submit(){
        console.log(this.state.item._id);
        axios.delete(`http://localhost:3001/api/procedure/` + this.state.item._id);
        this.close();
        window.location.reload();        
    }

    open(){
        this.setState({ showModal: true});
    }

    close(){
        this.setState({ showModal: false });
    }
    render(){

        return(
            <div>
                <bootstrap.Button
                    bsStyle="danger"
                    bsSize="small"
                    onClick={this.open}>
                    Dismiss
                </bootstrap.Button>

                <bootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <bootstrap.Modal.Header closeButton>
                        <bootstrap.Modal.Title>Delete Procedure</bootstrap.Modal.Title>
                    </bootstrap.Modal.Header>

                    <bootstrap.Modal.Body>
                        <p>Are you sure you want to delete this?</p>
                    </bootstrap.Modal.Body>

                    <bootstrap.Modal.Footer>
                        <bootstrap.Button onClick={this.submit} bsStyle="danger"> Yes </bootstrap.Button>
                        <bootstrap.Button onClick={this.close}>Cancel</bootstrap.Button>
                    </bootstrap.Modal.Footer>
                </bootstrap.Modal>
            </div>

        );
    }
}

export default DismissProcedure;