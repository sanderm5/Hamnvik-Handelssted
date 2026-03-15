export function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle') as HTMLButtonElement | null;
  if (!toggle) return;

  const header = toggle.closest('header') as HTMLElement;
  const overlay = document.querySelector('body > .nav-overlay') as HTMLElement;
  const nav = header.querySelector('nav') as HTMLElement;

  function openNav() {
    toggle!.setAttribute('aria-expanded', 'true');
    header.classList.add('nav-open');
    document.body.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle!.setAttribute('aria-expanded', 'false');
    header.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
  }

  function isOpen() {
    return toggle!.getAttribute('aria-expanded') === 'true';
  }

  toggle.addEventListener('click', () => {
    if (isOpen()) { closeNav(); } else { openNav(); }
  });

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  if (nav) {
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) { closeNav(); }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 750 && isOpen()) { closeNav(); }
  });
}
