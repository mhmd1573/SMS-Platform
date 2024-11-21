// import React from 'react';
// import { useLocation } from 'react-router-dom'; 
// import { useState } from 'react';
// import Table from "react-bootstrap/Table";
// import './RateSheet.css';

// const Ratesheet = () => {

//   const location = useLocation();
//   const { parsedData , formProduct  } = location.state || {};  // Access passed state (parsedData)
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Items per page for pagination
//   const [history, setHistory] = useState([]);

//   const [effectiveDate, setEffectiveDate] = useState('');
//   const [effectiveTime, setEffectiveTime] = useState('');
//   const [closeType, setCloseType] = useState('');
//   const [closeTypeError, setCloseTypeError] = useState('');
//   const [timezone, setTimezone] = useState('');
//   const [isChecked, setIsChecked] = useState(false);



//   const handleCloseTypeChange = (e) => {
//     setCloseType(e.target.value);
//     if (e.target.value) {
//       setCloseTypeError(''); // Clear the error when a valid option is selected
//     }
//   };


//   const handleCheckboxChange = (event) => {
//     setIsChecked(event.target.checked);
//   };

//   const handleTimezoneChange = (event) => {
//     setTimezone(event.target.value);
//   };


//   // Pagination Section Starts Here
//   const paginateHistory = (parsedData, currentPage, itemsPerPage) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return parsedData.slice(startIndex, endIndex);
//   };

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(parsedData.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   // Pagination Section Ends Here




//   // Check if parsedData exists before trying to render
//   if (!parsedData) {
//     return <div>No data available to display.</div>;
//   }



//   return (
//     <div className="rate-import-container">
     
     
//       {/* <div className="page-header">
//         <h3 className="page-title">Rate Import</h3>
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="!#" onClick={(event) => event.preventDefault()}>Rates</a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Import
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Ratesheet
//             </li>
//           </ol>
//         </nav>
//       </div> */}

//       <div className="parent">

//         <div className="child1-ratesheet">
//           {/* Display parsed file data in a table */}
//           <div className='table-wrapper'>
           
//                <Table striped bordered hover variant="dark" className="text-center align-middle ratsheet-table">
//               <thead >
//                 <tr>
//                   {parsedData[0] && Object.keys(parsedData[0]).map((key) => (
//                     <th key={key} className="custom-header">{key}</th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginateHistory(parsedData, currentPage, itemsPerPage).map((row, index) => (
//                   <tr key={index}>
//                     {Object.values(row).map((value, idx) => (
//                       <td key={idx} className="custom-cell-width">{value}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>

//               </Table>

//                              {/* Pagination controls */}
//                              <div className="pagination-controls">
//               <button onClick={handlePreviousPage} disabled={currentPage === 1}>Prev.</button>
//               <span>Page {currentPage}</span>
//               <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(parsedData.length / itemsPerPage)}>Next</button>
//             </div>


//         </div>

         
//           </div>




//         <div className='child2-ratesheet'>

//            <form className='form-container'>
//            <h4>Advanced Import Options</h4>
//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>Product:</label>
//                {/* onChange={handleProductChange} */}
//                <input className="product-input" type="text" value={formProduct} readOnly />
//              </div>
           
            
//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>Active Sheet:</label>
//                <input className="activeSheet-input" type="text" value={formProduct} readOnly />
//              </div>

//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>Start Row:</label>
//                <input className="startRow-input" type="text" value={formProduct} readOnly />
//              </div>


//               <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                 <label>Effective From:</label>
//                     {/* Date Input */}
//                     <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
//                     value={effectiveDate}
//                       onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
//                     />

//                 {/* Time Input */}
//                 <input
//                   id="effectiveTime"
//                   className="effectiveFrom-time-input"
//                   type="time"
//                   value={effectiveTime}
//                   onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
//                 />
//               </div>

//               <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                 <label>Effective Till:</label>
//                     {/* Date Input */}
//                     <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
//                     value={effectiveDate}
//                       onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
//                     />

//                 {/* Time Input */}
//                 <input
//                   id="effectiveTime"
//                   className="effectiveFrom-time-input"
//                   type="time"
//                   value={effectiveTime}
//                   onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
//                 />
//               </div>

//               <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label id='effectbox'>Rates Come into effect after</label>
//                <input className="rateEffect-input" type="number"  />
//                <label>days</label>
//              </div>

//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                 <label>Increase Date:</label>
//                     {/* Date Input */}
//                     <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
//                     value={effectiveDate}
//                       onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
//                     />

//                 {/* Time Input */}
//                 <input
//                   id="effectiveTime"
//                   className="effectiveFrom-time-input"
//                   type="time"
//                   value={effectiveTime}
//                   onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
//                 />
//               </div>


//               <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label id='effectbox'>Increases Come into effect after</label>
//                <input className="rateEffect-input" type="number"  />
//                <label>days</label>
//              </div>


//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>Close Type:</label>
//                <select value={closeType} className='closeType-input' onChange={handleCloseTypeChange}>
//                <option value="" disabled selected>Select Carrier</option>
//                  <option value="Carrier 1">Carrier 1</option>
//                  <option value="Carrier 2">Carrier 2</option>
//                  <option value="Carrier 3">Carrier 3</option>
//                </select>
//                {closeTypeError && <p className="error-message">{closeTypeError}</p>}
//              </div>


//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//              <label id='rateCheckBoxLabel'>Do not close empty or zero rates</label>
//             <input className='rateCheckBox' type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
         
//              </div>

//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                 <label>Close Date:</label>
//                     {/* Date Input */}
//                     <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
//                     value={effectiveDate}
//                       onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
//                     />

//                 {/* Time Input */}
//                 <input
//                   id="effectiveTime"
//                   className="effectiveFrom-time-input"
//                   type="time"
//                   value={effectiveTime}
//                   onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
//                 />
//               </div>

          
//               <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label id='effectbox'>Close Rates After:</label>
//                <input className="rateEffect-input" type="number"  />
//                <label>days</label>
//              </div>

                
//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>Timezone:</label>
//                <select value={timezone} className='closeType-input' onChange={handleTimezoneChange} >

//                <option value="" disabled selected>Select a Timezone</option>
//                 <option value="UTC">UTC</option>
//                 <option value="America/New_York">America/New York</option>
//                 <option value="Europe/London">Europe/London</option>
//                 <option value="Asia/Kolkata">Asia/Kolkata</option>
//                 <option value="Australia/Sydney">Australia/Sydney</option>
//                </select>
//                {closeTypeError && <p className="error-message">{closeTypeError}</p>}
//              </div>


      
//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>DateFormat:</label>
//                <select value={timezone} className='closeType-input' onChange={handleTimezoneChange} >

//                <option value="" disabled selected>DateFormat</option>
//                 <option value="UTC">UTC</option>
//                 <option value="America/New_York">America/New York</option>
//                 <option value="Europe/London">Europe/London</option>
//                 <option value="Asia/Kolkata">Asia/Kolkata</option>
//                 <option value="Australia/Sydney">Australia/Sydney</option>
//                </select>
//                {closeTypeError && <p className="error-message">{closeTypeError}</p>}
//              </div>


//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//              <label id='rateCheckBoxLabel'>Set network price as the highest of its MCCMNCs</label>
//             <input className='rateCheckBox' type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
         
//              </div>


//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>CountryList:</label>
//                <select value={timezone} className='closeType-input' onChange={handleTimezoneChange} >

//                <option value="" disabled selected>DateFormat</option>
//                 <option value="UTC">UTC</option>
//                 <option value="America/New_York">America/New York</option>
//                 <option value="Europe/London">Europe/London</option>
//                 <option value="Asia/Kolkata">Asia/Kolkata</option>
//                 <option value="Australia/Sydney">Australia/Sydney</option>
//                </select>
//                {closeTypeError && <p className="error-message">{closeTypeError}</p>}
//              </div>

//              <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//                <label>Currency Rate:</label>
//                <input className="activeSheet-input" type="number"   />
//              </div>


//              {/* <div className="form-group" style={{ marginTop: '30px' }}>
          
//                <button type="submit" className="submit-button"  >
//                  Continue
//                </button>
//              </div> */}
          
//            </form>

//         </div>


//       </div>
//     </div>
//   );
// };

// export default Ratesheet;






// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Box, Button } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';  // Import useMaterialReactTable
// import { mkConfig, generateCsv, download } from 'export-to-csv';  // Make sure export-to-csv is installed

// import './RateSheet.css';

// const Ratesheet = () => {
//   const location = useLocation();
//   const { parsedData, formProduct } = location.state || {};
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [effectiveDate, setEffectiveDate] = useState('');
//   const [effectiveTime, setEffectiveTime] = useState('');
//   const [closeType, setCloseType] = useState('');
//   const [timezone, setTimezone] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

//   // Ensure parsedData exists before attempting to render
//   if (!parsedData) {
//     return <div>No data available to display.</div>;
//   }

//   // MaterialReactTable Columns Setup
//   const columnHelper = createMRTColumnHelper();

//   const columns = Object.keys(parsedData[0]).map((key) =>
//     columnHelper.accessor(key, {
//       header: key,
//       size: 150,
//     })
//   );

//   // CSV Config
//   const csvConfig = mkConfig({
//     fieldSeparator: ',',
//     decimalSeparator: '.',
//     useKeysAsHeaders: true,
//   });

//   const handleExportData = () => {
//     const csv = generateCsv(csvConfig)(parsedData);
//     download(csvConfig)(csv);
//   };

//   const handleExportRows = (rows) => {
//     const rowData = rows.map((row) => row.original);
//     const csv = generateCsv(csvConfig)(rowData);
//     download(csvConfig)(csv);
//   };

//   // Unconditionally call useMaterialReactTable hook
//   const table = useMaterialReactTable({
//     columns,
//     data: parsedData,
//     enableRowSelection: true,
//     paginationDisplayMode: 'pages',
//     columnFilterDisplayMode: 'popover',
//     renderTopToolbarCustomActions: ({ table }) => (
//       <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
//         <Button
//           onClick={handleExportData}
//           startIcon={<FileDownloadIcon />}
//         >
//           Export All Data
//         </Button>
//         <Button
//           disabled={table.getPrePaginationRowModel().rows.length === 0}
//           onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
//           startIcon={<FileDownloadIcon />}
//         >
//           Export All Rows
//         </Button>
//         <Button
//           disabled={table.getRowModel().rows.length === 0}
//           onClick={() => handleExportRows(table.getRowModel().rows)}
//           startIcon={<FileDownloadIcon />}
//         >
//           Export Page Rows
//         </Button>
//         <Button
//           disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
//           onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
//           startIcon={<FileDownloadIcon />}
//         >
//           Export Selected Rows
//         </Button>
//       </Box>
//     ),
//   });

//   // Pagination Functions
//   const paginateHistory = (parsedData, currentPage, itemsPerPage) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return parsedData.slice(startIndex, endIndex);
//   };

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(parsedData.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="rate-import-container">
//       <div className="parent">


//         <div className="child1-ratesheet">
//           {/* MaterialReactTable */}
//           <div className="table-wrapper">
//             <MaterialReactTable table={table} />
//           </div>

//         </div>



//         <div className="child2-ratesheet">
//           {/* Advanced Import Options */}
//           <form className="form-container">
//             <h4>Advanced Import Options</h4>
//             <div className="form-group">
//               <label>Product:</label>
//               <input className="product-input" type="text" value={formProduct} readOnly />
//             </div>
//             {/* Additional Form Inputs */}
//             <div className="form-group">
//               <label>Effective From:</label>
//               <input
//                 id="effectiveDate"
//                 className="effectiveFrom-date-input"
//                 type="date"
//                 value={effectiveDate}
//                 onChange={(e) => setEffectiveDate(e.target.value)}
//               />
//               <input
//                 id="effectiveTime"
//                 className="effectiveFrom-time-input"
//                 type="time"
//                 value={effectiveTime}
//                 onChange={(e) => setEffectiveTime(e.target.value)}
//               />
//             </div>
//             {/* Other Form Fields */}
//             <div className="form-group">
//               <label>Timezone:</label>
//               <select value={timezone} className="closeType-input" onChange={(e) => setTimezone(e.target.value)}>
//                 <option value="" disabled selected>Select a Timezone</option>
//                 <option value="UTC">UTC</option>
//                 <option value="America/New_York">America/New York</option>
//                 <option value="Europe/London">Europe/London</option>
//                 <option value="Asia/Kolkata">Asia/Kolkata</option>
//                 <option value="Australia/Sydney">Australia/Sydney</option>
//               </select>
//             </div>
//             {/* Other fields... */}
//           </form>
//         </div>



//       </div>
//     </div>
//   );
// };

// export default Ratesheet;











import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, ThemeProvider, createTheme, Paper } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';  // Import useMaterialReactTable
import { mkConfig, generateCsv, download } from 'export-to-csv';  // Make sure export-to-csv is installed
import './RateSheet.css';

const Ratesheet = () => {
  const location = useLocation();
  const { parsedData, formProduct } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [effectiveDate, setEffectiveDate] = useState('');
  const [effectiveTime, setEffectiveTime] = useState('');
  const [closeType, setCloseType] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [closeTypeError, setCloseTypeError] = useState('');






  const handleCloseTypeChange = (e) => {
    setCloseType(e.target.value);
    if (e.target.value) {
      setCloseTypeError(''); // Clear the error when a valid option is selected
    }
  };


  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };



  // Always call useMaterialReactTable, even if parsedData is empty
  const columnHelper = createMRTColumnHelper();
  const columns = parsedData
    ? Object.keys(parsedData[0]).map((key) =>
        columnHelper.accessor(key, {
          header: key,
          size: 150,
        })
      )
    : [];


  const table = useMaterialReactTable({
    columns,
    data: parsedData || [], // Fallback to empty array if parsedData is not available
    enableRowSelection: true,
    paginationDisplayMode: 'pages',
    columnFilterDisplayMode: 'popover',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });


  // const table = useMaterialReactTable({
  //   columns,
  //   data: parsedData || [], // Fallback to empty array if parsedData is not available
  //   enableRowSelection: true,
  //   paginationDisplayMode: 'pages',
  //   columnFilterDisplayMode: 'popover',
  //   renderTopToolbarCustomActions: ({ table }) => (
  //     <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
  //       <Button
  //         onClick={handleExportData}
  //         startIcon={<FileDownloadIcon />}
  //       >
  //         Export All Data
  //       </Button>
  //       <Button
  //         disabled={table.getPrePaginationRowModel().rows.length === 0}
  //         onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
  //         startIcon={<FileDownloadIcon />}
  //       >
  //         Export All Rows
  //       </Button>
  //       <Button
  //         disabled={table.getRowModel().rows.length === 0}
  //         onClick={() => handleExportRows(table.getRowModel().rows)}
  //         startIcon={<FileDownloadIcon />}
  //       >
  //         Export Page Rows
  //       </Button>
  //       <Button
  //         disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
  //         onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
  //         startIcon={<FileDownloadIcon />}
  //       >
  //         Export Selected Rows
  //       </Button>
  //     </Box>
  //   ),
  //   muiTableBodyRowProps: {
  //     dense: true, // Setting the row density to "compact"
  //   },
  // });



  // CSV Config
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(parsedData || []);
    download(csvConfig)(csv);
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  if (!parsedData) {
    return <div>No data available to display.</div>;
  }

 // Define Dark Theme
   const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#1e1e1e', // Dark background color for the Paper component
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: '#ffffff', // Text color for table cells
            backgroundColor: '#333', // Dark background for cells
          },
        },
      },
    },
  });



  return (

    <div className="rate-import-container">
      <div className="parent">
       

         <ThemeProvider theme={darkTheme}>
        <div className="child1-ratesheet">
        <Paper sx={{ padding: 2 }}>
        <MaterialReactTable table={table} />
        </Paper>
        </div>
        </ThemeProvider>
        
        {/* Advanced Import Options */}      
      <div className='child2-ratesheet'>

      <form className='form-container'>
      <h4>Advanced Import Options</h4>
        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Product:</label>
          {/* onChange={handleProductChange} */}
          <input className="product-input" type="text" value={formProduct} readOnly />
        </div>

      
        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Active Sheet:</label>
          <input className="activeSheet-input" type="text" value={formProduct} readOnly />
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Start Row:</label>
          <input className="startRow-input" type="text" value={formProduct} readOnly />
        </div>


        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Effective From:</label>
              {/* Date Input */}
              <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
              value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
              />

          {/* Time Input */}
          <input
            id="effectiveTime"
            className="effectiveFrom-time-input"
            type="time"
            value={effectiveTime}
            onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
          />
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Effective Till:</label>
              {/* Date Input */}
              <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
              value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
              />

          {/* Time Input */}
          <input
            id="effectiveTime"
            className="effectiveFrom-time-input"
            type="time"
            value={effectiveTime}
            onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
          />
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label id='effectbox'>Rates Come into effect after</label>
          <input className="rateEffect-input" type="number"  />
          <label>days</label>
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Increase Date:</label>
              {/* Date Input */}
              <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
              value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
              />

          {/* Time Input */}
          <input
            id="effectiveTime"
            className="effectiveFrom-time-input"
            type="time"
            value={effectiveTime}
            onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
          />
        </div>


        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label id='effectbox'>Increases Come into effect after</label>
          <input className="rateEffect-input" type="number"  />
          <label>days</label>
        </div>


        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Close Type:</label>
          <select value={closeType} className='closeType-input' onChange={handleCloseTypeChange}>
          <option value="" disabled selected>Select Carrier</option>
            <option value="Carrier 1">Carrier 1</option>
            <option value="Carrier 2">Carrier 2</option>
            <option value="Carrier 3">Carrier 3</option>
          </select>
          {closeTypeError && <p className="error-message">{closeTypeError}</p>}
        </div>


        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
        <label id='rateCheckBoxLabel'>Do not close empty or zero rates</label>
      <input className='rateCheckBox' type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />

        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Close Date:</label>
              {/* Date Input */}
              <input id="effectiveDate" className="effectiveFrom-date-input" type="date" 
              value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)} // Handle date input changes
              />

          {/* Time Input */}
          <input
            id="effectiveTime"
            className="effectiveFrom-time-input"
            type="time"
            value={effectiveTime}
            onChange={(e) => setEffectiveTime(e.target.value)} // Handle time input changes
          />
        </div>


        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label id='effectbox'>Close Rates After:</label>
          <input className="rateEffect-input" type="number"  />
          <label>days</label>
        </div>

          
        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Timezone:</label>
          <select value={timezone} className='closeType-input' onChange={handleTimezoneChange} >

          <option value="" disabled selected>Select a Timezone</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
          </select>
          {closeTypeError && <p className="error-message">{closeTypeError}</p>}
        </div>



        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>DateFormat:</label>
          <select value={timezone} className='closeType-input' onChange={handleTimezoneChange} >

          <option value="" disabled selected>DateFormat</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
          </select>
          {closeTypeError && <p className="error-message">{closeTypeError}</p>}
        </div>


        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
        <label id='rateCheckBoxLabel'>Set network price as the highest of its MCCMNCs</label>
      <input className='rateCheckBox' type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />

        </div>


        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>CountryList:</label>
          <select value={timezone} className='closeType-input' onChange={handleTimezoneChange} >

          <option value="" disabled selected>DateFormat</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
          </select>
          {closeTypeError && <p className="error-message">{closeTypeError}</p>}
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Currency Rate:</label>
          <input className="activeSheet-input" type="number"   />
        </div>

      </form>

      </div>

      </div>

    <div className='parent'>

    <div className="child1-log">
  {/* <h4 style={{color:'white'}}>Error Logs</h4> */}
  <div className="log-table-wrapper">
    {/* MaterialReactTable for Log Errors */}
    <MaterialReactTable
      columns={[
        { accessorKey: 'rowNumber', header: 'Row number', size: 100 },
        { accessorKey: 'errorName', header: 'Error name', size: 150 },
        { accessorKey: 'errorInfo', header: 'Error info', size: 300 },
      ]}
      data={[
        {
          rowNumber: 1,
          errorName: 'Connection Timeout',
          errorInfo: 'Failed to fetch rates from the server due to timeout.',
        },
        {
          rowNumber: 2,
          errorName: 'Invalid Input',
          errorInfo: 'CSV contains invalid data in column 4.',
        },
        {
          rowNumber: 3,
          errorName: 'Unauthorized Access',
          errorInfo: 'Attempt to access API without a valid token.',
        },
        {
          rowNumber: 4,
          errorName: 'Unauthorized Access',
          errorInfo: 'Attempt to access API without a valid token.',
        },
        {
          rowNumber: 5,
          errorName: 'Unauthorized Access',
          errorInfo: 'Attempt to access API without a valid token.',
        },
      ]}
      enableRowSelection={false} // Disable row selection for logs
      enablePagination
      paginationDisplayMode="pages"
      muiTableContainerProps={{ sx: { maxHeight: '500px' } }} // Limit table height
    />
  </div>
</div>

<div className="child2-log">
          <div className="rate-table-wrapper">
            {/* MaterialReactTable for Rate Changes */}
            <MaterialReactTable
              columns={[
                { accessorKey: 'e212', header: 'e.212', size: 100 },
                { accessorKey: 'dialCode', header: 'Dial Code', size: 100 },
                { accessorKey: 'country', header: 'Country', size: 150 },
                { accessorKey: 'net', header: 'Net', size: 100 },
                { accessorKey: 'newRate', header: 'New Rate', size: 100 },
                { accessorKey: 'oldRate', header: 'Old Rate', size: 100 },
                { accessorKey: 'startDate', header: 'Start Date', size: 120 },
                { accessorKey: 'endDate', header: 'End Date', size: 120 },
                { accessorKey: 'changeType', header: 'Change Type', size: 120 },
                { accessorKey: 'rateDifference', header: 'Rate Difference', size: 150 },
              ]}
              data={[
                {
                  e212: '212-001',
                  dialCode: '+1',
                  country: 'USA',
                  net: 'Verizon',
                  newRate: '0.20',
                  oldRate: '0.18',
                  startDate: '2024-01-01',
                  endDate: '2024-12-31',
                  changeType: 'Increase',
                  rateDifference: '0.02',
                },
                {
                  e212: '212-002',
                  dialCode: '+44',
                  country: 'UK',
                  net: 'EE',
                  newRate: '0.30',
                  oldRate: '0.25',
                  startDate: '2024-01-01',
                  endDate: '2024-12-31',
                  changeType: 'Increase',
                  rateDifference: '0.05',
                },
                {
                  e212: '212-002',
                  dialCode: '+44',
                  country: 'UK',
                  net: 'EE',
                  newRate: '0.30',
                  oldRate: '0.25',
                  startDate: '2024-01-01',
                  endDate: '2024-12-31',
                  changeType: 'Increase',
                  rateDifference: '0.05',
                },
                {
                  e212: '212-002',
                  dialCode: '+44',
                  country: 'UK',
                  net: 'EE',
                  newRate: '0.30',
                  oldRate: '0.25',
                  startDate: '2024-01-01',
                  endDate: '2024-12-31',
                  changeType: 'Increase',
                  rateDifference: '0.05',
                },
                // Add more rows as needed
              ]}
              enablePagination
              paginationDisplayMode="pages"
              muiTableContainerProps={{ sx: { maxHeight: '500px' } }} // Limit table height
            />
          </div>
        </div>


    </div>


    </div>
  );
};

export default Ratesheet;
