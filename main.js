// Theme toggling
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile navigation
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.right');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Modal Functionality
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalBody = modal.querySelector('.modal-body');
const closeModal = modal.querySelector('.close-modal');

const projectDetails = {
    1: {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website built with HTML, CSS, and JavaScript. Features include dark/light mode, smooth scrolling, and mobile-first design.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        images: ['project1.jpg'],
        liveLink: '#',
        githubLink: '#'
    },
    2: {
        title: 'Task Manager App',
        description: 'A full-stack task management application with user authentication, task categories, and real-time updates.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        images: ['project2.jpg'],
        liveLink: '#',
        githubLink: '#'
    },
    3: {
        title: 'E-commerce Website',
        description: 'An online store with shopping cart functionality, secure payment processing, and order management.',
        technologies: ['React', 'Redux', 'Stripe'],
        images: ['project3.jpg'],
        liveLink: '#',
        githubLink: '#'
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const project = projectDetails[projectId];
        
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <div class="project-images">
                ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
            </div>
            <div class="project-description">
                <p>${project.description}</p>
                <div class="project-technologies">
                    <h3>Technologies Used:</h3>
                    <div class="project-tags">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-links">
                    <a href="${project.liveLink}" target="_blank" class="btn">View Live</a>
                    <a href="${project.githubLink}" target="_blank" class="btn">View Code</a>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const formGroups = contactForm.querySelectorAll('.form-group');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const error = formGroup.querySelector('.error-message');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
};

const validateField = (input, message) => {
    if (input.value.trim() === '') {
        showError(input, message);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate Name
    const name = document.getElementById('name');
    if (!validateField(name, 'Name is required')) {
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('email');
    if (!validateField(email, 'Email is required')) {
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate Subject
    const subject = document.getElementById('subject');
    if (!validateField(subject, 'Subject is required')) {
        isValid = false;
    }
    
    // Validate Message
    const message = document.getElementById('message');
    if (!validateField(message, 'Message is required')) {
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        contactForm.reset();
    }
});

// Clear errors when typing
formGroups.forEach(formGroup => {
    const input = formGroup.querySelector('input, textarea');
    input.addEventListener('input', () => {
        showSuccess(input);
    });
}); 