# Solver Registry V1

## Periaate
Registry sisältää vain pienen määrän solvereita.
Jokainen solver on:
- nimetty
- versionoitu
- dokumentoitu
- testattu
- liitetty result schemaan

## V1-solverit

### 1. `mc_option_pricing`
**Tyyppi:** classical  
**Domain:** trading / option pricing  
**Menetelmä:** Monte Carlo  
**Result type:** `distribution_result`

Inputit:
- spot_price
- strike
- volatility
- risk_free_rate
- maturity
- simulations
- seed

Outputit:
- expected_option_price
- confidence_interval
- sample_distribution_summary

### 2. `credit_risk_mc`
**Tyyppi:** classical  
**Domain:** banking / credit risk  
**Menetelmä:** Monte Carlo / scenario simulation  
**Result type:** `distribution_result`

Inputit:
- exposures
- default_probabilities
- recovery_rates
- simulations
- seed

Outputit:
- expected_loss
- loss_distribution
- var_95
- cvar_95

### 3. `insurance_loss_mc`
**Tyyppi:** classical  
**Domain:** insurance  
**Menetelmä:** Monte Carlo  
**Result type:** `distribution_result`

Inputit:
- exposure or policy data
- claim_probability / severity assumptions
- simulations
- seed

Outputit:
- expected_claim_loss
- tail metrics
- distribution summary

### 4. `qiskit_option_pricing_demo`
**Tyyppi:** quantum_simulation  
**Domain:** trading / quantum finance demo  
**Menetelmä:** Qiskit + Aer  
**Result type:** `quantum_estimation_result`

Inputit:
- canonical option pricing parameters
- shots
- seed
- backend_mode=local_simulator

Outputit:
- estimate
- circuit_data
- transpilation_summary
- counts / estimator outputs
- execution_metadata

## Ei V1:ssä
- portfolio optimization
- live trading signals
- real-time market feeds
- real QPU execution
