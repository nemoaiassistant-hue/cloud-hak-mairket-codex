/* Cloud Hak — static client JS */
(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href) return;

      const hashIdx = href.indexOf('#');
      if (hashIdx === -1) return;

      const id = href.slice(hashIdx);
      if (id.length < 2) return;

      const target = document.querySelector(id);
      if (!target) return;

      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;

      event.preventDefault();
      const headerH = 64;
      const y = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
