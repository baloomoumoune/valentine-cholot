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
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Récupération des données du formulaire avec FormData
        const formData = new FormData(this);
        const templateParams = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || 'Non renseigné',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };

        try {
            console.log('Envoi du formulaire de contact...');
            console.log('Service ID:', EMAILJS_SERVICE_ID);
            console.log('Template ID:', EMAILJS_CONTACT_TEMPLATE_ID);
            console.log('Données à envoyer:', templateParams);
            console.log('FormData brute:', Array.from(formData.entries()));
            
            // Envoi avec EmailJS en utilisant les paramètres du template
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID, 
                EMAILJS_CONTACT_TEMPLATE_ID, 
                templateParams
            );
            console.log('Réponse EmailJS:', response);
            console.log('Email envoyé avec succès !');
            
            showSuccessMessage('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
            
        } catch (error) {
            console.error('Erreur complète:', error);
            console.error('Message d\'erreur:', error.text || error.message);
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
    devisForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Récupération des services sélectionnés
        const services = Array.from(this.querySelectorAll('input[name="service"]:checked'))
            .map(checkbox => checkbox.value)
            .join(', ');

        // Récupération de toutes les données du formulaire
        const formData = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            phone: this.phone.value,
            company: this.company.value || 'Non renseigné',
            services: services || 'Aucun service sélectionné',
            budget: this.budget.value,
            deadline: this.deadline.value,
            projectType: this.projectType.value || 'Non précisé',
            projectDescription: this.projectDescription.value,
            objectives: this.objectives.value || 'Non renseigné',
            additionalInfo: this.additionalInfo.value || 'Non renseigné',
            howDidYouHear: this.howDidYouHear.value || 'Non renseigné'
        };

        // Validation des services
        if (!services) {
            showErrorMessage('Veuillez sélectionner au moins un service.');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        try {
            console.log('Envoi du formulaire de devis...');
            console.log('Service ID:', EMAILJS_SERVICE_ID);
            console.log('Template ID:', EMAILJS_DEVIS_TEMPLATE_ID);
            console.log('Données:', formData);
            
            // Envoi avec EmailJS
            const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_DEVIS_TEMPLATE_ID, formData);
            console.log('Réponse EmailJS:', response);
            
            showSuccessMessage('Votre demande de devis a été envoyée avec succès ! Je vous répondrai sous 24-48h avec une proposition personnalisée.');
            this.reset();
            
        } catch (error) {
            console.error('Erreur complète:', error);
            console.error('Message d\'erreur:', error.text || error.message);
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
