import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  carrier: Yup.string().required('Carrier is required'),
  account: Yup.string().required('Account is required'),
  agreementCode: Yup.string().required('Agreement code is required'),
  companyName: Yup.string().required('Company registered name is required'),
  vatId: Yup.string().required('VAT ID is required'),
  legalAddress: Yup.string().required('Legal address is required'),
  bankInfo: Yup.string().required('Bank info is required'),
  defaultBankAccount: Yup.string().required('Default bank account is required'),
  attachmentLink: Yup.string().url('Invalid URL format').nullable(),

  // Incoming Billing Parameters
  inTimezone: Yup.string().test('incoming', 'In Time Zone is required', function (value) {
    const { incoming } = this.parent;
    return incoming ? !!value : true;
  }),
  inCredit: Yup.number()
    .integer('Must be an integer')
    .min(0, 'Must be at least 0')
    .test('incoming', 'In Credit is required', function (value) {
      const { incoming } = this.parent;
      return incoming ? value !== undefined : true;
    }),
    
  inBillingPeriod: Yup.string().test('incoming', 'In Billing Period is required', function (value) {
    const { incoming } = this.parent;
    return incoming ? !!value : true;
  }),
  
  inPaymentPeriod: Yup.number()
    .integer('Must be an integer')
    .min(0, 'Must be at least 0')
    .nullable(),
  inMinInvoice: Yup.number().min(0, 'Must be at least 0').nullable(),
  inMaxBillingPeriods: Yup.number().min(1, 'Must be at least 1').nullable(),

  // Outgoing Billing Parameters
  outTimezone: Yup.string().test('outgoing', 'Out Time Zone is required', function (value) {
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
  outBillingPeriod: Yup.string().test('outgoing', 'Out Billing Period is required', function (value) {
    const { outgoing } = this.parent;
    return outgoing ? !!value : true;
  }),
  outPaymentPeriod: Yup.number()
    .integer('Must be an integer')
    .min(0, 'Must be at least 0')
    .nullable(),
  outMinInvoice: Yup.number().min(0, 'Must be at least 0').nullable(),
  outMaxBillingPeriods: Yup.number().min(1, 'Must be at least 1').nullable(),
});

const AgreementForm = () => {
  return (
    <Formik
      initialValues={{
        carrier: '',
        account: '',
        agreementCode: '',
        companyName: '',
        vatId: '',
        legalAddress: '',
        bankInfo: '',
        defaultBankAccount: '',
        attachmentLink: '',
        incoming: false,
        outgoing: false,
        inTimezone: '',
        inCredit: '',
        inBillingPeriod: '',
        inPaymentPeriod: '',
        inMinInvoice: '',
        inMaxBillingPeriods: '',
        outTimezone: '',
        outCredit: '',
        outBillingPeriod: '',
        outPaymentPeriod: '',
        outMinInvoice: '',
        outMaxBillingPeriods: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form submitted with values:', values);
      }}
      validateOnChange={false}  // Disable onChange validation temporarily
      validateOnBlur={false}  // Disable onBlur validation temporarily
    >
      {({ values, isValid, isSubmitting, errors, touched }) => {
        console.log('Validation Errors:', errors); // Log errors
        console.log('Touched Fields:', touched);   // Log touched fields
        return (
          <Form>
            <div>
              <label>Carrier</label>
              <Field as="select" name="carrier">
                <option value="">Select a carrier</option>
                <option value="carrier1">Carrier 1</option>
                <option value="carrier2">Carrier 2</option>
              </Field>
              <ErrorMessage name="carrier" component="div" />
            </div>

            <div>
              <label>Account</label>
              <Field as="select" name="account">
                <option value="">Select an account</option>
                <option value="account1">Account 1</option>
                <option value="account2">Account 2</option>
              </Field>
              <ErrorMessage name="account" component="div" />
            </div>

            <div>
              <label>Agreement Code</label>
              <Field name="agreementCode" />
              <ErrorMessage name="agreementCode" component="div" />
            </div>

            <div>
              <label>Company Registered Name</label>
              <Field name="companyName" />
              <ErrorMessage name="companyName" component="div" />
            </div>

            <div>
              <label>VAT Identification Number</label>
              <Field name="vatId" />
              <ErrorMessage name="vatId" component="div" />
            </div>

            <div>
              <label>Legal Address</label>
              <Field name="legalAddress" />
              <ErrorMessage name="legalAddress" component="div" />
            </div>

            <div>
              <label>Bank Info</label>
              <Field name="bankInfo" />
              <ErrorMessage name="bankInfo" component="div" />
            </div>

            <div>
              <label>Default Bank Account</label>
              <Field name="defaultBankAccount" />
              <ErrorMessage name="defaultBankAccount" component="div" />
            </div>

            <div>
              <label>Attachment Link</label>
              <Field name="attachmentLink" />
              <ErrorMessage name="attachmentLink" component="div" />
            </div>

            <div>
              <label>
                <Field type="checkbox" name="incoming" />
                Incoming Traffic
              </label>
            </div>

            <div>
              <label>
                <Field type="checkbox" name="outgoing" />
                Outgoing Traffic
              </label>
            </div>

            {/* Conditional Fields for Incoming */}
            {values.incoming && (
              <>
                <div>
                  <label>In Time Zone</label>
                  <Field name="inTimezone" />
                  <ErrorMessage name="inTimezone" component="div" />
                </div>
                <div>
                  <label>In Credit</label>
                  <Field name="inCredit" type="number" />
                  <ErrorMessage name="inCredit" component="div" />
                </div>

                <div>
                  <label>In BillingPeriod</label>
                  <Field name="inBillingPeriod"  />
                  <ErrorMessage name="inBillingPeriod" component="div" />
                </div>

                <div>
                  <label>In PaymentPeriod</label>
                  <Field name="inPaymentPeriod" type="number" />
                  <ErrorMessage name="inPaymentPeriod" component="div" />
                </div>
                <div>
                  <label>In MinInvoice</label>
                  <Field name="inMinInvoice" type="number" />
                  <ErrorMessage name="inMinInvoice" component="div" />
                </div>
                <div>
                  <label>In MaxBillingPeriods</label>
                  <Field name="inMaxBillingPeriods" type="number" />
                  <ErrorMessage name="inMaxBillingPeriods" component="div" />
                </div>
              </>
            )}

            {/* Conditional Fields for Outgoing */}
            {values.outgoing && (
              <>
                <div>
                  <label>Out Time Zone</label>
                  <Field name="outTimezone" />
                  <ErrorMessage name="outTimezone" component="div" />
                </div>
                <div>
                  <label>Out Credit</label>
                  <Field name="outCredit" type="number" />
                  <ErrorMessage name="outCredit" component="div" />
                </div>
                <div>
                  <label>Out BillingPeriod</label>
                  <Field name="outBillingPeriod" />
                  <ErrorMessage name="outBillingPeriod" component="div" />
                </div>
                <div>
                  <label>Out PaymentPeriod</label>
                  <Field name="outPaymentPeriod" type="number" />
                  <ErrorMessage name="outPaymentPeriod" component="div" />
                </div>
                <div>
                  <label>outMinInvoice</label>
                  <Field name="outMinInvoice" type="number" />
                  <ErrorMessage name="outMinInvoice" component="div" />
                </div>
                <div>
                  <label>Out MaxBillingPeriods</label>
                  <Field name="outMaxBillingPeriods" type="number" />
                  <ErrorMessage name="outMaxBillingPeriods" component="div" />
                </div>
                
              </>
            )}

            <button type="submit" disabled={isSubmitting || !isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AgreementForm;




