// Menu burger mobile
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.querySelector('.mobile-overlay');
const navLinksItems = document.querySelectorAll('.nav-links a');

function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    burgerMenu.setAttribute('aria-expanded', 
        burgerMenu.classList.contains('active') ? 'true' : 'false'
    );
    
    // Empêcher le scroll du body quand le menu est ouvert
    document.body.style.overflow = burgerMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    burgerMenu.classList.remove('active');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    burgerMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

if (burgerMenu) {
    burgerMenu.addEventListener('click', toggleMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
}

// Fermer le menu quand on clique sur un lien
navLinksItems.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments avec animation
document.querySelectorAll('.service-card, .section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ici vous pouvez ajouter la logique pour envoyer le formulaire
        // Par exemple, une requête fetch vers votre serveur
        
        alert('Merci pour votre message ! Nous vous répondrons bientôt.');
        this.reset();
    });
}

// Effet parallaxe sur le hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('✨ Site-V chargé avec succès !');
