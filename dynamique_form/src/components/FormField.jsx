import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ field, value, error, touched, onChange, onBlur }) => {

  const handleFileChange = (e) => {
    onChange(field.name, e.target.files[0] || null);
  };

  const renderInput = () => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: field.type !== 'file' ? (value || '') : undefined,
      onChange: field.type !== 'file'
        ? (e) => onChange(field.name, e.target.value)
        : handleFileChange,
      onBlur: () => onBlur(field.name),
      className: `form-field ${field.type} ${error && touched ? 'error' : ''}`,
      disabled: field.disabled,
      required: field.required
    };

    switch (field.type) {
      
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
      case 'date':
      case 'time':
      case 'datetime-local':
      case 'color':
        return <input type={field.type} {...commonProps} placeholder={field.placeholder} />;

      // Champ type "range" avec affichage de la valeur
      case 'range':
        return (
          <div className="range-container">
            <input 
              type="range" 
              {...commonProps} 
              min={field.min} 
              max={field.max} 
              step={field.step} 
            />
            <span className="range-value">{value}</span>
          </div>
        );

      case 'textarea':
        return <textarea {...commonProps} rows={field.rows} placeholder={field.placeholder} />;

      case 'select':
        return (
          <select {...commonProps}>
            {field.placeholder && <option value="">{field.placeholder}</option>}
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      // Case à cocher
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={!!value}
            onChange={(e) => onChange(field.name, e.target.checked)}
            onBlur={() => onBlur(field.name)}
            className={`form-field checkbox ${error && touched ? 'error' : ''}`}
            disabled={field.disabled}
          />
        );
        
      case 'radio':
        return (
          <div className="radio-group">
            {field.options.map(option => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  onBlur={() => onBlur(field.name)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      // Input fichier
      case 'file':
        return (
          <input
            type="file"
            id={field.name}
            name={field.name}
            onChange={handleFileChange}
            onBlur={() => onBlur(field.name)}
            accept={field.accept}
            className={`form-field file ${error && touched ? 'error' : ''}`}
            disabled={field.disabled}
          />
        );

      // Si le type est inconnu : nada
      default:
        return null;
    }
  };

  // Rendu global avec label, input, messages d'erreur et texte d'aide
  const renderFieldContent = () => {
    if (field.type === 'checkbox') {
      return (
        <label htmlFor={field.name} className="checkbox-label">
          {renderInput()}
          <span className="checkbox-text">
            {field.label}
            {field.required && <span className="required-asterisk">*</span>}
          </span>
        </label>
      );
    }

    return (
      <>
        <label htmlFor={field.name} className="field-label">
          {field.label}
          {field.required && <span className="required-asterisk">*</span>}
        </label>
        {renderInput()}
      </>
    );
  };

  return (
    <div className={`form-field-container ${field.type}-container`}>
      {renderFieldContent()}
      {/* Message d'erreur si le champ a été touché */}
      {error && touched && <div className="error-message">{error}</div>}
      {/* Petit texte d’aide, genre “Entrez votre email pro…” */}
      {field.helpText && <div className="help-text">{field.helpText}</div>}
    </div>
  );
};

FormField.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  touched: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default FormField;
