import { icon, field } from './fields.mjs';

export function renderAuthPage(page) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#244c3b">
  <meta name="description" content="Seu mundo. Sua história. Seu lugar. Conheça o Lumora, um mundo para criar, viver e pertencer.">
  <title>${page.title}</title>
  <link rel="icon" type="image/svg+xml" href="/dist/favicon.svg">
  <link rel="stylesheet" href="/dist/lumora.css">
  <link rel="stylesheet" href="/dist/auth.css">
  <script type="module" src="/dist/auth.js"></script>
</head>
<body class="lm-ui">
  <a href="#auth-content" class="lm-skip-link">Pular para o formulário</a>
  <main class="auth-page auth-page--${page.slug}">
    <section class="auth-panel" aria-labelledby="auth-heading">
      <header class="auth-panel__header">
        <a class="lm-brand auth-brand" href="/login" aria-label="Lumora, início">${icon('leaf')}<span class="lm-brand__wordmark">Lumora</span></a>
        <span class="auth-brand__tagline">Seu mundo. Sua história. Seu lugar.</span>
      </header>
      <div class="auth-panel__main" id="auth-content" tabindex="-1">
        <div class="auth-content">
          <div class="auth-intro"><p class="lm-eyebrow">${page.eyebrow}</p><h1 id="auth-heading">${page.heading}</h1><p>${page.description}</p></div>
          <div class="lm-alert lm-alert--warning" data-js-notice>Ative o JavaScript para experimentar os formulários desta prévia.</div>
          ${page.content}
        </div>
      </div>
      <footer class="auth-panel__footer"><nav aria-label="Informações do Lumora"><button class="auth-text-button" type="button" data-info="terms">Termos de Uso</button><span aria-hidden="true">·</span><button class="auth-text-button" type="button" data-info="privacy">Privacidade</button><span aria-hidden="true">·</span><button class="auth-text-button" type="button" data-info="support">Suporte</button></nav><span class="auth-copyright">© Lumora · Feito para pertencer.</span></footer>
    </section>
    <aside class="auth-world" aria-label="O universo de Lumora">
      <picture class="auth-world__image"><source media="(min-width: 56rem)" srcset="/dist/images/lumora-plaza.png"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Uma praça acolhedora de Lumora, com café, jardins, fonte e personagens se encontrando ao pôr do sol." fetchpriority="high" width="1122" height="1402"></picture>
      <span class="auth-world__tag">${icon('leaf', 'lm-icon--sm')}Um mundo para pertencer</span>
      <div class="auth-world__caption"><span class="auth-world__eyebrow">Crie. Viva. Faça parte.</span><h2>${page.artHeading}</h2><p>${page.artDescription}</p><div class="auth-world__signature">${icon('sparkles', 'lm-icon--sm')}Seu mundo. Sua história. Seu lugar.</div></div>
    </aside>
  </main>
  <dialog class="lm-dialog auth-dialog" id="recovery-dialog" aria-labelledby="recovery-title" aria-describedby="recovery-description">
    <div class="lm-dialog__header"><h2 class="lm-heading lm-heading--md" id="recovery-title">Vamos encontrar seu caminho.</h2><button class="lm-button lm-button--icon lm-button--ghost" type="button" data-close-dialog aria-label="Fechar recuperação de senha">${icon('x')}</button></div>
    <form class="lm-dialog__body lm-stack lm-gap-5" data-auth-form="recovery" method="post" novalidate>
      <p class="lm-caption" id="recovery-description">Informe o e-mail associado à sua conta para recuperar o acesso.</p>
      ${field({ id: 'recovery-email', label: 'E-mail da conta', type: 'email', glyph: 'mail', placeholder: 'voce@exemplo.com', autocomplete: 'email', attributes: 'maxlength="254" inputmode="email"' })}
      <div class="lm-alert lm-alert--info" data-form-status role="status" aria-live="polite" hidden>${icon('info')}<p class="lm-alert__content" data-status-text></p></div>
      <button class="lm-button lm-button--block" type="submit" data-submit disabled>Enviar instruções${icon('arrow-right')}</button>
    </form>
  </dialog>
  <dialog class="lm-dialog auth-dialog" id="info-dialog" aria-labelledby="info-title" aria-describedby="info-description">
    <form method="dialog"><header class="lm-dialog__header"><h2 class="lm-heading lm-heading--md" id="info-title"></h2><button class="lm-button lm-button--icon lm-button--ghost" value="close" aria-label="Fechar informações">${icon('x')}</button></header><div class="lm-dialog__body"><p class="lm-caption" id="info-description"></p></div><footer class="lm-dialog__footer"><button class="lm-button" value="close">Entendi</button></footer></form>
  </dialog>
</body>
</html>\n`;
}
