 document.addEventListener('DOMContentLoaded', () => {
            /* --- MOBILE MENU TOGGLE --- */
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navItems = document.querySelectorAll('.nav-links li a');

            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        if (navLinks.classList.contains('active')) {
                            icon.classList.remove('fa-bars');
                            icon.classList.add('fa-times');
                        } else {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                });
            }

            // Close menu when a link is clicked
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const icon = hamburger.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                });
            });

            /* --- TYPING EFFECT --- */
            const typeSpan = document.querySelector('.typewriter');
            if (typeSpan) {
                // Added "Full Stack Developer" to the array as requested
                const textArray = ["Full Stack Developer", "Web Developer", "Programmer", "Graphic Designer", "Software Engineer", "Ethical Hacker", "Tech Enthusiast"];
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
                type();
            }

            /* --- SCROLL ANIMATIONS (SECTIONS & SKILLS POP FROM SIDES) --- */
            
            // 1. Pop-up animation from the left and right for all sections
            const allSections = document.querySelectorAll('section');
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('show-section');
                    } else {
                        entry.target.classList.remove('show-section');
                    }
                });
            }, { threshold: 0.15 }); 

            allSections.forEach(section => {
                sectionObserver.observe(section);
            });

            // 2. Progress Bar animation for Skills section
            const skillSection = document.querySelector('.skills');
            if (skillSection) {
                const skillObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if(entry.isIntersecting) {
                            entry.target.classList.add('show-animate');
                        } else {
                            entry.target.classList.remove('show-animate');
                        }
                    });
                }, { threshold: 0.3 }); 
                
                skillObserver.observe(skillSection);
            }
        });