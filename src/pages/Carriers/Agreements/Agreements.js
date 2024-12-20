import React, { Component, useState } from 'react';
import {Box, Button, Paper, Checkbox, FormControlLabel, TextField, Grid, Typography , Select, MenuItem, FormControl, InputLabel, FormHelperText} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { DatePicker, TimePicker, DateTimePicker  } from '@mui/x-date-pickers';
import {LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns'; // or import moment from 'moment
import SelectDropdown from '../../../components/SelectDropdown/SelectDropdown'
import * as Yup from 'yup';
import './Agreements.css'
import AgreementForm from '../../../components/AgrrementForm/AgreementForm'
import Modal from 'react-modal';

  // Bind Modal to your appElement (accessibility requirement)
  Modal.setAppElement('#root');



  const Agreements = () => {



    

    const getDataFromStorage = () => {
      const savedData = localStorage.getItem('agreementsData');
      return savedData ? JSON.parse(savedData) : [];
    };

    const [tableData, setTableData] = useState(getDataFromStorage());
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


      // Function to open the modal
       const openModal = () => setIsModalOpen(true);

      // Function to close the modal
      const closeModal = () => setIsModalOpen(false);


    const handleRowClick = (row) => {
      setSelectedRow(row.original);
      openModal();
    };
  

 
    const initialValues = {

      carrierName: selectedRow ? selectedRow.carrierName : '',
      account: selectedRow ? selectedRow.account : '',
      incoming: selectedRow ? selectedRow.incoming : false,
      outgoing: selectedRow ? selectedRow.outgoing : false,
      
    
      startDate: selectedRow ? selectedRow.startDate : '',
      endDate: selectedRow ? selectedRow.endDate : '',

      
      // incoming 
      inTimezone: selectedRow ? selectedRow.inTimezone : '',
      inBillingPeriod: selectedRow ? selectedRow.inBillingPeriod : '',
      inRoundingFunction: selectedRow ? selectedRow.inRoundingFunction : '',
      incredit: selectedRow ? selectedRow.incredit : '', 

      // outgoing 
      outTimezone: selectedRow ? selectedRow.outTimezone : '',
      outBillingPeriod: selectedRow ? selectedRow.outBillingPeriod : '',
      outRoundingFunction: selectedRow ? selectedRow.outRoundingFunction : '',
      outcredit: selectedRow ? selectedRow.outcredit : '', 

    };



    const validationSchema = Yup.object({

      carrierName: Yup.string().required('Carrier name is required'),
      account: Yup.string().required('Address is required'),
  
    
      // Custom validation to ensure at least one checkbox is selected
      checkboxes: Yup.mixed().test(
        'at-least-one-checked',
        'At least one checkbox must be selected',
        function () {
          return this.parent.incoming || this.parent.outgoing;
        }
      ),


      startDate: Yup.date().required('Field is required'),
      
      endDate: Yup.date()
     .required('Field is required')
     .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),


      // Conditional validation based on 'incoming' checkbox
      inCredit: Yup.number()
      .integer('Must be an integer')
      .min(0, 'Must be at least 0')
      .test('incoming', 'In Credit is required', function (value) {
        const { incoming } = this.parent;
        return incoming ? value !== undefined : true;
      }),
      

      inTimezone: Yup.string().test('incoming', 'Time Zone is required', function (value) {
        const { incoming } = this.parent;
        return incoming ? !!value : true;
      }),

      inBillingPeriod: Yup.string().test('incoming', 'Billing Period is required', function (value) {
        const { incoming } = this.parent;
        return incoming ? !!value : true;
      }),

      inRoundingFunction: Yup.string().test('incoming', 'Rounding Function is required', function (value) {
        const { incoming } = this.parent;
        return incoming ? !!value : true;
      }),


      outTimezone: Yup.string().test('outgoing', 'Time Zone is required', function (value) {
        const { outgoing } = this.parent;
        return outgoing ? !!value : true;
      }),


      outBillingPeriod: Yup.string().test('outgoing', 'Billing Period is required', function (value) {
        const { outgoing } = this.parent;
        return outgoing ? !!value : true;
      }),


      outRoundingFunction: Yup.string().test('outgoing', 'Rounding Function is required', function (value) {
        const { outgoing } = this.parent;
        return outgoing ? !!value : true;
      }),


      outCredit: Yup.number()
      .integer('Must be an integer')
      .min(0, 'Must be at least 0')
      .test('outgoing', 'Out Credit is required', function (value) {
        const { outgoing } = this.parent;
        return outgoing ? value !== undefined : true;
      }),

 

    });
    
    
    
    const handleSubmit = (values, { resetForm   }) => {

    
      console.log('Form values:', values); // Log form values

      const updatedData = selectedRow
        ? tableData.map((row) =>
            row.id === selectedRow.id ? { ...row, ...values } : row
          )
        : [...tableData, { id: Math.floor(Math.random() * 10000), ...values }];

      setTableData(updatedData);
      localStorage.setItem('agreementsData', JSON.stringify(updatedData));

      // Reset form and explicitly reset checkbox values
      resetForm({ values: initialValues }); // Make sure checkboxes are reset here
      setSelectedRow(null); // Deselect the row after submitting
    
    };


   const carrierOptions = [
      { value: 'carrier1', label: 'Carrier 1' },
      { value: 'carrier2', label: 'Carrier 2' },
      { value: 'carrier3', label: 'Carrier 3' },
      { value: 'carrier4', label: 'Carrier 4' },
      { value: 'carrier5', label: 'Carrier 5' },
      { value: 'carrier6', label: 'Carrier 6' },

    ];
   
    const acountOptions = [
      { value: 'account1', label: 'Account 1' },
      { value: 'account2', label: 'Account 2' },
      { value: 'account3', label: 'Account 3' },
      { value: 'account4', label: 'Account 4' },
      { value: 'account5', label: 'Account 5' },
      { value: 'account5', label: 'Account 6' },

    ];

    const timezoneOptions = [
      { value: 'timezone1', label: 'Time Zone 1' },
      { value: 'timezone2', label: 'Time Zone 2' },
      { value: 'timezone3', label: 'Time Zone 3' },
      { value: 'timezone4', label: 'Time Zone 4' },
      { value: 'timezone5', label: 'Time Zone 5' },
      { value: 'timezone6', label: 'Time Zone 6' },
      { value: 'timezone7', label: 'Time Zone 7' },
    ];

    const BillingPeriodOptions = [
      { value: 'billingPeriod1', label: 'Billing Period 1' },
      { value: 'billingPeriod2', label: 'Billing Period 2' },
      { value: 'billingPeriod3', label: 'Billing Period 3' },
      { value: 'billingPeriod4', label: 'Billing Period 4' },
      { value: 'billingPeriod5', label: 'Billing Period 5' },
      { value: 'billingPeriod6', label: 'Billing Period 6' },
      { value: 'billingPeriod7', label: 'Billing Period 7' },
    ];

    const RoundingFunctionOptions = [
      { value: 'RoundingFunction1', label: 'Rounding Function 1' },
      { value: 'RoundingFunction2', label: 'Rounding Function 2' },
      { value: 'RoundingFunction3', label: 'Rounding Function 3' },
      { value: 'RoundingFunction4', label: 'Rounding Function 4' },
      { value: 'RoundingFunction5', label: 'Rounding Function 5' },
      { value: 'RoundingFunction6', label: 'Rounding Function 6' },
      { value: 'RoundingFunction7', label: 'Rounding Function 7' },
    ];


  


    return (
   
   
     <div>
      
        <div className="page-header">
          <h3 className="page-title"> Agreements</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Carriers</a></li>
              <li className="breadcrumb-item active" aria-current="page">Agreements</li>
            </ol>
          </nav>
        </div>



      
      <div className='parent-agreement'>

      
      <div className='child1-agreement'>
      <Paper sx={{ height: '550px', overflow: 'hidden' }}>
      
            <MaterialReactTable
              columns={[
                { accessorKey: 'id', header: 'ID', size: 100 },
                { accessorKey: 'carrierName', header: 'Carrier', size: 150 },
                { accessorKey: 'accountCurrency', header: 'Account Currency', size: 100 },
                { accessorKey: 'accountDescription', header: 'Account Description', size: 120 },
                { accessorKey: 'agreementCode', header: 'Agreement Code', size: 120 },
                { accessorKey: 'companyRegisteredName', header: 'Company Registered Name', size: 120 },
                { accessorKey: 'incoming', header: 'Incoming', size: 120 },
                { accessorKey: 'outgoing', header: 'Outgoing', size: 120 },
                { accessorKey: 'isActive', header: 'is Active', size: 120 },
                { accessorKey: 'startDate', header: 'Start Date', size: 120 },
                { accessorKey: 'endDate', header: 'End Date', size: 120 },
                { accessorKey: 'attachmentLink', header: 'Attachment Link', size: 120 },
                { accessorKey: 'documentLink', header: 'Document Link', size: 120 },
              ]}
              data={tableData}
              muiTableContainerProps={{
                sx: { minHeight:'437px' , maxHeight: '600px', position: 'relative' },
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
               renderTopToolbarCustomActions={() => (
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '16px',
                          padding: '8px',
                          flexWrap: 'wrap',
                            }}
                      >
                        
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
                          Add Agrrement
                          </Button>
                      </Box>  
                      )}  
            />




          </Paper>
      </div>

      
  


       <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Rate Editor Form"
        style={{
          content: {
            width: '450px',
            height: 'auto',
            margin: 'auto',
            padding: '20px',
            zIndex: 5050, // Ensure it's above other elements
            position: 'relative', // Make sure modal is positioned on top
           paddingLeft:'30px'
          },
          overlay: {
            zIndex: 5040, // Optional: lower than the modal content
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dim background
          },
        }}
      >
             <Typography variant="h6" gutterBottom style={{color:'black'}}>
                   {selectedRow ? 'Edit Agreement' : 'Add Agreement'}
             </Typography>
        


            
                    <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur={false} // Skip validation on blur
                validateOnChange={false} // Skip validation on change
                onSubmit={handleSubmit}
                enableReinitialize
                                            >
    {({ errors, touched, handleChange, handleBlur , values , setFieldValue , isSubmitting , isValid }) => {
        console.log('Validation Errors:', errors); // Log errors
        console.log('Touched Fields:', touched);   // Log touched fields

        return(
   
      

        <Form>

            <Box sx={{ minHeight: '463px', maxHeight: '463px', maxWidth:'400px', overflowY: 'auto', paddingBottom: 2 , paddingTop:'13px'}}>

            <Box sx={{ overflowY: 'auto', paddingBottom: 2 }}>
            
            <div>
            <Field name="carrierName">
              {({ field }) => (
                <SelectDropdown
                  {...field}
                  options={carrierOptions}
                  onChange={(option) => setFieldValue('carrierName', option ? option.value : '')}
                  placeholder="Select your Carrier"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: '240px',
                      fontSize: '5px'
                    }),
                  }}
                />
              )}
            </Field>
            <ErrorMessage className='error-message' name="carrierName" component="div" style={{ color: 'red' }} />
            </div>


                  <div style={{marginTop: '8px'}}>
                  <Field name="account">
                    {({ field }) => (
                   <SelectDropdown
                   {...field}
                   options={acountOptions}
                   onChange={(option) => setFieldValue('account', option.value)}
                   placeholder="Select your Account "  // Custom dynamic placeholder text
                   styles={{
                     control: (provided) => ({
                       ...provided,
                       width: '240px', 
                       fontSize: '5px'
                     }),
                   }}
                 />
                    )}
                  </Field>
                  <ErrorMessage className='error-message' name="account" component="div" style={{ color: 'red' }} />
                  </div>  


            <Box sx={{ display:'flex' , justifyContent:'space-evenly' , marginTop:'30px' , marginRight:'130px' , marginBottom:"20px"}}>


            <FormControlLabel
                    control={
            <Field
                    name="incoming"
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
                label="Incoming"
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
                        name="outgoing"
                        type="checkbox"
                        render={({ field, form }) => (
                    <Checkbox
                            {...field}
                            onChange={(e) => {
                    console.log("CheckBox Outgoing field changed:", e.target.checked); // Log the checked state
                    form.setFieldValue(field.name, e.target.checked); // Update Formik state manually
                    }}
                    onBlur={form.handleBlur} // Use Formik's blur handler
                    checked={field.value} // Bind it to Formik's values
                    size="small"
                    />
                    )}
                    />
                    }
                    label="Outgoing"
                    sx={{
                    '& .MuiFormControlLabel-label': {
                    fontSize: '13px', // Customize font size here
                    fontWeight: 'bold', // Optional: You can also set the font weight
                    color:'black'
                    },
                    }}
                    />

            </Box>

                    {/* Display checkbox error if touched and error */}
                    {errors.checkboxes && touched.incoming && touched.outgoing && (
                    <div style={{ color: 'red', fontSize: '12px', marginBottom: '20px' , textAlign:'center' , marginRight:'9px'  }}>
                    {errors.checkboxes}
                    </div>
                    )}

                    <Box sx={{display:'flex' , gap:'5px' , marginBottom:'20px'}} >


                      <div style={{display:'flex' , flexDirection:'column'}}>
                        <label style={{fontSize:'12px' , color:'black' , fontWeight:'bold'}}>Start Date and Time</label>
                        <Field type="datetime-local" name="startDate"   />
                        <ErrorMessage name="startDate" component="div" className='error-message' />
                      </div>

                      <div style={{display:'flex' , flexDirection:'column'}}>
                        <label style={{fontSize:'12px' , color:'black' , fontWeight:'bold'}}>End Date and Time</label>
                        <Field type="datetime-local" name="endDate" />
                        <ErrorMessage name="endDate" component="div" className='error-message'  />
                      </div>

           
                    </Box>



                    {values.incoming && (
                    <>

                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '15px', marginBottom: 2 , color:'black'}}>
                    Incoming Settings
                    </Typography>

                          

                    <div>
                  <label style={{fontSize: '14px', display: 'inline-block' , color:'black' , fontWeight:"bold"}}>In Credit</label>
                  <Field 
                  name="inCredit"
                   type="number" 
                   style={{
                    width: '150px',  // Adjust the width as needed
                    fontSize: '14px',  // Optional: for font size inside the input
                    marginLeft: '8px',
                    marginTop: '20px',
                    height:'25px'
                  }} 
                   />
                  <ErrorMessage name="inCredit" component="div"  style={{ color: '#E0562F', fontSize: '12px',  marginTop: '4px' , marginLeft:'60px' }} />
                    </div>
            

                    <div style={{margin:'10px 0'}}>        
                    <Field name="inTimezone">
              {({ field }) => (
             <SelectDropdown
             {...field}
             options={timezoneOptions}
             onChange={(option) => setFieldValue('inTimezone', option.value)}
             placeholder="Select your time zone"  // Custom dynamic placeholder text
             styles={{
               control: (provided) => ({
                 ...provided,
                 width: '240px', 
                  fontSize: '5px'
               }),
             }}
           />
              )}
                    </Field>
                    <ErrorMessage className='error-message' name="inTimezone" component="div" style={{ color: 'red' }} />
                    </div>
              

                    <div >
                    <Field name="inBillingPeriod">
              {({ field }) => (
             <SelectDropdown
             {...field}
             options={BillingPeriodOptions}
             onChange={(option) => setFieldValue('inBillingPeriod', option.value)}
             placeholder="Select your Billing Period"  // Custom dynamic placeholder text
             styles={{
               control: (provided) => ({
                 ...provided,
                 width: '240px', 
                  fontSize: '5px'
               }),
             }}
           />
              )}
                    </Field>
                    <ErrorMessage className='error-message' name="inBillingPeriod" component="div" style={{ color: 'red' }} />
                    </div>



                    <div style={{margin:'10px 0'}}>
                    <Field name="inRoundingFunction">
              {({ field }) => (
             <SelectDropdown
             {...field}
             options={RoundingFunctionOptions}
             onChange={(option) => setFieldValue('inRoundingFunction', option.value)}
             placeholder="Select your Rounding Function"  // Custom dynamic placeholder text
             styles={{
               control: (provided) => ({
                 ...provided,
                 width: '240px', 
                 fontSize: '5px'
               }),
             }}
           />
              )}
            </Field>
            <ErrorMessage className='error-message' name="inRoundingFunction" component="div" style={{ color: 'red' }} />
                    </div>

                </>

                )}


                    {values.outgoing  && (
               
               <>
                <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '15px' , display:'flex' , marginTop:'20px', color:'black' }}>
                Outgoing Settings
                </Typography>

     

              <div>
                  <label style={{fontSize: '14px', fontWeight:'bold' ,display: 'inline-block' , color:'black'}}>Out Credit</label>
                  <Field 
                  name="outCredit"
                   type="number" 
                   style={{
                    width: '150px',  // Adjust the width as needed
                    fontSize: '14px',  // Optional: for font size inside the input
                    marginLeft: '8px',
                    marginTop: '20px',
                    height:'25px'
                  }} 
                   />
                  <ErrorMessage name="outCredit" component="div"  style={{ color: '#E0562F', fontSize: '12px',  marginTop: '4px' , marginLeft:'60px' }} />
              </div>

                    
                     <div  style={{margin:'10px 0'}}>
                    <Field name="outTimezone">
              {({ field }) => (
             <SelectDropdown
             {...field}
             options={timezoneOptions}
             onChange={(option) => setFieldValue('outTimezone', option.value)}
             placeholder="Select your Time Zone"  // Custom dynamic placeholder text
             styles={{
               control: (provided) => ({
                 ...provided,
                 width: '240px', 
                 fontSize: '5px'
               }),
             }}
           />
              )}
            </Field>
            <ErrorMessage className='error-message' name="outTimezone" component="div" style={{ color: 'red' }} />
                    </div>


                    <div style={{margin:'10px 0'}} >
                    <Field name="outBillingPeriod">
              {({ field }) => (
             <SelectDropdown
             {...field}
             options={BillingPeriodOptions}
             onChange={(option) => setFieldValue('outBillingPeriod', option.value)}
             placeholder="Select your Billing Period"  // Custom dynamic placeholder text
             styles={{
               control: (provided) => ({
                 ...provided,
                 width: '240px', 
                 fontSize: '5px'
               }),
             }}
           />
              )}
            </Field>
            <ErrorMessage className='error-message' name="outBillingPeriod" component="div" style={{ color: 'red' }} />
                    </div>

                    
                  <div >
                    <Field name="outRoundingFunction">
              {({ field }) => (
             <SelectDropdown
             {...field}
             options={RoundingFunctionOptions}
             onChange={(option) => setFieldValue('outRoundingFunction', option.value)}
             placeholder="Select your Rounding Function"  // Custom dynamic placeholder text
             styles={{
               control: (provided) => ({
                 ...provided,
                 width: '240px', 
                 fontSize: '5px'
               }),
             }}
           />
              )}
            </Field>
            <ErrorMessage className='error-message' name="outRoundingFunction" component="div" style={{ color: 'red' }} />
                  </div>



            </>

                )}


            </Box>


            <Grid container spacing={2} style={{marginTop:'40px' , display:'flex' , justifyContent:'space-between'}}>
                <Grid item>
                    <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting }
                    >
                        {selectedRow ? 'Update Agreement' : 'Add Agreement'}
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

    
        )
      }}
              </Formik>



      </Modal>


      </div>


      </div>

    )
  
}

export default Agreements




