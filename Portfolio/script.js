// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init Typewriter
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typewriter');
    const words = ['Full Stack Developer', 'Frontend Developer','Backend Developer' ,'Problem Solver'];
    const wait = 3000;
    new TypeWriter(txtElement, words, wait);
}

// Stats Counter Animation
const stats = document.querySelectorAll('.number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 200;

    const updateCount = () => {
        const count = parseInt(stat.innerText);
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 5);
        } else {
            stat.innerText = target;
        }
    };

    updateCount();
});

// Project Filtering and Animation
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectGrid = document.querySelector('.project-grid');
const viewButtons = document.querySelectorAll('.view-btn');
const modal = document.querySelector('.project-modal');
const modalContent = modal.querySelector('.modal-content');
const closeModal = modal.querySelector('.close-modal');

// Filter Projects
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(',');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Toggle View
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (button.classList.contains('list-view')) {
            projectGrid.classList.add('list-view');
        } else {
            projectGrid.classList.remove('list-view');
        }
    });
});

// Project Details Modal
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const tags = Array.from(card.querySelectorAll('.project-tags span'))
            .map(tag => tag.textContent)
            .join(', ');

        modalContent.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
            <div class="modal-tags">
                <h3>Technologies Used:</h3>
                <p>${tags}</p>
            </div>
            <!-- Add more project details here -->
        `;

        modal.classList.add('active');
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Add animation delay to project cards
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
});

// Intersection Observer for project cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => observer.observe(card));

// Form Validation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        removeError(name);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        removeError(email);
    }

    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    } else {
        removeError(message);
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        form.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.innerText = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Scroll to Top Button
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (menuBtn.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Add this at the end of your script.js file

// Initialize Tilt.js for stat circles
VanillaTilt.init(document.querySelectorAll('.stat-item'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.3
});

// Animate tech stack icons on scroll
const techIcons = document.querySelectorAll('.tech-icons i');
techIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 100}ms`;
});

// Add floating animation to shapes
const shapes = document.querySelectorAll('.shape');
shapes.forEach(shape => {
    shape.style.animationDelay = `${Math.random() * 2}s`;
});

// Skill Progress Animation
const skillItems = document.querySelectorAll('.skill-item');

const observerOptions = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            const percentage = entry.target.querySelector('.percentage').textContent;
            progressBar.style.setProperty('--progress-width', percentage);
            progressBar.classList.add('progress-animate');
            
            // Animate the percentage number
            const percentValue = parseInt(percentage);
            const percentageSpan = entry.target.querySelector('.percentage');
            let currentValue = 0;
            const duration = 1500;
            const increment = percentValue / (duration / 16);
            
            const updatePercentage = () => {
                if (currentValue < percentValue) {
                    currentValue += increment;
                    percentageSpan.textContent = `${Math.min(Math.round(currentValue), percentValue)}%`;
                    requestAnimationFrame(updatePercentage);
                }
            };
            
            requestAnimationFrame(updatePercentage);
        }
    });
}, observerOptions);

skillItems.forEach(item => skillObserver.observe(item));

// Initialize VanillaTilt for 3D hover effects
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Animate stat circles
const statCircles = document.querySelectorAll('.stat-circle');
statCircles.forEach(circle => {
    const circleFill = circle.querySelector('.circle-fill');
    const number = circle.querySelector('.number');
    const targetValue = parseInt(number.getAttribute('data-target'));
    
    // Animate the circle fill
    circleFill.style.strokeDashoffset = 0;
    
    // Animate the number
    let currentValue = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    
    const updateNumber = () => {
        if (currentValue < targetValue) {
            currentValue += increment;
            number.textContent = Math.min(Math.round(currentValue), targetValue);
            requestAnimationFrame(updateNumber);
        }
    };
    
    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(updateNumber);
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(circle);
});

// Typing effect for bio text
const bioText = document.querySelector('.typing-text');
const text = bioText.textContent;
bioText.textContent = '';
let charIndex = 0;

function typeText() {
    if (charIndex < text.length) {
        bioText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}

const bioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(typeText, 500);
            bioObserver.unobserve(entry.target);
        }
    });
});

bioObserver.observe(bioText);