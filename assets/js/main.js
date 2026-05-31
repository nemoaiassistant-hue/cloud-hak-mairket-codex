/* Cloud Hak — static client JS */
(function () {
  'use strict';

  // Cloud Hak Worker endpoint (handles chat + form submissions)
  const WORKER_URL = 'https://cloudhak-chatbot.airwayclinicproxy.workers.dev/form';

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

  const form = document.getElementById('intake-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const hp = form.elements.namedItem('website_url_hp');
      if (hp && hp.value) return;

      const required = Array.from(form.querySelectorAll('[required]'));
      const missing = required.find((el) => !String(el.value || '').trim());
      if (missing) {
        status.textContent = 'Please complete the required fields before sending.';
        status.className = 'form-status error';
        missing.focus();
        return;
      }

      const services = form.querySelectorAll('input[name="services[]"]:checked');
      if (!services.length) {
        status.textContent = 'Please choose at least one service so we know how to help.';
        status.className = 'form-status error';
        return;
      }

      // Collect form data
      const data = {
        firstName: form.elements.namedItem('first_name').value.trim(),
        lastName: form.elements.namedItem('last_name').value.trim(),
        email: form.elements.namedItem('email').value.trim(),
        phone: (form.elements.namedItem('phone').value || '').trim(),
        company: form.elements.namedItem('company').value.trim(),
        website: (form.elements.namedItem('website').value || '').trim(),
        services: Array.from(services).map(s => s.value),
        projectBrief: form.elements.namedItem('project_brief').value.trim(),
        budgetRange: form.elements.namedItem('budget_range').value,
        timeline: form.elements.namedItem('timeline').value,
        source: (form.elements.namedItem('source').value || '').trim(),
      };

      // Disable submit button
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';

      try {
        const res = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok || result.error) {
          console.error('Form submission failed:', result);
          throw new Error(result.error || 'Submission failed');
        }

        status.textContent = "Thanks — your brief was received. We'll respond within one business day.";
        status.className = 'form-status success';
        form.reset();
        window.scrollTo({
          top: status.getBoundingClientRect().top + window.scrollY - 200,
          behavior: 'smooth'
        });
      } catch (err) {
        console.error('Form submission error:', err);
        status.textContent = 'Something went wrong. Please email us directly at info@cloud-hak.online.';
        status.className = 'form-status error';
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
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
