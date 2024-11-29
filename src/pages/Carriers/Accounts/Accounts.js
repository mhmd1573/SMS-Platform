import React, { Component } from 'react';
import './Accounts.css'


export class Accounts extends Component {

  render() {
    return (
   
   
     <div>
      
        <div className="page-header">
          <h3 className="page-title"> Accounts</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Carriers</a></li>
              <li className="breadcrumb-item active" aria-current="page">Accounts</li>
            </ol>
          </nav>
        </div>

      </div>

    )
  }
}

export default Accounts
