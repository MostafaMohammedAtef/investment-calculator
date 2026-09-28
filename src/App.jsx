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
    if (+newValue < 0) {
      alert("Value cannot be negative!");
      return;
    }
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [inputIdentifier]: +newValue,
    }));
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
            value={userInput.initialInvestment}
            onChange={(event) => handleChange('initialInvestment', event.target.value)}
          />
          <Input
            label="Annual Investment"
            id="annual-investment"
            type="number"
            step="100"
            value={userInput.annualInvestment}
            onChange={(event) => handleChange('annualInvestment', event.target.value)}
          />
        </div>
        <div className="input-group">
          <Input
            label="Expected Return"
            id="expected-return"
            type="number"
            step="1"
            value={userInput.expectedReturn}
            onChange={(event) => handleChange('expectedReturn', event.target.value)}
          />
          <Input
            label="Duration"
            id="duration"
            type="number"
            step="1"
            value={userInput.duration}
            onChange={(event) => handleChange('duration', event.target.value)}
          />
        </div>
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