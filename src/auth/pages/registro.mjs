import { field, icon, providers } from '../fields.mjs';

export const registerPage = {
  slug: 'registro',
  title: 'Criar sua conta no Lumora',
  eyebrow: 'Toda história tem um começo',
  heading: 'O seu começa aqui.',
  description: 'Crie sua identidade. O resto, a gente vive junto.',
  artHeading: 'Um mundo de possibilidades.<br>Um lugar para ser você.',
  artDescription: 'Construa espaços, conheça pessoas e viva novas histórias.',
  content: `<form class="auth-form lm-stack lm-gap-4" id="register-form" data-auth-form="register" method="post" novalidate>
    ${field({ id: 'username', label: 'Nome de usuário', glyph: 'user', placeholder: 'Escolha como será conhecido', autocomplete: 'username', hint: 'De 3 a 20 letras, números ou sublinhados (_).', attributes: 'minlength="3" maxlength="20" autocapitalize="none" spellcheck="false"' })}
    ${field({ id: 'email', label: 'E-mail', type: 'email', glyph: 'mail', placeholder: 'voce@exemplo.com', autocomplete: 'email', attributes: 'maxlength="254" inputmode="email" autocapitalize="none" spellcheck="false"' })}
    ${field({ id: 'password', label: 'Senha', type: 'password', glyph: 'lock-keyhole', placeholder: 'Crie uma senha', autocomplete: 'new-password', hint: 'Use pelo menos 8 caracteres.', attributes: 'minlength="8"' })}
    ${field({ id: 'confirm-password', label: 'Confirmação de senha', type: 'password', glyph: 'shield-check', placeholder: 'Digite a senha novamente', autocomplete: 'new-password' })}
    <p class="auth-legal-note">Conheça nossos <button class="auth-inline-button" type="button" data-info="terms">Termos de Uso</button> e a <button class="auth-inline-button" type="button" data-info="privacy">Política de Privacidade</button>.</p>
    <div class="lm-alert lm-alert--info auth-notice" data-form-status role="status" aria-live="polite" hidden>${icon('info')}<p class="lm-alert__content" data-status-text></p></div>
    <button class="lm-button lm-button--block auth-submit" type="submit" data-submit disabled><span>Criar minha conta</span>${icon('arrow-right')}</button>
  </form>
  ${providers()}
  <p class="auth-switch">Já faz parte do Lumora? <a class="lm-link" href="/login">Entrar ${icon('arrow-up-right', 'lm-icon--sm')}</a></p>`
};
