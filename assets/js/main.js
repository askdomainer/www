
/**
 * askDomainer.com - Main JavaScript File
 * This file handles all interactive elements on the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initContactForm();
    initFAQAccordion();
    initSmoothScroll();
    initLanguageSwitcher();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle('active');
            this.setAttribute('aria-expanded',
                this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav ul');
        const navToggle = document.querySelector('.nav-toggle');

        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Basic form validation
            if (!validateForm(contactForm)) {
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Collect form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simulate form submission (replace with actual API endpoint)
            setTimeout(function() {
                // In a real implementation, you would use fetch() to submit to your backend
                console.log('Form data:', formObject);

                // Show success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <h3>Thank you for your message!</h3>
                        <p>We've received your inquiry and will get back to you shortly.</p>
                    </div>
                `;

                // In a real implementation, you would handle errors as well
            }, 1500);
        });
    }
}

/**
 * Form Validation
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    // Reset previous error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());

    // Check each required field
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showError(field, 'This field is required');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showError(field, 'Please enter a valid email address');
        }
    });

    return isValid;
}

/**
 * Show error message for a form field
 */
function showError(field, message) {
    // Remove any existing error for this field
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);

    // Highlight the field
    field.classList.add('error');

    // Remove error styling when user corrects the field
    field.addEventListener('input', function() {
        this.classList.remove('error');
        const error = this.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }, { once: true });
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('h4');

            if (question) {
                question.addEventListener('click', () => {
                    // Toggle current item
                    item.classList.toggle('active');

                    // Optional: close other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                });
            }
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL but without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Language Switcher
 */
function initLanguageSwitcher() {
    const languageSwitcher = document.querySelector('.language-switcher');

    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            const selectedLanguage = this.value;
            const currentPath = window.location.pathname;

            // Extract the current page name
            const pathParts = currentPath.split('/');
            const pageName = pathParts[pathParts.length - 1] || 'index.html';

            // Construct the new URL based on selected language
            let newPath;
            if (selectedLanguage === 'en') {
                newPath = `/en/${pageName}`;
            } else if (selectedLanguage === 'pl') {
                newPath = `/pl/${pageName}`;
            }

            // Redirect to the translated page
            if (newPath) {
                window.location.href = newPath;
            }
        });
    }
}

/**
 * Testimonial Slider
 * Initialize if present on the page
 */
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');

    if (testimonialContainer) {
        const testimonials = testimonialContainer.querySelectorAll('.testimonial');
        const totalTestimonials = testimonials.length;
        let currentIndex = 0;

        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => {
                goToTestimonial(i);
            });
            dotsContainer.appendChild(dot);
        }

        testimonialContainer.appendChild(dotsContainer);

        // Create prev/next buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-nav prev';
        prevButton.innerHTML = '&lsaquo;';
        prevButton.addEventListener('click', () => {
            goToTestimonial((currentIndex - 1 + totalTestimonials) % totalTestimonials);
        });

        const nextButton = document.createElement('button');
        nextButton.className = 'slider-nav next';
        nextButton.innerHTML = '&rsaquo;';
        nextButton.addEventListener('click', () => {
            goToTestimonial((currentIndex + 1) % totalTestimonials);
        });

        testimonialContainer.appendChild(prevButton);
        testimonialContainer.appendChild(nextButton);

        // Function to show a specific testimonial
        function goToTestimonial(index) {
            testimonials[currentIndex].style.display = 'none';
            dotsContainer.children[currentIndex].classList.remove('active');

            currentIndex = index;

            testimonials[currentIndex].style.display = 'block';
            dotsContainer.children[currentIndex].classList.add('active');
        }

        // Auto-advance the slider every 5 seconds
        setInterval(() => {
            goToTestimonial((currentIndex + 1) % totalTestimonials);
        }, 5000);
    }
}

/**
 * Lazy Loading for Images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');

        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Call additional initializations that weren't included in the DOMContentLoaded event
initTestimonialSlider();
initLazyLoading();
