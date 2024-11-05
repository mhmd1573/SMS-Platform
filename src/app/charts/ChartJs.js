import React, { Component } from 'react';
import {Line, Bar, Doughnut, Pie, Scatter} from 'react-chartjs-2';

export class ChartJs extends Component {

   
      
    render() {
        return (


            <div>
                <div className="page-header">
                    <h3 className="page-title">Chart-js</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Charts</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Chart-js</li>
                        </ol>
                    </nav>
                </div>

            </div>
        )
    }
}

export default ChartJs
