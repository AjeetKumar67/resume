// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile header navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            headerNav.classList.toggle('active');
            this.querySelector('i').className = headerNav.classList.contains('active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        });
    }
    
    // Set active menu item based on current page
    const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
    const pageMappings = {
        'index': 'home',
        'about': 'about',
        'resume': 'resume',
        'services': 'services',
        'portfolio': 'portfolio',
        'contact': 'contact'
    };
    
    const currentSection = pageMappings[currentPage] || 'home';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    if (themeToggle) {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        themeToggle.querySelector('i').className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        // Theme toggle event
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.querySelector('i').className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }
});
