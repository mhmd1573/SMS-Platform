// import React, { useState, useEffect, useRef } from 'react';
// import './RateImport.css';

// const RateImport = () => {
//   const [file, setFile] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [selectedParser, setSelectedParser] = useState('csv');
//   const [direction, setDirection] = useState('vendor');
//   const [carriers, setCarriers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [taskResult, setTaskResult] = useState('');
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalProduct, setModalProduct] = useState('');
//   const [modalCarrier, setModalCarrier] = useState('');
//   const [fileError, setFileError] = useState('');
//   const [productError, setProductError] = useState('');
//   const [carrierError, setCarrierError] = useState('');

//   const fileInputRef = useRef(null);

//   // Sample product list
//   const baseProducts = ['WHOLESALE (USD)', 'PREMIUM (USD)', 'RETAIL (USD)'];

//   const getModifiedProducts = (selectedDirection) => {
//     return baseProducts.map(product => `${product} - ${selectedDirection.toUpperCase()}`);
//   };

//   const generateRandomHistory = () => {
//     const randomHistory = [];
//     for (let i = 0; i < 5; i++) {
//       randomHistory.push({
//         id: i + 1,
//         fileName: `RateFile_${i + 1}.csv`,
//         date: new Date().toLocaleString(),
//         status: i % 2 === 0 ? 'Imported Successfully' : 'Import Failed',
//         product: `Product ${Math.floor(Math.random() * 3) + 1}`,
//         carrier: `Carrier ${Math.floor(Math.random() * 3) + 1}`,
//       });
//     }
//     setHistory(randomHistory);
//   };

//   const generateRandomFormSelections = () => {
//     const randomCarriers = ['Carrier 1', 'Carrier 2', 'Carrier 3'];
//     const selectedCarriers = [
//       randomCarriers[Math.floor(Math.random() * 3)],
//       randomCarriers[Math.floor(Math.random() * 3)],
//     ];

//     setCarriers(selectedCarriers);
//     setSelectedParser(Math.random() > 0.5 ? 'csv' : 'xml');
//     setDirection(Math.random() > 0.5 ? 'vendor' : 'client');
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     const allowedExtensions = ['csv', 'xls', 'xlsx'];
//     const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

//     if (allowedExtensions.includes(fileExtension)) {
//       setFile(selectedFile);
//       setFileError(''); // Clear file error when file is valid
//     } else {
//       setFileError('Please select a valid file (CSV, XLS, XLSX).');
//       event.target.value = ''; // Reset the input field
//     }
//   };

//   // const handleImportSubmit = () => {
 

//   //  // Validate file selection
//   //  if (!file) {
//   //   setFileError('Please select a valid file.');
//   //   return;
//   // }

//   //    // Validate file extension
//   // const allowedExtensions = ['csv', 'xls', 'xlsx'];
//   // const fileExtension = file.name.split('.').pop().toLowerCase();
//   // if (!allowedExtensions.includes(fileExtension)) {
//   //   setFileError('Invalid file type. Only CSV and Excel files are allowed.');
//   //   return;
//   // }


//   // // Validate product and carrier selection
//   // if (!modalProduct) {
//   //   setProductError('Please select a product.');
//   //   return;
//   // }

//   // if (!modalCarrier) {
//   //   setCarrierError('Please select a carrier.');
//   //   return;
//   // }

//   //  // If all validations pass, proceed with submission
//   // console.log('Form submitted with:', { file, modalProduct, modalCarrier });
//   // setShowModal(false); // Close the modal after successful submission
//   // };


//   const handleModalSubmit = (event) => {

//     event.preventDefault(); // Prevent the default form submission behavior

//     let isValid = true;
  
//     // Validate file selection
//     if (!file) {
//       setFileError('Please select a file.');
//       isValid = false;
//     } else {
//       // Validate file extension
//       const allowedExtensions = ['csv', 'xls', 'xlsx'];
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       if (!allowedExtensions.includes(fileExtension)) {
//         setFileError('Invalid file type. Only CSV and Excel files are allowed.');
//         isValid = false;
//       } else {
//         setFileError(''); // Clear the error if file is valid
//       }
//     }
  
//     // Validate product selection
//     if (!modalProduct) {
//       setProductError('Please select a product.');
//       isValid = false;
//     } else {
//       setProductError(''); // Clear the error if product is selected
//     }
  
//     // Validate carrier selection
//     if (!modalCarrier) {
//       setCarrierError('Please select a carrier.');
//       isValid = false;
//     } else {
//       setCarrierError(''); // Clear the error if carrier is selected
//     }
  
//     // If all validations pass, submit the form
//     if (isValid) {
//       console.log('Form submitted with:', { file, modalProduct, modalCarrier });
//       setShowModal(false); // Close the modal after successful submission
//     }
//   };

  
//     // Handle carrier selection
//     const handleCarrierChange = (e) => {
//       setModalCarrier(e.target.value);
//       if (e.target.value) {
//         setCarrierError(''); // Clear the error when a valid option is selected
//       }
//     };
  
//     // Handle product selection
//     const handleProductChange = (e) => {
//       setModalProduct(e.target.value);
//       if (e.target.value) {
//         setProductError(''); // Clear the error when a valid option is selected
//       }
//     };


//     const handleCancel = () => {
//       setModalCarrier('');
//       setModalProduct('');
//       setCarrierError('');
//       setProductError('');
//       setFileError('');
//       setShowModal(false);
//     };

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setFile(null);
//     setDirection('vendor');
//     setCarriers([row.carrier]);
//     setProducts([row.product]);
//     setModalProduct(row.product);
//     setModalCarrier(row.carrier);
//   };

//   const viewDetails = (taskId) => {
//     console.log(`Viewing details for task ID: ${taskId}`);
//   };

//   useEffect(() => {
//     generateRandomHistory();
//     generateRandomFormSelections();
//   }, []);

//   useEffect(() => {
//     setProducts(getModifiedProducts(direction));
//   }, [direction]);

//   const getStatusStyle = (status) => {
//     let color = '';
//     if (status === 'Imported Successfully') {
//       color = 'green';
//     } else if (status === 'Import Failed') {
//       color = 'red';
//     }
//     return {
//       color: color,
//       fontWeight: 'bold',
//     };
//   };

//   return (
//     <div className="rate-import-container">
//       <div className="page-header">
//         <h3 className="page-title">Rate Import</h3>
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="!#" onClick={(event) => event.preventDefault()}>
//                 Rates
//               </a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Rate Import
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="parent">

//         <div className="child1">
//           <div className="history-top">
//             <h4>Import History</h4>
//             <button className="upload-button" onClick={() => setShowModal(true)}>
//               Upload
//             </button>
//           </div>

//           <table className="history-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>File Name</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Product</th>
//                 <th>Carrier</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((task) => (
//                 <tr
//                   key={task.id}
//                   onClick={() => handleRowClick(task)}
//                   style={{
//                     cursor: 'pointer',
//                     backgroundColor: selectedRow && selectedRow.id === task.id ? '#f0f0f0' : '',
//                   }}
//                 >
//                   <td>{task.id}</td>
//                   <td>{task.fileName}</td>
//                   <td>{task.date}</td>
//                   <td style={getStatusStyle(task.status)}>{task.status}</td>
//                   <td>{task.product}</td>
//                   <td>{task.carrier}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="child2">
//           <h4>Advanced Import Options</h4>
//           <form>
//             <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
//               <label>Selected File:</label>
//               <input className="file-input" type="text" value={file ? file.name : selectedRow ? selectedRow.fileName : ''} readOnly />
//             </div>

//             <div className="form-group" style={{ marginTop: '30px' }}>
//               <label>Parser</label>
//               <select value={selectedParser} onChange={(e) => setSelectedParser(e.target.value)}>
//                 <option value="xml">Internal Library</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Direction</label>
//               <select value={direction} onChange={(e) => setDirection(e.target.value)}>
//                 <option value="vendor">Vendor</option>
//                 <option value="client">Client</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Carriers</label>
//               <select value={modalCarrier} onChange={(e) => setModalCarrier(e.target.value)}>
//                 <option value="Carrier 1">Carrier 1</option>
//                 <option value="Carrier 2">Carrier 2</option>
//                 <option value="Carrier 3">Carrier 3</option>
//               </select>
//               {carrierError && <p className="error-message">{carrierError}</p>}
//             </div>

//             <div className="form-group">
//               <label>Products</label>
//               <select value={modalProduct} onChange={(e) => setModalProduct(e.target.value)}>
//                 {products.map((product, index) => (
//                   <option key={index} value={product}>
//                     {product}
//                   </option>
//                 ))}
//               </select>
//               {productError && <p className="error-message">{productError}</p>}
//             </div>

//             <div className="form-group" style={{ marginTop: '30px' }}>
//             {/* onClick={handleImportSubmit} */}
//               <button type="button" className="submit-button" >
//                 Continue
//               </button>
//             </div>

//             {fileError && <p className="error-message">{fileError}</p>}
//           </form>
//         </div>

//       </div>

//       <div className="child3">
//           <h4>Import Result</h4>
//           <p>{taskResult}</p>

//          <table className="history-table">
//             <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Task Created</th>
//                 <th>Product</th>
//                 <th>Import Mode</th>
//                 <th>Status</th>
//                 <th>Summary</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((task) => (
//                 <tr
//                   key={task.id}
//                   onClick={() => handleRowClick(task)}
//                   style={{
//                     cursor: 'pointer',
//                     backgroundColor: selectedRow && selectedRow.id === task.id ? '#f0f0f0' : '',
//                   }}
//                 >
//                   <td>{task.id}</td>
//                   <td>{task.createdAt}</td>
//                   <td>{task.product}</td>
//                   <td>{task.importMode}</td>
//                   <td style={getStatusStyle(task.status)}>{task.status}</td>
//                   <td>{task.summary}</td>
//                   <td>
//                     <button onClick={() => viewDetails(task.id)}>View Details</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>


//       {/* Modal for file upload */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h4>Upload File</h4>
//             <form>
//               <div className="form-group">
//                 <label>Product</label>
//                 <select  onChange={handleProductChange} value={modalProduct}>
//                 <option value="" disabled selected>Select Product</option>
//                   {baseProducts.map((product, index) => (
//                     <option key={index} value={product}>
//                       {product}
//                     </option>
//                   ))}
//                 </select>
//                 {productError && <p className="error-message">{productError}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Carrier</label>
//                 <select onChange={handleCarrierChange} value={modalCarrier}>
//                 <option value="" disabled selected>Select Carrier</option>
//                   <option value="Carrier 1">Carrier 1</option>
//                   <option value="Carrier 2">Carrier 2</option>
//                   <option value="Carrier 3">Carrier 3</option>
//                 </select>
//                 {carrierError && <p className="error-message">{carrierError}</p>}
//               </div>

//               <div style={{ marginTop: '20px' }}>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept=".csv,.xls,.xlsx"
//                   onChange={handleFileChange}
//                   style={{ display: 'block' }}
//                 />
//                  {fileError && <p className="error-message">{fileError}</p>}
//               </div>

//               <div className="modal-buttons">
//                 <button onClick={handleModalSubmit} style={{ backgroundColor: '#141d34', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
//                   Submit
//                 </button>

//                 <button
//                   style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', marginTop: '20px' }}
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RateImport;







import React, { useState, useEffect, useRef } from 'react';
import './RateImport.css';

const RateImport = () => {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedParser, setSelectedParser] = useState('csv');
  const [direction, setDirection] = useState('vendor');
  const [carriers, setCarriers] = useState([]);
  const [products, setProducts] = useState([]);
  const [taskResult, setTaskResult] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState('');
  const [modalCarrier, setModalCarrier] = useState('');
  const [fileError, setFileError] = useState('');
  const [productError, setProductError] = useState('');
  const [carrierError, setCarrierError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Items per page for pagination

  const fileInputRef = useRef(null);

  // Sample product list
  const baseProducts = ['WHOLESALE (USD)', 'PREMIUM (USD)', 'RETAIL (USD)'];

  const getModifiedProducts = (selectedDirection) => {
    return baseProducts.map((product) => `${product} - ${selectedDirection.toUpperCase()}`);
  };

  const generateRandomHistory = () => {
    const randomHistory = [];
    for (let i = 0; i < 15; i++) {
      randomHistory.push({
        id: i + 1,
        fileName: `RateFile_${i + 1}.csv`,
        date: new Date().toLocaleString(),
        status: i % 2 === 0 ? 'Imported Successfully' : 'Import Failed',
        product: `Product ${Math.floor(Math.random() * 3) + 1}`,
        carrier: `Carrier ${Math.floor(Math.random() * 3) + 1}`,
      });
    }
    setHistory(randomHistory);
  };

  const generateRandomFormSelections = () => {
    const randomCarriers = ['Carrier 1', 'Carrier 2', 'Carrier 3'];
    const selectedCarriers = [
      randomCarriers[Math.floor(Math.random() * 3)],
      randomCarriers[Math.floor(Math.random() * 3)],
    ];

    setCarriers(selectedCarriers);
    setSelectedParser(Math.random() > 0.5 ? 'csv' : 'xml');
    setDirection(Math.random() > 0.5 ? 'vendor' : 'client');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedExtensions = ['csv', 'xls', 'xlsx'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      setFileError(''); // Clear file error when file is valid
    } else {
      setFileError('Please select a valid file (CSV, XLS, XLSX).');
      event.target.value = ''; // Reset the input field
    }
  };

  const handleModalSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    let isValid = true;

    // Validate file selection
    if (!file) {
      setFileError('Please select a file.');
      isValid = false;
    } else {
      // Validate file extension
      const allowedExtensions = ['csv', 'xls', 'xlsx'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setFileError('Invalid file type. Only CSV and Excel files are allowed.');
        isValid = false;
      } else {
        setFileError(''); // Clear the error if file is valid
      }
    }

    // Validate product selection
    if (!modalProduct) {
      setProductError('Please select a product.');
      isValid = false;
    } else {
      setProductError(''); // Clear the error if product is selected
    }

    // Validate carrier selection
    if (!modalCarrier) {
      setCarrierError('Please select a carrier.');
      isValid = false;
    } else {
      setCarrierError(''); // Clear the error if carrier is selected
    }

    // If all validations pass, submit the form
    if (isValid) {
      console.log('Form submitted with:', { file, modalProduct, modalCarrier });
      setShowModal(false); // Close the modal after successful submission
    }
  };

  const handleCarrierChange = (e) => {
    setModalCarrier(e.target.value);
    if (e.target.value) {
      setCarrierError(''); // Clear the error when a valid option is selected
    }
  };

  const handleProductChange = (e) => {
    setModalProduct(e.target.value);
    if (e.target.value) {
      setProductError(''); // Clear the error when a valid option is selected
    }
  };

  const handleCancel = () => {
    setModalCarrier('');
    setModalProduct('');
    setCarrierError('');
    setProductError('');
    setFileError('');
    setShowModal(false);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setFile(null);
    setDirection('vendor');
    setCarriers([row.carrier]);
    setProducts([row.product]);
    setModalProduct(row.product);
    setModalCarrier(row.carrier);
  };

  const viewDetails = (taskId) => {
    console.log(`Viewing details for task ID: ${taskId}`);
  };

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

  useEffect(() => {
    generateRandomHistory();
    generateRandomFormSelections();
  }, []);

  useEffect(() => {
    setProducts(getModifiedProducts(direction));
  }, [direction]);

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
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Prev.
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(history.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>


             <div className="child2">
           <h4>Advanced Import Options</h4>
           <form>
             <div className="form-group" style={{ display: 'flex', alignItems: 'baseline' }}>
               <label>Selected File:</label>
               <input className="file-input" type="text" value={file ? file.name : selectedRow ? selectedRow.fileName : ''} readOnly />
             </div>

             <div className="form-group" style={{ marginTop: '30px' }}>
               <label>Parser</label>
               <select value={selectedParser} onChange={(e) => setSelectedParser(e.target.value)}>
                 <option value="xml">Internal Library</option>
               </select>
             </div>

             <div className="form-group">
               <label>Direction</label>
               <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                 <option value="vendor">Vendor</option>
                 <option value="client">Client</option>
               </select>
             </div>

             <div className="form-group">
               <label>Carriers</label>
               <select value={modalCarrier} onChange={(e) => setModalCarrier(e.target.value)}>
                 <option value="Carrier 1">Carrier 1</option>
                 <option value="Carrier 2">Carrier 2</option>
                 <option value="Carrier 3">Carrier 3</option>
               </select>
               {carrierError && <p className="error-message">{carrierError}</p>}
             </div>

             <div className="form-group">
               <label>Products</label>
               <select value={modalProduct} onChange={(e) => setModalProduct(e.target.value)}>
                 {products.map((product, index) => (
                   <option key={index} value={product}>
                     {product}
                   </option>
                 ))}
               </select>
               {productError && <p className="error-message">{productError}</p>}
             </div>

             <div className="form-group" style={{ marginTop: '30px' }}>
             {/* onClick={handleImportSubmit} */}
               <button type="button" className="submit-button" >
                 Continue
               </button>
             </div>

             {fileError && <p className="error-message">{fileError}</p>}
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
            <button
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(history.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Import Configuration</h4>
            <form onSubmit={handleModalSubmit}>
              <label>
                Product:
                <select
                  value={modalProduct}
                  onChange={handleProductChange}
                >
                  <option value="">Select a product</option>
                  {products.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                {productError && <p className="error-text">{productError}</p>}
              </label>

              <label>
                Carrier:
                <select
                  value={modalCarrier}
                  onChange={handleCarrierChange}
                >
                  <option value="">Select a carrier</option>
                  {carriers.map((carrier, index) => (
                    <option key={index} value={carrier}>
                      {carrier}
                    </option>
                  ))}
                </select>
                {carrierError && <p className="error-text">{carrierError}</p>}
              </label>

              <label>
                File:
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {fileError && <p className="error-text">{fileError}</p>}
              </label>

              <div className="modal-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>
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









// the interface contains three grids
// first grid shows you all the files uploaded into the system and the import status of each file
// also you can see where (into what product and for which carrier) you make each task

// a button called Upload which upload new files into the interface 



// 2nd grid you can set advanced options of import
// such as parser for the file and verify carrier and product you want to make import for




//third grid show the results of the finished tasks


// functionality :
// choose a file from the first grid you want to import 
// set the options on the 2nd grid 
// when pressing continue user will be redirected to interface of manual import 