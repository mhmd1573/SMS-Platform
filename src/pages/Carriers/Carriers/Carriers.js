import React, { useState , useEffect } from 'react';
import {Box, Button, Paper, Checkbox, FormControlLabel, TextField, Grid, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { Formik, Form, Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './Carriers.css';
import SelectDropdown from '../../../components/SelectDropdown/SelectDropdown'
import Modal from 'react-modal';
 Modal.setAppElement('#root');



 const Carriers = () => {


 // Define the fetchData function
 const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8080/carriers');  // Adjust URL if necessary
    const data = await response.json();
    setTableData(data);  // Set the fetched data into the table data state
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



// UseEffect to fetch data on initial load
useEffect(() => {
  fetchData();  // Fetch data when component mounts
}, []);  // Empty dependency array means it runs only once when the component mounts




  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [countryOptions, setCountryOptions] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [error, setError] = useState(null);
  
  const [regionOptions, setRegionOptions] = useState([
    { value: 'Africa', label: 'Africa' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
    { value: 'Americas', label: 'Americas' },
  ]);


  const validationSchema = Yup.object({
    carrierName: Yup.string()
    .matches(/^(?!\s*$)(?!\d+$)[A-Za-z0-9_]+$/, 'Carrier name must be alphanumeric or contain underscores, but cannot be empty or contain spaces or only digits')
    .required(''),

    subjectiveEstimation: Yup.number()
      .min(0, 'Must be greater than or equal to 0')
      .max(10, 'Must be less than or equal to 10')
      .required('Subjective estimation is required'),
  
    country: Yup.string().required('Country is required'),
    address: Yup.string().notRequired(),
    region: Yup.string().required('Region is required'),
    comments: Yup.string(),
    contractCompany: Yup.string().required('Contract company is required'),
    accountManager: Yup.string().required('Account manager is required'),
    isTest: Yup.boolean(),
    isActive: Yup.boolean(),
    inboundAllowedTraffic: Yup.boolean(),
    outboundAllowedTraffic: Yup.boolean(),
  
    trafficSelection: Yup.boolean().test(
      'inbound-or-outbound',
      'At least one of Inbound or Outbound traffic must be selected',
      function () {
        const { inboundAllowedTraffic, outboundAllowedTraffic } = this.parent;
        if (!inboundAllowedTraffic && !outboundAllowedTraffic) {
          return this.createError({
            path: 'trafficSelection', // Make sure to use the correct path to the field
            message: 'At least one of Inbound or Outbound traffic must be selected',
          });
        }
        return true;
      }
    ),

    exactlyOneChecked: Yup.boolean().test(
      'exactly-one-checked',
      'You must select exactly one of the checkboxes (isTest or isActive)',
      function () {
        const { isTest, isActive } = this.parent;
        if ((isTest && isActive) || (!isTest && !isActive)) {
          return this.createError({
            path: 'exactlyOneChecked', // custom field name to check
            message: 'You must select exactly one of the checkboxes ',
          });
        }
        return true;
      }
    ),

  })
  

  const initialValues = {
    carrierName: selectedRow ? selectedRow.carrierName : '',
    subjectiveEstimation: selectedRow ? selectedRow.subjectiveEstimation : '',
    country: selectedRow ? selectedRow.country : '',
    address: selectedRow ? selectedRow.address : '',
    region: selectedRow ? selectedRow.region : '',
    comments: selectedRow ? selectedRow.comments : '',
    contractCompany: selectedRow ? selectedRow.contractCompany : '',
    accountManager: selectedRow ? selectedRow.accountManager : '',
    isTest: selectedRow ? selectedRow.isTest : false,
    isActive: selectedRow ? selectedRow.isActive : false,
    selfSignedUp: selectedRow ? selectedRow.selfSignedUp : false,
    inboundAllowedTraffic: selectedRow ? selectedRow.inboundAllowedTraffic : false,
    outboundAllowedTraffic: selectedRow ? selectedRow.outboundAllowedTraffic : false,
  };

 
  const handleRowClick = (row) => {
    setSelectedRow(row.original);
    console.log('Selected row set:', row.original);  // Log the selected row after setting it
    openModal();
  };

  
  const contractOptions = [
    { value: 'Quantum', label: 'Quantum' },
    { value: 'Alaris', label: 'Alaris' },
  ];
  
  const accountManagerOptions = [
    { value: 'Movses Kiredijan', label: 'Movses Kiredijan' },
    { value: 'Mohamad Owaiti', label: 'Mohamad Owaiti' },
  ];

  const formRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '6px',
  };

  const labelStyle = {
    width: '140px',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'black',
  };

  const inputStyle = {
    width: '230px',
    fontSize: '15px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom:'10px'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginLeft: '160px',
    marginTop: '-15px',
    marginBottom:'7px'
  };


  const handleSubmit = async (values, actions) => {
    try {
      let response;
      if (selectedRow) {
        // Update existing carrier (PUT request)
        response = await fetch(`http://localhost:8080/carriers/${selectedRow.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values), // Send the form data as JSON
        });
      } else {
        // Add new carrier (POST request)
        response = await fetch('http://localhost:8080/carriers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values), // Send the form data as JSON
        });
      }
  
      if (response.ok) {
        const updatedCarrier = await response.json();
        console.log(selectedRow ? 'Carrier updated:' : 'New carrier added:', updatedCarrier);
        fetchData(); // Re-fetch data after successful submit
        closeModal(); // Close the modal after submission
      } else {
        console.error(selectedRow ? 'Failed to update carrier' : 'Failed to add carrier');
      }
    } catch (error) {
      console.error(selectedRow ? 'Error updating carrier' : 'Error adding carrier:', error);
    }
  
    actions.setSubmitting(false); // Stop form submission progress
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/carriers/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Carrier deleted');
        fetchData();  // Re-fetch data after deletion
      } else {
        console.error('Failed to delete carrier');
      }
    } catch (error) {
      console.error('Error deleting carrier:', error);
    }
  };



// Fetch countries based on selected region
useEffect(() => {
  if (selectedRegion) {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`);
        const data = await response.json();
        const formattedCountryOptions = data.map((country) => ({
          value: country.name.common, // Country code
          label: country.name.common, // Country name
        }));
        setCountryOptions(formattedCountryOptions);
      } catch (err) {
        setError('Failed to fetch country data');
      }
    };

    fetchCountryData();
  } else {
    setCountryOptions([]); // Clear country options when no region is selected
  }
}, [selectedRegion]);



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


    

<div className="child1-carrier">
     


<MaterialReactTable
  columns={[
    { accessorKey: 'id', header: 'ID', size: 100 },
    { accessorKey: 'carrierName', header: 'Carrier Name', size: 150 },
    {
      accessorKey: 'country',
      header: 'Country',
      size: 100,
      Cell: ({ cell }) => {
        const countryName = cell.getValue(); // Now country is saved as the full name
        return countryName || 'Unknown'; // Display the full country name
      },
    },
    { accessorKey: 'region', header: 'Region', size: 100 },
    { accessorKey: 'contractCompany', header: 'Contract Company', size: 120 },
    { accessorKey: 'accountManager', header: 'Account Manager', size: 120 },
    {
      accessorKey: 'inboundAllowedTraffic',
      header: 'Inbound Traffic Allowed',
      size: 100,
      Cell: ({ cell }) => {
        const value = cell.getValue() ? 'Yes' : 'No'; // Convert boolean to Yes/No
        return (
          <span
            style={{
              color: value === 'Yes' ? 'green' : 'red',
              paddingLeft: '65px',
              fontWeight: 'bold',
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'outboundAllowedTraffic',
      header: 'Outbound Traffic Allowed',
      size: 100,
      Cell: ({ cell }) => {
        const value = cell.getValue() ? 'Yes' : 'No'; // Convert boolean to Yes/No
        return (
          <span
            style={{
              color: value === 'Yes' ? 'green' : 'red',
              paddingLeft: '65px',
              fontWeight: 'bold',
            }}
          >
            {value}
          </span>
        );
      },
    },
    // Add the delete column here
    {
      accessorKey: 'delete', // You can leave the accessor key as 'delete' (not used for actual data)
      header: 'Actions',
      size: 120,
      Cell: ({ row }) => {
        const handleDeleteClick = () => {
          const id = row.original.id; // Get the id of the row to delete
          handleDelete(id); // Call the delete function with the id
        };

        return (
          <Button
            onClick={handleDeleteClick}
            sx={{
              backgroundColor: 'red',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ]}
  data={tableData}
  initialState={{
    density: 'compact',
  }}
  muiTableBodyRowProps={({ row }) => ({
    onClick: () => handleRowClick(row),
    sx: {
      cursor: 'pointer',
    },
  })}
  renderTopToolbarCustomActions={() => (
    <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={openModal}
        sx={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '5px 15px',
          cursor: 'pointer',
        }}
      >
        Add Carrier
      </Button>
    </Box>
  )}
  muiTableContainerProps={{
    sx: { minHeight: '420px', maxHeight: '420px', position: 'relative' },
  }}
/>



    </div>
  



       {/* Modal Component */}
       <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Rate Editor Form"
        style={{
          content: {
            width: '500px',
            height: 'auto',
            margin: 'auto',
            padding: '20px',
            zIndex: 5050, // Ensure it's above other elements
            position: 'relative', // Make sure modal is positioned on top
          },
          overlay: {
            zIndex: 5040, // Optional: lower than the modal content
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dim background
          },
        }}
      >
            <Typography variant="h6" gutterBottom style={{color:'black'}}>
              {selectedRow ? 'Edit Carrier' : 'Add Carrier'}
            </Typography>

          
            <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log('Formik onSubmit triggered:', values);
          handleSubmit(values, actions);
        }}
              >
        {({ setFieldValue, values , errors , isValid, dirty , touched}) => {

          console.log('Form values:', values); // Log current values
          console.log('Form errors:', errors); // Log validation errors (if any)
                  
      return (
          <Form>
           
            <Box sx={{ minHeight: '500px', maxHeight: '500px', maxWidth:'500px', overflowY: 'auto', paddingBottom: 2 , paddingTop:'13px'}}>
          
            {/* Carrier Name Field */}
            <div style={formRowStyle}>
              <label htmlFor="carrierName" style={labelStyle}>Carrier Name:</label>
              <Field id="carrierName" name="carrierName" type="text" placeholder="Enter Carrier Name"  style={inputStyle} />
            </div>
            <ErrorMessage name="carrierName" component="div" style={errorStyle} />

                  

                {/* Region Field */}
                <div style={formRowStyle}>
                  <label htmlFor="region" style={labelStyle}>Region:</label>
                  <SelectDropdown
                    id="region"
                    options={regionOptions}
                    onChange={(option) => {
                      console.log('Region selected:', option ? option.value : '');
                      setSelectedRegion(option ? option.value : ''); // Set selected region to trigger country fetching
                      setFieldValue('region', option ? option.value : '');
                    }}
                    value={values.region}
                    placeholder="Select your Region"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: '230px',
                        fontSize: '5px',
                        marginBottom: '10px',
                      }),
                    }}
                  />
                </div>
                <ErrorMessage name="region" component="div" style={errorStyle} />


                 {/* Country Field */}
               <div style={formRowStyle}>
                    <label htmlFor="country" style={labelStyle}>Country:</label>
                    <SelectDropdown
                      id="country"
                      options={countryOptions}
                      onChange={(option) => {
                        console.log('Country selected:', option ? option.value : '');
                        setFieldValue('country', option ? option.value : '');
                      }}
                      value={values.country}
                      placeholder="Select your Country"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          width: '230px',
                          fontSize: '15px',
                          marginBottom: '10px',
                        }),
                      }}
                      menuPortalTarget={document.body}
                     
                    />
              </div>
               <ErrorMessage name="country" component="div" style={errorStyle} />           

    

             {/* Address Field */}
             <div style={formRowStyle}>
              <label htmlFor="address" style={labelStyle}>Address:</label>
              <Field id="address" name="address" type="text" placeholder="Postal Address (optional)" style={inputStyle} />
             </div>


             {/* Contract Compnay  Field */}
             <div style={formRowStyle}>
              <label htmlFor="contractCompany" style={labelStyle}>Contract Company :</label>
              <SelectDropdown
                id="contractCompany"
                options={contractOptions}
                // onChange={(option) => setFieldValue('accountManager', option ? option.value : '')}
                onChange={(option) => {
                  console.log('Contract selected:', option ? option.value : ''); 
                  setFieldValue('contractCompany', option ? option.value : '');
                }}
                value={values.contractCompany} 
                placeholder="Select your Contract Company"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '230px',
                    fontSize: '15px',
                     marginBottom:'10px'
                  }),
                }}
              />
             </div>
            <ErrorMessage name="contractCompany" component="div" style={errorStyle} />


             {/* Account Manager Field */}
             <div style={formRowStyle}>
              <label htmlFor="accountManager" style={labelStyle}>Account Manager:</label>
              <SelectDropdown
                id="accountManager"
                options={accountManagerOptions}
                // onChange={(option) => setFieldValue('accountManager', option ? option.value : '')}
                onChange={(option) => {
                  console.log('Account Manager selected:', option ? option.value : ''); 
                  setFieldValue('accountManager', option ? option.value : '');
                }}
                value={values.accountManager} 
                placeholder="Select your Account Manager"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '230px',
                    fontSize: '15px',
                  }),
                }}
              />
             </div>
            <ErrorMessage name="accountManager" component="div" style={{color: 'red', fontSize: '12px',
              marginLeft: '160px',
             
              marginBottom:'7px'}} />



              {/* Subjective Estimation Field */}
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
            <label htmlFor="subjectiveEstimation" style={labelStyle}>Subjective Estimation:</label>
            <Field id="subjectiveEstimation" name="subjectiveEstimation" type="number" style={{width: '130px',fontSize: '15px',padding: '5px', border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom:'20px',
            marginTop:'10px'
            }} />
                </div>


      
              {/* Allowed Traffic */}
            <div style={formRowStyle}>
            <label style={labelStyle}>Allowed Traffic:</label>
        
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' , paddingLeft:'20px'}}>
 
              <FormControlLabel
                    control={
            <Field
                    name="inboundAllowedTraffic"
                    type="checkbox"
                    render={({ field, form }) => (
                <Checkbox
                        {...field}
                        onChange={(e) => {
                console.log("CheckBox Incoming field changed:", e.target.checked); // Log the checked state
                form.setFieldValue(field.name, e.target.checked); // Update Formik state manually
                }}
                onBlur={form.handleBlur} // Use Formik's blur handler
                checked={field.value} // Bind it to Formik's values
                size="small"
                />
                )}
                />
                }
                label="Inbound"
                sx={{
                '& .MuiFormControlLabel-label': {
                fontSize: '13px', // Customize font size here
                fontWeight: 'bold', // Optional: You can also set the font weight
                color:'black'
                },
                }}
                />
              
              <FormControlLabel
                        control={
                <Field
                        name="outboundAllowedTraffic"
                        type="checkbox"
                        render={({ field, form }) => (
                    <Checkbox
                            {...field}
                            onChange={(e) => {
                    console.log("CheckBox Outbound field changed:", e.target.checked); // Log the checked state
                    form.setFieldValue(field.name, e.target.checked); // Update Formik state manually
                    }}
                    onBlur={form.handleBlur} // Use Formik's blur handler
                    checked={field.value} // Bind it to Formik's values
                    size="small"
                    />
                    )}
                    />
                    }
                    label="Outbound"
                    sx={{
                    '& .MuiFormControlLabel-label': {
                    fontSize: '13px', // Customize font size here
                    fontWeight: 'bold', // Optional: You can also set the font weight
                    color:'black'
                    },
                    }}
                    />
             </div>

              </div>
                


             {/* Carrier Status */}
              <div style={formRowStyle}>
            <label style={labelStyle}>Carrier Status:</label>
        
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' , paddingLeft:'20px'}}>
 
              <FormControlLabel
                    control={
            <Field
                    name="isTest"
                    type="checkbox"
                    render={({ field, form }) => (
                <Checkbox
                        {...field}
                        onChange={(e) => {
                console.log("CheckBox isTest field changed:", e.target.checked); // Log the checked state
                form.setFieldValue(field.name, e.target.checked); // Update Formik state manually
                }}
                onBlur={form.handleBlur} // Use Formik's blur handler
                checked={field.value} // Bind it to Formik's values
                size="small"
                />
                )}
                />
                }
                label="is Test"
                sx={{
                '& .MuiFormControlLabel-label': {
                fontSize: '13px', // Customize font size here
                fontWeight: 'bold', // Optional: You can also set the font weight
                color:'black'
                },
                }}
                />
              
              <FormControlLabel
                    control={
            <Field
                    name="isActive"
                    type="checkbox"
                    render={({ field, form }) => (
                <Checkbox
                        {...field}
                        onChange={(e) => {
                console.log("CheckBox isActive field changed:", e.target.checked); // Log the checked state
                form.setFieldValue(field.name, e.target.checked); // Update Formik state manually
                }}
                onBlur={form.handleBlur} // Use Formik's blur handler
                checked={field.value} // Bind it to Formik's values
                size="small"
                />
                )}
                />
                }
                label="is Active"
                sx={{
                '& .MuiFormControlLabel-label': {
                fontSize: '13px', // Customize font size here
                fontWeight: 'bold', // Optional: You can also set the font weight
                color:'black'
                },
                }}
                />
          
             </div>
             
              </div>
  
                 {/* Show custom validation error if both checkboxes are selected or neither */}
                 {errors.exactlyOneChecked && touched.isTest && (
                  <div style={{ color: 'red', fontSize: '12px' , textAlign:'center'}}>
                    {errors.exactlyOneChecked}
                      </div>
                        )}

          


            <Grid container spacing={2} style={{marginTop:'40px' , display:'flex' , justifyContent:'space-around'}}>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!(isValid && dirty)} // Disable if form is invalid or untouched
                        onSubmit={handleSubmit}
                      >
                        {selectedRow ? 'Update Carrier' : 'Add Carrier'}
                      </Button>
                    </Grid>
                    
                      <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => {
                              setSelectedRow(null); 
                              closeModal();
                            }}
                            color="secondary"
                          >
                            Cancel
                          </Button>
                      </Grid>
                  
            </Grid>

                  </Box>

          </Form>
      );
        }}
           </Formik>


      </Modal>

    </div>
  );
};

export default Carriers;








