import React, { Component } from 'react';

import ProgressTable from '../../components/ProgressTable/ProgressTable'

export class SMS extends Component {

  render() {
    return (
   
   
     <div>  

      <div className="page-header">
          <h3 className="page-title">Analysis</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Analysis</a></li>
              <li className="breadcrumb-item active" aria-current="page">SMS</li>
            </ol>
          </nav>
        </div>

     <ProgressTable />     
     <ProgressTable />
     
      </div>

    )
  }
}

export default SMS



    
