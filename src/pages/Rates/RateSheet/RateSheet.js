// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';  // Changed import to useHistory
// import './RateSheet.css';
// import { useLocation } from 'react-router-dom'; 
// const Ratesheet = () => {
  

//   const location = useLocation();
//   const { parsedData } = location.state || {};  // Access passed state (parsedData)


//     // Check if parsedData exists before trying to render
//     if (!parsedData) {
//       return <div>No data available to display.</div>;
//     }


//   return (
//     <div className="rate-import-container">
//       <div className="page-header">
//         <h3 className="page-title">Rate Import</h3>
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="!#" onClick={(event) => event.preventDefault()}>
//                 Rates
//               </a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Rate Import
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="parent">



//         <div className="child1">
       
//       {/* The Parsed file data should be shown here in a table */}
//         </div>

      
//         <div className="child2">
        

//              </div>

//       </div>

//       <div className="child3">
        
//         </div>


    
      
//     </div>
//   );
// };

// export default Ratesheet;






 
  







// // // // the interface contains three grids
// // // // first grid shows you all the files uploaded into the system and the import status of each file
// // // // also you can see where (into what product and for which carrier) you make each task

// // // // a button called Upload which upload new files into the interface 



// // // // 2nd grid you can set advanced options of import
// // // // such as parser for the file and verify carrier and product you want to make import for




// // // //third grid show the results of the finished tasks


// // // // functionality :
// // // // choose a file from the first grid you want to import 
// // // // set the options on the 2nd grid 
// // // // when pressing continue user will be redirected to interface of manual import 






import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './RateSheet.css';

const Ratesheet = () => {
  const location = useLocation();
  const { parsedData } = location.state || {};  // Access passed state (parsedData)

  // Check if parsedData exists before trying to render
  if (!parsedData) {
    return <div>No data available to display.</div>;
  }

  return (
    <div className="rate-import-container">

      <div className="page-header">
        <h3 className="page-title">Rate Import</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>Rates</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
               Import
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Ratesheet
            </li>
          </ol>
        </nav>
      </div>

      <div className="parent">

        <div className="child1">
          {/* Display parsed file data in a table */}
          <h4>Parsed Data</h4>
          <table className="history-table">
            <thead>
              <tr>
                {parsedData[0] && Object.keys(parsedData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>


              
{/* 
        <div className="child2">
           <h4>Advanced Import Options</h4>
           <form>

             <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
               <label>Selected File:</label>
               <input className="file-input" type="text" value={file ? file.name : selectedRow ? selectedRow.fileName : ''} readOnly />
             </div>
             {importFileError && <p className="error-message">{importFileError}</p>}
            
            
             <div className="form-group" style={{ marginTop: '30px' }}>
               <label>Parser</label>
               <select value={selectedParser} onChange={handleFormParserChange} disabled={!!selectedParser}>
               <option value="" disabled>Select Parser</option>
               <option value="CSV">CSV</option>
               <option value="XLSX">XLSX</option>
               </select>
               {parserError && <p className="error-message">{parserError}</p>}
             </div>


             <div className="form-group">
               <label>Direction</label>
               <select value={direction} onChange={handleFormDirectionChange}>
                 <option value="" disabled >Select Direction</option>
                 <option value="vendor">Vendor</option>
                 <option value="client">Client</option>
               </select>
               {directionError && <p className="error-message">{directionError}</p>}
             </div>

             <div className="form-group">
               <label>Carriers</label>
               <select value={formCarrier} onChange={handleFormCarrierChange}>
               <option value="" disabled selected>Select Carrier</option>
                 <option value="Carrier 1">Carrier 1</option>
                 <option value="Carrier 2">Carrier 2</option>
                 <option value="Carrier 3">Carrier 3</option>
               </select>
               {importCarrierError && <p className="error-message">{importCarrierError}</p>}
             </div>

             <div className="form-group">
               <label>Products</label>
               <select value={formProduct} onChange={handleFormProductChange}>
               <option value="" disabled selected>Select Product</option>
                 {products.map((product, index) => (
                   <option key={index} value={product}>
                     {product}
                   </option>
                 ))}
               </select>
               {importProductError && <p className="error-message">{importProductError}</p>}
             </div>

             <div className="form-group" style={{ marginTop: '30px' }}>
               <button type="submit" className="submit-button"  onClick={handleImportSubmit}>
                 Continue
               </button>
             </div>
          
           </form>

             </div> */}


      </div>
    </div>
  );
};

export default Ratesheet;










   
         