// import React, { Component, useState } from 'react';
// import { Box, Button, ThemeProvider, createTheme, Paper , Checkbox, FormControlLabel, TextField, Grid, Typography } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';  // Import useMaterialReactTable
// import { mkConfig, generateCsv, download } from 'export-to-csv';  // Make sure export-to-csv is installed
// import './Carriers.css'
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

// const Carriers = () => {



//     // Retrieve data from localStorage, or use an empty array if no data exists
//     const getDataFromStorage = () => {
//       const savedData = localStorage.getItem('carriersData');
//       return savedData ? JSON.parse(savedData) : [];
//     };



//     const [tableData, setTableData] = useState(getDataFromStorage); // state to hold table data
//     const [selectedRow, setSelectedRow] = useState(null); // State to hold the selected row for editing

//     // Validation Schema using Yup
//     const validationSchema = Yup.object({
//       carrierName: Yup.string().required('Carrier name is required'),
//       subjectiveEstimation: Yup.number().min(0, 'Must be greater than or equal to 0').max(10, 'Must be less than or equal to 10').required('Subjective estimation is required'),
//       inboundTrafficAllowed: Yup.boolean().required('Inbound traffic allowed is required'),
//       outboundTrafficAllowed: Yup.boolean().required('Outbound traffic allowed is required'),
//       country: Yup.string().required('Country is required'),
//       address: Yup.string().required('Address is required'),
//       region: Yup.string().required('Region is required'),
//       comments: Yup.string(),
//       contractCompany: Yup.string().required('Contract company is required'),
//       isTest: Yup.boolean(),
//       isActive: Yup.boolean(),
//       selfSignedUp: Yup.boolean(),
//     });


        
//     // Initial form values
//     const initialValues = {
//       carrierName: selectedRow ? selectedRow.carrierName : '',
//       subjectiveEstimation: selectedRow ? selectedRow.subjectiveEstimation : '',
//       inboundTrafficAllowed: selectedRow ? selectedRow.inboundTrafficAllowed : false,
//       outboundTrafficAllowed: selectedRow ? selectedRow.outboundTrafficAllowed : false,
//       country: selectedRow ? selectedRow.country : '',
//       address: selectedRow ? selectedRow.address : '',
//       region: selectedRow ? selectedRow.region : '',
//       comments: selectedRow ? selectedRow.comments : '',
//       contractCompany: selectedRow ? selectedRow.contractCompany : '',
//       isTest: selectedRow ? selectedRow.isTest : false,
//       isActive: selectedRow ? selectedRow.isActive : true,
//       selfSignedUp: selectedRow ? selectedRow.selfSignedUp : false,
//     };


   
//     // Handle form submission
//     const handleSubmit = (values) => {
//       const updatedData = selectedRow
//         ? tableData.map((row) => (row.id === selectedRow.id ? { ...row, ...values } : row)) // Update existing row
//         : [...tableData, { id: Math.floor(Math.random() * 10000), ...values }]; // Add new row if no row is selected
  
//       setTableData(updatedData);
//       localStorage.setItem('carriersData', JSON.stringify(updatedData));
  
//       // Reset form and selected row after submission
//       setSelectedRow(null);
//     };
  
//     // Handle row selection for editing
//     const handleRowClick = (rowData) => {
//       setSelectedRow(rowData);
//     };

    


//     return (
   
   
//      <div>
      
//         <div className="page-header">
//           <h3 className="page-title"> Carriers</h3>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Carriers</a></li>
//               <li className="breadcrumb-item active" aria-current="page">Carriers</li>
//             </ol>
//           </nav>
//         </div>


//         <div className='parent-carrier-carrier'>

//           <div className='child1-carrier'>
//            {/* MaterialReactTable for Rate Changes */}
//            <Paper sx={{ height: '510px', overflow: 'hidden' }}>
//             <MaterialReactTable
//               columns={[
//                 { accessorKey: 'id', header: 'ID', size: 100 },
//                 { accessorKey: 'region', header: 'Region', size: 100 },
//                 { accessorKey: 'carrierName', header: 'Carrier name', size: 150 },
//                 { accessorKey: 'country', header: 'Country', size: 100 },
//                 { accessorKey: 'trustedCustomer', header: 'Trusted customer', size: 100 , muiTableBodyCellProps: { sx: { paddingLeft: '40px' }  } },
//                 { accessorKey: 'Credibility', header: 'Credibility', size: 100 , muiTableBodyCellProps: { sx: { paddingLeft: '30px' }  } },
//                 { accessorKey: 'trafficAllowed', header: 'Inbound/Outbound traffic allowed', size: 120 , muiTableBodyCellProps: { sx: { paddingLeft: '40px' }  }  },
//                 { accessorKey: 'contractCompany', header: 'Contract company', size: 120 , muiTableBodyCellProps: { sx: { paddingLeft: '30px' }  } },
//                 { accessorKey: 'accountManager', header: 'Account manager', size: 120 , muiTableBodyCellProps: { sx: { paddingLeft: '30px' }  } },
//               ]}

//               data={tableData}  // Use tableData as the data source
//               enablePagination
//               paginationDisplayMode="pages"

//               muiTableContainerProps={{ 
//                   sx: { maxHeight: '400px', // Scrollable height
//                         position: 'relative', // Enable vertical scrolling 
                    
//                    }}} 

//               initialState={{
//                 density: 'compact', // Set the default row density to "dense"
//               }}
//               enableDensityToggle={false} // Disable density toggle button
//               onRowClick={({ row }) => handleRowClick(row.original)} // Handle row click
//             />

//              </Paper> 
//           </div>

          
//           <div className="child2-carrier">



//           <Paper sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
//       <Typography variant="h6" gutterBottom sx={{}}>
//       {selectedRow ? 'Edit Carrier' : 'Add Carrier'}
//       </Typography>

//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
//         {({ values, errors, touched, handleChange, handleBlur }) => (
//           <Form>

//             <Box sx={{ maxHeight: '423px', maxWidth:'400px',overflowY: 'auto', paddingBottom: 2 , paddingTop:'13px'}}>

//             {/* General Information */}
//             <Box mb={3}>
             
              
//                   <Field
//                     as={TextField}
//                     name="carrierName"
//                     label="Carrier Name"
//                     fullWidth
//                     error={touched.carrierName && Boolean(errors.carrierName)}
//                     helperText={touched.carrierName && errors.carrierName}
//                     sx={{ mb:2 , width: '300px' }}
//                     size="small"
//                   />
                
              
//                   <Field
//                     as={TextField}
//                     name="subjectiveEstimation"
//                     label="Subjective Estimation"
//                     type="number"
//                     fullWidth
//                     error={touched.subjectiveEstimation && Boolean(errors.subjectiveEstimation)}
//                     helperText={touched.subjectiveEstimation && errors.subjectiveEstimation}
//                     size="small"
//                     sx={{  width: '300px' }}
//                   />
               
             
//             </Box>

//             {/* Traffic Options */}
//             <Box mb={3} display="flex"  >            
              
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name="inboundTrafficAllowed"
//                         checked={values.inboundTrafficAllowed}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                       />
//                     }
//                     label="Inbound Traffic Allowed"
//                     sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
//                   />
               
              
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name="outboundTrafficAllowed"
//                         checked={values.outboundTrafficAllowed}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                       />
//                     }
//                     label="Outbound Traffic Allowed"
//                     sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
//                   />
               
              
//             </Box>

//             {/* Address and Region */}
//             <Box mb={3} >
          
                
//                   <Field
//                     as={TextField}
//                     name="country"
//                     label="Country"
//                     fullWidth
//                     error={touched.country && Boolean(errors.country)}
//                     helperText={touched.country && errors.country}
//                     sx={{ mb:2 , width: '300px' }}
//                     size="small"
//                   />
               

              
//                   <Field
//                     as={TextField}
//                     name="region"
//                     label="Region"
//                     fullWidth
//                     error={touched.region && Boolean(errors.region)}
//                     helperText={touched.region && errors.region}
//                     sx={{ mb:2 , width: '300px' }}
//                     size="small"
//                   />
               

                
//                   <Field
//                     as={TextField}
//                     name="address"
//                     label="Address"
//                     fullWidth
//                     error={touched.address && Boolean(errors.address)}
//                     helperText={touched.address && errors.address}
//                     size="small"
//                     sx={{  width: '300px' }}
//                   />
               
             
//             </Box>

//             {/* Additional Information */}
//             <Box mb={3}>
                         
//                   <Field
//                     as={TextField}
//                     name="contractCompany"
//                     label="Contract Company"
//                     fullWidth
//                     error={touched.contractCompany && Boolean(errors.contractCompany)}
//                     helperText={touched.contractCompany && errors.contractCompany}
//                     size="small"
//                     sx={{ mb:2 , width: '300px' }}
//                   />
              

//             {/* Comments */}
//             <Box mb={3}>

//               <Field
//                 as={TextField}
//                 name="comments"
//                 label="Comments"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 error={touched.comments && Boolean(errors.comments)}
//                 helperText={touched.comments && errors.comments}
//                 sx={{  width: '300px' }}
//               />
//             </Box>
              
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name="isTest"
//                         checked={values.isTest}
//                         onChange={handleChange}
//                       />
//                     }
//                     label="Is Test Carrier"
//                     sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
//                   />
               
                
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name="isActive"
//                         checked={values.isActive}
//                         onChange={handleChange}
//                       />
//                     }
//                     label="Is Active"
//                     sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
//                   />
               
               
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name="selfSignedUp"
//                         checked={values.selfSignedUp}
//                         onChange={handleChange}
//                       />
//                     }
//                     label="Self Signed Up"
//                     sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
//                   />
               
             
//             </Box>

//             {/* Submit Button */}
//             <Box mt={3}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//               {selectedRow ? 'Update Carrier' : 'Add Carrier'}
//               </Button>
//             </Box>


//             </Box>

//           </Form>
//         )}
//       </Formik>
//           </Paper>

//           </div>


//       </div>


//       </div>
//     )
  
// }

// export default Carriers













// import React, { useState } from 'react';
// import {Box, Button, Paper, Checkbox, FormControlLabel, TextField, Grid, Typography,} from '@mui/material';
// import { MaterialReactTable } from 'material-react-table';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import './Carriers.css';

// const Carriers = () => {



//   const getDataFromStorage = () => {
//     const savedData = localStorage.getItem('carriersData');
//     return savedData ? JSON.parse(savedData) : [];
//   };

//   const [tableData, setTableData] = useState(getDataFromStorage());
//   const [selectedRow, setSelectedRow] = useState(null);

//   const validationSchema = Yup.object({
//     carrierName: Yup.string().required('Carrier name is required'),
//     subjectiveEstimation: Yup.number()
//       .min(0, 'Must be greater than or equal to 0')
//       .max(10, 'Must be less than or equal to 10')
//       .required('Subjective estimation is required'),
//     inboundTrafficAllowed: Yup.boolean(),
//     outboundTrafficAllowed: Yup.boolean(),
//     country: Yup.string().required('Country is required'),
//     address: Yup.string().required('Address is required'),
//     region: Yup.string().required('Region is required'),
//     comments: Yup.string(),
//     contractCompany: Yup.string().required('Contract company is required'),
//     accountManager: Yup.string().required('Account manager is required'),
//     isTest: Yup.boolean(),
//     isActive: Yup.boolean(),
//     selfSignedUp: Yup.boolean(),
//   });

//   const initialValues = {
//     carrierName: selectedRow ? selectedRow.carrierName : '',
//     subjectiveEstimation: selectedRow ? selectedRow.subjectiveEstimation : '',
//     inboundTrafficAllowed: selectedRow ? selectedRow.inboundTrafficAllowed : false,
//     outboundTrafficAllowed: selectedRow ? selectedRow.outboundTrafficAllowed : false,
//     country: selectedRow ? selectedRow.country : '',
//     address: selectedRow ? selectedRow.address : '',
//     region: selectedRow ? selectedRow.region : '',
//     comments: selectedRow ? selectedRow.comments : '',
//     contractCompany: selectedRow ? selectedRow.contractCompany : '',
//     accountManager: selectedRow ? selectedRow.accountManager : '',
//     isTest: selectedRow ? selectedRow.isTest : false,
//     isActive: selectedRow ? selectedRow.isActive : true,
//     selfSignedUp: selectedRow ? selectedRow.selfSignedUp : false,
//   };

//   const handleSubmit = (values, { resetForm }) => {
//     const updatedData = selectedRow
//       ? tableData.map((row) =>
//           row.id === selectedRow.id ? { ...row, ...values } : row
//         )
//       : [...tableData, { id: Math.floor(Math.random() * 10000), ...values }];

//     setTableData(updatedData);
//     localStorage.setItem('carriersData', JSON.stringify(updatedData));

//     resetForm();
//     setSelectedRow(null);
//   };

//   const handleRowClick = (row) => {
//     setSelectedRow(row.original);
//   };

//   const getTrafficAllowedLabel = (row) => {
//     if (row.inboundTrafficAllowed && row.outboundTrafficAllowed) {
//       return 'Inbound/Outbound';
//     }
//     if (row.inboundTrafficAllowed) {
//       return 'Inbound';
//     }
//     if (row.outboundTrafficAllowed) {
//       return 'Outbound';
//     }
//     return '';
//   };



//   return (
//     <div>

//       <div className="page-header">
//         <h3 className="page-title">Carriers</h3>
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="!#" onClick={(event) => event.preventDefault()}>
//                 Carriers
//               </a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Carriers
//             </li>
//           </ol>
//         </nav>
//       </div>



//       <div className="parent-carrier-carrier">
//         <div className="child1-carrier">
//           <Paper sx={{ height: '510px', overflow: 'hidden' }}>
//             <MaterialReactTable
//               columns={[
//                 { accessorKey: 'id', header: 'ID', size: 100 },
//                 { accessorKey: 'region', header: 'Region', size: 100 },
//                 { accessorKey: 'carrierName', header: 'Carrier Name', size: 150 },
//                 { accessorKey: 'country', header: 'Country', size: 100 },
//                 {
//                   accessorKey: 'trafficAllowed',
//                   header: 'Inbound/Outbound Traffic',
//                   Cell: ({ row }) => getTrafficAllowedLabel(row.original),
//                   size: 120,
//                 },
//                 { accessorKey: 'contractCompany', header: 'Contract Company', size: 120 },
//                 { accessorKey: 'accountManager', header: 'Account Manager', size: 120 },
//               ]}
//               data={tableData}
//               muiTableContainerProps={{
//                 sx: { maxHeight: '400px', position: 'relative' },
//               }}
//               initialState={{
//                 density: 'compact',
//               }}
//               muiTableBodyRowProps={({ row }) => ({
//                 onClick: () => handleRowClick(row),
//                 sx: {
//                   cursor: 'pointer',
//                 },
//               })}
//             />
//           </Paper>
//         </div>

//         <div className="child2-carrier">
//           <Paper sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
//             <Typography variant="h6" gutterBottom>
//               {selectedRow ? 'Edit Carrier' : 'Add Carrier'}
//             </Typography>

//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//               enableReinitialize
//             >
//               {({ errors, touched, handleChange, handleBlur }) => (
//                 <Form>
//                   <Box sx={{ overflowY: 'auto', paddingBottom: 2 }}>
                    
                    
//                     <Field
//                       as={TextField}
//                       name="carrierName"
//                       label="Carrier Name"
//                       fullWidth
//                       error={touched.carrierName && Boolean(errors.carrierName)}
//                       helperText={touched.carrierName && errors.carrierName}
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />
                    
//                     <Field
//                       as={TextField}
//                       name="subjectiveEstimation"
//                       label="Subjective Estimation"
//                       type="number"
//                       fullWidth
//                       error={touched.subjectiveEstimation && Boolean(errors.subjectiveEstimation)}
//                       helperText={touched.subjectiveEstimation && errors.subjectiveEstimation}
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />


//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="inboundTrafficAllowed"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       }
//                       label="Inbound Traffic Allowed"
//                     />

//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="outboundTrafficAllowed"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       }
//                       label="Outbound Traffic Allowed"
//                     />

//                     <Field
//                       as={TextField}
//                       name="country"
//                       label="Country"
//                       fullWidth
//                       error={touched.country && Boolean(errors.country)}
//                       helperText={touched.country && errors.country}
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />

//                     <Field
//                       as={TextField}
//                       name="address"
//                       label="Address"
//                       fullWidth
//                       error={touched.address && Boolean(errors.address)}
//                       helperText={touched.address && errors.address}
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />

//                     <Field
//                       as={TextField}
//                       name="region"
//                       label="Region"
//                       fullWidth
//                       error={touched.region && Boolean(errors.region)}
//                       helperText={touched.region && errors.region}
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />

//                     <Field
//                       as={TextField}
//                       name="contractCompany"
//                       label="Contract Company"
//                       fullWidth
//                       error={touched.contractCompany && Boolean(errors.contractCompany)}
//                       helperText={touched.contractCompany && errors.contractCompany}
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />

//                     <Field
//                       as={TextField}
//                       name="accountManager"
//                       label="Account Manager"
//                       fullWidth
//                       error={touched.accountManager && Boolean(errors.accountManager)}
//                       helperText={touched.accountManager && errors.accountManager}
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />

//                     <Field
//                       as={TextField}
//                       name="comments"
//                       label="Comments"
//                       fullWidth
//                       size="small"
//                       sx={{ mb: 2 }}
//                     />

//                     <FormControlLabel
//                       control={<Checkbox name="isTest" onChange={handleChange} />}
//                       label="Test Carrier"
//                     />
//                     <FormControlLabel
//                       control={<Checkbox name="isActive" onChange={handleChange} />}
//                       label="Active"
//                     />
//                     <FormControlLabel
//                       control={<Checkbox name="selfSignedUp" onChange={handleChange} />}
//                       label="Self-Signed Up"
//                     />
//                   </Box>
//                   <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
//                     <Button type="submit" variant="contained" color="primary">
//                       {selectedRow ? 'Update Carrier' : 'Add Carrier'}
//                     </Button>
//                     {selectedRow && (
//                       <Button
//                         variant="outlined"
//                         onClick={() => setSelectedRow(null)}
//                         color="secondary"
//                       >
//                         Cancel
//                       </Button>
//                     )}
//                   </Grid>
//                 </Form>
//               )}
//             </Formik>
//           </Paper>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carriers;













import React, { useState } from 'react';
import {Box, Button, Paper, Checkbox, FormControlLabel, TextField, Grid, Typography,} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Carriers.css';


const Carriers = () => {


 const getDataFromStorage = () => {
    const savedData = localStorage.getItem('carriersData');
    return savedData ? JSON.parse(savedData) : [];
  };

  const [tableData, setTableData] = useState(getDataFromStorage());
  const [selectedRow, setSelectedRow] = useState(null);



  const validationSchema = Yup.object({
    carrierName: Yup.string().required('Carrier name is required'),
    subjectiveEstimation: Yup.number()
      .min(0, 'Must be greater than or equal to 0')
      .max(10, 'Must be less than or equal to 10')
      .required('Subjective estimation is required'),
    inboundTrafficAllowed: Yup.boolean(),
    outboundTrafficAllowed: Yup.boolean(),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    region: Yup.string().required('Region is required'),
    comments: Yup.string(),
    contractCompany: Yup.string().required('Contract company is required'),
    accountManager: Yup.string().required('Account manager is required'),
    isTest: Yup.boolean(),
    isActive: Yup.boolean(),
    selfSignedUp: Yup.boolean(),
  });


  const initialValues = {
    carrierName: selectedRow ? selectedRow.carrierName : '',
    subjectiveEstimation: selectedRow ? selectedRow.subjectiveEstimation : '',
    inboundTrafficAllowed: selectedRow ? selectedRow.inboundTrafficAllowed : false,
    outboundTrafficAllowed: selectedRow ? selectedRow.outboundTrafficAllowed : false,
    country: selectedRow ? selectedRow.country : '',
    address: selectedRow ? selectedRow.address : '',
    region: selectedRow ? selectedRow.region : '',
    comments: selectedRow ? selectedRow.comments : '',
    contractCompany: selectedRow ? selectedRow.contractCompany : '',
    accountManager: selectedRow ? selectedRow.accountManager : '',
    isTest: selectedRow ? selectedRow.isTest : false,
    isActive: selectedRow ? selectedRow.isActive : false,
    selfSignedUp: selectedRow ? selectedRow.selfSignedUp : false,
  };

  const handleSubmit = (values, { resetForm }) => {

    const updatedData = selectedRow
      ? tableData.map((row) =>
          row.id === selectedRow.id ? { ...row, ...values } : row
        )
      : [...tableData, { id: Math.floor(Math.random() * 10000), ...values }];

    setTableData(updatedData);
    localStorage.setItem('carriersData', JSON.stringify(updatedData));



    // Reset form and explicitly reset checkbox values
    resetForm({ values: initialValues }); // Make sure checkboxes are reset here
    setSelectedRow(null); // Deselect the row after submitting
  
  };

  const handleRowClick = (row) => {
    setSelectedRow(row.original);
  };

  const getTrafficAllowedLabel = (row) => {
    if (row.inboundTrafficAllowed && row.outboundTrafficAllowed) {
      return 'Inbound/Outbound';
    }
    if (row.inboundTrafficAllowed) {
      return 'Inbound';
    }
    if (row.outboundTrafficAllowed) {
      return 'Outbound';
    }
    return '';
  };



  return (
    <div>


      <div className="page-header">
        <h3 className="page-title">Carriers</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Carriers
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Carriers
            </li>
          </ol>
        </nav>
      </div>


      

      <div className="parent-carrier-carrier">
        

        <div className="child1-carrier">
          <Paper sx={{ height: '510px', overflow: 'hidden' }}>
            <MaterialReactTable
              columns={[
                { accessorKey: 'id', header: 'ID', size: 100 },
                { accessorKey: 'region', header: 'Region', size: 100 },
                { accessorKey: 'carrierName', header: 'Carrier Name', size: 150 },
                { accessorKey: 'country', header: 'Country', size: 100 },
                {
                  accessorKey: 'trafficAllowed',
                  header: 'Inbound/Outbound Traffic',
                  Cell: ({ row }) => getTrafficAllowedLabel(row.original),
                  size: 120,
                },
                { accessorKey: 'contractCompany', header: 'Contract Company', size: 120 },
                { accessorKey: 'accountManager', header: 'Account Manager', size: 120 },
              ]}
              data={tableData}
              muiTableContainerProps={{
                sx: { maxHeight: '400px', position: 'relative' },
              }}
              initialState={{
                density: 'compact',
              }}
              muiTableBodyRowProps={({ row }) => ({
                onClick: () => handleRowClick(row),
                sx: {
                  cursor: 'pointer',
                },
              })}
            />
          </Paper>
        </div>


        <div className="child2-carrier">
          <Paper sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
          
            <Typography variant="h6" gutterBottom>
              {selectedRow ? 'Edit Carrier' : 'Add Carrier'}
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched, handleChange, handleBlur , values }) => (
                <Form>

            <Box sx={{ maxHeight: '423px', maxWidth:'400px',overflowY: 'auto', paddingBottom: 2 , paddingTop:'13px'}}>

                  <Box sx={{ overflowY: 'auto', paddingBottom: 2 }}>
                    
                    <Field
                      as={TextField}
                      name="carrierName"
                      label="Carrier Name"
                      fullWidth
                      error={touched.carrierName && Boolean(errors.carrierName)}
                      helperText={touched.carrierName && errors.carrierName}
                      size="small"
                      sx={{ mb: 2 ,  width: '300px' }}
                    />
                    <Field
                      as={TextField}
                      name="subjectiveEstimation"
                      label="Subjective Estimation"
                      type="number"
                      fullWidth
                      error={touched.subjectiveEstimation && Boolean(errors.subjectiveEstimation)}
                      helperText={touched.subjectiveEstimation && errors.subjectiveEstimation}
                      size="small"
                      sx={{ mb: 2 ,  width: '300px' }}
                    />


            <Box sx={{ display:'flex' }}>
                              
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="inboundTrafficAllowed"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.inboundTrafficAllowed} // Bind it to Formik's values
                        />
                      }
                      label="Inbound Traffic Allowed"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '12px',  // Customize font size here
                          fontWeight: 'bold', // Optional: You can also set the font weight
                        },
                      }}
                      />

                    <FormControlLabel
                      control={
                        <Checkbox 
                          name="outboundTrafficAllowed"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.outboundTrafficAllowed} // Bind it to Formik's values
                        />
                      }
                      label="Outbound Traffic Allowed"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '12px',  // Customize font size here
                          fontWeight: 'bold', // Optional: You can also set the font weight
                        },
                      }}
                    />
                      </Box>


                    <Field
                      as={TextField}
                      name="country"
                      label="Country"
                      fullWidth
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
                      size="small"
                      sx={{ mb: 2 ,  width: '300px' }}
                    />
                    <Field
                      as={TextField}
                      name="address"
                      label="Address"
                      fullWidth
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      size="small"
                      sx={{ mb: 2 ,  width: '300px'}}
                    />
                    <Field
                      as={TextField}
                      name="region"
                      label="Region"
                      fullWidth
                      error={touched.region && Boolean(errors.region)}
                      helperText={touched.region && errors.region}
                      size="small"
                      sx={{ mb: 2 ,  width: '300px'}}
                    />
                    <Field
                      as={TextField}
                      name="contractCompany"
                      label="Contract Company"
                      fullWidth
                      error={touched.contractCompany && Boolean(errors.contractCompany)}
                      helperText={touched.contractCompany && errors.contractCompany}
                      size="small"
                      sx={{ mb: 2 ,  width: '300px'}}
                    />
                    <Field
                      as={TextField}
                      name="accountManager"
                      label="Account Manager"
                      fullWidth
                      error={touched.accountManager && Boolean(errors.accountManager)}
                      helperText={touched.accountManager && errors.accountManager}
                      size="small"
                      sx={{ mb: 2 ,  width: '300px'}}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isTest"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.isTest} // Bind it to Formik's values
                        />
                      }
                      label="Test Carrier"

                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '12px',  // Customize font size here
                          fontWeight: 'bold', // Optional: You can also set the font weight
                        },
                      }}
                    />


                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isActive"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.isActive} // Bind it to Formik's values
                        />
                      }
                      label="Active"

                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '12px',  // Customize font size here
                          fontWeight: 'bold', // Optional: You can also set the font weight
                        },
                      }}
                    />
                   
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="selfSignedUp"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.selfSignedUp} // Bind it to Formik's values
                        />
                      }
                      label="Self-Signed Up"
                      
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '12px',  // Customize font size here
                          fontWeight: 'bold', // Optional: You can also set the font weight
                        },
                      }}
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {selectedRow ? 'Update Carrier' : 'Add Carrier'}
                      </Button>
                    </Grid>
                    {selectedRow && (
                      <Grid item>
                        <Button
                          variant="outlined"
                          onClick={() => setSelectedRow(null)}
                          color="secondary"
                        >
                          Cancel
                        </Button>
                      </Grid>
                    )}
                  </Grid>

                  </Box>
                </Form>

              )}
            </Formik>
          </Paper>
        </div>


      </div>


    </div>
  );
};

export default Carriers;


