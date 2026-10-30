// UI behavior only. No network requests, credential storage or simulated sessions.
const forms = [...document.querySelectorAll('[data-auth-form]')];
document.querySelector('[data-js-notice]').hidden = true;

function showStatus(form, message) {
  const status = form.querySelector('[data-form-status]');
  status.hidden = false;
  status.querySelector('[data-status-text]').textContent = message;
}

function setError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  error.hidden = !message;
  error.querySelector('[data-error-text]').textContent = message;
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}

function validate(input) {
  const value = input.type === 'password' || input.autocomplete.includes('password') ? input.value : input.value.trim();
  if (!value) {
    const messages = { identifier: 'Informe seu usuário ou e-mail.', username: 'Escolha um nome de usuário.', email: 'Informe seu e-mail.', password: 'Informe sua senha.', 'confirm-password': 'Confirme sua senha.', 'recovery-email': 'Informe o e-mail da sua conta.' };
    return messages[input.id] || 'Preencha este campo.';
  }
  if (input.type === 'email' && input.validity.typeMismatch) return 'Digite um e-mail válido, como voce@exemplo.com.';
  if (input.id === 'username') {
    if ([...value].length < 3 || [...value].length > 20) return 'Use entre 3 e 20 caracteres.';
    if (!/^[\p{L}\p{N}_]+$/u.test(value)) return 'Use apenas letras, números ou sublinhados (_).';
  }
  if (input.id === 'password' && input.closest('form').dataset.authForm === 'register' && [...value].length < 8) return 'Sua senha precisa ter pelo menos 8 caracteres.';
  if (input.id === 'confirm-password' && value !== input.form.querySelector('#password').value) return 'As senhas precisam ser iguais.';
  return '';
}

const availability = {
  login: 'O Lumora está em preparação. O acesso às contas será liberado em breve.',
  register: 'Estamos preparando o seu novo mundo. A criação de contas ainda não está disponível.',
  recovery: 'O envio de instruções estará disponível quando o acesso às contas for liberado. Nenhum e-mail foi enviado.'
};

for (const form of forms) {
  const inputs = [...form.querySelectorAll('input[required]')];
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('[data-form-status]').hidden = true;
    let firstInvalid;
    for (const input of inputs) {
      const message = validate(input);
      setError(input, message);
      if (message && !firstInvalid) firstInvalid = input;
    }
    if (firstInvalid) { firstInvalid.focus(); return; }
    showStatus(form, availability[form.dataset.authForm]);
  });
  for (const input of inputs) {
    input.addEventListener('blur', () => { input.dataset.visited = 'true'; setError(input, validate(input)); });
    input.addEventListener('input', () => {
      form.querySelector('[data-form-status]').hidden = true;
      if (input.dataset.visited || input.getAttribute('aria-invalid') === 'true') setError(input, validate(input));
      if (input.id === 'password') {
        const confirmation = form.querySelector('#confirm-password');
        if (confirmation?.dataset.visited) setError(confirmation, validate(confirmation));
      }
    });
  }
  // Attach the handler before enabling submission; no unhandled form fallback.
  form.querySelector('[data-submit]').disabled = false;
}

document.querySelectorAll('[data-toggle-password]').forEach(button => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.togglePassword);
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(reveal));
    const label = document.querySelector(`label[for="${input.id}"]`).textContent.toLowerCase();
    button.setAttribute('aria-label', `${reveal ? 'Ocultar' : 'Mostrar'} ${label}`);
    button.querySelector('use').setAttribute('href', `/dist/lumora-icons.svg#lm-icon-${reveal ? 'eye-off' : 'eye'}`);
  });
});

document.querySelectorAll('[data-provider]').forEach(button => {
  button.addEventListener('click', () => {
    const form = document.querySelector('main [data-auth-form]');
    showStatus(form, `O acesso com ${button.dataset.provider} estará disponível em breve.`);
  });
});

const recovery = document.getElementById('recovery-dialog');
document.querySelector('[data-open-recovery]')?.addEventListener('click', () => {
  recovery.showModal();
  recovery.querySelector('input').focus();
});
document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
recovery.addEventListener('close', () => {
  const form = recovery.querySelector('form');
  form.reset();
  form.querySelector('[data-form-status]').hidden = true;
  form.querySelectorAll('input').forEach(input => { setError(input, ''); delete input.dataset.visited; });
});

const info = {
  terms: { title: 'Termos de Uso', text: 'Estamos preparando os Termos de Uso da comunidade Lumora. Eles estarão disponíveis antes da abertura de contas. Nesta prévia, nenhuma conta é criada.' },
  privacy: { title: 'Sua privacidade importa.', text: 'Nesta prévia, os formulários não enviam nem armazenam os dados preenchidos. A Política de Privacidade completa será publicada antes da abertura de contas.' },
  support: { title: 'Estamos por perto.', text: 'Estamos preparando os canais de atendimento do Lumora. Em breve você encontrará aqui os caminhos para falar com nossa equipe.' }
};
const infoDialog = document.getElementById('info-dialog');
document.querySelectorAll('[data-info]').forEach(button => {
  button.addEventListener('click', () => {
    const content = info[button.dataset.info];
    infoDialog.querySelector('#info-title').textContent = content.title;
    infoDialog.querySelector('#info-description').textContent = content.text;
    infoDialog.showModal();
  });
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')].filter(control => control.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
});

// Clear form values when navigating away; nothing is retained by the application.
window.addEventListener('pagehide', () => forms.forEach(form => form.reset()));
