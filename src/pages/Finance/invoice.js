import React, { Component } from 'react';



export class invoice extends Component {

  render() {
    return (
   
   
     <div>
      
        <div className="page-header">
          <h3 className="page-title">Invoices</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Finance</a></li>
              <li className="breadcrumb-item active" aria-current="page">Invoices</li>
            </ol>
          </nav>
        </div>

      </div>

    )
  }
}

export default invoice
