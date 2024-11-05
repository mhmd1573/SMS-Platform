import React, { Component } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

export class Dropdowns extends Component {
  render() {
    return (


      <div>
        <div className="page-header">
          <h3 className="page-title">Dropdowns</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>UI Elements</a></li>
              <li className="breadcrumb-item active" aria-current="page">Dropdowns</li>
            </ol>
          </nav>
        </div>

      </div>
    )
  }
}

export default Dropdowns
