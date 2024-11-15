
import { Link,  useNavigate, useLocation } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import React, { useState, useEffect } from 'react';
// Import FontAwesomeIcon and specific icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassChart , faDollarSign , faUsers , faTruckField, faRoute , faFile, faMoneyBill} from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {


  const [menuState, setMenuState] = useState({});
  const location = useLocation();
  const navigate = useNavigate()


  const toggleMenuState = (menu) => {
    setMenuState(prevState => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  };

  useEffect(() => {
    onRouteChanged();
  }, [location]);

  

  const onRouteChanged = () => {
    document.querySelector('#sidebar').classList.remove('active');
    setMenuState({});

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/carriers', state: 'carrierMenuOpen' },
      { path: '/rates', state: 'ratesMenuOpen' },
      { path: '/suppliers', state: 'supplierMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/route', state: 'routeMenuOpen' },
      { path: '/finance', state: 'FinanceMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/analysis', state: 'analysisMenuOpen' },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setMenuState(prevState => ({
          ...prevState,
          [obj.state]: true
        }));
      }
    });
  };


  // componentDidMount() ;{
  //   this.onRouteChanged();
  //   // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
  //   const body = document.querySelector('body');
  //   document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
  //     el.addEventListener('mouseover', function() {
  //       if(body.classList.contains('sidebar-icon-only')) {
  //         el.classList.add('hover-open');
  //       }
  //     });
  //     el.addEventListener('mouseout', function() {
  //       if(body.classList.contains('sidebar-icon-only')) {
  //         el.classList.remove('hover-open');
  //       }
  //     });
  //   });
  // }


  const isPathActive = (path) => location.pathname.startsWith(path);

  
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
   
          {/* Logo Section Starts Here */}
         <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></a>
        </div> 
          {/* Logo Section Ends Here */}




        <ul className="nav">

          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../../assets/images/faces/face15.jpg')} alt="profile" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal"><Trans>Henry Klein</Trans></h5>
                  <span><Trans>Gold Member</Trans></span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>To-do list</Trans></p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navigation</Trans></span>
          </li>





           {/* Analysis Section Starts Here */}

           <li className={ isPathActive('/analysis') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.analysisMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('analysisMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
              <FontAwesomeIcon icon={faMagnifyingGlassChart} size="x" style={{ color: 'red' }} />
              </span>
              <span className="menu-title"><Trans>Analysis</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.analysisMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> 
                    <Link className={ isPathActive('/analysis/sms') ? 'nav-link active' : 'nav-link' } to="/analysis/sms">
                    <Trans>SMS</Trans>
                    </Link>
                    </li>
                </ul>
              </div>
            </Collapse>
          </li>

           {/* Analysis Section Ends Here */}  



   

           {/* Carrier Section Starts Here*/}

          <li className={ isPathActive('/carrier') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.carrierMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('carrierMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FontAwesomeIcon icon={faUsers} size="x" style={{ color: 'white' }} />
              </span>
              <span className="menu-title"><Trans>Carriers</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.carrierMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/carriers/carriersList') ? 'nav-link active' : 'nav-link' } to="/carriers/carriersList">
                  <Trans>Carriers List</Trans>
                  </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

           {/* Carrier Section Ends Here*/}





           {/* Rates Section Starts*/}

           <li className={ isPathActive('/rates') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.ratesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('ratesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FontAwesomeIcon icon={faDollarSign}  size="x" style={{ color: 'green' }}/>
              </span>
              <span className="menu-title"><Trans>Rates</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.ratesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/rates/autoRateImport') ? 'nav-link active' : 'nav-link' } to="/rates/autoRateImport"><Trans>Auto Rate Import</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/rates/import') ? 'nav-link active' : 'nav-link' } to="/rates/import"><Trans>Rate Import</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/rates/compilation') ? 'nav-link active' : 'nav-link' } to="/rates/compilation"><Trans>Rate Compilation</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/rates/editor') ? 'nav-link active' : 'nav-link' } to="/rates/editor"><Trans>Rate Editor</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/rates/export') ? 'nav-link active' : 'nav-link' } to="/rates/export"><Trans>Rate Export</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
           </li>

           {/* Rates Section Ends*/}





           {/* Suppliers Section Starts Here*/}

          <li className={ isPathActive('/suppliers') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.supplierMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('supplierMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FontAwesomeIcon icon={faTruckField} size="x" style={{ color: 'yellow' }}/>
                <i className="fa-solid fa-house"></i>
              </span>
              <span className="menu-title"><Trans>Suppliers</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.supplierMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/suppliers/supplier') ? 'nav-link active' : 'nav-link' } to="/suppliers/supplier"><Trans>Supplier</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

           {/* Suppliers Section Ends Here */}




           {/* Routing Section Starts Here*/}

          <li className={ isPathActive('/route') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.routeMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('routeMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FontAwesomeIcon icon={faRoute} size="x" style={{ color: 'red' }} />
              </span>
              <span className="menu-title"><Trans>Routing</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.routeMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/route/routingFeatures') ? 'nav-link active' : 'nav-link' } to="/route/routingFeatures"><Trans>Routing Features</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/route/routingRules') ? 'nav-link active' : 'nav-link' } to="/route/routingRules"><Trans>Routing Rules</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/route/routingStatistics') ? 'nav-link active' : 'nav-link' } to="/route/routingStatistics"><Trans>Routing Statistics</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/route/simulation') ? 'nav-link active' : 'nav-link' } to="/route/simulation"><Trans>Simulation</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/route/translationRules') ? 'nav-link active' : 'nav-link' } to="/route/translationRules"><Trans>Translation Rules</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

           {/* Routing Section Ends Here*/}




           {/* Reports Section Starts Here*/}

           <li className={ isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FontAwesomeIcon icon={faFile} size="x" style={{ color: 'white' }} />
              </span>
              <span className="menu-title"><Trans>Reports</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.iconsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } to="/icons/mdi"><Trans>Material</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
           </li>

           {/* Reports Section Ends Here*/}




           {/* Finance Section Starts Here */}

           <li className={ isPathActive('/finance') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.FinanceMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('FinanceMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FontAwesomeIcon icon={faMoneyBill} size="x" style={{ color: 'green' }} />
              </span>
              <span className="menu-title"><Trans>Finance</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.FinanceMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/finance/charges') ? 'nav-link active' : 'nav-link' } to="/finance/charges"><Trans>Charges</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/finance/invoice') ? 'nav-link active' : 'nav-link' } to="/finance/invoice"><Trans>Invoice</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/finance/payments') ? 'nav-link active' : 'nav-link' } to="/finance/payments"><Trans>Payments</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/finance/fees') ? 'nav-link active' : 'nav-link' } to="/finance/fees"><Trans>Recurring Fees</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
           </li>

           {/* Finance Section Ends Here */}




            {/* User Section Starts Here */}

            <li className={ isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.userPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
            </li>

            {/* User Section Starts Here */}





          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>More</Trans></span>
          </li>


          <li className={ isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ menuState.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ menuState.errorPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title"><Trans>Documentation</Trans></span>
            </a>
          </li>
        </ul>
      </nav>
    );
  

  



}

export default Sidebar;