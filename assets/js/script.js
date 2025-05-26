// Navigation Toggle
document.getElementById('navToggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission (Demo only)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form.');
});

// Scroll Animation for Sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Projects Data (You can modify this)
const projects = [
    {
        title: "Project 1",
        description: "Description of project 1",
        github: "https://github.com/yourusername/project1",
        demo: "https://demo-link-1.com"
    },
    // Add more projects as needed
];

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeToggle.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

// Project hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    const increment = target / 200;
    
    function updateCount() {
        const count = parseInt(counter.innerText);
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target + '+';
        }
    }
    
    updateCount();
});

// Smooth scroll for navigation
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Page loading and transition logic
const pageContent = document.getElementById('page-content');
const loader = document.querySelector('.page-loader');
const navLinks = document.querySelectorAll('.nav-links a');

// Page loading handler
async function loadPage(pageName) {
    try {
        loader.classList.add('active');
        pageContent.style.opacity = '0';
        
        const response = await fetch(`pages/${pageName}.html`);
        const content = await response.text();
        
        setTimeout(() => {
            pageContent.innerHTML = content;
            pageContent.style.opacity = '1';
            loader.classList.remove('active');
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.page === pageName);
            });
            
            // Initialize page-specific animations
            initPageAnimations();
        }, 500);
    } catch (error) {
        console.error('Error loading page:', error);
    }
}

// Navigation handler
document.querySelector('.nav-links').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const pageName = e.target.dataset.page;
        loadPage(pageName);
    }
});

// Initial page load
loadPage('home');

// Theme toggle
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.documentElement.dataset.theme = 
        document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
});

// Page navigation handler
class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.isTransitioning = false;
        this.defaultPage = 'home';
        this.init();
    }

    init() {
        // Load default page immediately when the site loads
        window.addEventListener('DOMContentLoaded', () => {
            this.loadPage(this.defaultPage);
        });

        // Handle navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                if (page && page !== this.currentPage && !this.isTransitioning) {
                    this.loadPage(page);
                }
            });
        });

        // Handle URL hash changes
        window.addEventListener('hashchange', () => {
            const page = window.location.hash.slice(1) || this.defaultPage;
            this.loadPage(page);
        });
    }

    async loadPage(pageName) {
        try {
            this.isTransitioning = true;
            const container = document.getElementById('page-container');
            const loader = document.querySelector('.page-loader');

            // Show loader
            loader.classList.add('active');

            // Load the page content
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) {
                throw new Error('Page not found');
            }

            const content = await response.text();

            // Update content and navigation
            container.innerHTML = content;
            this.updateNavigation(pageName);
            
            // Update URL without triggering reload
            history.pushState({ page: pageName }, '', `#${pageName}`);
            
            this.currentPage = pageName;
            
            // Hide loader
            loader.classList.remove('active');
        } catch (error) {
            console.error('Error loading page:', error);
            // Load home page if there's an error
            if (pageName !== this.defaultPage) {
                this.loadPage(this.defaultPage);
            }
        } finally {
            this.isTransitioning = false;
        }
    }

    updateNavigation(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Initialize the page manager
const pageManager = new PageManager();

document.addEventListener('DOMContentLoaded', function() {
    const pageContent = document.getElementById('page-container');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPage = 'home';

    async function loadPage(pageName) {
        try {
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error(`Page ${pageName} not found`);
            const content = await response.text();
            pageContent.innerHTML = content;
            currentPage = pageName;
            updateActiveLink(pageName);
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    function updateActiveLink(pageName) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageName);
        });
    }

    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            if (page && page !== currentPage) {
                loadPage(page);
            }
        });
    });

    // Load home page by default
    loadPage('home');
});

// PageManager class to handle components and page loading
class PageManager {
    constructor() {
        this.init();
    }

    async init() {
        this.header = await this.loadComponent('header');
        this.footer = await this.loadComponent('footer');
        this.loadPage('home');
        this.setupNavigation();
    }

    async loadComponent(name) {
        try {
            const response = await fetch(`components/${name}.html`);
            return await response.text();
        } catch (error) {
            console.error(`Error loading ${name}:`, error);
            return '';
        }
    }

    async loadPage(pageName) {
        const container = document.getElementById('page-container');
        try {
            const response = await fetch(`pages/${pageName}.html`);
            const content = await response.text();
            
            container.innerHTML = `
                ${this.header}
                <div class="page-content">
                    ${content}
                </div>
                ${this.footer}
            `;

            // Update page title
            const titleElement = container.querySelector('.page-title');
            if (titleElement) {
                titleElement.textContent = this.getPageTitle(pageName);
            }

            // Update active navigation
            this.updateActiveLink(pageName);

            // Initialize page header
            this.initPageHeader(pageName);

        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    getPageTitle(pageName) {
        const titles = {
            home: 'Welcome',
            about: 'About Me',
            resume: 'My Resume',
            services: 'My Services',
            portfolio: 'My Work',
            contact: 'Get in Touch'
        };
        return titles[pageName] || 'Page Not Found';
    }

    initPageHeader(pageName) {
        const titles = {
            home: { title: 'Welcome to My Portfolio', subtitle: 'Python Developer & Web Engineer' },
            about: { title: 'About Me', subtitle: 'My Journey & Skills' },
            resume: { title: 'My Resume', subtitle: 'Experience & Education' },
            services: { title: 'My Services', subtitle: 'What I Can Do For You' },
            portfolio: { title: 'My Work', subtitle: 'Recent Projects' },
            contact: { title: 'Get in Touch', subtitle: 'Let\'s start a conversation' }
        };

        const pageInfo = titles[pageName] || { title: '404', subtitle: 'Page Not Found' };
        const titleEl = document.querySelector('[data-title]');
        const subtitleEl = document.querySelector('[data-subtitle]');
        
        if (titleEl) titleEl.textContent = pageInfo.title;
        if (subtitleEl) subtitleEl.textContent = pageInfo.subtitle;
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                if (page) {
                    this.loadPage(page);
                }
            });
        });
    }

    updateActiveLink(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageName);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PageManager();
});
