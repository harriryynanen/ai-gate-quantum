
import React from 'react';
import Card from '../common/Card';

const DetailItem = ({ title, children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    <h4 className="font-semibold text-gray-600 text-sm mb-1">{title}</h4>
    <div className="text-gray-800 text-base">{children}</div>
  </div>
);

const Tag = ({ text, color }) => (
    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${color}`}>
        {text}
    </span>
);

const PathPill = ({ path, isActive }) => {
    const baseStyle = 'px-4 py-2 rounded-full font-bold text-lg';
    const activeStyle = 'bg-blue-600 text-white';
    const inactiveStyle = 'bg-gray-200 text-gray-600';
    return (
        <span className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}>
            {path.charAt(0).toUpperCase() + path.slice(1)}
        </span>
    );
};

function MethodRecommendation({ recommendation }) {
    if (!recommendation) return null;

    const { 
        recommendedPath, alternativePath, recommendationStrength, confidence, 
        reasoningSummary, tradeoffs, assumptions, blockers, requiredInputs,
        explorationVsProduction, recommendationWarnings, quantumFitRationale, classicalFitRationale
    } = recommendation;

    const getStrengthColor = () => {
        switch(recommendationStrength) {
            case 'high': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <Card className="mb-8 border-l-4 border-blue-500">
            <div className="p-2">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">AI Recommendation</h2>
                        <p className="text-gray-500">Analysis based on your goal</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Tag text={explorationVsProduction.replace('-', ' ')} color={explorationVsProduction === 'production-ready' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'} />
                        <Tag text={`Confidence: ${(confidence * 100).toFixed(0)}%`} color={getStrengthColor()} />
                    </div>
                </div>

                {/* Main Recommendation Paths */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <div className="flex items-center justify-around">
                       <div className="text-center">
                           <h3 className="text-gray-600 font-semibold mb-2">Recommended Path</h3>
                           <PathPill path={recommendedPath} isActive={true} />
                       </div>
                       <div className="text-center">
                           <h3 className="text-gray-600 font-semibold mb-2">Alternative</h3>
                           <PathPill path={alternativePath} isActive={false} />
                       </div>
                    </div>
                </div>

                {/* Reasoning */}
                <DetailItem title="Reasoning Summary">{reasoningSummary}</DetailItem>

                {/* Detailed Rationale */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-4">
                    <DetailItem title="Quantum Fit Rationale">{quantumFitRationale}</DetailItem>
                    <DetailItem title="Classical Fit Rationale">{classicalFitRationale}</DetailItem>
                </div>

                <DetailItem title="Trade-offs">{tradeoffs}</DetailItem>

                {/* Assumptions and Blockers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <DetailItem title="Assumptions">
                        <ul className="list-disc list-inside space-y-1">
                            {assumptions.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </DetailItem>
                    <DetailItem title="Potential Blockers">
                         <ul className="list-disc list-inside space-y-1">
                            {blockers.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </DetailItem>
                </div>

                 {/* Required Inputs */}
                 <DetailItem title="Required Inputs to Proceed">
                     <ul className="list-disc list-inside space-y-1">
                        {requiredInputs.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </DetailItem>

                {/* Warnings */}
                {recommendationWarnings && recommendationWarnings.length > 0 && (
                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                        <h4 className="font-bold text-yellow-800">Warnings</h4>
                        <ul className="list-disc list-inside text-yellow-700 space-y-1 mt-1">
                             {recommendationWarnings.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </Card>
    );
}

export default MethodRecommendation;
