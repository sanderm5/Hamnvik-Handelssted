'use client';

import { useEffect } from 'react';

export default function ClientInit() {
  useEffect(() => {
    let isMobile = window.innerWidth <= 750;
    let resizeTimer: ReturnType<typeof setTimeout>;

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { isMobile = window.innerWidth <= 750; }, 150);
    }
    window.addEventListener('resize', handleResize);

    // RAF loop
    let rafCallbacks: Array<() => void> = [];
    let rafRunning = false;

    function rafLoop() {
      for (let i = 0; i < rafCallbacks.length; i++) {
        rafCallbacks[i]();
      }
      if (rafCallbacks.length > 0) {
        requestAnimationFrame(rafLoop);
      } else {
        rafRunning = false;
      }
    }

    function addRafCallback(cb: () => void) {
      rafCallbacks.push(cb);
      if (!rafRunning) {
        rafRunning = true;
        requestAnimationFrame(rafLoop);
      }
    }

    // --- Mobile Nav ---
    function initMobileNav() {
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

      function isNavOpen() {
        return toggle!.getAttribute('aria-expanded') === 'true';
      }

      toggle.addEventListener('click', () => { if (isNavOpen()) closeNav(); else openNav(); });
      if (overlay) overlay.addEventListener('click', closeNav);
      if (nav) nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isNavOpen()) closeNav(); });
      window.addEventListener('resize', () => { if (window.innerWidth > 750 && isNavOpen()) closeNav(); });
    }

    // --- Scroll Header (front page) ---
    function initScrollHeader() {
      const header = document.querySelector('.site-header-front') as HTMLElement | null;
      if (!header || isMobile) return;
      const end = 120;
      let current = Math.min(Math.max(window.scrollY / end, 0), 1);

      function applyHeaderState(el: HTMLElement, t: number) {
        el.style.paddingTop = (0.4 - t * 0.25) + 'rem';
        el.style.paddingBottom = (0.3 - t * 0.15) + 'rem';
        el.style.setProperty('--header-font-size', (1.8 - t * 0.4) + 'rem');
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
        if (t > 0.4) el.classList.add('scrolled');
        else el.classList.remove('scrolled');
      }

      applyHeaderState(header, current);
      addRafCallback(() => {
        const target = Math.min(Math.max(window.scrollY / end, 0), 1);
        current += (target - current) * 0.12;
        applyHeaderState(header, current);
      });
    }

    // --- Hero Parallax ---
    function initHeroParallax() {
      if (isMobile) return;
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
        heroImgs.forEach(img => {
          img.style.transform = 'translateY(' + offset + 'px) scale(' + scale + ')';
          img.style.filter = 'brightness(' + brightness + ')';
        });
      }
      window.addEventListener('scroll', updateParallax, { passive: true });
      updateParallax();
    }

    // --- Ornament Parallax ---
    function initOrnamentParallax() {
      if (isMobile) return;
      const style = document.documentElement.style;
      function updateOrnament() {
        const offset = 40 + window.scrollY * 0.05;
        style.setProperty('--ornament-top', offset + 'vh');
      }
      window.addEventListener('scroll', updateOrnament, { passive: true });
      updateOrnament();
    }

    // --- Footer Parallax ---
    function initFooterParallax() {
      const footerIll = document.querySelector('.footer-illustration') as HTMLElement | null;
      const footerLayer = document.querySelector('.footer-parallax-layer') as HTMLElement | null;
      if (!footerIll || !footerLayer || isMobile) return;

      let footerVisible = false;
      let currentY = 0;
      const observer = new IntersectionObserver((entries) => {
        footerVisible = entries[0].isIntersecting;
      }, { rootMargin: '100px' });
      observer.observe(footerIll);

      addRafCallback(() => {
        if (!footerVisible) return;
        if (document.documentElement.classList.contains('theme-transition')) return;
        const rect = footerIll.getBoundingClientRect();
        const viewH = window.innerHeight;
        const t = Math.min(Math.max((viewH - rect.top) / (viewH + rect.height), 0), 1);
        const targetY = -(t * 80);
        currentY += (targetY - currentY) * 0.1;
        footerLayer.style.transform = 'translateY(' + currentY + 'px)';
      });
    }

    // --- Sticky Cards ---
    function initStickyCards() {
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

      addRafCallback(() => {
        if (!stickyVisible) return;
        const wrapRect = wrap.getBoundingClientRect();
        const cardsH = cards.offsetHeight;
        if (wrapRect.top <= stickyTop) {
          let offset = stickyTop - wrapRect.top;
          let maxOffset = wrap.offsetHeight - cardsH;
          if (maxOffset < 0) maxOffset = 0;
          offset = Math.min(offset, maxOffset);
          cards.style.transform = 'translateY(' + offset + 'px)';
        } else {
          cards.style.transform = 'translateY(0)';
        }
      });
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
      const els = document.querySelectorAll('.scroll-reveal');
      if (els.length === 0) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      els.forEach(el => observer.observe(el));
    }

    // Init all
    initMobileNav();
    initScrollHeader();
    initHeroParallax();
    initOrnamentParallax();
    initFooterParallax();
    initStickyCards();
    initScrollReveal();

    return () => {
      rafCallbacks = [];
      rafRunning = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
}
