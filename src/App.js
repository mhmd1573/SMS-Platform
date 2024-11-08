// import React, { Component } from 'react';
// import './App.scss';
// import AppRoutes from './AppRoutes';
// import Navbar from './components/Navbar/Navbar';
// import Sidebar from './components/Sidebar/Sidebar';
// import Footer from './components/Footer/Footer';

// class App extends Component {
//   state = {}


//   componentDidMount() {
//     this.onRouteChanged();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.location !== prevProps.location) {
//       this.onRouteChanged();
//     }
//   }

//   onRouteChanged() {
//     console.log("ROUTE CHANGED");
//     const { i18n } = this.props;
//     const body = document.querySelector('body');
//     if(this.props.location.pathname === '/layout/RtlLayout') {
//       body.classList.add('rtl');
//       i18n.changeLanguage('ar');
//     }
//     else {
//       body.classList.remove('rtl')
//       i18n.changeLanguage('en');
//     }
//     window.scrollTo(0, 0);
//     const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
//     for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
//       if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
//         this.setState({
//           isFullPageLayout: true
//         })
//         document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
//         break;
//       } else {
//         this.setState({
//           isFullPageLayout: false
//         })
//         document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
//       }
//     }
//   }


//   render () {
//     let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
//     let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
//     let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
//     return (

//       <div className="container-scroller">
//         { sidebarComponent }
//         <div className="container-fluid page-body-wrapper">
//           { navbarComponent }
//           <div className="main-panel">
//             <div className="content-wrapper">
//               <AppRoutes/>
//             </div>
//             { footerComponent }
//           </div>
//         </div>
//       </div>
//     );
    
//   }



// }

// export default App;












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





















  









  
