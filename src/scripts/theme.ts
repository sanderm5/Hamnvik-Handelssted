export function applyTheme(setting: string) {
  const html = document.documentElement;
  html.setAttribute('data-theme-setting', setting);
  const isDark = setting === 'dark' || (setting === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    const isActive = (btn as HTMLElement).dataset.themeValue === setting;
    if (isActive) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    btn.setAttribute('aria-checked', String(isActive));
  });
}

export function initThemeToggle() {
  const current = localStorage.getItem('theme') || 'system';
  applyTheme(current);

  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = (btn as HTMLElement).dataset.themeValue!;
      const html = document.documentElement;
      html.classList.add('theme-transition');
      localStorage.setItem('theme', value);
      applyTheme(value);
      setTimeout(() => { html.classList.remove('theme-transition'); }, 800);
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const setting = localStorage.getItem('theme') || 'system';
    if (setting === 'system') {
      applyTheme('system');
    }
  });
}
