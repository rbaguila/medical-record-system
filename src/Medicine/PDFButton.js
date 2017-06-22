import React, {Component} from 'react';
import * as bootstrap from 'react-bootstrap';

var jsPDF = require('jspdf');
const medicineAPI = `http://localhost:3001/api/medicines/`;

export class PDFButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            result: null,
        }

        this.generatePDF = this.generatePDF.bind(this);
        this.setData = this.setData.bind(this);

    }

    setData(result){
        this.setState({ result });
        
        console.log("Generate PDF!");
        var pdf = new jsPDF('p', 'mm', 'a4');
        var date = new Date();
        pdf.setFont("times");
        pdf.setFontSize(10);
        pdf.text(30,30, "Medicine Inventory");
        pdf.text(30,35, "as of " + date);
        pdf.text(30,50, "Brand Name");
        pdf.text(90,50, "Generic Name");
        pdf.text(150,50, "Dosage");

        var height = 60;
        for(var i=0; i<result.length; i++){
            pdf.text(30, height, result[i].brandName);
            pdf.text(90, height, result[i].genericName);
            pdf.text(150, height, result[i].dosage.toString());
            height += 5;
        }

        pdf.save("medicine_inventory.pdf");
    }

    generatePDF(){
        fetch(medicineAPI)
        .then(response => response.json())
        .then(result => this.setData(result));

        
    }


    render(){
        return(
            <div>
                <bootstrap.Button
                    bsStyle="info"
                    bsSize="small"
                    onClick={this.generatePDF}
                >
                    Generate PDF
                </bootstrap.Button>    
            </div>
        );
    }
}