import logoImg from '/investment-calculator-logo.png';

export default function Header() {
  return (
    <div id="header">
      <img src={logoImg} alt="investment-calculator-logo" />
      <h1>Investment Calculator</h1>
    </div>
  );
}