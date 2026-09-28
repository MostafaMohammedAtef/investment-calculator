import { calculateInvestmentResults, formatter } from '../util/investment.js';
import Chart from './Chart.jsx';

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

  function handleExportCSV() {
    const headers = ['Year', 'Investment Value', 'Interest (Year)', 'Total Interest', 'Invested Capital'];
    const csvRows = rows.map((r) => [
      r.year,
      r.valueEndOfYear.toFixed(2),
      r.interest.toFixed(2),
      r.totalInterest.toFixed(2),
      r.totalAmountInvested.toFixed(2),
    ]);
    const csvContent = [headers, ...csvRows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'investment-results.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

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

      <Chart data={rows} />

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

      <p className="actions">
        <button type="button" onClick={handleExportCSV}>
          Export as CSV
        </button>
      </p>
    </>
  );
}