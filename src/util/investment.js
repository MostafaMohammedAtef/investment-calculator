export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
  compoundingFrequency = 1, // 1 = annually, 4 = quarterly, 12 = monthly
}) {
  const annualData = [];
  let investmentValue = initialInvestment;
  const periodicRate = expectedReturn / 100 / compoundingFrequency;
  const periodicContribution = annualInvestment / compoundingFrequency;

  for (let i = 0; i < duration; i++) {
    let interestEarnedInYear = 0;

    for (let period = 0; period < compoundingFrequency; period++) {
      const interestThisPeriod = investmentValue * periodicRate;
      interestEarnedInYear += interestThisPeriod;
      investmentValue += interestThisPeriod + periodicContribution;
    }

    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: annualInvestment,
    });
  }

  return annualData;
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
