import React, { Component } from 'react';



export class RateSheet extends Component {

  render() {
    return (
   
   
     <div>
      
        <div className="page-header">
          <h3 className="page-title">Rate Sheet</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Rates</a></li>
              <li className="breadcrumb-item active" aria-current="page">Rate Import </li>
              
            </ol>
          </nav>
        </div>

      </div>

    )
  }
}

export default RateSheet