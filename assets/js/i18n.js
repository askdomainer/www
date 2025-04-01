// assets/js/i18n.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize i18next
    i18next.init({
        lng: document.documentElement.lang,
        resources: {
            en: {
                translation: window.translations.en
            },
            pl: {
                translation: window.translations.pl
            }
        }
    }).then(function(t) {
        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(function(element) {
            const key = element.getAttribute('data-i18n');
            element.innerHTML = t(key);
        });
    });
});