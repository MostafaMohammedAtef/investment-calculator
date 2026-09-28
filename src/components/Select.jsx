export default function Select({ label, id, options, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
} 