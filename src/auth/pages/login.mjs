import { field, icon, providers } from '../fields.mjs';

export const loginPage = {
  slug: 'login',
  title: 'Entrar no Lumora',
  eyebrow: 'Seu lugar está aqui',
  heading: 'Bem-vindo de volta.',
  description: 'Novas histórias e velhos amigos esperam por você.',
  artHeading: 'Todo encontro pode ser<br>o começo de uma história.',
  artDescription: 'Crie, explore e encontre o seu lugar no mundo.',
  content: `<form class="auth-form lm-stack lm-gap-5" id="login-form" data-auth-form="login" method="post" novalidate>
    ${field({ id: 'identifier', label: 'Usuário ou e-mail', glyph: 'user', placeholder: 'Como podemos chamar você?', autocomplete: 'username', attributes: 'maxlength="254" autocapitalize="none" spellcheck="false"' })}
    ${field({ id: 'password', label: 'Senha', type: 'password', glyph: 'lock-keyhole', placeholder: 'Digite sua senha', autocomplete: 'current-password' })}
    <div class="auth-options lm-between">
      <label class="lm-choice"><input class="lm-checkbox" type="checkbox" id="remember" name="remember">Lembrar de mim</label>
      <button class="auth-text-button" type="button" data-open-recovery>Esqueceu sua senha?</button>
    </div>
    <div class="lm-alert lm-alert--info auth-notice" data-form-status role="status" aria-live="polite" hidden>${icon('info')}<p class="lm-alert__content" data-status-text></p></div>
    <button class="lm-button lm-button--block auth-submit" type="submit" data-submit disabled><span>Entrar</span>${icon('arrow-right')}</button>
  </form>
  ${providers()}
  <p class="auth-switch">Ainda não tem uma conta? <a class="lm-link" href="/registro">Criar conta ${icon('arrow-up-right', 'lm-icon--sm')}</a></p>`
};
