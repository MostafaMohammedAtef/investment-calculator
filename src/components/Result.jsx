import { calculateInvestmentResults, formatter } from '../util/investment.js';

export default function Result({ input }) {
  const resultData = calculateInvestmentResults(input);
  const initialInvestment =
    resultData[0].valueEndOfYear -
    resultData[0].interest -
    resultData[0].annualInvestment;

  const rows = resultData.map((yearData) => {
    const totalInterest =
      yearData.valueEndOfYear -
      yearData.annualInvestment * yearData.year -
      initialInvestment;
    const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

    return { ...yearData, totalInterest, totalAmountInvested };
  });

  const finalYear = rows[rows.length - 1];

  return (
    <>
      <div className="summary">
        <div className="summary-item">
          <p className="summary-label">Final Value</p>
          <p className="summary-value">{formatter.format(finalYear.valueEndOfYear)}</p>
        </div>
        <div className="summary-item">
          <p className="summary-label">Total Interest Earned</p>
          <p className="summary-value">{formatter.format(finalYear.totalInterest)}</p>
        </div>
        <div className="summary-item">
          <p className="summary-label">Total Invested</p>
          <p className="summary-value">{formatter.format(finalYear.totalAmountInvested)}</p>
        </div>
      </div>

      <table id="result" key={JSON.stringify(input)}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((yearData, index) => (
            <tr key={yearData.year} style={{ animationDelay: `${index * 0.05}s` }}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(yearData.totalInterest)}</td>
              <td>{formatter.format(yearData.totalAmountInvested)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}