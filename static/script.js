 document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const year = document.getElementById('year');

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger?.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });

    const typeSpan = document.querySelector('.typewriter');
    if (typeSpan) {
        const textArray = ['Secure Web Development', 'Ethical Hacking', 'Cybersecurity Consulting', 'Modern UI/UX Delivery'];
        let textIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textIndex].length) {
                typeSpan.textContent += textArray[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 80);
            } else {
                setTimeout(erase, 1800);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typeSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 45);
            } else {
                textIndex = (textIndex + 1) % textArray.length;
                setTimeout(type, 350);
            }
        }

        type();
    }

    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
                const id = entry.target.getAttribute('id');
                navLinksList.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach((section) => observer.observe(section));
});