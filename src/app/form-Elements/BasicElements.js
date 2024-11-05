import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';

export class BasicElements extends Component {

  render() {
    return (
   
   
     <div>
      
        <div className="page-header">
          <h3 className="page-title"> Rates</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Rates</a></li>
              <li className="breadcrumb-item active" aria-current="page">Form elements</li>
            </ol>
          </nav>
        </div>

      </div>

    )
  }
}

export default BasicElements
