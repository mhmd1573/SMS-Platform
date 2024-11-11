import React, { useState } from 'react';

const AutoRateImport = () => {
  // State for uploaded file and task history
  const [file, setFile] = useState(null); // Holds the uploaded file
  const [tasks, setTasks] = useState([]); // Holds the history of import tasks

  // Handle file selection/upload
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Mock function to submit the import task
  const handleImportSubmit = () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    // Mocking a task being added to history
    const newTask = {
      id: tasks.length + 1,
      fileName: file.name,
      date: new Date().toLocaleString(),
      status: 'Pending',
    };
    setTasks([newTask, ...tasks]);

    // Clear the file input after submission
    setFile(null);
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Panel 1: Import Form */}
      <div style={{ flex: 1, marginRight: '10px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>AutoRate Import</h3>

        {/* File Upload Section */}
        <div>
          <label>Upload File:</label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
          />
          {file && <p>Selected File: {file.name}</p>}
        </div>

        {/* Import Settings (optional for now, can add more options as needed) */}
        <div style={{ marginTop: '10px' }}>
          <label>Override Existing Data:</label>
          <input type="checkbox" />
        </div>

        {/* Submit Button */}
        <button onClick={handleImportSubmit} style={{ marginTop: '20px' }}>
          Start Import
        </button>
      </div>

      {/* Panel 2: Task History */}
      <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc' }}>
        <h3>Import Task History</h3>

        {/* Display Task List */}
        {tasks.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Task ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>File Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.fileName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.date}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No import tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default AutoRateImport;
