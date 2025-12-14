// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// RFQ Modal functionality
const rfqModal = document.getElementById('rfqModal');
let selectedCategory = '';

function openRFQModal(category) {
    selectedCategory = category;
    const modalCategory = document.getElementById('modalCategory');
    modalCategory.textContent = `Request a quote for: ${category}`;
    rfqModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRFQModal() {
    rfqModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('quickRFQForm').reset();
}

// Close modal when clicking outside
rfqModal.addEventListener('click', function(e) {
    if (e.target === rfqModal) {
        closeRFQModal();
    }
});

// Quick RFQ form submission
function handleQuickRFQ(event) {
    event.preventDefault();
    
    const name = document.getElementById('modalName').value;
    const email = document.getElementById('modalEmail').value;
    const phone = document.getElementById('modalPhone').value;
    const quantity = document.getElementById('modalQuantity').value;
    const message = document.getElementById('modalMessage').value;
    
    // In a real application, this would send data to a server
    console.log('Quote Request Submitted:', {
        category: selectedCategory,
        name,
        email,
        phone,
        quantity,
        message
    });
    
    showSuccessMessage('Quote request submitted successfully! We\'ll contact you soon.');
    closeRFQModal();
}

// Customization Modal
const customModal = document.getElementById('customModal');
let selectedProduct = '';
let selectedMethod = '';

function openCustomizationTool() {
    customModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCustomModal() {
    customModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedProduct = '';
    selectedMethod = '';
    
    // Reset active states
    const customBtns = document.querySelectorAll('.custom-btn');
    customBtns.forEach(btn => btn.classList.remove('active'));
}

customModal.addEventListener('click', function(e) {
    if (e.target === customModal) {
        closeCustomModal();
    }
});

function selectCustomOption(type) {
    console.log('Custom option selected:', type);
    // This would trigger more detailed customization UI
}

function selectProduct(product) {
    selectedProduct = product;
    
    // Remove active class from all product buttons
    const productBtns = document.querySelectorAll('.custom-options-grid .custom-btn');
    productBtns.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(product)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function selectMethod(method) {
    selectedMethod = method;
    
    // Find and highlight the selected method button
    const methodBtns = document.querySelectorAll('.custom-tool-section:nth-child(2) .custom-btn');
    methodBtns.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(method)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function submitCustomization() {
    if (!selectedProduct) {
        alert('Please select a product type');
        return;
    }
    
    if (!selectedMethod) {
        alert('Please select a customization method');
        return;
    }
    
    const logoUpload = document.getElementById('logoUpload').files[0];
    const customNotes = document.getElementById('customNotes').value;
    
    // In a real application, this would upload the logo and send data to server
    console.log('Customization Request:', {
        product: selectedProduct,
        method: selectedMethod,
        logo: logoUpload ? logoUpload.name : 'No logo uploaded',
        notes: customNotes
    });
    
    showSuccessMessage('Customization request submitted! We\'ll send you a detailed quote.');
    closeCustomModal();
}

// Main Contact Form
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {};
    
    formData.forEach((value, key) => {
        if (key === 'customization') {
            data[key] = event.target.querySelector('#customization').checked;
        } else {
            data[key] = value;
        }
    });
    
    // In a real application, this would send data to a server
    console.log('Contact Form Submitted:', data);
    
    showSuccessMessage('Thank you! Your request has been submitted. We\'ll get back to you within 24 hours.');
    event.target.reset();
}

// Success Message Toast
function showSuccessMessage(message) {
    const successToast = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    
    successText.textContent = message;
    successToast.classList.add('show');
    
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 4000);
}

// Add to Cart functionality (B2C section)
const addToCartBtns = document.querySelectorAll('.btn-add-cart');
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h4').textContent;
        
        // In a real application, this would add to a shopping cart
        console.log('Added to cart:', productName);
        showSuccessMessage(`${productName} added to cart!`);
    });
});

// Keyboard accessibility for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (rfqModal.classList.contains('active')) {
            closeRFQModal();
        }
        if (customModal.classList.contains('active')) {
            closeCustomModal();
        }
    }
});

// Intersection Observer for scroll animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.category-card, .product-card, .quality-card, .b2b-benefit');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Uniform Co. website loaded successfully');
    
    // Check for URL hash and scroll to section
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 100);
    }
});

// Handle form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});

// Product category quick navigation
window.addEventListener('load', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.style.cursor = 'pointer';
    });
});
