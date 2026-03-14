import React from 'react';
import FileUpload from '../common/FileUpload';

const DataUpload = () => {
  return (
    <div>
      <h2>1. Data Upload</h2>
      <FileUpload />
      <div className="uploaded-files">
        <h3>Uploaded Files</h3>
        {/* Placeholder for uploaded files list */}
        <p>No files uploaded yet.</p>
      </div>
    </div>
  );
};

export default DataUpload;
