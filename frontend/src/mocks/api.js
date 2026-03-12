
// This file simulates the API responses for a seamless frontend development experience.

const mockResponses = {
    createSession: {
        id: `sid_${Date.now()}`,
        goal: "Initial exploratory session",
        job: null,
        recommendation: null,
        dataset: null,
    },
    getRecommendation: {
        recommendation: {
            method: {
                id: 'quantum_inspired_annealing',
                name: 'Quantum-Inspired Annealing',
                type: 'quantum_simulation',
                description: 'A quantum-inspired algorithm that excels at solving complex combinatorial optimization problems by exploring a vast solution space.'
            },
            confidence: 0.92,
            status: 'strongly_justified', // 'strongly_justified' | 'exploratory' | 'not_recommended'
            reasoning: 'The uploaded data profile suggests a high-dimensional, combinatorial problem structure. This is an excellent match for quantum-inspired annealing, which can explore vast solution spaces more effectively than classical solvers for this type of challenge.',
            tradeoffs: {
                title: 'Expected Strengths',
                items: {
                    'Solution Quality': 'Very High',
                    'Exploratory Power': 'Very High',
                    'Robustness': 'High',
                    'Execution Speed': 'Medium',
                    'Interpretability': 'Low',
                }
            }
        },
        alternative: {
            method: {
                id: 'classical_optimization',
                name: 'Classical Optimization',
                type: 'classical',
                description: 'A traditional, robust approach using methods like Monte Carlo. It is faster for smaller datasets but may miss optimal solutions in complex scenarios.'
            },
            reasoning: 'A robust and well-understood classical method. It provides a reliable baseline and is significantly faster for smaller or less complex problem spaces. However, it may miss non-obvious, optimal solutions in highly complex scenarios.',
            tradeoffs: {
                title: 'Expected Strengths',
                items: {
                    'Solution Quality': 'Medium',
                    'Exploratory Power': 'Low',
                    'Robustness': 'Very High',
                    'Execution Speed': 'Very High',
                    'Interpretability': 'High',
                }
            }
        }
    },
    submitJob: (session, config) => {
        const newJob = {
            id: `jid_${Date.now()}`,
            status: 'queued',
            timeline: [
                { stage: "Queued", timestamp: new Date().toISOString(), status: "complete" },
                { stage: "Preparing", timestamp: null, status: "pending" },
                { stage: "Executing", timestamp: null, status: "pending" },
                { stage: "Complete", timestamp: null, status: "pending" },
            ],
            logs: [
                { timestamp: new Date().toISOString(), message: "Job submitted and queued." }
            ],
            config: config, // Store the full method config
            results: null
        };
        return { ...session, job: newJob };
    },
    getJobStatus: (job) => {
        let { timeline, logs, status } = job;

        // Find the next pending stage
        const currentStageIndex = timeline.findIndex(s => s.status === "pending");

        if (currentStageIndex > -1) {
            // Simulate progress
            timeline[currentStageIndex].status = "complete";
            timeline[currentStageIndex].timestamp = new Date().toISOString();
            status = timeline[currentStageIndex].stage.toLowerCase();
            logs.push({ timestamp: new Date().toISOString(), message: `Stage '${timeline[currentStageIndex].stage}' completed.` });

            if (timeline[currentStageIndex].stage === "Executing") {
                logs.push({ timestamp: new Date().toISOString(), message: "Solver initiated. Monitoring for convergence..." });
            }
        } else {
            status = "complete";
        }

        return { id: job.id, status, timeline, logs };
    },
    getResults: (job) => ({
        summary: `The analysis using the ${job.config.method.name} method concluded successfully. The results indicate a promising solution pathway, balancing computational cost and solution quality as anticipated. The chosen method proved effective for the problem's structure. Further refinement or comparison with the alternative is recommended to validate these findings. `,
        rawOutput: {
            solution_vector: [0.1, 0.9, 0.2, 0.8],
            convergence_met: true,
            iterations: 1250,
            final_cost: 42.17
        },
        method: job.config.method
    }),
    getHistory: [
        {
            id: "sid_1678886400000",
            goal: "Initial exploratory session for logistics optimization",
            job: {
                id: "jid_1678886410000",
                status: "complete",
                config: {
                    method: {
                        id: 'quantum_inspired_annealing',
                        name: 'Quantum-Inspired Annealing',
                        type: 'quantum_simulation',
                    }
                },
            },
        },
        {
            id: "sid_1678886500000",
            goal: "Baseline comparison with classical methods",
            job: {
                id: "jid_1678886510000",
                status: "complete",
                config: {
                    method: {
                        id: 'classical_optimization',
                        name: 'Classical Optimization',
                        type: 'classical',
                    }
                },
            },
        },
    ]
}

export const mockApi = {
    createSession: async () => {
        console.log("MOCK: createSession");
        return { ...mockResponses.createSession };
    },

    uploadDataset: async (req) => {
        console.log("MOCK: uploadDataset", req);
        // In a real scenario, this would affect the recommendation
        return { success: true };
    },

    getRecommendation: async (req) => {
        console.log("MOCK: getRecommendation", req);
        return mockResponses.getRecommendation;
    },

    submitJob: async (req) => {
        console.log("MOCK: submitJob", req);
        // Here, we'd find the session and add the job
        // For mock, we just use a placeholder session
        const session = { id: req.sessionId };
        return mockResponses.submitJob(session, req.config);
    },

    getJobStatus: async (jobId, session) => {
        console.log("MOCK: getJobStatus for", jobId);
        if (!session.job || session.job.id !== jobId) return { status: 'not_found' };
        return mockResponses.getJobStatus(session.job);
    },

    getResults: async (jobId, session) => {
        console.log("MOCK: getResults for", jobId);
        if (!session.job || session.job.id !== jobId) return { status: 'not_found' };
        return mockResponses.getResults(session.job);
    },

    getHistory: async () => {
        console.log("MOCK: getHistory");
        return mockResponses.getHistory;
    },
};