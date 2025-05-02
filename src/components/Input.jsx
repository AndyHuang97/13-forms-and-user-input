export default function Input({ label, id, error, ...props }) {
  return (
    <div className='control no-margin'>
      {/* the htmlFor attribute is used to link the label to the input field */}
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className='control-error'>{error && <p>{error}</p>}</div>
    </div>
  );
}
