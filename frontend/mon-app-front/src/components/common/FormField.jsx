import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormField = ({ 
  name, 
  label, 
  type = 'text', 
  placeholder, 
  required = false,
  as = 'input',
  rows,
  options = [],
  className = '',
  ...props 
}) => {
  const renderField = (field, form) => {
    const hasError = form.errors[name] && form.touched[name];
    const fieldClassName = `form-input ${hasError ? 'border-red-500' : ''} ${className}`;

    if (as === 'select') {
      return (
        <select
          {...field}
          {...props}
          className={fieldClassName}
        >
          <option value="">{placeholder || `Sélectionner ${label.toLowerCase()}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (as === 'textarea') {
      return (
        <textarea
          {...field}
          {...props}
          className={fieldClassName}
          placeholder={placeholder}
          rows={rows || 4}
        />
      );
    }

    return (
      <input
        {...field}
        {...props}
        type={type}
        className={fieldClassName}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className={`form-label ${required ? 'required' : ''}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Field name={name}>
        {({ field, form }) => renderField(field, form)}
      </Field>
      
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default FormField;