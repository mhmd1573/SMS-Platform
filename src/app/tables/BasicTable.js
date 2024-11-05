import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';

export class BasicTable extends Component {
  render() {
    return (


      <div>
        <div className="page-header">
          <h3 className="page-title"> Basic Tables </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">Basic tables</li>
            </ol>
          </nav>
        </div>
      </div>

      
    )
  }
}

export default BasicTable
