import React, { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, ThemeProvider, createTheme, Paper } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';  // Import useMaterialReactTable
import { mkConfig, generateCsv, download } from 'export-to-csv';  // Make sure export-to-csv is installed
import './RateSheet.css';
import * as XLSX from 'xlsx'; // If using XLSX parsing

const Ratesheet = () => {
  const location = useLocation();
  const { parsedData, formProduct , importFile , numberOfRows} = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [effectiveDate, setEffectiveDate] = useState('');
  const [effectiveTime, setEffectiveTime] = useState('');
  const [closeType, setCloseType] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showActiveSheet, setShowActiveSheet] = useState(false); 
  const [numberOfActiveSheets, setNumberOfActiveSheets] = useState(''); // State to control the ActiveSheet input
  const [isExcelFile, setIsExcelFile] = useState(false);
  const [selectedActiveSheet, setSelectedActiveSheet] = useState(''); 
  const [startRow, setStartRow] = useState(''); 

  const [closeTypeError, setCloseTypeError] = useState('');




    useEffect(() => {
    if (importFile) {
      // Check if the file is an Excel file by extension
      const fileExtension = importFile.name.split('.').pop().toLowerCase();
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        setIsExcelFile(true);
        setShowActiveSheet(true);
        parseExcelFile(importFile);
      } else {
        setIsExcelFile(false);
        setShowActiveSheet(false);
      }
    }
  }, [importFile]);


  const parseExcelFile = (file) => {
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Get the number of sheets in the Excel file
      const numberOfSheets = workbook.SheetNames.length;
  
      // Set the number of sheets to state
      setNumberOfActiveSheets(numberOfSheets);
  
      // Optionally, save sheet names as well (if needed)
      // setExcelSheetNames(workbook.SheetNames);
    };
  
    reader.readAsArrayBuffer(file);
  };


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
    enableDensityToggle: false,  // Disable the toggle density button
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex',  flexWrap: 'wrap' }}>
      
  
        <Button
        disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
          sx={{fontSize:'12px', fontWeight:'bold'}}
        >
          Export All Rows
        </Button>

        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
          sx={{fontSize:'12px', fontWeight:'bold'}}
        >
          Export Page Rows
        </Button>

        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
          sx={{fontSize:'12px', fontWeight:'bold'}}
        >
          Export Selected Rows
        </Button>

      </Box>
    ),

    initialState: {
      density: 'compact',  // Set the default row density to "compact"
    },
    
  });



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

 


  return (

    <div className="rate-import-container">
      <div className="parent">
       
        {/* First Table */}
       
        <div className="child1-ratesheet">
        <Paper sx={{ height: '550px', overflow: 'auto'}}>
         
        <MaterialReactTable table={table} />
             
        </Paper> 

        </div>
      

        
        {/* Advanced Import Options */}      
      <div className='child2-ratesheet'>

      <form className='form-container'>
      <h4>Advanced Import Options</h4>

        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Product:</label>
          <input className="product-input" type="text" value={formProduct} readOnly />
        </div>


    
        {/* Active Sheet Input */}
        {showActiveSheet && (

            <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
            <label>Active Sheet:</label>
            
            <input
              className="activeSheet-input"
              type="number"
              value={selectedActiveSheet} // Dynamic value based on the selected sheet
              onChange={(e) => setSelectedActiveSheet(Number(e.target.value))} // Update active sheet on change
              min={1} // Minimum value of 1 (since sheet numbers are 1-based)
              max={numberOfActiveSheets} // Maximum value based on number of sheets
            />
            
            <span style={{ fontSize: '12px', marginLeft: '8px', color: '#757575' }}>
              (1-{numberOfActiveSheets})
            </span>
          </div>
        )}

             {/* Start Row Input */}
        <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
          <label>Start Row:</label>
          <input
           className="startRow-input"
           type="number"
           value={startRow} 
           onChange={(e) => setStartRow(Number(e.target.value))}
           min={1} // Minimum value of 1 (since row numbers are 1-based)
           max={numberOfRows} // Maximum value based on the total number of rows
              />

        <span style={{ fontSize: '12px', marginLeft: '8px', color: '#757575' }}>
              (1-{numberOfRows})
            </span>

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








    <div className='parent-log'>


  {/* Third Table  */}
  <div className="child1-log">
          <div className="rate-table-wrapper">
            {/* MaterialReactTable for Rate Changes */}
            <Paper sx={{ height: '345px', overflow: 'auto' }}>
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
              
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
                  {e212: '212-001', dialCode: '+1', country: 'USA', net: 'Verizon', newRate: '0.20', oldRate: '0.18', startDate: '2024-01-01', endDate: '2024-12-31', changeType: 'Increase', rateDifference: '0.02'},
            
              ]}
              enablePagination
              paginationDisplayMode="pages"
              muiTableContainerProps={{   sx: { maxHeight: '500px', position: 'relative' }}} // Limit table height
              initialState={{
                density: 'compact', // Set the default row density to "dense"
              }}
              enableDensityToggle={false} // Disable density toggle button
            />

             </Paper> 
          </div>
        </div>




    {/* Secound Table */}
    <div className="child2-log">
  {/* <h4 style={{color:'white'}}>Error Logs</h4> */}
  <div className="log-table-wrapper">
    {/* MaterialReactTable for Log Errors */}
    <Paper sx={{ height: '345px', overflow: 'auto' }}>
    <MaterialReactTable
  columns={[
    { accessorKey: 'rowNumber', header: 'Row number', size: 100 },
    { accessorKey: 'errorName', header: 'Error name', size: 150 },
    { accessorKey: 'errorInfo', header: 'Error info', size: 300 },
  ]}
  data={[
    { rowNumber: 1, errorName: 'Connection Timeout', errorInfo: 'Failed to fetch rates from the server due to timeout.' },
    { rowNumber: 2, errorName: 'Invalid Input', errorInfo: 'CSV contains invalid data in column 4.' },
    { rowNumber: 3, errorName: 'Unauthorized Access', errorInfo: 'Attempt to access API without a valid token.' },
    { rowNumber: 4, errorName: 'Unauthorized Access', errorInfo: 'Attempt to access API without a valid token.' },
    { rowNumber: 5, errorName: 'Unauthorized Access', errorInfo: 'Attempt to access API without a valid token.' },
    { rowNumber: 6, errorName: 'Unauthorized Access', errorInfo: 'Attempt to access API without a valid token.' },
    { rowNumber: 7, errorName: 'Unauthorized Access', errorInfo: 'Attempt to access API without a valid token.' },
    { rowNumber: 8, errorName: 'Unauthorized Access', errorInfo: 'Attempt to access API without a valid token.' },
    { rowNumber: 9, errorName: 'Unauthorized Access', errorInfo: 'Attempt to access API without a valid token.' },
    // More error log rows as needed
  ]}
  enableRowSelection={false} // Disable row selection for logs
  enablePagination
  paginationDisplayMode="pages"
  muiTableContainerProps={{
    sx: { maxHeight: '500px', position: 'relative' }, // Limit the height of the table container
  }}
  initialState={{
    density: 'compact', // Set the default row density to "dense"
  }}
  enableDensityToggle={false} // Disable the density toggle button
/>
     </Paper> 
  </div>
</div>

  

    </div>


    </div>
  );
};

export default Ratesheet;