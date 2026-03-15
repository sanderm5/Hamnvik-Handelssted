import { clearRafCallbacks, refreshMobile } from './raf';
import { initScrollHeader, initHeroParallax, initOrnamentParallax, initFooterParallax, initStickyCards, initScrollReveal } from './animations';
import { applyTheme, initThemeToggle } from './theme';
import { initMobileNav } from './navigation';

function initAll() {
  clearRafCallbacks();
  initMobileNav();
  initScrollHeader();
  initHeroParallax();
  initOrnamentParallax();
  initFooterParallax();
  initStickyCards();
  initScrollReveal();
  initThemeToggle();
}

initAll();

document.addEventListener('astro:after-swap', () => {
  const frontHeader = document.querySelector('.site-header-front') as HTMLElement | null;
  if (frontHeader) {
    frontHeader.style.cssText = '';
  }
  const saved = localStorage.getItem('theme') || 'system';
  applyTheme(saved);
  refreshMobile();
  initAll();
});
