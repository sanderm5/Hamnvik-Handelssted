(function () {
  var s = localStorage.getItem('theme') || 'system';
  var h = document.documentElement;
  h.setAttribute('data-theme-setting', s);
  var d =
    s === 'dark' ||
    (s === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (d) {
    h.setAttribute('data-theme', 'dark');
  } else {
    h.removeAttribute('data-theme');
  }
})();
