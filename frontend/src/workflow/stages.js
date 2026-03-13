
export const WORKFLOW_STAGES = {
  DEFINE_GOAL: 'define_goal',
  FORMULATE_PROBLEM: 'formulate_problem',
  ASSESS_READINESS: 'assess_readiness',
  RECOMMEND_PATH: 'recommend_path',
  PREPARE_SOLVER_INPUT: 'prepare_solver_input',
  EXECUTE: 'execute',
  REVIEW_RESULTS: 'review_results',
};

export const STAGE_CONFIG = {
  [WORKFLOW_STAGES.DEFINE_GOAL]: {
    name: 'Define Goal',
    description: 'Start by defining your high-level computational goal. What problem are you trying to solve?',
    path: '/data-preparation',
  },
  [WORKFLOW_STAGES.FORMULATE_PROBLEM]: {
    name: 'Formulate Problem',
    description: 'Structure your goal as a formal problem. This may involve uploading data and specifying parameters.',
    path: '/data-preparation',
  },
  [WORKFLOW_STAGES.ASSESS_READINESS]: {
    name: 'Assess Readiness',
    description: 'The system is analyzing your problem to determine its suitability for different computational approaches.',
    path: '/job-configuration',
  },
  [WORKFLOW_STAGES.RECOMMEND_PATH]: {
    name: 'Recommend Path',
    description: 'Based on the analysis, the system recommends a primary solution path and solver.',
    path: '/job-configuration',
  },
  [WORKFLOW_STAGES.PREPARE_SOLVER_INPUT]: {
    name: 'Prepare Solver Input',
    description: 'The system is now preparing the detailed input contract required by the selected solver.',
    path: '/job-configuration',
  },
  [WORKFLOW_STAGES.EXECUTE]: {
    name: 'Execute',
    description: 'The solver is now running with the prepared input. You can monitor the progress here.',
    path: '/execution',
  },
  [WORKFLOW_STAGES.REVIEW_RESULTS]: {
    name: 'Review Results',
    description: 'Execution is complete. Review the output, performance metrics, and AI-guided interpretation.',
    path: '/results',
  },
};
