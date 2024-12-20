import React, { useState , useEffect } from 'react';
import {Box, Button, Paper, Checkbox, FormControlLabel, TextField, Grid, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText} from '@mui/material';
import { MaterialReactTable , useMaterialReactTable, MRT_ExpandAllButton, } from 'material-react-table';
import { Formik, Form, Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import SelectDropdown from '../../../components/SelectDropdown/SelectDropdown'
import CarrierCurrencyGroupingTable from '../../../components/CarrierCurrencyGroupingTable/CarrierCurrencyGroupingTable'
import './Accounts.css';
import Modal from 'react-modal';
import { CircularProgress } from '@mui/material'; 
 Modal.setAppElement('#root');



 const Accounts = () => {


  const fetchData = async () => {

    setLoading(true); // Set loading to true when fetch starts

    try {

            // Log the current time when the data is refreshed
            const currentTime = new Date().toLocaleString();
            console.log(`Data refreshed at: ${currentTime}`);
      
      const carriersResponse = await fetch('http://localhost:8080/carriers');
      const carriers = await carriersResponse.json();

      // Create an array for carrier options (carrierName and id)
      const carrierOptions = carriers.map(carrier => ({
        label: carrier.carrierName,
        value: carrier.id
      }));

      setCarrierOptions(carrierOptions);

      // Flatten carrier data and include account information
      const combinedData = carriers.flatMap(carrier => 
        carrier.accounts.map(account => ({
          ...account,
          carrierName: carrier.carrierName,
          accountManager: carrier.accountManager,
          carrierId: carrier.id,
          balanceUpdated: new Date(account.balanceUpdated).toLocaleString(), // Format the date to a readable string
        }))
      );

      // Set the combined data into tableData state
      setTableData(combinedData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally{
      // Set the delay for at least 1 second (1000ms) before hiding the loading spinner
      setTimeout(() => {
        setLoadingDelay(false); // Allow hiding the spinner after the delay
        setLoading(false); // Indicate that data loading is complete
      }, 1000); // Set 1000ms delay for a smoother loading experience
    }
  };




   // UseEffect to handle initial fetch and set up interval for refreshing data
   useEffect(() => {
    // Fetch data initially when component mounts
    fetchData();

    // Set interval to refresh data every 1 minute (60000 ms)
    const intervalId = setInterval(() => {
      fetchData(); // Refresh data every minute
    }, 60000); // 60,000 ms = 1 minute

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts


  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [carrierOptions, setCarrierOptions] = useState([]);
  const [error, setError] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [loading, setLoading] = useState(true); // Initially true, indicating loading state
  const [loadingDelay, setLoadingDelay] = useState(true); // Tracks the loading delay state

  const [currencyOptions] = useState([
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
]  );


  const validationSchema = Yup.object({
    
    carrierName: Yup.string().required(''), 
    
    currency: Yup.string().required(''), 
    
    description: Yup.string(),
   

  })
  


  const initialValues = {
    currency: selectedRow ? selectedRow.currency : '',
    description: selectedRow?.description || '',
    carrierName: selectedRow ? selectedRow.carrierId  : '',
   };


  const handleRowClick = (row) => {
    setSelectedRow(row.original);
    console.log('Selected row set:', row.original);  // Log the selected row after setting it
    openModal();
  };

  
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



  const handleSubmit = async (values) => {
    try {
      let response;
      const payload = {
        carrier: { id: values.carrierName },  // Send carrier id
        currency: values.currency,
        description: values.description
      };
  
      console.log("Payload:", JSON.stringify(payload)); // Log to verify structure
  
      if (selectedRow) {
        // If updating an existing account
        response = await fetch(`http://localhost:8080/accounts/${selectedRow.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload), // Stringify the payload
        });
      } else {
        // If adding a new account
        response = await fetch('http://localhost:8080/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload), // Stringify the payload
        });
      }
  
      if (response.ok) {
        const updatedAccount = await response.json();
        console.log(selectedRow ? 'Account updated:' : 'New account added:', updatedAccount);
        fetchData(); // Re-fetch data after successful submit
        closeModal(); // Close the modal after submission
      } else {
        console.error(selectedRow ? 'Failed to update account' : 'Failed to add account');
      }
    } catch (error) {
      console.error(selectedRow ? 'Error updating account' : 'Error adding account:', error);
    }
  };
  
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/accounts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Account deleted');
        fetchData();  // Re-fetch data after deletion
      } else {
        console.error('Failed to delete carrier');
      }
    } catch (error) {
      console.error('Error deleting carrier:', error);
    }
  };


  return (
    <div>


      <div className="page-header">
        <h3 className="page-title">Accounts</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
              Carriers
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Accounts
            </li>
          </ol>
        </nav>
      </div>



          {/* Loading state handling */}
          {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CircularProgress />
          <p>Loading...</p>
        </div>
      ) : (
        <CarrierCurrencyGroupingTable
          data={tableData}
          onEdit={handleRowClick}
          onDelete={handleDelete}
          onAddAccount={openModal}
        />
      )}



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
        {({ setFieldValue, values , errors , isValid, dirty , touched , resetForm}) => {

          console.log('Form values:', values); // Log current values
          console.log('Form errors:', errors); // Log validation errors (if any)
                  
      return (
          <Form>
           
            <Box sx={{ minHeight: '500px', maxHeight: '500px', maxWidth:'500px', overflowY: 'auto', paddingBottom: 2 , paddingTop:'13px'}}>
          
    
            {/* Carrier Field */}
            <div style={formRowStyle}>
              <label htmlFor="carrierName" style={labelStyle}>Carrier:</label>
             
              <SelectDropdown
                      id="carrierName"
                      options={carrierOptions}
                      onChange={(option) => {
                        setFieldValue('carrierName', option ? option.value : ''); // Set the carrier ID
                      }}
                      value={values.carrierName} 
                      placeholder="Select your Carrier"
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


              <ErrorMessage name="carrierName" component="div" style={errorStyle} />
            </div>



            {/* Currency Field */}
              <div style={formRowStyle}>
                <label htmlFor="currency" style={labelStyle}>Currency:</label>
                <SelectDropdown
                      id="currency"
                      options={currencyOptions}
                      onChange={(option) => {
                        setFieldValue('currency', option ? option.value : ''); // Set the correct field name here
                      }}
                      value={values.currency} // Ensure the selected value is correctly matched
                      placeholder="Select your Account Currency"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          width: '230px',
                          fontSize: '15px',
                          marginBottom: '10px',
                        }),
                      }}
                    />
              </div>
              <ErrorMessage name="currency" component="div" style={errorStyle} />


             {/* Describiton Field */}
             <div style={formRowStyle}>
              <label htmlFor="description" style={labelStyle}>Description:</label>
              <Field id="description" name="description" type="text" placeholder="Describtion (Optional)" style={inputStyle} />
             </div>

     
        
        
            <Grid container spacing={2} style={{marginTop:'40px' , display:'flex' , justifyContent:'space-around'}}>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!(isValid && dirty)} // Disable if form is invalid or untouched
                        onSubmit={handleSubmit}
                      >
                        {selectedRow ? 'Update Account' : 'Add Account'}
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

export default Accounts;








