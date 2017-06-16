import React, {Component} from 'react';

import * as bootstrap from 'react-bootstrap';

var jsPDF = require('jspdf');

export class Pdf extends Component{
    constructor(props){
        super(props);

        this.generatePDF = this.generatePDF.bind(this);

    }

    generatePDF(){
        var pdf = new jsPDF();
        pdf.text(30,30, "Hello World!");
        pdf.save('hello_world.pdf');  
    }


    render(){
        return(
            <div>

                <bootstrap.Button
                    onClick={this.generatePDF}
                    bsSize="large"
                    bsStyle="primary"
                >
                    PDF GO!
                </bootstrap.Button>

                <div id="HTMLtoPDF">
                    <center>
                        <h2> HTML to PDF </h2>
                        <p>Sample pdf!</p>
                    </center>
                </div>
            </div>

        );
    }
}

export default Pdf;