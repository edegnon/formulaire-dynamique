import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import { validateField, validateForm } from './validators';

const DynamicForm = ({ config, onSubmit, customValidation = {}, className }) => {
  // Fonction pour définir la valeur par défaut d’un champ, selon son type
  const getDefaultValue = (field) => {
    if (field.defaultValue !== undefined) return field.defaultValue;

    switch (field.type) {
      case 'checkbox': return false;
      case 'file': return null;
      case 'number': return '';
      case 'range': return field.min || 0;
      default: return '';
    }
  };

  // Initialisation des données du formulaire avec les valeurs par défaut
  const initialData = {};
  if (config.fields && Array.isArray(config.fields)) {
    config.fields.forEach(field => {
      initialData[field.name] = getDefaultValue(field);
    });
  }

  const [formData, setFormData] = useState(initialData); 
  const [errors, setErrors] = useState({}); 
  const [touched, setTouched] = useState({}); 

  // Gère les changements de valeur dans les champs
  const handleChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));

    if (config.validateOnChange) {
      const fieldConfig = config.fields.find(f => f.name === name);
      if (fieldConfig) {
        const error = validateField(
          name,
          value,
          fieldConfig.validation,
          customValidation
        );
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  }, [config.validateOnChange, config.fields, customValidation]);

  // Gère le "blur" (quand un champ perd le focus)
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    if (config.validateOnBlur) {
      const fieldConfig = config.fields.find(f => f.name === name);
      if (fieldConfig) {
        const error = validateField(
          name,
          formData[name],
          fieldConfig.validation,
          customValidation
        );
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  }, [config.validateOnBlur, config.fields, formData, customValidation]);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Marquer tous les champs comme "touchés"
    const allTouched = {};
    config.fields.forEach(field => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    // Validation globale du formulaire
    const formErrors = validateForm(
      formData,
      config.fields,
      customValidation
    );

    setErrors(formErrors);

    // S’il n’y a pas d’erreurs, on envoie les données au parent
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  };

  // Cas où la config est invalide
  if (!config.fields || !Array.isArray(config.fields)) {
    return <div className="form-error">La configuration du formulaire est invalide.</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`dynamic-form ${className || ''}`}
      noValidate
    >
      {config.fields.map(field => (
        <FormField
          key={field.name}
          field={field}
          value={formData[field.name]}
          error={errors[field.name]}
          touched={touched[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ))}

      <button
        type="submit"
        className="form-submit-button"
        disabled={config.disableSubmitOnError && Object.keys(errors).some(key => errors[key])}
      >
        {config.submitButton?.text || 'Envoyer'}
      </button>
    </form>
  );
};

// Définition des types de props pour la sécurité et la lisibilité
DynamicForm.propTypes = {
  config: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    validateOnChange: PropTypes.bool,
    validateOnBlur: PropTypes.bool,
    disableSubmitOnError: PropTypes.bool,
    submitButton: PropTypes.shape({
      text: PropTypes.string
    })
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  customValidation: PropTypes.object,
  className: PropTypes.string
};

export default DynamicForm;
