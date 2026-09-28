import { useState } from "react";
import Input from './components/Input';
import Result from './components/Result';
import Header from './components/Header/Header';
import { calculateInvestmentResults } from './util/investment.js';

const INITIAL_VALUE = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  const [userInput, setUserInput] = useState(INITIAL_VALUE);

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [inputIdentifier]: +newValue,
    }));
  }

  function handleReset() {
    setUserInput(INITIAL_VALUE);
  }

  const resultData = calculateInvestmentResults(userInput);
  const inputIsInvalid = resultData[0].valueEndOfYear < 0;

  return (
    <>
      <Header />
      <div id="user-input">
        <div className="input-group">
          <Input
            label="Initial Investment"
            id="initial-investment"
            type="number"
            step="1000"
            min="0"
            value={userInput.initialInvestment}
            invalid={userInput.initialInvestment < 0}
            onChange={(event) => handleChange('initialInvestment', event.target.value)}
          />
          <Input
            label="Annual Investment"
            id="annual-investment"
            type="number"
            step="100"
            min="0"
            value={userInput.annualInvestment}
            invalid={userInput.annualInvestment < 0}
            onChange={(event) => handleChange('annualInvestment', event.target.value)}
          />
        </div>
        <div className="input-group">
          <Input
            label="Expected Return"
            id="expected-return"
            type="number"
            step="0.1"
            min="0"
            value={userInput.expectedReturn}
            invalid={userInput.expectedReturn < 0}
            onChange={(event) => handleChange('expectedReturn', event.target.value)}
          />
          <Input
            label="Duration"
            id="duration"
            type="number"
            step="1"
            min="0"
            value={userInput.duration}
            invalid={userInput.duration < 0}
            onChange={(event) => handleChange('duration', event.target.value)}
          />
        </div>
        <p className="actions">
          <button type="button" onClick={handleReset}>
            Reset to Defaults
          </button>
        </p>
      </div>

      {inputIsInvalid ? (
        <p className="center">Invalid input data provided (must be greater than zero)</p>
      ) : (
        <Result input={userInput} />
      )}
    </>
  );
}

export default App;