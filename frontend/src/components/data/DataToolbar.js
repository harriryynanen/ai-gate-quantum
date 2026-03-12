import React from 'react';

const DataToolbar = ({ onUpload }) => {

  const handleFileChange = (event) => {
    // This is a mock implementation. 
    // In a real app, we would parse the file and pass the data to onUpload.
    console.log('File selected:', event.target.files[0]);
    alert('File upload is not implemented yet.');
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <label htmlFor="file-upload" className="cursor-pointer bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
          Upload CSV
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".csv" />
      </div>
    </div>
  );
};

export default DataToolbar;
