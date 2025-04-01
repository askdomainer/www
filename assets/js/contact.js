/**
 * askDomainer.com - Contact Form JavaScript
 * Handles all contact form functionality including validation, submission, and feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initLanguagePreference();
});

/**
 * Initialize the contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm(contactForm)) {
            submitForm(contactForm);
        }
    });

    // Add input event listeners for real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });

        // Also validate on blur for better UX
        input.addEventListener('blur', function() {
            validateField(this, true);
        });
    });
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    // Validate each required field
    requiredFields.forEach(field => {
        if (!validateField(field, true)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The field to validate
 * @param {boolean} showError - Whether to show error messages
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field, showError = false) {
    // Remove any existing error messages
    removeErrorMessage(field);

    let isValid = true;
    const value = field.value.trim();

    // Check if field is required and empty
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        if (showError) {
            displayErrorMessage(field, 'This field is required');
        }
    }
    // Validate email format if it's an email field
    else if (field.type === 'email' && value !== '' && !isValidEmail(value)) {
        isValid = false;
        if (showError) {
            displayErrorMessage(field, 'Please enter a valid email address');
        }
    }

    // Add or remove error class
    if (!isValid) {
        field.classList.add('error');
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

/**
 * Display an error message for a field
 * @param {HTMLElement} field - The field with the error
 * @param {string} message - The error message to display
 */
function displayErrorMessage(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    // Insert error message after the field
    field.parentNode.appendChild(errorElement);
}

/**
 * Remove error message from a field
 * @param {HTMLElement} field - The field to remove error from
 */
function removeErrorMessage(field) {
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    field.classList.remove('error');
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Submit the form data
 * @param {HTMLFormElement} form - The form to submit
 */
function submitForm(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // In a real implementation, you would send this data to your server
    // For now, we'll simulate a server response

    // Simulate network request
    setTimeout(() => {
        // Simulate successful submission
        showSuccessMessage(form);

        // Reset form state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;

        // Log form data for debugging
        console.log('Form submitted with data:', formObject);

        // You could also send this data via email using a service like Formspree
        // or store it in a database using a serverless function
    }, 1500);

    // Example of how you might implement actual form submission with fetch:
    /*
    fetch('https://your-form-endpoint.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        showSuccessMessage(form);
    })
    .catch(error => {
        showErrorMessage(form, 'There was a problem submitting your form. Please try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    });
    */
}

/**
 * Show success message after form submission
 * @param {HTMLFormElement} form - The form element
 */
function showSuccessMessage(form) {
    // Hide the form
    form.style.display = 'none';

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <h3>Thank you for your message!</h3>
        <p>We've received your inquiry and will get back to you shortly.</p>
        <button class="cta-button" id="send-another">Send Another Message</button>
    `;

    // Insert success message after the form
    form.parentNode.insertBefore(successMessage, form.nextSibling);

    // Add event listener to "Send Another Message" button
    document.getElementById('send-another').addEventListener('click', function() {
        // Remove success message
        successMessage.remove();

        // Reset and show form
        form.reset();
        form.style.display = 'block';
    });
}

/**
 * Show error message if form submission fails
 * @param {HTMLFormElement} form - The form element
 * @param {string} message - The error message
 */
function showErrorMessage(form, message) {
    // Create error message
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-error';
    errorContainer.innerHTML = `
        <p>${message}</p>
    `;

    // Insert at the top of the form
    form.insertBefore(errorContainer, form.firstChild);

    // Remove after 5 seconds
    setTimeout(() => {
        errorContainer.remove();
    }, 5000);
}

/**
 * Initialize language preference handling
 */
function initLanguagePreference() {
    const languageSelect = document.getElementById('language');

    if (!languageSelect) return;

    // Set default language based on URL path
    const path = window.location.pathname;
    if (path.includes('/pl/')) {
        languageSelect.value = 'pl';
    } else {
        languageSelect.value = 'en';
    }

    // Store language preference when changed
    languageSelect.addEventListener('change', function() {
        localStorage.setItem('preferredLanguage', this.value);
    });
}

/**
 * Handle form field character count for textarea
 */
document.addEventListener('DOMContentLoaded', function() {
    const messageTextarea = document.getElementById('message');

    if (messageTextarea) {
        const maxLength = messageTextarea.getAttribute('maxlength') || 500;

        // Create character counter
        const counterElement = document.createElement('div');
        counterElement.className = 'char-counter';
        counterElement.textContent = `0/${maxLength} characters`;
        messageTextarea.parentNode.appendChild(counterElement);

        // Update counter on input
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counterElement.textContent = `${currentLength}/${maxLength} characters`;

            // Add warning class when approaching limit
            if (currentLength > maxLength * 0.8) {
                counterElement.classList.add('warning');
            } else {
                counterElement.classList.remove('warning');
            }
        });
    }
});
