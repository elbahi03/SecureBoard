import { Field, ErrorMessage } from 'formik';

export default function FormField({ label, name, type = 'text', className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        className="form-input"
      />
      <ErrorMessage
        name={name}
        component="p"
        className="error-message"
      />
    </div>
  );
}