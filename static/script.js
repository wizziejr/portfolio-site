// 1. Toggle Navbar on Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a'); 

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Toggle the menu visibility
        navLinks.classList.toggle('active');
        
        // Toggle the icon between Bars and Times (X)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            // Reset the icon back to bars
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// 2. Typing Effect for Hero Section
const typeSpan = document.querySelector('.typewriter');
if (typeSpan) {
    const textArray = ["Web Developer", "Programmer", "Tech Enthusiast", "Problem Solver"];
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
    }, { threshold: 0.3 });

    observer.observe(skillSection);
}
