import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from './components/Spinner';



const SMS = lazy(() => import('../pages/Analysis/sms'));

const carriersList = lazy(() => import('../pages/Carriers/carriersList'));


const autoRateImport = lazy(() => import('../pages/Rates/autoRateImport'));
const rateCompilation = lazy(() => import('../pages/Rates/rateCompilation'));
const rateEditor = lazy(() => import('../pages/Rates/rateEditor'));
const rateExport = lazy(() => import('../pages/Rates/rateExport'));



const routingFeatures = lazy(() => import('../pages/Routing/routingFeatures'));
const routingRules = lazy(() => import('../pages/Routing/routingRules'));
const routingStatistics = lazy(() => import('../pages/Routing/routingStatistics'));
const simulation = lazy(() => import('../pages/Routing/simulation'));
const translationRules = lazy(() => import('../pages/Routing/translationRules'));




const charges = lazy(() => import('../pages/Finance/charges'));
const fees = lazy(() => import('../pages/Finance/fees'));
const invoice = lazy(() => import('../pages/Finance/invoice'));
const payments = lazy(() => import('../pages/Finance/payments'));




const BasicTable = lazy(() => import('./tables/BasicTable'));


const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>



          <Route path="/carriers/carriersList" component={ carriersList } />

          <Route path="/analysis/sms" component={ SMS } />


          <Route path="/rates/autoRateImport" component={ autoRateImport } />
          <Route path="/rates/rateCompilation" component={ rateCompilation } />
          <Route path="/rates/rateEditor" component={ rateEditor } />
          <Route path="/rates/rateExport" component={ rateExport } />


          <Route path="/route/routingFeatures" component={ routingFeatures } />
          <Route path="/route/routingRules" component={ routingRules } />
          <Route path="/route/routingStatistics" component={ routingStatistics } />
          <Route path="/route/simulation" component={ simulation } />
          <Route path="/route/translationRules" component={ translationRules } />



          <Route path="/finance/charges" component={ charges } />
          <Route path="/finance/fees" component={ fees } />
          <Route path="/finance/invoice" component={ invoice } />
          <Route path="/finance/payments" component={ payments } />
        

          <Route path="/tables/basic-table" component={ BasicTable } />


          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;