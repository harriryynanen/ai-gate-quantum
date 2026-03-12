import React from 'react';

const RawOutput = ({ output }) => {
  if (!output) return null;

  return (
    <div>
        <h4 className="text-md font-semibold mt-4 mb-2">Raw Output</h4>
        <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto"> 
            <code>{output}</code>
        </pre>
    </div>
  );
};

export default RawOutput;
