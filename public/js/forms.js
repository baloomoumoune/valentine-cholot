// Configuration EmailJS
const EMAILJS_PUBLIC_KEY = '3Xg5g4DwqrQ8bG5Cs';
const EMAILJS_SERVICE_ID = 'service_ln1kr8i';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_cagvbhw';
const EMAILJS_DEVIS_TEMPLATE_ID = 'template_s1c7ykt';

// Initialisation EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Récupération des données du formulaire
        const formData = {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value || 'Non renseigné',
            subject: this.subject.value,
            message: this.message.value
        };

        try {
            // Envoi avec EmailJS
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, formData);
            showSuccessMessage('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
            
        } catch (error) {
            console.error('Erreur:', error);
            showErrorMessage('Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.');
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
            // Envoi avec EmailJS
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_DEVIS_TEMPLATE_ID, formData);
            showSuccessMessage('Votre demande de devis a été envoyée avec succès ! Je vous répondrai sous 24-48h avec une proposition personnalisée.');
            this.reset();
            
        } catch (error) {
            console.error('Erreur:', error);
            showErrorMessage('Une erreur est survenue. Veuillez réessayer ou me contacter directement.');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
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

console.log('📧 Formulaires prêts ! N\'oubliez pas de configurer EmailJS pour l\'envoi réel des emails.');
