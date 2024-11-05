import React, { Component } from 'react';

class Buttons extends Component {
  render () {
    return (

      <div>

        <div className="page-header">
          <h3 className="page-title">Carriers</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Carriers</a></li>
              <li className="breadcrumb-item active" aria-current="page">Carriers List</li>
            </ol>
          </nav>
        </div>

      </div>

    );
  }
}

export default Buttons;