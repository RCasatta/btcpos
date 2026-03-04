class BtcposHeader extends HTMLElement {
    connectedCallback() {
        const backHref = this.getAttribute('back-href') || '../';
        const backText = this.getAttribute('back-text') || 'Back';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';

        this.innerHTML = `
            <header class="header">
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

customElements.define('btcpos-header', BtcposHeader);
customElements.define('btcpos-footer', BtcposFooter);
