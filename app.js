// --- PRELOADER LOGIC ---
// --- PRELOADER & CURTAIN LIFT LOGIC ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loaderContent = document.getElementById('loader-content');

    // Step 1: Let the user enjoy the loading screen for a brief moment
    setTimeout(() => {
        
        // Step 2: Fade out the logo and text FIRST
        loaderContent.classList.add('text-fade-out');
        
        // Step 3: Wait for text to disappear (500ms), then LIFT THE CURTAIN
        setTimeout(() => {
            preloader.classList.add('curtain-lift-up');
            
            // Step 4: Wait for the curtain to finish lifting (1.2s), then remove preloader from memory
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
            }, 1200);

        }, 500); 

    }, 800);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- HAMBURGER MENU LOGIC ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const menuIcon = mobileBtn.querySelector('i');
    const allNavLinks = document.querySelectorAll('nav .nav-link');

    mobileBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
        menuIcon.className = mainNav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('show');
            menuIcon.className = 'fas fa-bars';
        });
    });

    // --- ROUTER LOGIC ---
    function handleRouting() {
        let hash = window.location.hash || '#home';
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.classList.remove('fade-in-up'); 
        });

        // Update nav active state
        allNavLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Show targeted page
        const targetPage = document.querySelector(hash);
        if (targetPage) {
            targetPage.classList.add('active');
            setTimeout(() => targetPage.classList.add('fade-in-up'), 50);
            
            // Render newly added products if viewing the catalog
            if (hash === '#products') {
                renderUploadedProducts();
            }
        }
        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', handleRouting);
    handleRouting();


    // --- PRODUCT RENDERING LOGIC (Admin Uploads) ---
    function renderUploadedProducts() {
        const products = JSON.parse(localStorage.getItem('philmax_products')) || [];
        if (products.length === 0) return;

        products.forEach(product => {
            let categoryID = product.category.split(' ')[0]; 
            let targetCarousel = document.getElementById(`carousel-${product.category}`); 
            
            if (targetCarousel) {
                if(!document.getElementById(`prod-${product.id}`)) {
                    
                    let message = encodeURIComponent(`Hello Philmax Interior, I am interested in the ${product.name}.`);
                    
                    const card = document.createElement('div');
                    card.className = 'carousel-item';
                    card.id = `prod-${product.id}`;
                    card.innerHTML = `
                        <div class="item-img" style="background-image: url('${product.image}');"></div>
                        <div class="item-content">
                            <h4 style="margin-bottom: 10px;">${product.name}</h4>
                            <p style="color: #a0aabf; font-size: 13px; margin-bottom: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.desc}</p>
                            <a href="https://wa.me/2348035871899?text=${message}" class="wa-btn" target="_blank">
                                <i class="fab fa-whatsapp"></i> Order on WhatsApp
                            </a>
                        </div>
                    `;
                    targetCarousel.prepend(card); 
                }
            }
        });
    }
});
