import { isMobile, addRafCallback } from './raf';

function applyHeaderState(el: HTMLElement, t: number) {
  if (isMobile) {
    el.style.paddingTop = (0.4 - t * 0.2) + 'rem';
    el.style.paddingBottom = (0.3 - t * 0.15) + 'rem';
  } else {
    el.style.paddingTop = (0.4 - t * 0.25) + 'rem';
    el.style.paddingBottom = (0.3 - t * 0.15) + 'rem';
  }

  const baseFontSize = isMobile ? 1.6 : 1.8;
  const fontReduction = isMobile ? 0.3 : 0.4;
  el.style.setProperty('--header-font-size', (baseFontSize - t * fontReduction) + 'rem');
  el.style.setProperty('--header-nav-margin', (0.5 - t * 0.5) + 'rem');
  el.style.setProperty('--header-nav-font', (1.1 - t * 0.05) + 'rem');

  const subT = Math.min(t * 3, 1);
  el.style.setProperty('--header-sub-opacity', String(1 - subT));
  el.style.setProperty('--header-sub-height', (1 - Math.min(t * 2, 1)) + 'em');

  const blur = 6 + t * 10;
  el.style.backdropFilter = 'blur(' + blur + 'px) saturate(' + (1 + t * 0.3) + ')';
  el.style.setProperty('-webkit-backdrop-filter', 'blur(' + blur + 'px) saturate(' + (1 + t * 0.3) + ')');

  const bgAlpha = 0.8 + t * 0.12;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    el.style.background = 'rgba(18, 16, 11, ' + (bgAlpha * 0.85) + ')';
  } else {
    el.style.background = 'rgba(250, 246, 236, ' + bgAlpha + ')';
  }

  if (t > 0.4) {
    el.classList.add('scrolled');
  } else {
    el.classList.remove('scrolled');
  }
}

export function initScrollHeader() {
  const header = document.querySelector('.site-header-front') as HTMLElement | null;
  if (!header) return;
  if (isMobile) return; // Skip expensive backdrop-filter animation on mobile
  const el = header;
  const end = 120;
  let current = Math.min(Math.max(window.scrollY / end, 0), 1);
  applyHeaderState(el, current);

  addRafCallback(function updateHeader() {
    const target = Math.min(Math.max(window.scrollY / end, 0), 1);
    current += (target - current) * 0.12;
    applyHeaderState(el, current);
  });
}

export function initHeroParallax() {
  if (isMobile) return; // Skip parallax on mobile for performance
  const heroImgs = document.querySelectorAll('.hero .hero-light, .hero .hero-dark') as NodeListOf<HTMLElement>;
  const hero = document.querySelector('.hero') as HTMLElement | null;
  if (heroImgs.length === 0 || !hero) return;
  function updateParallax() {
    const heroH = hero!.offsetHeight - 300;
    const scrollY = window.scrollY;
    const t = Math.min(Math.max(scrollY / heroH, 0), 1);
    const offset = scrollY * 0.5;
    const scale = 1 + t * 0.12;
    const brightness = 1 - t * 0.4;

    heroImgs.forEach((img) => {
      img.style.transform = 'translateY(' + offset + 'px) scale(' + scale + ')';
      img.style.filter = 'brightness(' + brightness + ')';
    });
  }
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}

export function initOrnamentParallax() {
  if (isMobile) return; // Skip on mobile for performance
  const style = document.documentElement.style;
  function updateOrnament() {
    const offset = 40 + window.scrollY * 0.05;
    style.setProperty('--ornament-top', offset + 'vh');
  }
  window.addEventListener('scroll', updateOrnament, { passive: true });
  updateOrnament();
}

export function initFooterParallax() {
  const footerIll = document.querySelector('.footer-illustration') as HTMLElement | null;
  const footerLayer = document.querySelector('.footer-parallax-layer') as HTMLElement | null;
  if (!footerIll || !footerLayer) return;
  if (isMobile) return;

  let footerVisible = false;
  let currentY = 0;

  const observer = new IntersectionObserver((entries) => {
    footerVisible = entries[0].isIntersecting;
  }, { rootMargin: '100px' });
  observer.observe(footerIll);

  addRafCallback(function tickFooter() {
    if (!footerVisible) return;
    if (document.documentElement.classList.contains('theme-transition')) return;

    const rect = footerIll!.getBoundingClientRect();
    const viewH = window.innerHeight;
    const t = Math.min(Math.max((viewH - rect.top) / (viewH + rect.height), 0), 1);
    const targetY = -(t * 80);
    currentY += (targetY - currentY) * 0.1;

    footerLayer!.style.transform = 'translateY(' + currentY + 'px)';
  });
}

export function initStickyCards() {
  const wrap = document.querySelector('.sticky-cards-wrap') as HTMLElement | null;
  const cards = document.querySelector('.sticky-cards') as HTMLElement | null;
  if (!wrap || !cards) return;

  if (isMobile) {
    cards.style.transform = 'translateY(0)';
    return;
  }

  let stickyVisible = false;
  const stickyTop = 64;

  const observer = new IntersectionObserver((entries) => {
    stickyVisible = entries[0].isIntersecting;
  }, { rootMargin: '200px' });
  observer.observe(wrap);

  addRafCallback(function tickSticky() {
    if (!stickyVisible) return;

    const wrapRect = wrap!.getBoundingClientRect();
    const cardsH = cards!.offsetHeight;

    if (wrapRect.top <= stickyTop) {
      let offset = stickyTop - wrapRect.top;
      let maxOffset = wrap!.offsetHeight - cardsH;
      if (maxOffset < 0) maxOffset = 0;
      offset = Math.min(offset, maxOffset);
      cards!.style.transform = 'translateY(' + offset + 'px)';
    } else {
      cards!.style.transform = 'translateY(0)';
    }
  });
}

export function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');
  if (els.length === 0) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el) => { observer.observe(el); });
}
