import { formatter } from '../util/investment.js';

export default function Chart({ data }) {
  const width = 600;
  const height = 220;
  const padding = 30;

  const maxValue = Math.max(...data.map((d) => d.valueEndOfYear));

  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - (d.valueEndOfYear / maxValue) * (height - padding * 2);
    return { x, y, value: d.valueEndOfYear, year: d.year };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = `${padding},${height - padding} ${linePoints} ${width - padding},${height - padding}`;

  return (
    <div className="chart-container">
      <svg viewBox={`0 0 ${width} ${height}`} className="growth-chart">
        <polygon points={areaPoints} className="chart-area" />
        <polyline points={linePoints} className="chart-line" />
        {points.map((p) => (
          <circle key={p.year} cx={p.x} cy={p.y} r="3" className="chart-dot">
            <title>{`Year ${p.year}: ${formatter.format(p.value)}`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}