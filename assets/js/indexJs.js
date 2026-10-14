
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');

            if (!href || href === '#') return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Atualiza o link ativo conforme a seção visível
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${entry.target.id}`;

                link.classList.toggle('active', isActive);
            });
        });
    }, {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach((section) => sectionObserver.observe(section));

    // Animações leves ao rolar a página
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        animatedElements.forEach((element) => {
            animationObserver.observe(element);
        });
    } else {
        animatedElements.forEach((element) => {
            element.classList.add('animated');
        });
    }
});
