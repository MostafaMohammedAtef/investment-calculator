import { useState } from "react"
import Input from './components/Input'
import Result from './components/Result'
import Header from './components/Header/Header'
import {calculateInvestmentResults} from './util/investment.js'

const INITIAL_VALUE = {      
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0,
}

function App() {

  const [userInput, setUserInput] = useState(INITIAL_VALUE)
  
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

    return (
    <>
      <Header />
      <div id="user-input">
        <div className="input-group"> 
          <Input
            label="Initial Investment"
            id="initial-investment"
            type="number"
            value={userInput.initialInvestment}
            onChange={(event) => handleChange('initialInvestment', event.target.value)}
          />
          <Input
            label="Annual Investment"
            id="annual-investment"
            type="number"
            value={userInput.annualInvestment}
            onChange={(event) => handleChange('annualInvestment', event.target.value)}
          />
        </div>
        <div className="input-group">
          <Input
            label="Expected Return"
            id="expected-return"
            type="number"
            value={userInput.expectedReturn}
            onChange={(event) => handleChange('expectedReturn', event.target.value)}
          />
          <Input
            label="Duration"
            id="duration"
            type="number"
            value={userInput.duration}
            onChange={(event) => handleChange('duration', event.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default App
