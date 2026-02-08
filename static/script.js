// 1. Toggle Navbar on Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. Typing Effect for Hero Section
const typeSpan = document.querySelector('.typewriter');
if (typeSpan) {
    const textArray = ["Web Developer", "Programmer", "Tech Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textIndex].length) {
            typeSpan.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typeSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex++;
            if (textIndex >= textArray.length) textIndex = 0;
            setTimeout(type, 500);
        }
    }
    document.addEventListener("DOMContentLoaded", type);
}

// 3. Scroll Animation for Skill Bars
const skillSection = document.querySelector('.skills');
if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            }
        });
    });
    observer.observe(skillSection);
}

// ==========================================
// 4. DATABASE & PROJECT RENDER LOGIC
// ==========================================

const defaultProjects = [
    {
        id: 1,
        title: "Black Mafia Family",
        image: "Black-mafia-family.png",
        description: 'A dynamic website platform titled "Fresh Frame / Slime Society" connecting visionary creators with global audiences.',
        link: "https://black-mafia-family.vercel.app/"
    },
    {
        id: 2,
        title: "Ebenezer Guest House",
        image: "Ebenezer.png",
        description: "A hospitality website for Ebenezer Guest House in Lilongwe, featuring room showcases and booking information.",
        link: "https://ebenezer-guest-house.vercel.app/"
    }
];

function initDB() {
    if(!localStorage.getItem('portfolioProjects')) {
        localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects));
    }
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || defaultProjects;

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="btn-small">Visit Website <i class="fas fa-external-link-alt"></i></a>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 5. CONTACT FORM SUBMISSION LOGIC (NEW)
// ==========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Input Values
        const inputs = contactForm.querySelectorAll('input, textarea');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const message = inputs[2].value;

        if(!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Create Message Object
        const newMessage = {
            id: Date.now(),
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString()
        };

        // Save to LocalStorage
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(newMessage);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        alert('Message Sent Successfully!');
        contactForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initDB();
    renderProjects();
});