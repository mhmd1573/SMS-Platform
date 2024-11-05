import React, { Component } from 'react'

export class Mdi extends Component {
  render() {
    return (

      <div>
        <div className="page-header">
          <h3 className="page-title">
            Material design icons
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Icons</a></li>
              <li className="breadcrumb-item active" aria-current="page">Material design icons</li>
            </ol>
          </nav>
        </div>

      </div>

      
    )
  }
}

export default Mdi
