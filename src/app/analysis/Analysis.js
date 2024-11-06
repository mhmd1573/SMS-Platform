import React, { Component } from 'react';
import { Table } from 'antd';
import { ProgressBar } from 'primereact/progressbar'; // Importing ProgressBar from PrimeReact
import './Analysis.css'; // Importing custom styles

// Define columns for the table
const columns = [
  { title: 'Vendor', dataIndex: 'vendor', key: 'vendor' },
  { title: 'Attempts', dataIndex: 'attempts', key: 'attempts' },
  { title: 'Successful', dataIndex: 'successful', key: 'successful' },
  { title: 'Billable (C)', dataIndex: 'billableC', key: 'billableC' },
  { title: 'Billable (V)', dataIndex: 'billableV', key: 'billableV' },
  { title: 'Submitted', dataIndex: 'submitted', key: 'submitted' },
  {
    title: 'ASR %', 
    dataIndex: 'asr', 
    key: 'asr', 
    render: (text) => (
      <ProgressBar value={parseFloat(text)} 
      displayValueTemplate={valueTemplate}
        style={{ borderRadius: 0 }} // Remove border radius 
        />
    ),
  },
  {
    title: 'DLR (S)', 
    dataIndex: 'dlrS', 
    key: 'dlrS', 
    render: (text) => (
      <ProgressBar value={parseFloat(text)} 
      displayValueTemplate={valueTemplate}  
      style={{ borderRadius: 0 }} // Remove border radius
      />
    ),
  },
  {
    title: 'DLR (T)', 
    dataIndex: 'dlrT', 
    key: 'dlrT', 
    render: (text) => (
      <ProgressBar 
      value={parseFloat(text)} 
      displayValueTemplate={valueTemplate} 
      style={{ borderRadius: 0 }} // Remove border radius
      />
    ),
  },
  { title: 'Activated', dataIndex: 'activated', key: 'activated' },
  { title: 'Delivered (Total)', dataIndex: 'deliveredTotal', key: 'deliveredTotal' },
  { title: 'Delivered w/ Success', dataIndex: 'deliveredSuccess', key: 'deliveredSuccess' },
  { title: 'Delivered w/ Partial Success', dataIndex: 'deliveredPartialSuccess', key: 'deliveredPartialSuccess' },
  { title: 'Delivered w/ Delays', dataIndex: 'deliveredDelays', key: 'deliveredDelays' },
  { title: 'Delivered w/ Errors', dataIndex: 'deliveredErrors', key: 'deliveredErrors' },
  { title: 'Reported', dataIndex: 'reported', key: 'reported' },
  { title: 'HLR Ported', dataIndex: 'hlrPorted', key: 'hlrPorted' },
  { title: 'HLR Crashed', dataIndex: 'hlrCrashed', key: 'hlrCrashed' },
  { title: 'Segments Delivered', dataIndex: 'segmentsDelivered', key: 'segmentsDelivered' },
  { title: 'Average Delivery Time', dataIndex: 'avgDeliveryTime', key: 'avgDeliveryTime' },
  { title: 'Margin USD', dataIndex: 'marginUSD', key: 'marginUSD' },
  { title: 'Revenue USD', dataIndex: 'revenueUSD', key: 'revenueUSD' },
  { title: 'Vendor Cost USD', dataIndex: 'vendorCostUSD', key: 'vendorCostUSD' },
  { title: 'HLR Cost', dataIndex: 'hlrCost', key: 'hlrCost' },
];

// Custom value template to display the progress value (e.g., 40/100)
const valueTemplate = (value) => {
  return (
    <React.Fragment>
      {value} / <b>200</b>
    </React.Fragment>
  );
};

// Sample data for the table
const data = [
  {
    key: '1',
    vendor: "Quantel",
    attempts: 1200,
    successful: 1100,
    billableC: 1000,
    billableV: 1050,
    submitted: 1200,
    asr: '31',
    dlrS: '57',
    dlrT: '190',
    activated: 950,
    deliveredTotal: 1150,
    deliveredSuccess: 1100,
    deliveredPartialSuccess: 30,
    deliveredDelays: 15,
    deliveredErrors: 5,
    reported: 850,
    hlrPorted: 12,
    hlrCrashed: 6,
    segmentsDelivered: 3,
    avgDeliveryTime: '2.5s',
    marginUSD: 160,
    revenueUSD: 520,
    vendorCostUSD: 210,
    hlrCost: 55,
  },
];

export class Analysis extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Analysis</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={(event) => event.preventDefault()}>Analysis</a></li>
              <li className="breadcrumb-item active" aria-current="page">SMS Analysis</li>
            </ol>
          </nav>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', padding: 24, minHeight: 360 }}>
          <Table 
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1500 }} // Adjust the width as needed to enable horizontal scroll
            className="custom-table"
          />
        </div>
      </div>
    );
  }
}

export default Analysis;