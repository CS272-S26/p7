document.addEventListener('DOMContentLoaded', () => {
    console.log("Base JS loaded - initializing global components.");
    initNavigation();
    initFooter();
    initThemeToggle();
});
function initNavigation() {
    const header = document.querySelector('header') || document.body;
    if (document.querySelector('.global-nav')) return;

    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    const isHomePage = currentPath === 'index.html' || currentPath === '';

    let navHTML = '';

    if (isHomePage) {
        navHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark global-nav">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">Sports Hub</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="guessWho.html">Guess Game</a></li>
                            <li class="nav-item"><a class="nav-link" href="moments.html">Moments</a></li>
                            <li class="nav-item"><a class="nav-link" href="quizTemplateTest.html">Quiz Template Display</a></li>
                            <li class="nav-item"><a class="nav-link" href="sports-showcase.html">Sports Showcase</a></li>
                            <li class="nav-item"><a class="nav-link" href="legends.html">Legends</a></li>
                        </ul>
                        <div class="d-flex align-items-center">
                            <button id="themeToggle" class="btn btn-outline-light btn-sm">Toggle Theme</button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    } else {
        navHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark global-nav">
                <div class="container-fluid">
                    <a class="btn btn-outline-light" href="index.html">← Back to Home</a>
                    <div class="ms-auto d-flex align-items-center">
                        <button id="themeToggle" class="btn btn-outline-light btn-sm">Toggle Theme</button>
                    </div>
                </div>
            </nav>
        `;
    }

    if (header.tagName === 'HEADER') {
        const existingNav = header.querySelector('nav');
        if (existingNav) {
            existingNav.outerHTML = navHTML;
        } else {
            header.innerHTML = navHTML + header.innerHTML;
        }
    } else {
        const navContainer = document.createElement('div');
        navContainer.innerHTML = navHTML;
        document.body.prepend(navContainer.firstChild);
    }
    highlightActiveLink();
}
function highlightActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}
function initFooter() {
    if (document.querySelector('footer')) {
        document.querySelector('footer').innerHTML = `
            <div class="container text-center py-3">
                <p>&copy; ${new Date().getFullYear()} Sports History Hub | CS 472 Project</p>
                <small>Built with HTML, CSS, Bootstrap, and Vanilla JS</small>
            </div>
        `;
    }
}
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    toggleBtn.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log(`Theme switched to: ${newTheme}`);
    });
}
