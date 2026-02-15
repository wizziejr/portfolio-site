document.addEventListener('DOMContentLoaded', () => {
    /* --- MOBILE MENU TOGGLE --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // 1. Toggle the menu
            navLinks.classList.toggle('active');

            // 2. Toggle the icon (Bars <-> X)
            const icon = hamburger.querySelector('i');
            if (icon) {
                // If menu is now open, show 'X', otherwise show 'Bars'
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

    // Close menu when a link is clicked (UX best practice)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset icon to bars
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    /* --- 3D CARD SLIDER LOGIC --- */
    const slides = document.querySelectorAll('.slide-item');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (slides.length > 0 && nextBtn && prevBtn) {
        let currentIndex = 0;

        // Initialize positions
        updateSlider();

        function updateSlider() {
            // Remove all classes first
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev', 'next');
                // Ensure hidden slides stay hidden in back
                slide.style.opacity = '0'; 
                slide.style.zIndex = '0';
            });

            // Handle Index Wrap-around
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            let nextIndex = (currentIndex + 1) % slides.length;

            // Assign Classes
            slides[currentIndex].classList.add('active');
            slides[currentIndex].style.opacity = '1';
            
            slides[prevIndex].classList.add('prev');
            slides[prevIndex].style.opacity = '0.6';
            
            slides[nextIndex].classList.add('next');
            slides[nextIndex].style.opacity = '0.6';
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
        
        // Optional: Auto-play
        setInterval(() => {
           // Uncomment next line to enable auto-scroll
           // nextBtn.click();
        }, 5000);
    }

    /* --- TYPING EFFECT --- */
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
        type();
    }

    /* --- SCROLL ANIMATION --- */
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
});