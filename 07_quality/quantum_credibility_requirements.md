# Quantum Credibility Requirements

Tämä tiedosto määrittää, milloin kvanttiosuus näyttää uskottavalta.

## Perusvaatimus
Jos käyttöliittymässä väitetään käytetyn kvanttilaskentaa / Qiskitiä, sivulla pitää näkyä **todellisia Qiskit-artefakteja**.

## Pakolliset näkyvät elementit kvanttisolverille

### 1. Solver identification
- solver name
- version
- type = quantum_simulation

### 2. Backend metadata
- simulator/backend name
- shots
- seed
- noise model status
- execution time

### 3. Circuit visibility
Näytä:
- alkuperäinen circuit
- tai siitä johdettu oikea Qiskit circuit view

### 4. Transpilation visibility
Näytä ainakin:
- transpiled circuit exists
- depth
- gate counts
- basis gates / layout summary, jos saatavilla

### 5. Measurement / estimation outputs
Näytä solverista riippuen:
- counts histogram
- estimator / expectation output
- uncertainty or confidence metadata, jos saatavilla

### 6. Code visibility
Näytä ainakin relevantti Python/Qiskit code snapshot.

## Kielletty malli
Älä tee UI:ta, jossa:
- on “quantum-looking” grafiikkaa
- mutta ei mitään todellista Qiskit-dataa

## POC-tasoinen uskottavuus
POC on uskottava, jos käyttäjä voi nähdä:
- että Qiskit-kirjasto oikeasti osallistui laskentaan
- mitä piiriä käytettiin
- miten se transpiloitui
- millaista tulosdataa tuli ulos

## Tuleva QPU-valmius
Arkkitehtuuri kannattaa tehdä niin, että backend abstraction mahdollistaa myöhemmin:
- simulator mode
- future QPU mode

Mutta V1 ei saa teeskennellä, että se jo käyttää oikeaa QPU:ta.
