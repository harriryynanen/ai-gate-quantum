import React, { useState } from 'react';
import './JobConfiguration.css'; 

const WizardStep = ({ step, currentStep, setStep, highestCompletedStep }) => {
    const isDone = step.id <= highestCompletedStep;
    const isActive = step.id === currentStep;
    const isClickable = step.id <= highestCompletedStep + 1;

    return (
        <div 
            className={`step-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''} ${isClickable ? 'clickable' : ''}`}
            onClick={() => isClickable && setStep(step.id)}
        >
            <div className="step-circle">{isDone && !isActive ? '✓' : step.id + 1}</div>
            <div className="step-label">{step.label}</div>
        </div>
    );
};

const JobConfiguration = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [highestCompletedStep, setHighestCompletedStep] = useState(-1);
    const [selectedSolver, setSelectedSolver] = useState('mc_option_pricing');

    const steps = [
        { id: 0, label: 'Määrittely' },
        { id: 1, label: 'Data' },
        { id: 2, label: 'Profilointi' },
        { id: 3, label: 'Solver' },
        { id: 4, label: 'Mapping' },
        { id: 5, label: 'Konfiguraatio' },
        { id: 6, label: 'Suoritus' },
        { id: 7, label: 'Tulokset' },
    ];

    const handleStepCompletion = () => {
        if (currentStep > highestCompletedStep) {
            setHighestCompletedStep(currentStep);
        }
    };

    const nextStep = () => {
        handleStepCompletion();
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // The "Jatka" button is enabled if the current step is completed.
    const isStepComplete = (step) => {
        return step <= highestCompletedStep;
    }

    return (
        <div className="wizard-wrap">
            <div className="wizard-main">
                <div className="step-bar">
                    <div className="step-bar-inner">
                        {steps.map(step => (
                            <WizardStep 
                                key={step.id} 
                                step={step} 
                                currentStep={currentStep} 
                                setStep={setCurrentStep} 
                                highestCompletedStep={highestCompletedStep} 
                            />
                        ))}
                    </div>
                </div>

                <div className="wizard-body">
                    {/* All steps from HTML are now included */}

                    {/* Step 0: Määrittely */}
                     <div className={`wizard-step ${currentStep === 0 ? 'active' : ''}`}>
                        <div className="ws-title">Kuvaa analyysitarpeesi</div>
                        <div className="ws-desc">Kerro omin sanoin mitä haluat analysoida. Tekoälyavustaja auttaa muotoilemaan ongelman ja ehdottaa sopivaa solver-tyyppiä.</div>
                        <div className="chat-area">
                          <div className="chat-msg"><div className="chat-avatar ai">AI</div><div className="chat-bubble ai">Hei! Olen täällä auttamassa analyysin määrittelyssä. Minkälainen kvantitatiivinen ongelma sinulla on mielessä? Voin auttaa tunnistamaan sopivan lähestymistavan — klassinen Monte Carlo, kvantti-simulaatio tai muu menetelmä.</div></div>
                          <div className="chat-msg"><div className="chat-avatar user">JP</div><div className="chat-bubble user">Haluaisin hinnoitella eurooppalaisen call-option portfolion Q4 datalla, noin 10 000 simulaatiolla.</div></div>
                          <div className="chat-msg"><div className="chat-avatar ai">AI</div><div className="chat-bubble ai">Loistava käyttötapaus. Tähän sopii hyvin <strong>mc_option_pricing</strong> — klassinen Monte Carlo option-hinnoitteluun. Tarvitset datan: spot-hinta, toteutushinta, volatiliteetti, riskitön korko ja maturiteetti. Haluatko myös vertailla <strong>qiskit_option_pricing_demo</strong> tulokseen?</div></div>
                        </div>
                        <div className="chat-input-row">
                          <input type="text" placeholder="Kirjoita lisätietoja tai kysymyksiä..." />
                          <button className="send-btn">Lähetä</button>
                        </div>
                    </div>

                    {/* Step 1: Data */}
                    <div className={`wizard-step ${currentStep === 1 ? 'active' : ''}`}>
                        <div className="ws-title">Lataa data</div>
                        <div className="ws-desc">Solver odottaa: spot_price, strike, volatility, risk_free_rate, maturity. CSV tai JSON.</div>
                        <div className="upload-zone" onClick={handleStepCompletion}>
                            <div className="upload-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 13V4M6 7l4-4 4 4M4 16h12" stroke="var(--q-accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                            <div className="upload-title">Raahaa tiedosto tähän tai klikkaa</div>
                            <div className="upload-sub">Simuloitu lataus: klikkaa suorittaaksesi vaiheen</div>
                        </div>
                    </div>

                    {/* Step 2: Profilointi */}
                    <div className={`wizard-step ${currentStep === 2 ? 'active' : ''}`}>
                        <div className="ws-title">Datan profilointi ja laaduntarkistus</div>
                        <div className="ws-desc">Järjestelmä on analysoinut datasi automaattisesti. Tarkista havainnot.</div>
                        <div className="quality-alerts">
                            <div className="qa-item ok"><div className="qa-dot"></div><div>847 riviä, 6 saraketta. Ei duplikaatteja. Kaikki pakolliset kentät löytyivät.</div></div>
                            <div className="qa-item warn"><div className="qa-dot"></div><div>Sarake <strong>volatility</strong>: 3 arvoa yli 0.8 — mahdollisesti virheellistä dataa.</div></div>
                        </div>
                    </div>

                    {/* Step 3: Solver */}
                    <div className={`wizard-step ${currentStep === 3 ? 'active' : ''}`}>
                        <div className="ws-title">Valitse solver</div>
                        <div className="ws-desc">AI suosittelee sopivinta solveria datan ja ongelman perusteella.</div>
                         <div className="solver-grid">
                            <div className={`solver-card selected`} onClick={() => setSelectedSolver('mc_option_pricing')}>
                                <div className="sc-top"><div><div className="sc-name">mc_option_pricing</div><div className="sc-domain">Trading / Option pricing</div></div><span className="sc-type-badge sc-type-classical">Classical</span></div>
                                <div className="sc-desc">Monte Carlo -simulaatio eurooppalaisten optioiden hinnoitteluun.</div>
                            </div>
                            <div className={`solver-card recommended`} onClick={() => setSelectedSolver('qiskit_option_pricing_demo')}>
                                 <div className="sc-top"><div><div className="sc-name">qiskit_option_pricing_demo</div><div className="sc-domain">Quantum Finance Demo</div></div><span className="sc-type-badge sc-type-quantum">Quantum</span></div>
                                <div className="sc-desc">Qiskit + Aer -pohjainen kvanttisimulaatio vertailuun.</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Mapping */}
                    <div className={`wizard-step ${currentStep === 4 ? 'active' : ''}`}>
                        <div className="ws-title">Kenttien mappaus</div>
                        <div className="ws-desc">Yhdistä datasarakkeesi solverin vaatimiin kenttiin.</div>
                        <div className="mapping-table">
                            <div className="mt-head"><div className="mt-hc">Solverin kenttä</div><div className="mt-hc">Data-sarake</div><div className="mt-hc">Tila</div></div>
                            <div className="mt-row"><div className="mt-cell">spot_price</div><div><select className="mt-select mapped"><option>spot_price</option></select></div><div><span className="badge badge-complete">✓ Mappattu</span></div></div>
                        </div>
                    </div>

                    {/* Step 5: Konfiguraatio */}
                    <div className={`wizard-step ${currentStep === 5 ? 'active' : ''}`}>
                        <div className="ws-title">Ajon konfiguraatio</div>
                        <div className="ws-desc">Aseta simulaation parametrit.</div>
                        <div className="config-form">
                            <label>Simulaatioita</label><input type="number" value="10000" />
                            <label>Satunnainen siemen</label><input type="number" value="42" />
                        </div>
                    </div>

                    {/* Step 6: Suoritus */}
                    <div className={`wizard-step ${currentStep === 6 ? 'active' : ''}`}>
                        <div className="ws-title">Suoritus</div>
                        <div className="ws-desc">Ajo on käynnissä. Seuraa edistymistä.</div>
                        <div className="exec-layout">
                          <div className="exec-card">
                            <div className="ec-head"><div className="ec-title">Vaiheet</div></div>
                            <div className="ec-body">
                               <div className="timeline-item"><div className="tl-dot-wrap"><div className="tl-dot done"></div><div className="tl-line"></div></div><div><div className="tl-label">Datan validointi</div></div></div>
                               <div className="timeline-item"><div className="tl-dot-wrap"><div className="tl-dot active"></div></div><div><div className="tl-label">Monte Carlo simulaatio</div></div></div>
                            </div>
                          </div>
                          <div className="exec-card">
                            <div className="ec-head"><div className="ec-title">Live-lokit</div></div>
                            <div className="ec-body"><div className="log-area"><div className="log-line info">[INFO] Starting simulation...</div></div></div>
                          </div>
                        </div>
                    </div>

                    {/* Step 7: Tulokset */}
                    <div className={`wizard-step ${currentStep === 7 ? 'active' : ''}`}>
                        <div className="ws-title">Tulokset</div>
                        <div className="ws-desc">Solver: mc_option_pricing v1.0 · 2.3s</div>
                        <div className="result-layout">
                          <div className="result-card"><div className="rc-label">Odotettu hinta</div><div className="rc-value">€7.82</div></div>
                          <div className="result-card"><div className="rc-label">95% luottamusväli</div><div className="rc-value">±0.14</div></div>
                        </div>
                    </div>
                </div>

                <div className="wizard-footer">
                  <div className="wf-left">
                    <button className="btn-ghost" onClick={prevStep} disabled={currentStep === 0}>← Takaisin</button>
                  </div>
                  <button className="btn-primary" onClick={nextStep} disabled={!isStepComplete(currentStep) && currentStep < steps.length -1 }>{currentStep === steps.length - 1 ? 'Valmis' : 'Jatka →'}</button>
                </div>
            </div>

            {/* AI Panel could be a separate component */}
            <div className="ai-panel">
                <div className="ap-header">
                    <div className="ap-title"><div className="ai-dot"></div>AI-avustaja</div>
                </div>
                <div className="ap-messages">
                    <div className="ap-msg ai">Datasi näyttää hyvältä. Huomioin 3 volatiliteetti-arvoa jotka ylittävät 0.8. Haluatko suodattaa ne pois?</div>
                </div>
                 <div className="ap-input-wrap">
                    <input type="text" placeholder="Kysymys datasta..." />
                </div>
            </div>
        </div>
    );
};

export default JobConfiguration;
