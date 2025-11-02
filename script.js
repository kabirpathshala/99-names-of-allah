// Asma-ul-Husna — minimal, respectful interactivity

(function () {
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function debounce(fn, wait) {
    let t; return function (...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
  }

  function normalize(str) {
    return (str || "").toString().toLowerCase().normalize('NFKD').replace(/[\u064B-\u065F]/g, '');
  }

  function filterRows(q) {
    const tbody = $('#names tbody');
    const rows = $all('tr', tbody);
    const nq = normalize(q);
    let shown = 0;
    rows.forEach(tr => {
      const text = normalize(tr.textContent);
      const match = !nq || text.includes(nq);
      tr.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    const countBox = $('.search .count');
    if (countBox) countBox.textContent = shown + ' of ' + rows.length + ' names';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const input = $('#query');
    const saved = sessionStorage.getItem('asma_query');
    if (input) {
      if (saved) { input.value = saved; }
      const run = debounce(() => { sessionStorage.setItem('asma_query', input.value); filterRows(input.value); }, 120);
      input.addEventListener('input', run);
      filterRows(input.value);
    }

    // Scroll-to-top button
    const toTop = $('#toTop');
    if (toTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 320) toTop.classList.add('show'); else toTop.classList.remove('show');
      });
      toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  });
})();

