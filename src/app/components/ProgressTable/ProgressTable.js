import React from "react";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProgressTable.css';


const ProgressTable = () => {
  const data = [
    { 
      vendor: 'WxCompany',
      attempts: 100,
      successful: 400,
      billableC: 300,
      billableV: 400,
      submitted: 200,
      asr: 70,
      dlrS: 80,
      dlrT: 50,
      activated: 40,
      deliveredTotal: 200,
      deliveredwSuccess: 90,
      deliveredwPartialSuccess: 90,
      deliveredwDelay: 90,
      deliveredwError: 90,
      reported: 90,
      hlrPorted: 30,
      hlrCrashed: 20,
      segmentsDelivered: 800,
      averageDeliveryTime: 50,
      delivered: 87,
      segments: 14396,
      margin: 8.33,
      revenue: 185.64,
      vendorCost: 178.51,
      hlrCost: 0.31,
      marginPercent: 4.48
    },
    
  ];

  const getProgressColor = (value) => {
    return value < 0 ? "danger" : "primary";
  };





const ProgressCell = ({ value, max, colorVariant }) => (
    <div style={{ position: "relative", width: "100%" }}>
      <ProgressBar
        now={Math.abs(value)}
        variant={colorVariant}
        min={0}
        max={max}
        style={{
          width: "100%",    // Makes the progress bar span the full cell width
          height: "20px",    // Adjusts the height of the bar
          backgroundColor: "#444",
          borderRadius: "3px",
        }}
      />
      {/* Tail-aligned label */}
      <span
        style={{
          position: "absolute",
          top: "4px",
          right: "5px",          // Aligns the label to the end (tail) of the bar
          color: "#fff",
          fontSize: "12px",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );


  return (
    <div className="table-wrapper">
      
      <Table striped bordered hover variant="dark" className="text-center align-middle">
        <thead>
          <tr>
            <th style={{ minWidth: "120px" }}>Vendor</th>
            <th style={{ minWidth: "80px" }}>Attempts</th>
            <th style={{ minWidth: "80px" }}>Successful</th>
            <th style={{ minWidth: "100px" }}>Billable (C)</th>
            <th style={{ minWidth: "100px" }}>Billable (V)</th>
            <th style={{ minWidth: "80px" }}>Submitted</th>
            <th style={{ minWidth: "90px" }}>ASR %</th>
            <th style={{ minWidth: "80px" }}>DLR (S)</th>
            <th style={{ minWidth: "80px" }}>DLR (T)</th>
            <th style={{ minWidth: "80px" }}>Activated</th>
            <th style={{ minWidth: "120px" }}>Delivered (T)</th>
            <th style={{ minWidth: "120px" }}>Delivered w/ Success</th>
            <th style={{ minWidth: "120px" }}>Delivered w/ Partial Success</th>
            <th style={{ minWidth: "120px" }}>Delivered w/ Delays</th>
            <th style={{ minWidth: "120px" }}>Delivered w/ Errors</th>
            <th style={{ minWidth: "80px" }}>Reported</th>
            <th style={{ minWidth: "110px" }}>HLR Ported</th>
            <th style={{ minWidth: "120px" }}>HLR Crashed</th>
            <th style={{ minWidth: "120px" }}>Segments Delivered</th>
            <th style={{ minWidth: "120px" }}>Avg Delivery Time</th>
            <th style={{ minWidth: "80px" }}>Delivered</th>
            <th style={{ minWidth: "80px" }}>Segments</th>
            <th style={{ minWidth: "120px" }}>Margin, USD</th>
            <th style={{ minWidth: "120px" }}>Revenue, USD</th>
            <th style={{ minWidth: "120px" }}>Vendor Cost</th>
            <th style={{ minWidth: "120px" }}>HLR Cost</th>
            <th style={{ minWidth: "120px" }}>Margin %</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.vendor}</td>
              <td><ProgressCell value={row.attempts} max={1000} colorVariant={getProgressColor(row.attempts)} /></td>
              <td><ProgressCell value={row.successful} max={1000} colorVariant={getProgressColor(row.successful)} /></td>
              <td><ProgressCell value={row.billableC} max={1000} colorVariant={getProgressColor(row.billableC)} /></td>
              <td><ProgressCell value={row.billableV} max={10000} colorVariant={getProgressColor(row.billableV)} /></td>
              <td><ProgressCell value={row.submitted} max={1000} colorVariant={getProgressColor(row.submitted)} /></td>
              <td><ProgressCell value={row.asr} max={100} colorVariant={getProgressColor(row.asr)} /></td>
              <td><ProgressCell value={row.dlrS} max={100} colorVariant={getProgressColor(row.dlrS)} /></td>
              <td><ProgressCell value={row.dlrT} max={100} colorVariant={getProgressColor(row.dlrT)} /></td>
              <td><ProgressCell value={row.activated} max={100} colorVariant={getProgressColor(row.activated)} /></td>
              <td><ProgressCell value={row.deliveredTotal} max={100} colorVariant={getProgressColor(row.deliveredTotal)} /></td>
              <td><ProgressCell value={row.deliveredwSuccess} max={100} colorVariant={getProgressColor(row.deliveredwSuccess)} /></td>
              <td><ProgressCell value={row.deliveredwPartialSuccess} max={100} colorVariant={getProgressColor(row.deliveredwPartialSuccess)} /></td>
              <td><ProgressCell value={row.deliveredwDelay} max={100} colorVariant={getProgressColor(row.deliveredwDelay)} /></td>
              <td><ProgressCell value={row.deliveredwError} max={100} colorVariant={getProgressColor(row.deliveredwError)} /></td>
              <td><ProgressCell value={row.reported} max={100} colorVariant={getProgressColor(row.reported)} /></td>
              <td><ProgressCell value={row.hlrPorted} max={100} colorVariant={getProgressColor(row.hlrPorted)} /></td>
              <td><ProgressCell value={row.hlrCrashed} max={100} colorVariant={getProgressColor(row.hlrCrashed)} /></td>
              <td><ProgressCell value={row.segmentsDelivered} max={100} colorVariant={getProgressColor(row.segmentsDelivered)} /></td>
              <td><ProgressCell value={row.averageDeliveryTime} max={100} colorVariant={getProgressColor(row.averageDeliveryTime)} /></td>
              <td><ProgressCell value={row.delivered} max={100} colorVariant={getProgressColor(row.delivered)} /></td>
              <td><ProgressCell value={row.segments} max={100} colorVariant={getProgressColor(row.segments)} /></td>
              <td><ProgressCell value={row.margin} max={100} colorVariant={getProgressColor(row.margin)} /></td>
              <td><ProgressCell value={row.revenue} max={200} colorVariant="success" /></td>
              <td><ProgressCell value={row.vendorCost} max={200} colorVariant="warning" /></td>
              <td><ProgressCell value={row.hlrCost} max={10} colorVariant="info" /></td>
              <td><ProgressCell value={row.marginPercent} max={100} colorVariant={getProgressColor(row.marginPercent)} /></td>
            </tr>
          ))}
        </tbody>


      </Table>

    </div>
  );
};

export default ProgressTable;








// import React from "react";
// import Table from "react-bootstrap/Table";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ProgressTable.css';

// const ProgressTable = () => {
//   const data = [
//     {
//       vendor: 'WxCompany',
//       attempts: 100,
//       successful: 400,
//       billableC: 300,
//       billableV: 400,
//       submitted: 200,
//       asr: 70,
//       dlrS: 80,
//       dlrT: 50,
//       activated: 40,
//       deliveredTotal: 200,
//       deliveredwSuccess: 90,
//       deliveredwPartialSuccess: 90,
//       deliveredwDelay: 90,
//       deliveredwError: 90,
//       reported: 90,
//       hlrPorted: 30,
//       hlrCrashed: 20,
//       segmentsDelivered: 800,
//       averageDeliveryTime: 50,
//       delivered: 87,
//       segments: 14396,
//       margin: 8.33,
//       revenue: 185.64,
//       vendorCost: 178.51,
//       hlrCost: 0.31,
//       marginPercent: 4.48
//     },
//   ];

//   const getProgressColor = (value) => {
//     if (value < 0) return "danger";
//     if (value < 50) return "warning";
//     return "success";
//   };

//   const ProgressCell = ({ value, max, colorVariant }) => (
//     <div style={{ position: "relative", width: "100%" }}>
//       <ProgressBar
//         now={Math.abs(value)}
//         variant={colorVariant}
//         min={0}
//         max={max}
//         style={{
//           width: "100%",
//           height: "20px",
//           backgroundColor: "#444",
//           borderRadius: "3px",
//         }}
//       />
//       <span
//         style={{
//           position: "absolute",
//           top: "4px",
//           right: "5px",
//           color: "#fff",
//           fontSize: "12px",
//           fontWeight: "bold",
//           whiteSpace: "nowrap",
//         }}
//       >
//         {value}
//       </span>
//     </div>
//   );

//   return (
//     <div className="table-wrapper">
//       <Table striped bordered hover variant="dark" className="text-center align-middle">
//         <thead>
//           <tr>
//             <th style={{ minWidth: "120px" }}>Vendor</th>
//             <th style={{ minWidth: "80px" }}>Attempts</th>
//             <th style={{ minWidth: "80px" }}>Successful</th>
//             <th style={{ minWidth: "100px" }}>Billable (C)</th>
//             <th style={{ minWidth: "100px" }}>Billable (V)</th>
//             <th style={{ minWidth: "80px" }}>Submitted</th>
//             <th style={{ minWidth: "90px" }}>ASR %</th>
//             <th style={{ minWidth: "80px" }}>DLR (S)</th>
//             <th style={{ minWidth: "80px" }}>DLR (T)</th>
//             <th style={{ minWidth: "80px" }}>Activated</th>
//             <th style={{ minWidth: "120px" }}>Delivered</th>
//             <th style={{ minWidth: "100px" }}>Delivery Status</th>
//             <th style={{ minWidth: "80px" }}>Reported</th>
//             <th style={{ minWidth: "110px" }}>HLR Ported</th>
//             <th style={{ minWidth: "120px" }}>HLR Crashed</th>
//             <th style={{ minWidth: "120px" }}>Segments Delivered</th>
//             <th style={{ minWidth: "120px" }}>Avg Delivery Time</th>
//             <th style={{ minWidth: "80px" }}>Delivered %</th>
//             <th style={{ minWidth: "80px" }}>Segments</th>
//             <th style={{ minWidth: "120px" }}>Margin, USD</th>
//             <th style={{ minWidth: "120px" }}>Revenue, USD</th>
//             <th style={{ minWidth: "120px" }}>Vendor Cost</th>
//             <th style={{ minWidth: "120px" }}>HLR Cost</th>
//             <th style={{ minWidth: "120px" }}>Margin %</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td>{row.vendor}</td>
//               <td><ProgressCell value={row.attempts} max={1000} colorVariant={getProgressColor(row.attempts)} /></td>
//               <td><ProgressCell value={row.successful} max={1000} colorVariant={getProgressColor(row.successful)} /></td>
//               <td><ProgressCell value={row.billableC} max={1000} colorVariant={getProgressColor(row.billableC)} /></td>
//               <td><ProgressCell value={row.billableV} max={10000} colorVariant={getProgressColor(row.billableV)} /></td>
//               <td><ProgressCell value={row.submitted} max={1000} colorVariant={getProgressColor(row.submitted)} /></td>
//               <td><ProgressCell value={row.asr} max={100} colorVariant={getProgressColor(row.asr)} /></td>
//               <td><ProgressCell value={row.dlrS} max={100} colorVariant={getProgressColor(row.dlrS)} /></td>
//               <td><ProgressCell value={row.dlrT} max={100} colorVariant={getProgressColor(row.dlrT)} /></td>
//               <td><ProgressCell value={row.activated} max={100} colorVariant={getProgressColor(row.activated)} /></td>
//               <td><ProgressCell value={row.deliveredTotal} max={100} colorVariant={getProgressColor(row.deliveredTotal)} /></td>
//               <td>
//                 <div>
//                   <ProgressCell value={row.deliveredwSuccess} max={100} colorVariant="success" />
//                   <ProgressCell value={row.deliveredwPartialSuccess} max={100} colorVariant="warning" />
//                   <ProgressCell value={row.deliveredwDelay} max={100} colorVariant="danger" />
//                   <ProgressCell value={row.deliveredwError} max={100} colorVariant="secondary" />
//                 </div>
//               </td>
//               <td><ProgressCell value={row.reported} max={100} colorVariant={getProgressColor(row.reported)} /></td>
//               <td><ProgressCell value={row.hlrPorted} max={100} colorVariant={getProgressColor(row.hlrPorted)} /></td>
//               <td><ProgressCell value={row.hlrCrashed} max={100} colorVariant={getProgressColor(row.hlrCrashed)} /></td>
//               <td><ProgressCell value={row.segmentsDelivered} max={1000} colorVariant={getProgressColor(row.segmentsDelivered)} /></td>
//               <td><ProgressCell value={row.averageDeliveryTime} max={100} colorVariant={getProgressColor(row.averageDeliveryTime)} /></td>
//               <td><ProgressCell value={row.delivered} max={100} colorVariant={getProgressColor(row.delivered)} /></td>
//               <td><ProgressCell value={row.segments} max={10000} colorVariant={getProgressColor(row.segments)} /></td>
//               <td><ProgressCell value={row.margin} max={1000} colorVariant={getProgressColor(row.margin)} /></td>
//               <td><ProgressCell value={row.revenue} max={200} colorVariant="success" /></td>
//               <td><ProgressCell value={row.vendorCost} max={200} colorVariant="warning" /></td>
//               <td><ProgressCell value={row.hlrCost} max={10} colorVariant="info" /></td>
//               <td><ProgressCell value={row.marginPercent} max={100} colorVariant={getProgressColor(row.marginPercent)} /></td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ProgressTable;












