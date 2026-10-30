import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('a entrada abre o login e a navegação entre login e registro funciona', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page).toHaveTitle('Entrar no Lumora');
  await expect(page.getByRole('heading', { name: 'Bem-vindo de volta.' })).toBeVisible();
  await page.getByRole('link', { name: 'Criar conta', exact: true }).click();
  await expect(page).toHaveURL(/\/registro$/);
  await expect(page).toHaveTitle('Criar sua conta no Lumora');
  await page.getByRole('link', { name: 'Entrar', exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  for (const path of ['/dist/auth.css', '/dist/auth.js', '/dist/brand-icons.svg', '/dist/images/lumora-plaza.png', '/dist/favicon.svg']) expect((await request.get(path)).ok(), path).toBe(true);
  expect((await request.post('/login', { data: {} })).status()).toBe(405);
  expect(errors).toEqual([]);
});

test('login valida campos, mostra senha e informa disponibilidade sem criar sessão', async ({ page }) => {
  const posts = [];
  page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await expect(page.getByLabel('Usuário ou e-mail')).toBeFocused();
  await expect(page.locator('#identifier-error')).toContainText('Informe seu usuário ou e-mail.');
  await page.getByLabel('Usuário ou e-mail').fill('luz_do_vale');
  await expect(page.locator('#identifier-error')).toBeHidden();
  await page.getByLabel('Senha', { exact: true }).fill('senha-ficticia');
  await page.getByRole('button', { name: 'Mostrar senha', exact: true }).click();
  await expect(page.locator('#password')).toHaveAttribute('type', 'text');
  await page.getByRole('button', { name: 'Ocultar senha', exact: true }).click();
  await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  await page.getByLabel('Lembrar de mim').check();
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await expect(page.locator('#login-form [role="status"]')).toContainText('O acesso às contas será liberado em breve.');
  expect(posts).toEqual([]);
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
  expect(new URL(page.url()).search).toBe('');
});

test('registro valida nome, e-mail, senha e confirmação sem fingir criação de conta', async ({ page }) => {
  await page.goto('/registro');
  await page.getByRole('button', { name: 'Criar minha conta' }).click();
  await expect(page.getByLabel('Nome de usuário', { exact: true })).toBeFocused();
  await page.getByLabel('Nome de usuário', { exact: true }).fill('L!');
  await page.getByLabel('E-mail', { exact: true }).fill('email-invalido');
  await page.getByLabel('Senha', { exact: true }).fill('curta');
  await page.getByLabel('Confirmação de senha', { exact: true }).fill('outra');
  await page.getByRole('button', { name: 'Criar minha conta' }).click();
  await expect(page.locator('#username-error')).toContainText('Use entre 3 e 20 caracteres.');
  await expect(page.locator('#email-error')).toContainText('Digite um e-mail válido');
  await expect(page.locator('#password-error')).toContainText('pelo menos 8 caracteres');
  await expect(page.locator('#confirm-password-error')).toContainText('As senhas precisam ser iguais.');
  await page.getByLabel('Nome de usuário', { exact: true }).fill('Luz_do_Vale');
  await page.getByLabel('E-mail', { exact: true }).fill('exemplo@example.com');
  await page.getByLabel('Senha', { exact: true }).fill('senha-ficticia');
  await page.getByLabel('Confirmação de senha', { exact: true }).fill('senha-ficticia');
  await page.getByRole('button', { name: 'Criar minha conta' }).click();
  await expect(page.locator('#register-form [role="status"]')).toContainText('A criação de contas ainda não está disponível.');
  await expect(page.locator('#register-form [aria-invalid="true"]')).toHaveCount(0);
  await page.getByLabel('Senha', { exact: true }).fill('nova-senha-diferente');
  await expect(page.locator('#confirm-password-error')).toBeVisible();
});

test('recuperação valida e-mail, respeita o foco e não promete envio inexistente', async ({ page }) => {
  await page.goto('/login');
  const trigger = page.getByRole('button', { name: 'Esqueceu sua senha?' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Vamos encontrar seu caminho.' });
  await expect(page.getByLabel('E-mail da conta')).toBeFocused();
  await page.getByRole('button', { name: 'Enviar instruções' }).click();
  await expect(page.locator('#recovery-email-error')).toBeVisible();
  await page.getByLabel('E-mail da conta').fill('exemplo@example.com');
  await page.getByRole('button', { name: 'Enviar instruções' }).click();
  await expect(dialog.getByRole('status')).toContainText('Nenhum e-mail foi enviado.');
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByLabel('E-mail da conta')).toHaveValue('');
});

test('provedores e informações têm feedback; não há links sem destino', async ({ page }) => {
  await page.goto('/login');
  for (const provider of ['Google', 'Discord', 'Apple']) {
    await page.getByRole('button', { name: `Continuar com ${provider}` }).click();
    await expect(page.locator('#login-form [role="status"]')).toContainText(`O acesso com ${provider} estará disponível em breve.`);
  }
  await page.getByRole('button', { name: 'Termos de Uso', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Termos de Uso' })).toContainText('antes da abertura de contas');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Privacidade', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('não enviam nem armazenam');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Suporte', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('preparando os canais de atendimento');
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});

test('sem JavaScript os formulários não submetem credenciais por fallback', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/registro');
  await expect(page.getByRole('button', { name: 'Criar minha conta' })).toBeDisabled();
  await expect(page.getByText('Ative o JavaScript para experimentar os formulários desta prévia.')).toBeVisible();
  await expect(page.locator('#register-form')).toHaveAttribute('method', 'post');
  await context.close();
});

for (const route of ['/login', '/registro']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`${route} é responsivo em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const artRequests = [];
      page.on('request', request => { if (request.url().includes('lumora-plaza.png')) artRequests.push(request.url()); });
      await page.goto(route);
      await expect(page.locator('[data-submit]').first()).toBeEnabled();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      if (width < 896) {
        await expect(page.locator('.auth-world')).toBeHidden();
        expect(artRequests).toEqual([]);
      } else {
        await expect(page.locator('.auth-world')).toBeVisible();
        expect(await page.locator('.auth-world img').evaluate(image => image.naturalWidth)).toBeGreaterThan(1000);
      }
    });
  }
  test(`${route} passa na auditoria automatizada de acessibilidade`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('[data-submit]').first()).toBeEnabled();
    await page.evaluate(() => document.fonts.ready);
    const audit = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect((await audit()).violations).toEqual([]);
    await page.locator('[data-submit]').first().click();
    expect((await audit()).violations).toEqual([]);
    await page.setViewportSize({ width: 390, height: 844 });
    expect((await audit()).violations).toEqual([]);
  });
}
