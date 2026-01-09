# Guide de configuration EmailJS

## 📧 Configuration des formulaires avec EmailJS

Votre site est prêt, mais les formulaires nécessitent EmailJS pour fonctionner. Voici comment configurer :

### 1. Créer un compte EmailJS (GRATUIT)

1. Allez sur [https://www.emailjs.com](https://www.emailjs.com)
2. Cliquez sur "Sign Up" et créez votre compte gratuit
3. Confirmez votre email

### 2. Configurer EmailJS

#### Étape 1 : Ajouter un service d'email
1. Dans le dashboard, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez Gmail (ou autre service)
4. Connectez votre compte Gmail (valentine.cholot@gmail.com)
5. Notez le **Service ID** (ex: service_abc123)

#### Étape 2 : Créer les templates d'email

**Template 1 - Contact :**
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Nom : "Contact Form"
4. Copiez ce contenu dans le template :

```
Subject: Nouveau message de {{name}}

De: {{name}}
Email: {{email}}
Téléphone: {{phone}}
Sujet: {{subject}}

Message:
{{message}}
```

5. Notez le **Template ID** (ex: template_contact123)

**Template 2 - Demande de devis :**
1. Créez un nouveau template
2. Nom : "Demande de devis"
3. Copiez ce contenu :

```
Subject: Nouvelle demande de devis - {{firstName}} {{lastName}}

INFORMATIONS CLIENT
Nom: {{firstName}} {{lastName}}
Email: {{email}}
Téléphone: {{phone}}
Entreprise: {{company}}

PROJET
Services demandés: {{services}}
Budget: {{budget}}
Délai: {{deadline}}
Type de projet: {{projectType}}

DESCRIPTION
{{projectDescription}}

OBJECTIFS
{{objectives}}

INFORMATIONS COMPLÉMENTAIRES
{{additionalInfo}}

Source: {{howDidYouHear}}
```

4. Notez le **Template ID** (ex: template_devis123)

#### Étape 3 : Récupérer la clé publique
1. Allez dans "Account" > "General"
2. Copiez votre **Public Key** (ex: abc123xyz456)

### 3. Configurer le site

Ouvrez le fichier `public/js/forms.js` et remplacez :

```javascript
const EMAILJS_PUBLIC_KEY = 'VOTRE_CLE_PUBLIQUE_ICI';
const EMAILJS_SERVICE_ID = 'VOTRE_SERVICE_ID_ICI';
const EMAILJS_CONTACT_TEMPLATE_ID = 'VOTRE_TEMPLATE_CONTACT_ICI';
const EMAILJS_DEVIS_TEMPLATE_ID = 'VOTRE_TEMPLATE_DEVIS_ICI';
```

Par vos vraies valeurs, par exemple :

```javascript
const EMAILJS_PUBLIC_KEY = 'abc123xyz456';
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_contact123';
const EMAILJS_DEVIS_TEMPLATE_ID = 'template_devis123';
```

### 4. Activer EmailJS

Dans le fichier `public/js/forms.js`, décommentez la ligne :

```javascript
// emailjs.init(EMAILJS_PUBLIC_KEY);
```

Devient :

```javascript
emailjs.init(EMAILJS_PUBLIC_KEY);
```

Puis dans les fonctions d'envoi, décommentez les blocs EmailJS et commentez les versions de démonstration.

### 5. Ajouter le script EmailJS

Ajoutez cette ligne dans `contact.html` et `devis.html` AVANT `</head>` :

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

### 6. Tester

1. Ouvrez votre site
2. Remplissez un formulaire
3. Vérifiez votre boîte mail !

## 🎯 Limites du plan gratuit

- **200 emails/mois** (largement suffisant pour démarrer)
- Si besoin de plus, plan payant à partir de 7$/mois

## ✅ Alternative : Formspree

Si vous préférez Formspree (plus simple mais moins personnalisable) :

1. Créez un compte sur [https://formspree.io](https://formspree.io)
2. Créez deux formulaires (contact + devis)
3. Remplacez dans les HTML :
   - `id="contactForm"` par `action="https://formspree.io/f/VOTRE_ID" method="POST"`
   - `id="devisForm"` par `action="https://formspree.io/f/VOTRE_ID" method="POST"`

## 📞 Besoin d'aide ?

Contactez-moi si vous avez des questions !
