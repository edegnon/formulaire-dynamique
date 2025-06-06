// Valide un champ individuel
export const validateField = (name, value, rules = {}, customValidation = {}) => {
  // D'abord, vérifie s'il y a une fonction de validation custom
  if (customValidation[name]) {
    const customError = customValidation[name](value);
    if (customError) return customError;
  }

  // Vérification du champ requis
  if (rules.required) {
    if (value === null || value === undefined || value === '') {
      return rules.requiredMessage || 'Ce champ est requis.';
    }

    if (Array.isArray(value) && value.length === 0) {
      return rules.requiredMessage || 'Veuillez ajouter au moins un élément.';
    }

    if (value instanceof File && (value.size === 0 || !value.name.trim())) {
      return rules.requiredMessage || 'Un fichier est requis.';
    }
  }

  // Si le champ est vide mais pas requis : aucune erreur
  if (value === null || value === undefined || value === '') {
    return null;
  }

  // Validation des chaînes de caractères
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return rules.minLengthMessage || `Minimum ${rules.minLength} caractères requis.`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.maxLengthMessage || `Maximum ${rules.maxLength} caractères autorisés.`;
    }

    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      return rules.patternMessage || 'Format invalide.';
    }
  }

  // Validation des nombres
  if (typeof value === 'number' || !isNaN(Number(value))) {
    if (rules.min !== undefined && Number(value) < rules.min) {
      return rules.minMessage || `Valeur minimale : ${rules.min}`;
    }

    if (rules.max !== undefined && Number(value) > rules.max) {
      return rules.maxMessage || `Valeur maximale : ${rules.max}`;
    }
  }

  // Validation des fichiers
  if (value instanceof File) {
    if (rules.accept) {
      const acceptedTypes = rules.accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.includes('*')) {
          const baseType = type.split('/')[0];
          return value.type.startsWith(baseType + '/');
        } else if (type.startsWith('.')) {
          return value.name.toLowerCase().endsWith(type.toLowerCase());
        } else {
          return value.type === type;
        }
      });

      if (!isAccepted) {
        return rules.acceptMessage || `Type de fichier non autorisé. Types acceptés : ${rules.accept}`;
      }
    }

    if (rules.maxSize && value.size > rules.maxSize) {
      return rules.maxSizeMessage || `Fichier trop volumineux (max. ${Math.round(rules.maxSize / 1024)} Ko)`;
    }
  }

  // Si tout est OK
  return null;
};

// Valide l'ensemble du formulaire
export const validateForm = (formData, fields, customValidation = {}) => {
  const errors = {};

  fields.forEach(field => {
    const error = validateField(
      field.name,
      formData[field.name],
      field.validation,
      customValidation
    );

    if (error) {
      errors[field.name] = error;
    }
  });

  return errors;
};
