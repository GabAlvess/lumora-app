// Gallery behavior only. Production apps own component state and business logic.
const sprite = '/dist/lumora-icons.svg';
function renderIcon(svg, name) {
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${sprite}#lm-icon-${name}`);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('focusable', 'false');
  svg.replaceChildren(use);
}
document.querySelectorAll('svg[data-icon]').forEach(svg => renderIcon(svg, svg.dataset.icon));

const toastRegion = document.querySelector('#toast-region');
function notify(message) {
  const toast = document.createElement('div');
  toast.className = 'lm-toast';
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.classList.add('lm-icon', 'lm-text-primary');
  icon.setAttribute('aria-hidden', 'true');
  renderIcon(icon, 'circle-check');
  const content = document.createElement('p');
  content.className = 'lm-toast__content';
  content.textContent = message;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'lm-button lm-button--icon lm-button--sm lm-button--ghost';
  close.setAttribute('aria-label', 'Fechar notificação');
  close.textContent = '×';
  close.addEventListener('click', () => toast.remove());
  toast.append(icon, content, close);
  // Remains available until dismissed; no short time limit for reading.
  toastRegion.replaceChildren(toast);
}
document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', () => {
  notify(button.dataset.toast);
  const dropdown = button.closest('details.lm-dropdown');
  if (dropdown) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
}));
document.querySelector('#demo-form').addEventListener('submit', event => {
  event.preventDefault();
  notify('Demonstração concluída. Nenhum dado de acesso foi enviado ou armazenado.');
});
document.querySelector('#toggle-password').addEventListener('click', event => {
  const button = event.currentTarget;
  const input = document.querySelector('#demo-password');
  const reveal = input.type === 'password';
  input.type = reveal ? 'text' : 'password';
  button.setAttribute('aria-pressed', String(reveal));
  button.setAttribute('aria-label', reveal ? 'Ocultar senha' : 'Mostrar senha');
  renderIcon(button.querySelector('svg'), reveal ? 'eye-off' : 'eye');
});

document.querySelectorAll('[role="tablist"]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  function activate(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  }
  list.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) activate(tab);
  });
  list.addEventListener('keydown', event => {
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs.at(-1);
    if (next) { event.preventDefault(); activate(next); next.focus(); }
  });
});
document.querySelectorAll('[data-chip]').forEach(chip => chip.addEventListener('click', () => chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'))));
for (const selector of ['[data-view]', '[data-item]']) {
  document.querySelectorAll(selector).forEach(button => button.addEventListener('click', () => {
    button.parentElement.querySelectorAll(selector).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
}
const pages = [...document.querySelectorAll('[data-page]')];
pages.forEach(button => button.addEventListener('click', () => {
  pages.forEach(item => item.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'page');
  notify(`Página ${button.dataset.page} selecionada na demonstração.`);
}));

document.querySelectorAll('[role="toolbar"]').forEach(toolbar => {
  const buttons = [...toolbar.querySelectorAll('button:not(:disabled)')];
  buttons.forEach((button, index) => { button.tabIndex = index === 0 ? 0 : -1; });
  toolbar.addEventListener('keydown', event => {
    const index = buttons.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = buttons[(index + 1) % buttons.length];
    if (event.key === 'ArrowLeft') next = buttons[(index - 1 + buttons.length) % buttons.length];
    if (event.key === 'Home') next = buttons[0];
    if (event.key === 'End') next = buttons.at(-1);
    if (next) {
      event.preventDefault();
      buttons.forEach(button => { button.tabIndex = button === next ? 0 : -1; });
      next.focus();
    }
  });
});

const dialog = document.querySelector('#demo-dialog');
document.querySelector('#open-dialog').addEventListener('click', () => dialog.showModal());
// Keep Tab cycling through dialog controls, including browsers that expose browser chrome.
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')].filter(control => control.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
document.querySelectorAll('[data-tooltip]').forEach(anchor => {
  const tooltip = anchor.querySelector('[role="tooltip"]');
  anchor.addEventListener('mouseenter', () => { tooltip.hidden = false; });
  anchor.addEventListener('mouseleave', () => { if (!anchor.contains(document.activeElement)) tooltip.hidden = true; });
  anchor.addEventListener('focusin', () => { tooltip.hidden = false; });
  anchor.addEventListener('focusout', () => { tooltip.hidden = true; });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('[role="tooltip"]').forEach(tooltip => { tooltip.hidden = true; });
  document.querySelectorAll('details.lm-dropdown[open]').forEach(dropdown => { dropdown.open = false; dropdown.querySelector('summary').focus(); });
});

const sections = [...document.querySelectorAll('main > section[id]')];
const sidebarLinks = [...document.querySelectorAll('.ds-sidebar .lm-nav__item')];
const observer = new IntersectionObserver(entries => {
  const visible = entries.find(entry => entry.isIntersecting);
  if (!visible) return;
  sidebarLinks.forEach(link => {
    if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-5% 0px -75% 0px' });
sections.forEach(section => observer.observe(section));

const search = document.querySelector('#icon-search');
const grid = document.querySelector('#icon-grid');
const count = document.querySelector('#icon-count');
try {
  const response = await fetch('/dist/icons.json');
  if (!response.ok) throw new Error('Icon catalog unavailable');
  const icons = await response.json();
  function filterIcons() {
    const query = search.value.trim().toLowerCase();
    const matches = icons.filter(name => name.includes(query));
    grid.replaceChildren(...matches.map(name => {
      const item = document.createElement('div');
      item.className = 'ds-icon';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('lm-icon', 'lm-icon--lg');
      svg.setAttribute('aria-hidden', 'true');
      renderIcon(svg, name);
      const label = document.createElement('code');
      label.textContent = name;
      item.append(svg, label);
      return item;
    }));
    count.textContent = `${matches.length} de ${icons.length} ícones`;
    document.querySelector('#icon-empty').hidden = matches.length > 0;
  }
  search.addEventListener('input', filterIcons);
  filterIcons();
} catch {
  count.textContent = 'Não foi possível carregar o catálogo. Execute npm run build e recarregue.';
}
