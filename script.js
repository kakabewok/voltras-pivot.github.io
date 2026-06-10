// ── Smooth scroll dengan offset ──────────────────────────────────────────────
const links = document.querySelectorAll('.sidebar a');
const sections = [...links]
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const offset = 24;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

function onScroll() {
  let current = sections[0];
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s; });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current.id);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Copy button ───────────────────────────────────────────────────────────────
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  });
}

// 1. code-block <pre> — wrap each in a relative container and inject button
document.querySelectorAll('pre.code-block').forEach(pre => {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-wrapper';
  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copy';
  btn.addEventListener('click', () => copyText(pre.innerText, btn));
  wrapper.appendChild(btn);
});

// 2. endpoint-bar — copy the full URL on click
document.querySelectorAll('.endpoint-bar').forEach(bar => {
  // grab all text spans (skip the POST badge)
  const urlParts = [...bar.querySelectorAll('span:not(.badge-post)')]
    .map(s => s.textContent.trim()).join('');

  const btn = document.createElement('button');
  btn.className = 'copy-btn copy-btn-inline';
  btn.textContent = 'Copy URL';
  btn.addEventListener('click', () => copyText(urlParts, btn));
  bar.appendChild(btn);
});

// 3. bank-badge — copy bank name on click
document.querySelectorAll('.bank-badge').forEach(badge => {
  badge.style.cursor = 'pointer';
  badge.title = 'Klik untuk copy';

  badge.addEventListener('click', () => {
    const text = badge.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      const original = badge.textContent;
      badge.textContent = '✓ Copied!';
      badge.classList.add('bank-badge-copied');
      setTimeout(() => {
        badge.textContent = original;
        badge.classList.remove('bank-badge-copied');
      }, 1500);
    });
  });
});
