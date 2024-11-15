import React, { Component } from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {}



  render () {
  
    
    return (

      <div className="container-scroller">
        <Sidebar/>
        <div className="container-fluid page-body-wrapper">
        <Navbar/>
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
            </div>
            <Footer/> 
          </div>
        </div>
      </div>
    );
    
  }



}

export default App;





















  









  
