/** Framework-independent navigation; application data and actions remain with the game. */
export function initPlayerPhone(root) {
  const dialog = root.querySelector('dialog.lm-phone');
  const launcher = root.querySelector('[data-phone-open]');
  const title = dialog?.querySelector('[data-phone-title]');
  const views = [...(dialog?.querySelectorAll('[data-phone-view]') || [])];
  const home = views.find(view => view.dataset.phoneView === 'home');
  if (!dialog || !launcher || !title || !home) throw new Error('PlayerPhone requires a launcher, dialog, title and home view.');

  const abort = new AbortController();
  const options = { signal: abort.signal };
  let current = 'home';
  let history = [];
  let returnFocus = launcher;
  let destroyed = false;
  const emit = (name, detail = {}) => root.dispatchEvent(new CustomEvent(`lm:phone-${name}`, { bubbles: true, detail: { view: current, ...detail } }));

  function render({ focus = false } = {}) {
    const active = views.find(view => view.dataset.phoneView === current);
    views.forEach(view => { view.hidden = view !== active; });
    title.textContent = active.dataset.phoneLabel || 'Seu celular';
    dialog.querySelectorAll('[data-phone-back]').forEach(button => { button.hidden = history.length === 0; });
    const content = dialog.querySelector('.lm-phone__content');
    if (content) content.scrollTop = 0;
    if (focus && dialog.open) title.focus({ preventScroll: true });
  }

  function navigate(view) {
    if (destroyed || !views.some(panel => panel.dataset.phoneView === view)) return false;
    if (view === current) return true;
    if (view === 'home') history = [];
    else history.push(current);
    current = view;
    render({ focus: true });
    emit('navigate');
    return true;
  }
  function back() {
    if (destroyed || !history.length) return false;
    current = history.pop();
    render({ focus: true });
    emit('navigate');
    return true;
  }
  function open() {
    if (destroyed || dialog.open) return;
    returnFocus = root.ownerDocument.activeElement;
    dialog.showModal();
    launcher.setAttribute('aria-expanded', 'true');
    render({ focus: true });
    emit('open');
  }
  function close() {
    if (!destroyed && dialog.open) { dialog.close(); finishClose(); }
  }
  launcher.setAttribute('aria-expanded', String(dialog.open));
  render();
  launcher.addEventListener('click', open, options);
  dialog.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-phone-close')) close();
    else if (button.hasAttribute('data-phone-home')) navigate('home');
    else if (button.hasAttribute('data-phone-back')) back();
    else if (button.dataset.phoneGo) navigate(button.dataset.phoneGo);
  }, options);
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    if (!back()) close();
  }, options);
  function finishClose() {
    if (dialog.open || launcher.getAttribute('aria-expanded') !== 'true') return;
    launcher.setAttribute('aria-expanded', 'false');
    if (returnFocus?.isConnected && typeof returnFocus.focus === 'function') returnFocus.focus({ preventScroll: true });
    else launcher.focus({ preventScroll: true });
    emit('close');
  }
  dialog.addEventListener('close', finishClose, options);
  dialog.addEventListener('keydown', event => {
    // Game input handlers must also honor the open/close events, especially capture listeners.
    event.stopPropagation();
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex]:not([tabindex="-1"])')]
      .filter(element => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    const active = root.ownerDocument.activeElement;
    if (!first) { event.preventDefault(); title.focus(); }
    else if (event.shiftKey && (active === first || active === title)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && active === last) { event.preventDefault(); first.focus(); }
  }, options);
  dialog.addEventListener('keyup', event => event.stopPropagation(), options);

  return {
    open, close, navigate, back,
    get currentView() { return current; },
    destroy() { close(); finishClose(); abort.abort(); destroyed = true; launcher.setAttribute('aria-expanded', 'false'); }
  };
}
