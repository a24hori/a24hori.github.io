function switchLang(lang) {
  document.querySelectorAll('.lang-content').forEach(el => el.classList.add('hidden'));
  document.getElementById('content-' + lang).classList.remove('hidden');

  document.querySelectorAll('[data-ja][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang');
  const browser = navigator.language.startsWith('ja') ? 'ja' : 'en';
  switchLang(saved || browser);

  // Remove fade-out mask when news list fits without scrolling, or is scrolled to end
  document.querySelectorAll('[data-section] ul').forEach(ul => {
    const section = ul.closest('[data-section]').dataset.section;
    if (section !== 'ニュース' && section !== 'news') return;
    const update = () => {
      const atEnd = ul.scrollHeight - ul.scrollTop <= ul.clientHeight + 2;
      ul.classList.toggle('scrolled-to-end', atEnd);
    };
    ul.addEventListener('scroll', update);
    update(); // check on load (no overflow → remove mask immediately)
  });
});
