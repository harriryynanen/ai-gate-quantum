import React from 'react';

const ValidationSummary = () => {
  return (
    <div className="validation-summary-container">
      <h3>Validation Summary</h3>
      {/* Placeholder for validation summary */}
      <div>
        <h4>Uploaded File</h4>
        <p>my_data.csv</p>
      </div>
      <div>
        <h4>Column Mappings</h4>
        <p>id -> user_id</p>
        <p>name -> user_name</p>
      </div>
    </div>
  );
};

export default ValidationSummary;
