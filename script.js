
// ==================================== mobile
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside or on links
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('nav-scroll', window.scrollY > 50);
});
// ==================================== mobile


// =========================================================== digital

// Clone marquee content for seamless loop
const marqueeContent = document.querySelector('.marquee-content');
const clone = marqueeContent.cloneNode(true);
marqueeContent.parentNode.appendChild(clone);

// Optional: Dynamic content update
function updateMarqueeText(newText) {
    const spans = document.querySelectorAll('.marquee-content span');
    spans.forEach(span => {
        span.textContent = newText;
    });
}
// =========================================================== digital


// =========================================================== 2nd

    // Add scroll animation trigger
    window.addEventListener('scroll', function () {
        const elements = document.querySelectorAll('.content > *');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight * 0.8) {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
            }
        });
    });

    // Initialize animations on load
    window.onload = function () {
        window.dispatchEvent(new Event('scroll'));
    };
// =========================================================== 2nd



// ============================================================== main
const imageContainer = document.getElementById('imageContainer');
let isDragging = false;
let startX = 0;
let startY = 0;
let rotateX = 0;
let rotateY = 0;

imageContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;

// Mouse events
imageContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;

    imageContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;

    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch events for mobile
imageContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;

    imageContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

// Parallax effect
document.addEventListener('mousemove', (e) => {
    if (isDragging) return;

    const x = (window.innerWidth - e.pageX) / 50;
    const y = (window.innerHeight - e.pageY) / 50;

    imageContainer.style.backgroundPosition = `${x}% ${y}%`;
});

// ================================================================ main


//============================================================= image slider

        document.addEventListener('DOMContentLoaded', () => {
            const slider = document.querySelector('.slider');
            const bullets = document.querySelectorAll('.bullet');
            const slides = document.querySelectorAll('.slide');
            const totalSlides = slides.length;
            let currentIndex = 0;
            let autoSlideInterval;

            // Remove CSS animation and initialize position
            slider.style.transform = 'translateX(0)';

            function updateBullet(index) {
                bullets.forEach(bullet => bullet.classList.remove('active'));
                bullets[index].classList.add('active');
            }

            function goToSlide(index) {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;
                
                slider.style.transform = `translateX(-${index * 100}%)`;
                currentIndex = index;
                updateBullet(currentIndex);
            }

            function nextSlide() {
                goToSlide(currentIndex + 1);
            }

            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, 3000);
            }

            function initSlider() {
                startAutoSlide();
                
                // Pause on hover
                const container = document.querySelector('.slider-container');
                container.addEventListener('mouseenter', () => {
                    clearInterval(autoSlideInterval);
                });
                
                container.addEventListener('mouseleave', startAutoSlide);
            }

            // Add bullet click handlers
            bullets.forEach((bullet, index) => {
                bullet.addEventListener('click', () => {
                    clearInterval(autoSlideInterval);
                    goToSlide(index);
                    startAutoSlide();
                });
            });

            initSlider();
        });
    
//============================================================= image slider





        const slidesWrapper = document.querySelector('.slides-wrapper');
        const slides = document.querySelectorAll('.slide-4');
        const dotsContainer = document.querySelector('.dots-container');
        let currentSlide = 0;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }

        function updateDots() {
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        document.querySelector('.next').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        });

        document.querySelector('.prev').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        });

        // Auto-rotate with pause on hover
        let autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }, 5000);

        slidesWrapper.addEventListener('mouseenter', () => clearInterval(autoSlide));
        slidesWrapper.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
                updateDots();
            }, 4000);
        });


        // contact

        const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            successMessage.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        });
    


        // count

        
        // Previous counter animation script with added features
        function animateCounter(counterElement) {
            const target = parseInt(counterElement.dataset.target);
            const duration = 2000;
            const startTime = Date.now();
            const startNumber = 0;

            const updateCounter = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentNumber = Math.floor(progress * target);
                counterElement.textContent = currentNumber.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.textContent = target.toLocaleString();
                    counterElement.style.animation = 'glow 1.5s ease-out';
                }
            };

            requestAnimationFrame(updateCounter);
        }

        function initializeCounters() {
            const counters = document.querySelectorAll('.counter-number');
            counters.forEach(counter => {
                counter.textContent = '0';
                animateCounter(counter);
            });
        }

        window.addEventListener('load', initializeCounters);
   