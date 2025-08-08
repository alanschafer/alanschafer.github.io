document.addEventListener('DOMContentLoaded', function() {

    // --- GLOBAL INTERACTIVITY ---

    // 1. Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('pointermove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
                cursorGlow.style.opacity = '1';
            });
        });
        document.addEventListener('pointerleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // 2. Sticky Header Refinement on Scroll
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }, { passive: true });
    }
    
    // --- GOOGLE ANALYTICS (Placeholder) ---
    // Replace GA_MEASUREMENT_ID with your actual ID
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    
    function trackEvent(eventName, params) {
        // console.log(`Tracking Event: ${eventName}`, params);
        // gtag('event', eventName, params);
    }

    // --- FORM HANDLING ---

    // 1. EmailJS Initialization
    // Replace with your actual EmailJS public key, service ID, and template IDs
    const EMAILJS_PUBLIC_KEY = 'Kk_Q7lCrVrrOhCBe3'; // Your public key from original code
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const NEWSLETTER_TEMPLATE_ID = 'YOUR_NEWSLETTER_TEMPLATE_ID';
    const CONTACT_TEMPLATE_ID = 'YOUR_CONTACT_TEMPLATE_ID';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    // 2. Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = document.getElementById('newsletter-button');
            const buttonText = button.querySelector('span');
            buttonText.innerHTML = '<span class="btn-loading">Subscribing...</span>';
            button.disabled = true;

            emailjs.sendForm(EMAILJS_SERVICE_ID, NEWSLETTER_TEMPLATE_ID, this)
                .then(() => {
                    document.getElementById('newsletter-success').style.display = 'block';
                    newsletterForm.reset();
                    trackEvent('newsletter_signup', { 'event_category': 'engagement' });
                }, (error) => {
                    alert('Failed to subscribe. Please try again.');
                    console.log('EmailJS Error:', error);
                })
                .finally(() => {
                    buttonText.innerHTML = 'Subscribe';
                    button.disabled = false;
                });
        });
    }

    // 3. Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('contact-submit-btn');
            const btnText = submitBtn.querySelector('span');
            btnText.innerHTML = '<span class="btn-loading">Sending...</span>';
            submitBtn.disabled = true;
            
            emailjs.sendForm(EMAILJS_SERVICE_ID, CONTACT_TEMPLATE_ID, this)
                .then(() => {
                    contactForm.style.display = 'none';
                    document.getElementById('contact-success').style.display = 'block';
                    trackEvent('contact_form_submit', { 'event_category': 'engagement' });
                }, (error) => {
                    alert('Failed to send message. Please try again.');
                    console.log('EmailJS Error:', error);
                })
                .finally(() => {
                    // In case of error, reset button. On success, form is hidden anyway.
                    btnText.innerHTML = 'Send Message';
                    submitBtn.disabled = false;
                });
        });
    }

    // --- BLOG POST: SOCIAL SHARE & COPY LINK ---
    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalIcon = copyLinkBtn.innerHTML;
                copyLinkBtn.innerHTML = '<i class="icon-checkmark"></i>';
                copyLinkBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyLinkBtn.innerHTML = originalIcon;
                    copyLinkBtn.classList.remove('copied');
                }, 2000);
            }, (err) => {
                alert('Failed to copy link.');
            });
        });
    }
});

