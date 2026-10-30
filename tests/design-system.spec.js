import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/design-system');
  await expect(page.locator('#icon-count')).toHaveText('94 de 94 ícones');
});

test('assets locais, CSS e catálogo carregam sem erros de execução', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.reload();
  await expect(page.locator('#icon-grid .ds-icon')).toHaveCount(94);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('500 16px Manrope'))).toBe(true);
  for (const path of ['/dist/lumora.css', '/dist/lumora.min.css', '/dist/lumora-icons.svg', '/dist/fonts/manrope-latin-wght-normal.woff2']) {
    expect((await request.get(path)).ok(), path).toBe(true);
  }
  expect((await request.get('/.git/config')).status()).toBe(404);
  expect((await request.get('/node_modules/sass/package.json')).status()).toBe(404);
  expect((await request.get('/examples/%2e%2e%2f.git/config')).status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Seu mundo. Sua identidade.' })).toBeVisible();
  await expect(page.locator('.ds-hero .lm-button')).toHaveCSS('background-color', 'rgb(36, 76, 59)');
  expect(errors).toEqual([]);
});

test('formulário valida e demonstra estados sem enviar ou armazenar dados', async ({ page }) => {
  let submitted = false;
  page.on('request', request => { if (request.method() === 'POST') submitted = true; });
  const email = page.getByLabel('E-mail', { exact: true });
  const password = page.getByLabel('Senha de exemplo', { exact: true });
  await page.getByRole('button', { name: 'Experimentar acesso' }).click();
  expect(await email.evaluate(input => input.validity.valueMissing)).toBe(true);
  await email.fill('exemplo@example.com');
  await password.fill('exemplo123');
  await page.getByRole('button', { name: 'Mostrar senha', exact: true }).click();
  await expect(password).toHaveAttribute('type', 'text');
  await page.getByRole('button', { name: 'Ocultar senha', exact: true }).click();
  await expect(password).toHaveAttribute('type', 'password');
  await page.getByLabel('Lembrar de mim').check();
  await expect(page.getByLabel('Lembrar de mim')).toBeChecked();
  await page.getByRole('button', { name: 'Experimentar acesso' }).click();
  await expect(page.getByRole('status', { name: 'Notificações de exemplo' })).toContainText('Nenhum dado de acesso foi enviado ou armazenado');
  await expect(page.getByLabel('Campo indisponível')).toBeDisabled();
  await expect(page.getByLabel('Nome de personagem')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Nome de personagem')).toHaveCSS('height', '48px');
  await expect(page.locator('.lm-control').filter({ has: email })).toHaveCSS('height', '48px');
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
  expect(submitted).toBe(false);
});

test('navegação por teclado mantém foco, abas e painel sincronizados', async ({ page }) => {
  const spaces = page.getByRole('tab', { name: 'Espaços', exact: true });
  await spaces.focus();
  await page.keyboard.press('ArrowRight');
  const events = page.getByRole('tab', { name: 'Eventos', exact: true });
  await expect(events).toBeFocused();
  await expect(events).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#panel-spaces')).toBeHidden();
  await expect(page.locator('#panel-events')).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Comunidades', exact: true })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(spaces).toBeFocused();
  await expect(spaces).toHaveCSS('outline-style', 'solid');
  const move = page.getByRole('button', { name: 'Mover item' });
  await move.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: 'Girar item' })).toBeFocused();
});

test('diálogo nativo prende o foco, fecha com Escape e devolve foco ao acionador', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Abrir diálogo' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('busca de ícones, escolhas e menus funcionam', async ({ page }) => {
  const search = page.getByLabel('Buscar ícone pelo nome');
  await search.fill('coffee');
  await expect(page.locator('#icon-grid .ds-icon')).toHaveCount(1);
  await expect(page.locator('#icon-grid')).toContainText('coffee');
  await search.fill('icone-inexistente');
  await expect(page.locator('#icon-empty')).toBeVisible();
  await search.clear();
  await expect(page.locator('#icon-grid .ds-icon')).toHaveCount(94);
  await page.getByRole('switch', { name: 'Receber notificações' }).uncheck();
  await expect(page.getByRole('switch', { name: 'Receber notificações' })).not.toBeChecked();
  await page.getByRole('button', { name: 'Luminária', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Luminária', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Poltrona', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await page.locator('.lm-dropdown > summary').click();
  await expect(page.getByRole('button', { name: 'Editar espaço', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Editar espaço', exact: true })).toBeHidden();
});

for (const width of [320, 390, 768, 1440]) {
  test(`a galeria não transborda em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(overflow).toBe(false);
    await page.getByRole('button', { name: 'Abrir diálogo' }).click();
    const box = await page.getByRole('dialog').boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    await page.keyboard.press('Escape');
  });
}

test('respeita movimento reduzido e mantém contraste do texto e das ações', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const duration = await page.locator('.lm-spinner').first().evaluate(element => parseFloat(getComputedStyle(element).animationDuration));
  expect(duration).toBeLessThan(.001);
  const contrasts = await page.evaluate(() => {
    function luminance(color) {
      const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4);
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    }
    const targets = [document.body, document.querySelector('.ds-hero .lm-button')];
    return targets.map(element => {
      const style = getComputedStyle(element);
      const values = [luminance(style.color), luminance(style.backgroundColor)].sort((a, b) => b - a);
      return (values[0] + .05) / (values[1] + .05);
    });
  });
  contrasts.forEach(contrast => expect(contrast).toBeGreaterThanOrEqual(4.5));
});

test('galeria e diálogo passam nas verificações automatizadas WCAG 2.2 AA', async ({ page }) => {
  const audit = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  const gallery = await audit();
  expect(gallery.violations).toEqual([]);
  await page.getByRole('button', { name: 'Abrir diálogo' }).click();
  const modal = await audit();
  expect(modal.violations).toEqual([]);
});
