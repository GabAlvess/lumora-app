export const icon = (name, classes = '') => `<svg class="lm-icon ${classes}" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><use href="/dist/lumora-icons.svg#lm-icon-${name}"></use></svg>`;

export function field({ id, label, type = 'text', glyph, placeholder = '', autocomplete, hint = '', attributes = '' }) {
  const password = type === 'password';
  return `<div class="lm-field">
    <label class="lm-label" for="${id}">${label}</label>
    <div class="lm-control">
      ${icon(glyph)}
      <input class="lm-input" id="${id}" name="${id}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}" required aria-describedby="${hint ? `${id}-hint ` : ''}${id}-error" ${attributes}>
      ${password ? `<button class="lm-button lm-button--icon lm-button--sm lm-button--ghost" type="button" data-toggle-password="${id}" aria-label="Mostrar ${label.toLowerCase()}" aria-pressed="false" aria-controls="${id}">${icon('eye')}</button>` : ''}
    </div>
    ${hint ? `<p class="lm-field__hint" id="${id}-hint">${hint}</p>` : ''}
    <p class="lm-field__error" id="${id}-error" hidden>${icon('circle-alert', 'lm-icon--sm')}<span data-error-text></span></p>
  </div>`;
}

export function providers() {
  return `<div class="lm-divider-label auth-divider">ou continue com</div>
    <div class="auth-providers" role="group" aria-label="Outras formas de acesso">
      ${[['google', 'Google'], ['discord', 'Discord'], ['apple', 'Apple']].map(([id, label]) => `<button class="lm-button lm-button--outline auth-provider auth-provider--${id}" type="button" data-provider="${label}" aria-label="Continuar com ${label}" title="Continuar com ${label}"><svg class="auth-provider__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><use href="/dist/brand-icons.svg#lm-brand-${id}"></use></svg><span>${label}</span></button>`).join('')}
    </div>`;
}
