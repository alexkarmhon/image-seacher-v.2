import '../sass/main.scss';
const switcher = document.getElementById('theme-switch-toggle');
const body = document.querySelector('body');

const { DARK, LIGHT } = {
  DARK: 'dark-theme',
  LIGHT: 'light-theme'
}

let pageTheme = localStorage.getItem('page-theme') || LIGHT;
body.classList.add(pageTheme);
switcher.checked = pageTheme === DARK;

function onSwitchChange() {
  body.classList.toggle(LIGHT);
  body.classList.toggle(DARK);

  pageTheme = pageTheme === LIGHT ? DARK : LIGHT;
  localStorage.setItem('page-theme', pageTheme)
}

switcher.addEventListener('change', onSwitchChange)