import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  // Changed import to useHistory
import './RateImport.css';

const RateImport = () => {
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [carriers, setCarriers] = useState([]);
  const [products, setProducts] = useState([]);
  const [taskResult, setTaskResult] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Items per page for pagination

  // File and form state for modal form
  const [modalFile, setModalFile] = useState(null);
  const [modalFileError, setModalFileError] = useState('');
  const [modalProduct, setModalProduct] = useState('');
  const [modalProductError, setModalProductError] = useState('');
  const [modalCarrier, setModalCarrier] = useState('');
  const [modalCarrierError, setModalCarrierError] = useState('');

  // File and form state for main form
  const [importFile, setImportFile] = useState(null);
  const [importFileError, setImportFileError] = useState('');
  const [formProduct, setFormProduct] = useState('');
  const [importProductError, setImportProductError] = useState('');
  const [formCarrier, setFormCarrier] = useState('');
  const [importCarrierError, setImportCarrierError] = useState('');
  const [selectedParser, setSelectedParser] = useState('');
  const [parserError, setParserError] = useState('');
  const [direction, setDirection] = useState('');
  const [directionError, setDirectionError] = useState('');

  // File input reference
  const fileInputRef = useRef(null);

    // Use routerHistory from react-router-dom instead of useNavigate
    const navigate = useNavigate(); // Renamed to routerHistory
  
   // Sample product list
  const baseProducts = ['WHOLESALE (USD)', 'PREMIUM (USD)', 'RETAIL (USD)'];

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory)); // Parse and set the history from localStorage
    }
    // Generate random form selections (based on saved history, not random data)
    const savedCarriers = ['Carrier 1', 'Carrier 2', 'Carrier 3'];
    setCarriers(savedCarriers);
    setSelectedParser('');
    setDirection('');
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('history', JSON.stringify(history));
    }
  }, [history]);

  const getModifiedProducts = (selectedDirection) => {
    const baseProducts = ['WHOLESALE (USD)', 'PREMIUM (USD)', 'RETAIL (USD)'];
    return baseProducts.map((product) => `${product} - ${selectedDirection.toUpperCase()}`);
  };

  useEffect(() => {
    setProducts(getModifiedProducts(direction));
  }, [direction]);





  // Modal Form Section Starts Here

  const handleModalFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedExtensions = ['csv', 'xls', 'xlsx'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      setModalFile(selectedFile);
      setModalFileError(''); // Clear file error
    } else {
      setModalFileError('Please select a valid file (CSV, XLS, XLSX).');
      event.target.value = ''; // Reset input field
    }
  };

  const handleModalProductChange = (e) => {
    setModalProduct(e.target.value);
    if (e.target.value) {
      setModalProductError('');
    }
  };

  const handleModalCarrierChange = (e) => {
    setModalCarrier(e.target.value);
    if (e.target.value) {
      setModalCarrierError('');
    }
  };


  const handleModalSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    // Validate modal form
    if (!modalFile) {
      setModalFileError('Please select a file.');
      isValid = false;
    }

    if (!modalProduct) {
      setModalProductError('Please select a product.');
      isValid = false;
    }

    if (!modalCarrier) {
      setModalCarrierError('Please select a carrier.');
      isValid = false;
    }

    // If form is valid, submit it
    if (isValid) {
      const newHistoryItem = {
        id: history.length + 1, // Incremental ID for the new history entry
        fileName: modalFile.name,
        date: new Date().toLocaleString(),
        status: 'Import Failed', // Assuming status is "Importing" initially
        product: modalProduct,
        carrier: modalCarrier,
      };

      // Add the new history entry to the history state
      setHistory([newHistoryItem, ...history]);

      // Reset the modal form fields
      setModalFile(null);
      setModalProduct('');
      setModalCarrier('');
      setModalFileError('');
      setModalProductError('');
      setModalCarrierError('');

      // Close the modal
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setModalCarrier('');
    setModalProduct('');
    setModalCarrierError('');
    setModalProductError('');
    setModalFileError('');
    setShowModal(false);
  };


  // Modal Form Section Ends Here



   


 // Child2 Form Section Starts Here

 const handleFormProductChange = (e) => {
  setFormProduct(e.target.value);
  if (e.target.value) {
    setImportProductError(''); // Clear the error when a valid option is selected
  }
};

const handleFormParserChange = (e) => {
  setSelectedParser(e.target.value);
  if (e.target.value) {
    setParserError(''); // Clear the error when a valid option is selected
  }
};

const handleFormCarrierChange = (e) => {
  setFormCarrier(e.target.value);
  if (e.target.value) {
    setImportCarrierError(''); // Clear the error when a valid option is selected
  }
};

const handleFormDirectionChange = (e) => {
  setDirection(e.target.value);
  if (e.target.value) {
    setDirectionError(''); // Clear the error when a valid option is selected
  }
};


const handleImportSubmit = (event) => {
  event.preventDefault();
  let isValid = true;

  // Validate import form
  if (!importFile) {
    setImportFileError('Please select a file.');
    isValid = false;
  }

  if (!formProduct) {
    setImportProductError('Please select a product.');
    isValid = false;
  }

  if (!formCarrier) {
    setImportCarrierError('Please select a carrier.');
    isValid = false;
  }

  if (!selectedParser) {
    setParserError('Please select a parser.');
    isValid = false;
  }

  if (!direction) {
    setDirectionError('Please select a direction.');
    isValid = false;
  }

  // If form is valid, submit it
  if (isValid) {
    const formData = {
      file: importFile,
      product: formProduct,
      carrier: formCarrier,
      parser: selectedParser,
      direction,
    };
    console.log('Import form submitted with:', formData);

    
         navigate('/rates/import/ratesheet');
  }


};

// Child2 Form Section Ends Here






  // Pagination Section Starts Here

  const paginateHistory = (history, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return history.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(history.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 // Pagination Section Ends Here





  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDirection('vendor');
    setCarriers([row.carrier]);
    setProducts([row.product]);
    setFormProduct(row.product);
    setFormCarrier(row.carrier);


    setImportFile({
      name: row.fileName,  // Assuming row has a fileName field
    });


    // Clear error messages since the form is auto-populated
    setImportFileError('');
    setImportProductError('');
    setImportCarrierError('');
    setParserError('');
    setDirectionError('');
  };

  const viewDetails = (taskId) => {
    console.log(`Viewing details for task ID: ${taskId}`);
  };

  const getStatusStyle = (status) => {
    let color = '';
    if (status === 'Imported Successfully') {
      color = 'green';
    } else if (status === 'Import Failed') {
      color = 'red';
    }
    return {
      color: color,
      fontWeight: 'bold',
    };
  };

  return (
    <div className="rate-import-container">
      <div className="page-header">
        <h3 className="page-title">Rate Import</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Rates
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Rate Import
            </li>
          </ol>
        </nav>
      </div>

      <div className="parent">

        <div className="child1">
          <div className="history-top">
            <h4>Import History</h4>
            <button className="upload-button" onClick={() => setShowModal(true)}>
              Upload
            </button>
          </div>

          <table className="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Product</th>
                <th>Carrier</th>
              </tr>
            </thead>
            <tbody>
              {paginateHistory(history, currentPage, itemsPerPage).map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedRow && selectedRow.id === task.id ? '#f0f0f0' : '',
                  }}
                >
                  <td>{task.id}</td>
                  <td>{task.fileName}</td>
                  <td>{task.date}</td>
                  <td style={getStatusStyle(task.status)}>{task.status}</td>
                  <td>{task.product}</td>
                  <td>{task.carrier}</td>
                </tr>
              ))}
            </tbody>
          </table>


           {/* Pagination controls */}
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Prev.</button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(history.length / itemsPerPage)}>Next</button>
          </div>
        </div>

      
        <div className="child2">
           <h4>Advanced Import Options</h4>
           <form>

             <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
               <label>Selected File:</label>
               <input className="file-input" type="text" value={file ? file.name : selectedRow ? selectedRow.fileName : ''} readOnly />
             </div>
             {importFileError && <p className="error-message">{importFileError}</p>}
            
            
             <div className="form-group" style={{ marginTop: '30px' }}>
               <label>Parser</label>
               <select value={selectedParser} onChange={handleFormParserChange}>
               <option value="" disabled>Select Parser</option>
                <option value="xml">Internal Library</option>
               </select>
               {parserError && <p className="error-message">{parserError}</p>}
             </div>

             <div className="form-group">
               <label>Direction</label>
               <select value={direction} onChange={handleFormDirectionChange}>
                 <option value="" disabled >Select Direction</option>
                 <option value="vendor">Vendor</option>
                 <option value="client">Client</option>
               </select>
               {directionError && <p className="error-message">{directionError}</p>}
             </div>

             <div className="form-group">
               <label>Carriers</label>
               <select value={formCarrier} onChange={handleFormCarrierChange}>
               <option value="" disabled selected>Select Carrier</option>
                 <option value="Carrier 1">Carrier 1</option>
                 <option value="Carrier 2">Carrier 2</option>
                 <option value="Carrier 3">Carrier 3</option>
               </select>
               {importCarrierError && <p className="error-message">{importCarrierError}</p>}
             </div>

             <div className="form-group">
               <label>Products</label>
               <select value={formProduct} onChange={handleFormProductChange}>
               <option value="" disabled selected>Select Product</option>
                 {products.map((product, index) => (
                   <option key={index} value={product}>
                     {product}
                   </option>
                 ))}
               </select>
               {importProductError && <p className="error-message">{importProductError}</p>}
             </div>

             <div className="form-group" style={{ marginTop: '30px' }}>
               <button type="submit" className="submit-button"  onClick={handleImportSubmit}>
                 Continue
               </button>
             </div>
          
           </form>

             </div>

      </div>

      <div className="child3">
          <h4>Import Result</h4>
          <p>{taskResult}</p>

          <table className="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Created</th>
                <th>Product</th>
                <th>Import Mode</th>
                <th>Status</th>
                <th>Summary</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {paginateHistory(history, currentPage, itemsPerPage).map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedRow && selectedRow.id === task.id ? '#f0f0f0' : '',
                  }}
                >
                  <td>{task.id}</td>
                  <td>{task.date}</td>
                  <td>{task.product}</td>
                  <td>{task.status}</td>
                  <td style={getStatusStyle(task.status)}>{task.status}</td>
                  <td>{task.summary}</td>
                  <td>
                    <button onClick={() => viewDetails(task.id)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(history.length / itemsPerPage)} >
              Next
            </button>
          </div>
        </div>


            {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Upload File</h4>
            <form>
              <div className="form-group">
                <label>Product</label>
                <select  onChange={handleModalProductChange} value={modalProduct}>
                <option value="" disabled selected>Select Product</option>
                  {baseProducts.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                {modalProductError && <p className="error-message">{modalProductError}</p>}
              </div>

              <div className="form-group">
                <label>Carrier</label>
                <select onChange={handleModalCarrierChange} value={modalCarrier}>
                <option value="" disabled selected>Select Carrier</option>
                  <option value="Carrier 1">Carrier 1</option>
                  <option value="Carrier 2">Carrier 2</option>
                  <option value="Carrier 3">Carrier 3</option>
                </select>
                {modalCarrierError && <p className="error-message">{modalCarrierError}</p>}
              </div>

              <div style={{ marginTop: '20px' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleModalFileChange}
                  style={{ display: 'block' }}
                />
                 {modalFileError && <p className="error-message">{modalFileError}</p>}
              </div>

              <div className="modal-buttons">
                <button type='submit' onClick={handleModalSubmit} style={{ backgroundColor: '#141d34', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
                  Submit
                </button>

                <button
                  style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', marginTop: '20px' }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
              )}

      
    </div>
  );
};

export default RateImport;






 
  







// // // the interface contains three grids
// // // first grid shows you all the files uploaded into the system and the import status of each file
// // // also you can see where (into what product and for which carrier) you make each task

// // // a button called Upload which upload new files into the interface 



// // // 2nd grid you can set advanced options of import
// // // such as parser for the file and verify carrier and product you want to make import for




// // //third grid show the results of the finished tasks


// // // functionality :
// // // choose a file from the first grid you want to import 
// // // set the options on the 2nd grid 
// // // when pressing continue user will be redirected to interface of manual import 












   
         