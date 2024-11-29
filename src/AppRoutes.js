import React, { Component, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Update here for v6
import Spinner from './components/Spinner/Spinner';

// Lazy-loaded components
const SMS = lazy(() => import('./pages/Analysis/SMS'));


const Carriers = lazy(() => import('./pages/Carriers/Carriers/Carriers'));
const Accounts = lazy(() => import('./pages/Carriers/Accounts/Accounts'));
const Agreements = lazy(() => import('./pages/Carriers/Agreements/Agreements'));
const Products = lazy(() => import('./pages/Carriers/Products/Products'));

const AutoRateImport = lazy(() => import('./pages/Rates/AutoRateImport'));
const RateImport = lazy(() => import('./pages/Rates/RateImport/RateImport'));
const RateCompilation = lazy(() => import('./pages/Rates/RateCompilation'));
const RateEditor = lazy(() => import('./pages/Rates/RateEditor'));
const RateExport = lazy(() => import('./pages/Rates/RateExport'));
const RateSheet = lazy(() => import('./pages/Rates/RateSheet/RateSheet'));

const RoutingFeatures = lazy(() => import('./pages/Routing/RoutingFeatures'));
const RoutingRules = lazy(() => import('./pages/Routing/RoutingRules'));
const RoutingStatistics = lazy(() => import('./pages/Routing/RoutingStatistics'));
const Simulation = lazy(() => import('./pages/Routing/Simulation'));
const TranslationRules = lazy(() => import('./pages/Routing/TranslationRules'));

const Charges = lazy(() => import('./pages/Finance/Charges'));
const Fees = lazy(() => import('./pages/Finance/Fees'));
const Invoice = lazy(() => import('./pages/Finance/Invoice'));
const Payments = lazy(() => import('./pages/Finance/Payments'));

const Supplier = lazy(() => import('./pages/Suppliers/Supplier'));

const Error404 = lazy(() => import('./pages/error-pages/Error404'));
const Error500 = lazy(() => import('./pages/error-pages/Error500'));

const Login = lazy(() => import('./pages/user-pages/Login'));
const Register1 = lazy(() => import('./pages/user-pages/Register'));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Routes> {/* Updated from Switch to Routes */}
          
          <Route path="/carriers/carriers" element={<Carriers />} />
          <Route path="/carriers/accounts" element={<Accounts />} />
          <Route path="/carriers/agreements" element={<Agreements />} />
          <Route path="/carriers/products" element={<Products />} />



          <Route path="/analysis/sms" element={<SMS />} />
          <Route path="/rates/autoRateImport" element={<AutoRateImport />} />
          <Route path="/rates/import" element={<RateImport />} />
          <Route path="/rates/compilation" element={<RateCompilation />} />
          <Route path="/rates/editor" element={<RateEditor />} />
          <Route path="/rates/export" element={<RateExport />} />
          <Route path="/rates/import/ratesheet" element={<RateSheet />} />

          <Route path="/route/routingFeatures" element={<RoutingFeatures />} />
          <Route path="/route/routingRules" element={<RoutingRules />} />
          <Route path="/route/routingStatistics" element={<RoutingStatistics />} />
          <Route path="/route/simulation" element={<Simulation />} />
          <Route path="/route/translationRules" element={<TranslationRules />} />

          <Route path="/finance/charges" element={<Charges />} />
          <Route path="/finance/fees" element={<Fees />} />
          <Route path="/finance/invoice" element={<Invoice />} />
          <Route path="/finance/payments" element={<Payments />} />

          <Route path="/suppliers/supplier" element={<Supplier />} />

          <Route path="/user-pages/login-1" element={<Login />} />
          <Route path="/user-pages/register-1" element={<Register1 />} />

          <Route path="/error-pages/error-404" element={<Error404 />} />
          <Route path="/error-pages/error-500" element={<Error500 />} />

          {/* Redirect to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    );
  }
}

export default AppRoutes;
