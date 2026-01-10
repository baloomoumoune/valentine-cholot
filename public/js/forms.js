// Encapsulation pour éviter les conflits de variables globales
(function() {
    'use strict';
    
    // Configuration EmailJS
    const EMAILJS_PUBLIC_KEY = '3Xg5g4DwqrQ8bG5Cs';
    const EMAILJS_SERVICE_ID = 'service_ln1kr8i';
    const EMAILJS_CONTACT_TEMPLATE_ID = 'template_cagvbhw';
    const EMAILJS_DEVIS_TEMPLATE_ID = 'template_s1c7ykt';

    // Initialisation EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error('EmailJS n\'est pas chargé !');
    }

    // Fonction pour afficher un message de succès
    function showSuccessMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Fonction pour afficher un message d'erreur
    function showErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #f44336;
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Stockage temporaire des valeurs
        const formValues = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        };

        // Écouter les changements dans les champs en temps réel
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                formValues[this.name] = this.value;
            });
        });

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopPropagation();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Utiliser les valeurs stockées
        const templateParams = {
            name: formValues.name || '',
            email: formValues.email || '',
            phone: formValues.phone || 'Non renseigné',
            subject: formValues.subject || '',
            message: formValues.message || ''
        };

        try {
            
            // Envoi avec EmailJS en utilisant les paramètres du template
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID, 
                EMAILJS_CONTACT_TEMPLATE_ID, 
                templateParams
            );
            
            showSuccessMessage('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
            // Réinitialiser aussi le stockage
            Object.keys(formValues).forEach(key => formValues[key] = '');
            
        } catch (error) {
            showErrorMessage('Erreur: ' + (error.text || error.message || 'Problème d\'envoi. Contactez-moi directement par email.'));
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Gestion du formulaire de devis
const devisForm = document.getElementById('devisForm');
if (devisForm) {
    // Stockage temporaire des valeurs
    const devisValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        services: [],
        budget: '',
        deadline: '',
        projectType: '',
        projectDescription: '',
        objectives: '',
        additionalInfo: '',
        howDidYouHear: ''
    };

    // Écouter les changements dans les champs texte en temps réel
    devisForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            devisValues[this.name] = this.value;
        });
        input.addEventListener('change', function() {
            devisValues[this.name] = this.value;
        });
    });

    // Écouter les changements dans les checkboxes des services
    devisForm.querySelectorAll('input[name="service"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            devisValues.services = Array.from(devisForm.querySelectorAll('input[name="service"]:checked'))
                .map(cb => cb.value);
        });
    });

    devisForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Récupération des services sélectionnés depuis le stockage
        const servicesString = devisValues.services.length > 0 ? devisValues.services.join(', ') : 'Aucun service sélectionné';

        // Validation des services
        if (devisValues.services.length === 0) {
            showErrorMessage('Veuillez sélectionner au moins un service.');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        // Utiliser les valeurs stockées
        const templateParams = {
            firstName: devisValues.firstName || '',
            lastName: devisValues.lastName || '',
            email: devisValues.email || '',
            phone: devisValues.phone || '',
            company: devisValues.company || 'Non renseigné',
            services: servicesString,
            budget: devisValues.budget || '',
            deadline: devisValues.deadline || '',
            projectType: devisValues.projectType || 'Non précisé',
            projectDescription: devisValues.projectDescription || '',
            objectives: devisValues.objectives || 'Non renseigné',
            additionalInfo: devisValues.additionalInfo || 'Non renseigné',
            howDidYouHear: devisValues.howDidYouHear || 'Non renseigné'
        };

        try {
            
            // Envoi avec EmailJS
            const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_DEVIS_TEMPLATE_ID, templateParams);
            
            showSuccessMessage('Votre demande de devis a été envoyée avec succès ! Je vous répondrai sous 24-48h avec une proposition personnalisée.');
            this.reset();
            // Réinitialiser le stockage
            Object.keys(devisValues).forEach(key => {
                if (key === 'services') {
                    devisValues[key] = [];
                } else {
                    devisValues[key] = '';
                }
            });
            
        } catch (error) {
            showErrorMessage('Erreur: ' + (error.text || error.message || 'Problème d\'envoi. Contactez-moi directement.'));
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

    // Animations pour les messages
    const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
    document.head.appendChild(style);

    console.log('📧 Formulaires EmailJS initialisés et prêts !');

})(); // Fin de l'encapsulation IIFE
