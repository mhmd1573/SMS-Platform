import React, { Component } from 'react';

import ProgressTable from '../../app/components/ProgressTable/ProgressTable'

export class sms extends Component {

  render() {
    return (
   
   
     <div>
      
        <div className="page-header">
          <h3 className="page-title">SMS</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Analysis</a></li>
              <li className="breadcrumb-item active" aria-current="page">SMS</li>
            </ol>
          </nav>
        </div>


                    {/* Table */}
                   <ProgressTable />



      </div>

    )
  }
}

export default sms
