document.addEventListener('DOMContentLoaded', () => {
    console.log("Base JS loaded - initializing global components.");
    initNavigation();
    initFooter();
});
function initNavigation() {
    const header = document.querySelector('header') || document.body;
    if (document.querySelector('.global-nav')) return;

    const navHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark global-nav" style="background: linear-gradient(90deg, #1e293b, #0f172a);">
            <div class="container-fluid">
                <a class="navbar-brand fw-bold text-uppercase" href="index.html" style="letter-spacing: 1px; color: #38bdf8;">Sports Hub</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="guessWho.html">Guess Game</a></li>
                        <li class="nav-item"><a class="nav-link" href="moments.html">The Flu Game</a></li>
                        <li class="nav-item"><a class="nav-link" href="soccerCeaseFirePage.html">Christmas Truce</a></li>
                        <li class="nav-item"><a class="nav-link" href="sports-showcase.html">Sports Showcase</a></li>
                        <li class="nav-item"><a class="nav-link" href="Legends.html">Legends</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

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
