/* Theme: persist preference in localStorage, apply to <html data-theme> */
(function initTheme() {
    const THEME_KEY = 'btcpos_theme';

    function getSavedTheme() {
        try { return localStorage.getItem(THEME_KEY); } catch { return null; }
    }

    window.getCurrentTheme = function () {
        const saved = getSavedTheme();
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    function saveTheme(theme) {
        try { localStorage.setItem(THEME_KEY, theme); } catch { }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    window.toggleTheme = function () {
        const current = getCurrentTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        saveTheme(next);
        applyTheme(next);
    };

    const saved = getSavedTheme();
    if (saved) applyTheme(saved);
})();

const TOGGLE_HTML = `
    <button class="VPSwitch VPSwitchAppearance appearance-toggle" type="button" role="switch" title="Toggle dark mode" aria-label="Toggle dark mode">
        <span class="check">
            <span class="icon">
                <span class="vpi-sun sun"></span>
                <span class="vpi-moon moon"></span>
            </span>
        </span>
    </button>
    <button class="hamburger-menu" aria-label="Menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </button>
    <div class="mobile-menu">
        <button class="mobile-menu-item">
            <span class="label">Appearance</span>
            <span class="VPSwitch VPSwitchAppearance" style="pointer-events: none;">
                <span class="check">
                    <span class="icon">
                        <span class="vpi-sun sun"></span>
                        <span class="vpi-moon moon"></span>
                    </span>
                </span>
            </span>
        </button>
    </div>
`;

class BtcposThemeToggle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = TOGGLE_HTML;

        const toggle = this.querySelector('.appearance-toggle');
        const hamburger = this.querySelector('.hamburger-menu');
        const mobileMenu = this.querySelector('.mobile-menu');
        const mobileItem = this.querySelector('.mobile-menu-item');

        toggle.addEventListener('click', () => window.toggleTheme());
        mobileItem.addEventListener('click', () => window.toggleTheme());

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        });
    }
}

class BtcposHeader extends HTMLElement {
    connectedCallback() {
        const backHref = this.getAttribute('back-href') || '../';
        const backText = this.getAttribute('back-text') || 'Back';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';

        this.innerHTML = `
            <header class="header">
                <btcpos-theme-toggle></btcpos-theme-toggle>
                <a href="${backHref}" class="back-link">\u2190 ${backText}</a>
                <div class="bitcoin-symbol">\u20BF</div>
                <h1>${title}</h1>
                ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
            </header>
        `;
    }
}

class BtcposFooter extends HTMLElement {
    connectedCallback() {
        const content = this.innerHTML;
        this.innerHTML = `<footer class="docs-footer">${content}</footer>`;
    }
}

customElements.define('btcpos-theme-toggle', BtcposThemeToggle);
customElements.define('btcpos-header', BtcposHeader);
customElements.define('btcpos-footer', BtcposFooter);
