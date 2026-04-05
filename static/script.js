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

    /* --- 3D CARD SLIDER LOGIC --- */
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide-item');
        const nextBtn = container.querySelector('.next-btn');
        const prevBtn = container.querySelector('.prev-btn');

        if (slides.length > 0 && nextBtn && prevBtn) {
            let currentIndex = 0;
            updateSlider();

            function updateSlider() {
                slides.forEach(slide => {
                    slide.classList.remove('active', 'prev', 'next');
                    slide.style.opacity = '0'; 
                    slide.style.zIndex = '0';
                });

                let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                let nextIndex = (currentIndex + 1) % slides.length;

                // Active
                slides[currentIndex].classList.add('active');
                slides[currentIndex].style.opacity = '1';
                slides[currentIndex].style.zIndex = '10';
                
                // Prev
                slides[prevIndex].classList.add('prev');
                slides[prevIndex].style.opacity = '0.6';
                slides[prevIndex].style.zIndex = '5';
                
                // Next
                slides[nextIndex].classList.add('next');
                slides[nextIndex].style.opacity = '0.6';
                slides[nextIndex].style.zIndex = '5';
            }

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });
        }
    });

    /* --- TYPING EFFECT --- */
    const typeSpan = document.querySelector('.typewriter');
    if (typeSpan) {
        const textArray = ["Web Developer", "Programmer", "Graphic Designer", "Software Engineer", "Ethical Hacker", "Tech Enthusiast"];
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

    /* --- SCROLL ANIMATIONS (SECTIONS & SKILLS) --- */
    
    // 1. Pop-up animation for all sections
    const allSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show-section');
            } else {
                // Remove the class when scrolled out of view so it animates again when scrolling back
                entry.target.classList.remove('show-section');
            }
        });
    }, { threshold: 0.15 }); // Triggers when 15% of the section is visible

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
                    // Remove class to reset widths back to 0 when scrolled away
                    entry.target.classList.remove('show-animate');
                }
            });
        }, { threshold: 0.3 }); // Triggers when 30% of the skills section is visible
        
        skillObserver.observe(skillSection);
    }
});