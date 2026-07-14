// ========================================
// PREMIUM FURNITURE WEBSITE - SCRIPT.JS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // === SCROLL TO TOP BUTTON ===
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === ADD TO CART FUNCTIONALITY ===
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    let cartCount = 3; // Starting cart count
    const cartBadge = document.querySelector('.cart-badge');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            
            // Increment cart count
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }

            // Button animation
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);

            // Show notification
            showNotification(`${productName} added to cart!`, 'success');
        });
    });

    // === NOTIFICATION SYSTEM ===
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#28a745' : '#8B6F47'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add animation keyframes
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // === PRODUCT FILTERING (Products Page) ===
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productItems = document.querySelectorAll('.product-item');

    if (categoryFilter && productItems.length > 0) {
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
        sortFilter.addEventListener('change', sortProducts);
    }

    function filterProducts() {
        const categoryValue = categoryFilter.value;
        const priceValue = priceFilter.value;

        productItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemPrice = parseInt(item.dataset.price);
            let showItem = true;

            // Category filter
            if (categoryValue !== 'All Categories' && itemCategory !== categoryValue) {
                showItem = false;
            }

            // Price filter
            if (priceValue !== 'Price Range') {
                if (priceValue === 'low' && itemPrice >= 500) showItem = false;
                if (priceValue === 'mid' && (itemPrice < 500 || itemPrice > 1000)) showItem = false;
                if (priceValue === 'high' && (itemPrice < 1000 || itemPrice > 2000)) showItem = false;
                if (priceValue === 'premium' && itemPrice < 2000) showItem = false;
            }

            // Show/hide with animation
            if (showItem) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    function sortProducts() {
        const sortValue = sortFilter.value;
        const productsGrid = document.getElementById('productsGrid');
        
        if (!productsGrid) return;

        const sortedItems = Array.from(productItems).sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);

            switch(sortValue) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'rating':
                    // Default order for rating (could be enhanced with actual rating data)
                    return 0;
                default:
                    return 0;
            }
        });

        sortedItems.forEach(item => {
            productsGrid.appendChild(item);
        });
    }

    // === CONTACT FORM SUBMISSION ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate
            if (!firstName || !lastName || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // === CAROUSEL AUTO-PLAY ===
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    // === LAZY LOADING IMAGES ===
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // === SEARCH FUNCTIONALITY (Placeholder) ===
    const searchIcon = document.querySelector('.fa-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            showNotification('Search feature coming soon!', 'info');
        });
    }

    // === CART ICON CLICK (Placeholder) ===
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            showNotification(`You have ${cartCount} items in your cart.`, 'info');
        });
    }

    // === ANIMATION ON SCROLL ===
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

    // Observe product cards, category cards, and feature cards
    const animateElements = document.querySelectorAll('.product-card, .category-card, .feature-card, .team-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // === CATEGORY CARD CLICK ===
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-info h5').textContent;
            showNotification(`Browsing ${categoryName} category`, 'info');
            
            // Scroll to products section
            setTimeout(() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        });
    });

});

// === UTILITY FUNCTIONS ===

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Get URL parameters
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Initialize on page load
window.addEventListener('load', function() {
    // Check for URL parameters on products page
    const categoryParam = getUrlParameter('category');
    if (categoryParam) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = categoryParam;
            categoryFilter.dispatchEvent(new Event('change'));
        }
    }
});
