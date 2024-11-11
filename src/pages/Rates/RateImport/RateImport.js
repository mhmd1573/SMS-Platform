import React, { useState, useEffect } from 'react';
import './RateImport.css';

const RateImport = () => {
  // State to store the selected file and import history
  const [file, setFile] = useState(null); // Holds the selected file
  const [history, setHistory] = useState([]); // Holds the history of imports
  const [selectedParser, setSelectedParser] = useState('csv'); // Parser selection state
  const [direction, setDirection] = useState('vendor'); // Direction (vendor/client)
  const [carriers, setCarriers] = useState([]); // Selected carriers
  const [products, setProducts] = useState([]); // Selected products
  const [taskResult, setTaskResult] = useState(''); // Task result after import
  const [selectedRow, setSelectedRow] = useState(null); // State to store the selected row data

  // Generate random import history data for testing
  const generateRandomHistory = () => {
    const randomHistory = [];
    for (let i = 0; i < 5; i++) {
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

  // Simulate random form selection
  const generateRandomFormSelections = () => {
    const randomCarriers = ['Carrier 1', 'Carrier 2', 'Carrier 3'];
    const randomProducts = ['Product 1', 'Product 2', 'Product 3'];

    const selectedCarriers = [
      randomCarriers[Math.floor(Math.random() * 3)],
      randomCarriers[Math.floor(Math.random() * 3)],
    ];

    const selectedProducts = [
      randomProducts[Math.floor(Math.random() * 3)],
      randomProducts[Math.floor(Math.random() * 3)],
    ];

    setCarriers(selectedCarriers);
    setProducts(selectedProducts);
    setSelectedParser(Math.random() > 0.5 ? 'csv' : 'xml');
    setDirection(Math.random() > 0.5 ? 'vendor' : 'client');
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Handle form submission for import
  const handleImportSubmit = () => {
    if (!file) {
      alert('Please select a file before importing.');
      return;
    }

    // Mocking the import task and adding it to history
    const newImport = {
      id: history.length + 1,
      fileName: file.name,
      date: new Date().toLocaleString(),
      status: 'Imported Successfully', // This can vary based on backend response
      product: 'Example Product', // Mocked product
      carrier: 'Example Carrier', // Mocked carrier
    };

    // Update history and clear the selected file
    setHistory([newImport, ...history]);
    setFile(null);
    setTaskResult('Import task completed successfully!'); // Mock result
  };

  // Handle row click to select a row and populate the form
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setFile(null); // Clear the file input field
    setDirection('vendor'); // You can modify this to reflect the actual row data
    setCarriers([row.carrier]); // Assuming carrier from the row, adjust if needed
    setProducts([row.product]); // Assuming product from the row, adjust if needed
  };

  // Generate random data when the component mounts
  useEffect(() => {
    generateRandomHistory();
    generateRandomFormSelections();
  }, []);

  const viewDetails = (taskId) => {
    // Open a modal, navigate to a details page, or display more info in the UI.
    console.log(`Viewing details for task ID: ${taskId}`);
    // Example: Show a modal or detailed info for the selected task.
  };





  return (
    <div className="rate-import-container">
      {/* Header */}
      <div className="page-header">
        <h3 className="page-title">Rate Import</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={event => event.preventDefault()}>Rates</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">Rate Import</li>
          </ol>
        </nav>
      </div>

      {/* Main content container */}
      <div className="parent">

        {/* Child1 - File List and Import History */}
        <div className="child1">
          <h4>Import History</h4>
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
              {history.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleRowClick(task)} // Click handler for row selection
                  style={{ cursor: 'pointer', backgroundColor: selectedRow && selectedRow.id === task.id ? '#f0f0f0' : '' }}
                >
                  <td>{task.id}</td>
                  <td>{task.fileName}</td>
                  <td>{task.date}</td>
                  <td>{task.status}</td>
                  <td>{task.product}</td>
                  <td>{task.carrier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Child2 - Advanced Import Options */}
        <div className="child2">
          <h4>Advanced Import Options</h4>
          <form>
            <div className="form-group" style={{display:'flex' , alignItems:'baseline'}}>
              <label>Selected File:</label>
              <input className='file-input' type="text" value={file ? file.name : (selectedRow ? selectedRow.fileName : '')}  />
            </div>

            <div className="form-group" style={{marginTop:'30px'}}>
              <label>Parser</label>
              <select value={selectedParser} onChange={(e) => setSelectedParser(e.target.value)} >
                <option value="csv">CSV</option>
                <option value="xml">Internal Library</option>
              </select>
            </div>

            <div className="form-group">
              <label>Direction</label>
              <select value={direction} onChange={(e) => setDirection(e.target.value)}  >
                <option value="vendor">Vendor</option>
                <option value="client">Client</option>
              </select>
            </div>

            <div className="form-group">
              <label>Carriers</label>
              <select  value={carriers} onChange={(e) => setCarriers([...e.target.selectedOptions].map(option => option.value))} >
                <option value="Carrier 1">Carrier 1</option>
                <option value="Carrier 2">Carrier 2</option>
                <option value="Carrier 3">Carrier 3</option>
              </select>
            </div>

            <div className="form-group">
              <label>Products</label>
              <select value={products} onChange={(e) => setProducts([...e.target.selectedOptions].map(option => option.value))} >
                <option value="Product 1">Product 1</option>
                <option value="Product 2">Product 2</option>
                <option value="Product 3">Product 3</option>
              </select>
            </div>

            <button type="button" className='submit-button'  onClick={handleImportSubmit}> Continue </button>

          </form>
        </div>

      </div>

    {/* Child3 - Result of the Finished Task */}
        <div className="child3">
          <h4>Import Result</h4>
          <p>{taskResult}</p>

           {/* Table for Import Results */}
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
          {history.map((task) => (
            <tr
              key={task.id}
              onClick={() => handleRowClick(task)} // Click handler for row selection
              style={{
                cursor: 'pointer',
                backgroundColor: selectedRow && selectedRow.id === task.id ? '#f0f0f0' : ''
              }}
            >
              <td>{task.id}</td>
              <td>{task.createdAt}</td>
              <td>{task.product}</td>
              <td>{task.importMode}</td>
              <td>{task.status}</td>
              <td>{task.summary}</td>
              <td><button onClick={() => viewDetails(task.id)}>View Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>

    </div>
  );
};

export default RateImport;










