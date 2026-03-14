import React from 'react';
import './ColumnMappingForm.css';

const ColumnMappingForm = () => {
  return (
    <div className="column-mapping-form-container">
      <h3>Column Mapping</h3>
      <form>
        <div className="mapping-row">
          <label>Source Column</label>
          <select>
            {/* Placeholder for source columns */}
            <option>id</option>
            <option>name</option>
          </select>
          <label>Target Column</label>
          <select>
            {/* Placeholder for target columns */}
            <option>user_id</option>
            <option>user_name</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ColumnMappingForm;
