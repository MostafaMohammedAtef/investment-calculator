export default function Input({ label, id, invalid, ...props }) {
  return (
    <div className={invalid ? 'invalid' : undefined}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {invalid && <span className="error-text">Must be 0 or greater</span>}
    </div>
  );
}