// Active sidebar link on scroll
const links = document.querySelectorAll('.sidebar a');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

function onScroll() {
  let current = sections[0];
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s; });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current.id);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
