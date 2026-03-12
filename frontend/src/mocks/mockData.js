export const mockSession = {
  id: 'session-xyz-123',
  status: 'Active',
  createdAt: '2024-07-31T10:00:00Z',
};

export const mockExecution = {
  timeline: [
    { id: 1, name: 'Session Created', status: 'Completed', time: '10:01:00 AM' },
    { id: 2, name: 'Data Profiled', status: 'Completed', time: '10:01:05 AM' },
    { id: 3, name: 'Solver Selected', status: 'Completed', time: '10:01:15 AM' },
    { id: 4, name: 'Mapping Approved', status: 'Completed', time: '10:01:40 AM' },
    { id: 5, name: 'Python Job Prepared', status: 'Running', time: '10:01:42 AM' },
    { id: 6, name: 'Executing...', status: 'Pending', time: null },
    { id: 7, name: 'Results Generated', status: 'Pending', time: null },
  ],
  logs: [
    { time: '10:01:42.100', stage: 4, message: 'Preparing Python execution environment.' },
    { time: '10:01:42.500', stage: 4, message: 'Serializing dataset and parameters.' },
    { time: '10:01:43.000', stage: 5, message: 'Starting job execution via Cloud Run proxy.' },
    { time: '10:01:44.200', stage: 5, message: '[Solver] Initializing Qiskit Aer backend for simulation.' },
    { time: '10:01:44.800', stage: 5, message: '[Solver] Pricing European call option with 1024 shots.' },
    { time: '10:01:45.600', stage: 5, message: '[Solver] Executing quantum simulation via Qiskit Runtime...' },
  ],
  quantumDetails: {
    backend: 'local_simulation',
    framework: 'Qiskit + Aer',
    shots: 1024,
    seed: 42,
    transpilation: 'Level 3 (default)',
  },
};

export const mockDataset = {
  id: 'dataset-001',
  name: 'Financial Projections Q3 2024',
  uploadedAt: '2024-07-31T10:00:00Z',
  rowCount: 1500,
  sizeKB: 256,
  sourceType: 'CSV',
};

export const mockColumns = [
  { id: 'col-01', name: 'ScenarioID', type: 'string', quality: 'OK' },
  { id: 'col-02', name: 'Date', type: 'string', quality: 'OK' },
  { id: 'col-03', name: 'Revenue', type: 'string', quality: 'Warning' },
  { id: 'col-04', name: 'Expenses', type: 'number', quality: 'OK' },
  { id: 'col-05', name: 'Growth_Rate', type: 'string', quality: 'Error' },
  { id: 'col-06', name: 'Region', type: 'string', quality: 'OK' },
];

export const mockDataPreview = [
  { ScenarioID: 'SC-001', Date: '2024-07-01', Revenue: '1,200,000', Expenses: 800000, Growth_Rate: '5.5%', Region: 'North America' },
  { ScenarioID: 'SC-002', Date: '2024-07-01', Revenue: '1,500,000', Expenses: 950000, Growth_Rate: '5.8%', Region: 'Europe' },
  { ScenarioID: 'SC-003', Date: '2024-07-01', Revenue: '950,000', Expenses: 600000, Growth_Rate: '4.9%', Region: 'Asia' },
];

export const mockQualityCheck = {
  status: 'IssuesFound',
  errors: [
    { field: 'Growth_Rate', message: 'Cannot parse as a number. Format seems to be percentage string.' },
  ],
  warnings: [
    { field: 'Revenue', message: 'Detected as string, but looks like a number with commas.' },
    { field: null, message: '3 duplicate rows found.' },
  ],
};

export const mockSolvers = [
  {
    id: 'solver-001',
    name: 'Basic Financial Forecaster',
    description: 'A simple projection model based on revenue, expenses, and growth.',
    schema: {
      required: [
        { id: 'req-01', name: 'revenue', type: 'number', description: 'Total revenue for the period.' },
        { id: 'req-02', name: 'expenses', type: 'number', description: 'Total expenses for the period.' },
      ],
      optional: [
        { id: 'opt-01', name: 'growthRate', type: 'number', description: 'Projected growth rate as a decimal (e.g., 0.05 for 5%).' },
        { id: 'opt-02', name: 'period', type: 'date', description: 'The time period for the forecast.' },
      ],
    },
  },
  {
    id: 'solver-002',
    name: 'Quantum Monte Carlo Option Pricer',
    description: 'Prices European options using a Quantum Monte Carlo method.',
    schema: {
      required: [
        { id: 'q-req-01', name: 'spot_price', type: 'number', description: 'Current price of the underlying asset.' },
        { id: 'q-req-02', name: 'strike_price', type: 'number', description: 'Strike price of the option.' },
        { id: 'q-req-03', name: 'volatility', type: 'number', description: 'Volatility of the asset as a decimal.' },
        { id: 'q-req-04', name: 'risk_free_rate', type: 'number', description: 'Risk-free interest rate as a decimal.' },
        { id: 'q-req-05', name: 'maturity', type: 'number', description: 'Time to maturity in years.' },
      ],
      optional: [],
    },
  },
];

export const mockMapping = {
  'solver-001': {
    'req-01': { source: 'col-03', confidence: 0.8 }, // revenue -> Revenue
    'req-02': { source: 'col-04', confidence: 0.9 }, // expenses -> Expenses
    'opt-01': { source: 'col-05', confidence: 0.7 }, // growthRate -> Growth_Rate
    'opt-02': { source: 'col-02', confidence: 0.95 }, // period -> Date
  },
};

export const mockTransformations = [
  { sourceField: 'Revenue', targetField: 'revenue', transform: 'string_to_number', details: 'Removed commas' },
  { sourceField: 'Growth_Rate', targetField: 'growthRate', transform: 'percent_to_decimal', details: 'Converted "5.5%" to 0.055' },
  { sourceField: 'Date', targetField: 'period', transform: 'string_to_date', details: 'Formatted as YYYY-MM-DD' },
];

export const mockValidation = {
  'solver-001': {
    status: 'Pending', // or 'Success', 'Error'
    fieldStatus: {
      'revenue': { status: 'Success', message: 'Mapped and transformed.' },
      'expenses': { status: 'Success', message: 'Mapped directly.' },
      'growthRate': { status: 'Success', message: 'Mapped and transformed.' },
      'period': { status: 'Success', message: 'Mapped and transformed.' },
    },
    overallMessage: 'All required fields are mapped and validated. Ready for approval.'
  }
};
