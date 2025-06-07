 Formulaire Dynamique

Un package React moderne pour créer des formulaires dynamiques avec validation et support de tous types de champs.

 🚀 Fonctionnalités

- ✅  Formulaires dynamiques  basés sur une configuration JSON
- ✅  Validation complète  avec messages d'erreur personnalisés
- ✅  Support TypeScript  avec types inclus
- ✅  Tous types de champs  : text, email, password, number, select, checkbox, radio, file, range, textarea, etc.
- ✅  Aperçu d'images  pour les champs de fichiers
- ✅  Icônes personnalisées  pour chaque champ
- ✅  Responsive  et accessible
- ✅  Compatible  avec React 16.8+, Next.js, Vite, Create React App

 📦 Installation

```bash
npm install formulaire-dynamique
 ou
yarn add formulaire-dynamique
 ou
pnpm add formulaire-dynamique
```

 🎯 Utilisation de base

 1. Importation

```javascript
import DynamicForm from 'formulaire-dynamique';
import 'formulaire-dynamique/dist/styles.css';
```

 2. Configuration du formulaire

```javascript
const formConfig = {
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'votre@email.com',
      validation: {
        required: true,
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        patternMessage: 'Veuillez entrer un email valide'
      }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Mot de passe',
      required: true,
      validation: {
        required: true,
        minLength: 8,
        minLengthMessage: 'Le mot de passe doit contenir au moins 8 caractères'
      }
    },
    {
      name: 'age',
      type: 'number',
      label: 'Âge',
      validation: {
        min: 18,
        max: 120,
        minMessage: 'Vous devez avoir au moins 18 ans'
      }
    }
  ],
  validateOnChange: true,
  validateOnBlur: true,
  submitButton: {
    text: 'Créer mon compte'
  }
};
```

 3. Utilisation du composant

```javascript
function App() {
  const handleSubmit = (data) => {
    console.log('Données du formulaire:', data);
    // Traiter les données
  };

  return (
    <div>
      <h1>Inscription</h1>
      <DynamicForm 
        config={formConfig} 
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

 📋 Types de champs supportés

 Champs texte
```javascript
{
  name: 'nom',
  type: 'text', // 'email', 'password', 'tel', 'url'
  label: 'Nom complet',
  placeholder: 'Entrez votre nom',
  icon: 'fas fa-user' // Icône Font Awesome
}
```

 Champs numériques
```javascript
{
  name: 'prix',
  type: 'number',
  label: 'Prix',
  validation: {
    min: 0,
    max: 1000
  }
}
```

 Champs de sélection
```javascript
{
  name: 'pays',
  type: 'select',
  label: 'Pays',
  options: [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' }
  ]
}
```

 Cases à cocher
```javascript
{
  name: 'accepte_conditions',
  type: 'checkbox',
  label: 'J\'accepte les conditions d\'utilisation',
  required: true
}
```

 Boutons radio
```javascript
{
  name: 'genre',
  type: 'radio',
  label: 'Genre',
  options: [
    { value: 'homme', label: 'Homme' },
    { value: 'femme', label: 'Femme' },
    { value: 'autre', label: 'Autre' }
  ]
}
```

 Champs de fichiers
```javascript
{
  name: 'photo',
  type: 'file',
  label: 'Photo de profil',
  accept: 'image/*',
  previewWidth: '200px',
  previewHeight: '200px',
  validation: {
    required: true,
    accept: 'image/*',
    maxSize: 5242880 // 5MB
  }
}
```

 Champs de plage (range)
```javascript
{
  name: 'satisfaction',
  type: 'range',
  label: 'Niveau de satisfaction',
  min: 1,
  max: 10,
  step: 1,
  defaultValue: 5
}
```

 🔧 Validation

 Règles de validation disponibles

```javascript
validation: {
  required: true,
  requiredMessage: 'Ce champ est obligatoire',
  minLength: 3,
  maxLength: 50,
  minLengthMessage: 'Minimum 3 caractères',
  maxLengthMessage: 'Maximum 50 caractères',
  pattern: '^[A-Za-z]+$',
  patternMessage: 'Seules les lettres sont autorisées',
  min: 0,
  max: 100,
  minMessage: 'Valeur minimale : 0',
  maxMessage: 'Valeur maximale : 100'
}
```

 Validation personnalisée

```javascript
const customValidation = {
  email: (value) => {
    if (value && value.includes('example.com')) {
      return 'Les emails example.com ne sont pas autorisés';
    }
    return null;
  },
  password: (value) => {
    if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }
    return null;
  }
};

<DynamicForm 
  config={formConfig} 
  onSubmit={handleSubmit}
  customValidation={customValidation}
/>
```

 🎨 Personnalisation CSS

Le package inclut des styles CSS par défaut que vous pouvez importer :

```javascript
import 'formulaire-dynamique/dist/styles.css';
```

 Classes CSS principales

```css
.dynamic-form { /* Conteneur du formulaire */ }
.form-field-container { /* Conteneur de chaque champ */ }
.field-label { /* Labels des champs */ }
.form-field { /* Champs de saisie */ }
.form-field.error { /* Champs en erreur */ }
.error-message { /* Messages d'erreur */ }
.form-submit-button { /* Bouton de soumission */ }
```

 Personnalisation avec CSS custom

```css
.dynamic-form {
  --primary-color: #007bff;
  --error-color: #dc3545;
  --border-radius: 8px;
}

.form-field {
  border-radius: var(--border-radius);
  border: 2px solid #e9ecef;
  transition: border-color 0.3s ease;
}

.form-field:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
```

 🔗 Compatibilité

 Frameworks supportés

- ✅  Create React App  (v5+)
- ✅  Next.js  (v12+)
- ✅  Vite  (v3+)
- ✅  Remix  (v1+)
- ✅  Gatsby  (v4+)

 Versions React supportées

- ✅ React 16.8+ (Hooks requis)
- ✅ React 17.x
- ✅ React 18.x
- ✅ React 19.x

 Exemples d'intégration

 Next.js
```javascript
// pages/contact.js ou app/contact/page.js
import DynamicForm from 'formulaire-dynamique';
import 'formulaire-dynamique/dist/styles.css';

export default function Contact() {
  const handleSubmit = async (data) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('Message envoyé !');
    }
  };

  return (
    <div>
      <DynamicForm config={formConfig} onSubmit={handleSubmit} />
    </div>
  );
}
```

 Vite
```javascript
// src/components/ContactForm.jsx
import DynamicForm from 'formulaire-dynamique';
import 'formulaire-dynamique/dist/styles.css';

export default function ContactForm() {
  // Configuration et logique du formulaire
  return <DynamicForm config={formConfig} onSubmit={handleSubmit} />;
}
```

 📚 API Référence

 Props du composant DynamicForm

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `config` | `Object` | ✅ | Configuration du formulaire |
| `onSubmit` | `Function` | ✅ | Fonction appelée lors de la soumission |
| `customValidation` | `Object` | ❌ | Fonctions de validation personnalisées |
| `className` | `String` | ❌ | Classe CSS personnalisée |

 Configuration du formulaire

```javascript
const config = {
  fields: [/* Array des champs */],
  validateOnChange: true, // Valider lors de la saisie
  validateOnBlur: true,   // Valider lors de la perte de focus
  disableSubmitOnError: true, // Désactiver le bouton si erreurs
  submitButton: {
    text: 'Envoyer' // Texte du bouton de soumission
  }
};
```

 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez consulter le [guide de contribution](CONTRIBUTING.md).

 📄 Licence

MIT © François EDEGNON

 🐛 Signaler un problème

Si vous rencontrez un problème, n'hésitez pas à [créer une issue](https://github.com/edegnon/formulaire-dynamique/issues).

