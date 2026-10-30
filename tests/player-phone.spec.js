import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/design-system');
  await expect(page.locator('#icon-count')).toHaveText('95 de 95 ícones');
});

const phone = page => page.locator('#phone-dialog');
const app = (page, name) => phone(page).getByRole('button', { name, exact: true });
const settle = locator => locator.evaluate(element => Promise.allSettled(element.getAnimations().map(animation => animation.finished)));
const open = async page => {
  await page.locator('#phone-launcher').click();
  await settle(phone(page));
};

test('os cinco aplicativos navegam dentro do aparelho, sem mudar a URL', async ({ page }) => {
  const url = page.url();
  await open(page);
  await expect(phone(page).getByRole('heading', { name: 'Seu celular' })).toBeFocused();
  for (const name of ['Amigos', 'Quartos', 'Personagem', 'Loja', 'Configurações']) {
    await app(page, name).click();
    await expect(phone(page).getByRole('heading', { name, exact: true })).toBeFocused();
    await expect(phone(page).locator('[data-phone-view]:visible')).toHaveCount(1);
    expect(page.url()).toBe(url);
    await phone(page).getByRole('button', { name: 'Ir ao início do celular' }).click();
  }
  await app(page, 'Loja').click();
  await phone(page).getByRole('button', { name: 'Fechar celular' }).click();
  await expect(page.locator('#phone-launcher')).toBeFocused();
  await expect(page.locator('#phone-launcher')).toHaveAttribute('aria-expanded', 'false');
  await open(page);
  await expect(phone(page).getByRole('heading', { name: 'Loja', exact: true })).toBeFocused();
});

test('teclado permanece no celular e Escape volta antes de fechar', async ({ page }) => {
  await page.getByRole('button', { name: 'Experimentar celular' }).click();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await phone(page).evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await app(page, 'Amigos').click();
  await page.keyboard.press('Shift+Tab');
  await expect(phone(page).getByRole('button', { name: 'Ir ao início do celular' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(phone(page).getByRole('heading', { name: 'Seu celular' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(phone(page)).toBeHidden();
  await expect(page.getByRole('button', { name: 'Experimentar celular' })).toBeFocused();
});

test('amigos têm busca, carregamento, vazio, erro e recuperação', async ({ page }) => {
  await open(page);
  await app(page, 'Amigos').click();
  const search = phone(page).getByLabel('Buscar amigos');
  await search.fill('LIA');
  await expect(phone(page).locator('[data-phone-friend]:visible')).toHaveCount(1);
  await search.fill('inexistente');
  await expect(page.locator('#phone-friend-empty')).toContainText('Nenhum amigo encontrado');
  await search.clear();
  await phone(page).getByText('Estados da lista · demonstração', { exact: true }).click();
  const state = phone(page).getByLabel('Estado de exemplo');
  await state.selectOption('loading');
  await expect(page.locator('#phone-friend-results')).toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('#phone-friend-loading')).toBeVisible();
  await state.selectOption('empty');
  await expect(page.locator('#phone-friend-empty')).toContainText('ainda está vazia');
  await state.selectOption('error');
  await expect(page.locator('#phone-friend-error')).toBeVisible();
  await phone(page).getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(search).toBeFocused();
  await expect(page.locator('#phone-friend-results')).toHaveAttribute('aria-busy', 'false');
  await expect(phone(page).locator('[data-phone-friend]:visible')).toHaveCount(3);
});

test('prévia de personagem, loja e configurações usam estado local sem compras', async ({ page }) => {
  const posts = [];
  page.on('request', request => { if (request.method() !== 'GET') posts.push(request.url()); });
  await open(page);
  await app(page, 'Personagem').click();
  await app(page, 'Lilás').click();
  await expect(page.locator('#phone-avatar-preview')).toHaveAttribute('data-tone', 'accent');
  await expect(app(page, 'Floresta')).toHaveAttribute('aria-pressed', 'false');
  await phone(page).getByRole('button', { name: 'Ir ao início do celular' }).click();
  await app(page, 'Loja').click();
  await app(page, 'Planta').click();
  await app(page, 'Experimentar item').click();
  await expect(page.locator('#phone-demo-notice')).toContainText('Planta: prévia selecionada. Nenhuma compra');
  await phone(page).getByRole('button', { name: 'Ir ao início do celular' }).click();
  await app(page, 'Configurações').click();
  await phone(page).getByRole('switch', { name: 'Música ambiente' }).uncheck();
  await phone(page).getByText('Exibição e acessibilidade', { exact: true }).click();
  await phone(page).getByLabel('Qualidade gráfica').selectOption('Baixa');
  await phone(page).getByRole('button', { name: 'Fechar celular' }).click();
  await open(page);
  await expect(phone(page).getByRole('switch', { name: 'Música ambiente' })).not.toBeChecked();
  await expect(phone(page).getByLabel('Qualidade gráfica')).toHaveValue('Baixa');
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
  expect(posts).toEqual([]);
});

for (const [width, height] of [[320, 640], [390, 844], [768, 900], [1440, 1000], [667, 320]]) {
  test(`aparelho e navegação cabem em ${width} × ${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await open(page);
    const box = await phone(page).boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    expect(box.y + box.height).toBeLessThanOrEqual(height);
    expect(width - box.x - box.width).toBeLessThanOrEqual(17);
    expect(height - box.y - box.height).toBeLessThanOrEqual(17);
    await app(page, 'Configurações').click();
    await expect(phone(page).getByRole('button', { name: 'Fechar celular' })).toBeInViewport();
    await expect(phone(page).getByRole('button', { name: 'Ir ao início do celular' })).toBeInViewport();
    expect(await phone(page).locator('.lm-phone__content').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  });
}

test('as telas do celular passam na auditoria automatizada WCAG 2.2 AA', async ({ page }) => {
  await open(page);
  const audit = async () => {
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(result.violations).toEqual([]);
  };
  await audit();
  for (const name of ['Amigos', 'Quartos', 'Personagem', 'Loja', 'Configurações']) {
    await app(page, name).click();
    if (name === 'Configurações') await phone(page).getByText('Exibição e acessibilidade', { exact: true }).click();
    await audit();
    await phone(page).getByRole('button', { name: 'Ir ao início do celular' }).click();
  }
});

test('API emite eventos, rejeita rotas desconhecidas e libera controles ao desmontar', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const { initPlayerPhone } = await import('/dist/player-phone.mjs');
    const root = document.createElement('div');
    root.innerHTML = '<button data-phone-open>Fixture</button><dialog class="lm-phone" aria-label="Fixture"><h2 data-phone-title tabindex="-1"></h2><button data-phone-close>Fechar</button><section data-phone-view="home"></section><section data-phone-view="other" hidden></section></dialog>';
    document.body.append(root);
    const events = [];
    for (const name of ['open', 'navigate', 'close']) root.addEventListener(`lm:phone-${name}`, event => events.push([name, event.detail.view]));
    const controller = initPlayerPhone(root);
    controller.open();
    const unknown = controller.navigate('missing');
    controller.navigate('other');
    const current = controller.currentView;
    await Promise.allSettled(root.querySelector('dialog').getAnimations().map(animation => animation.finished));
    controller.close();
    await Promise.allSettled(root.querySelector('dialog').getAnimations().map(animation => animation.finished));
    controller.open();
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const reopened = root.querySelector('dialog').open && root.querySelector('[data-phone-open]').getAttribute('aria-expanded') === 'true';
    controller.destroy();
    controller.open();
    const stillClosed = !root.querySelector('dialog').open;
    const afterDestroy = controller.navigate('home');
    root.remove();
    return { unknown, current, reopened, stillClosed, afterDestroy, events };
  });
  expect(result).toEqual({ unknown: false, current: 'other', reopened: true, stillClosed: true, afterDestroy: false, events: [['open', 'home'], ['navigate', 'other'], ['close', 'other'], ['open', 'other'], ['close', 'other']] });
});

test('o celular sobe ao entrar e só fecha depois de descer para fora da tela', async ({ page }) => {
  const entry = await page.evaluate(() => {
    document.querySelector('#phone-launcher').focus();
    document.querySelector('#phone-launcher').click();
    const dialog = document.querySelector('#phone-dialog');
    const animation = dialog.getAnimations().find(item => item.transitionProperty === 'transform');
    animation.pause();
    animation.currentTime = 0;
    const start = dialog.getBoundingClientRect().top;
    animation.currentTime = Number(animation.effect.getTiming().duration) / 2;
    const middle = dialog.getBoundingClientRect().top;
    animation.finish();
    return { start, middle, end: dialog.getBoundingClientRect().top, height: innerHeight };
  });
  expect(entry.start).toBeGreaterThanOrEqual(entry.height);
  expect(entry.middle).toBeLessThan(entry.start);
  expect(entry.middle).toBeGreaterThan(entry.end);
  const exit = await page.evaluate(() => {
    const root = document.querySelector('#player-phone');
    window.phoneClosed = false;
    root.addEventListener('lm:phone-close', () => { window.phoneClosed = true; }, { once: true });
    const dialog = root.querySelector('dialog');
    dialog.querySelector('[data-phone-close]').click();
    const animation = dialog.getAnimations().find(item => item.transitionProperty === 'transform');
    animation.pause();
    animation.currentTime = 0;
    const start = dialog.getBoundingClientRect().top;
    animation.currentTime = Number(animation.effect.getTiming().duration) / 2;
    const middle = dialog.getBoundingClientRect().top;
    const during = { open: dialog.open, announcedClose: window.phoneClosed, expanded: root.querySelector('[data-phone-open]').getAttribute('aria-expanded'), focusInside: dialog.contains(document.activeElement) };
    animation.finish();
    return { start, middle, end: dialog.getBoundingClientRect().top, height: innerHeight, during };
  });
  expect(exit.middle).toBeGreaterThan(exit.start);
  expect(exit.middle).toBeLessThan(exit.end);
  expect(exit.end).toBeGreaterThanOrEqual(exit.height);
  expect(exit.during).toEqual({ open: true, announcedClose: false, expanded: 'true', focusInside: true });
  await expect(phone(page)).toBeHidden();
  await expect(page.locator('#phone-launcher')).toBeFocused();
  expect(await page.evaluate(() => window.phoneClosed)).toBe(true);
});

test('movimento reduzido abre e fecha sem transições', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page);
  expect(await phone(page).evaluate(element => element.getAnimations().length)).toBe(0);
  const immediatelyClosed = await phone(page).evaluate(element => {
    element.querySelector('[data-phone-close]').click();
    return !element.open;
  });
  expect(immediatelyClosed).toBe(true);
  await expect(page.locator('#phone-launcher')).toBeFocused();
});

test('reabrir durante a saída reverte o movimento e desmontar fecha imediatamente', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const { initPlayerPhone } = await import('/dist/player-phone.mjs');
    const root = document.createElement('div');
    root.innerHTML = '<button data-phone-open>Fixture</button><dialog class="lm-phone" aria-label="Fixture"><h2 data-phone-title tabindex="-1"></h2><button data-phone-close>Fechar</button><section data-phone-view="home"></section></dialog>';
    document.body.append(root);
    const controller = initPlayerPhone(root);
    const dialog = root.querySelector('dialog');
    let closeEvents = 0;
    root.addEventListener('lm:phone-close', () => closeEvents++);
    controller.open();
    await Promise.allSettled(dialog.getAnimations().map(animation => animation.finished));
    controller.close();
    controller.close();
    const animation = dialog.getAnimations()[0];
    animation.pause();
    animation.currentTime = Number(animation.effect.getTiming().duration) / 2;
    const interruptedY = dialog.getBoundingClientRect().top;
    controller.open();
    const resumedY = dialog.getBoundingClientRect().top;
    await Promise.allSettled(dialog.getAnimations().map(animation => animation.finished));
    const reopened = { open: dialog.open, closeEvents };
    controller.close();
    controller.destroy();
    const destroyed = { open: dialog.open, closeEvents };
    root.remove();
    return { interruptedY, resumedY, reopened, destroyed };
  });
  expect(result.resumedY).toBeCloseTo(result.interruptedY, 0);
  expect(result.reopened).toEqual({ open: true, closeEvents: 0 });
  expect(result.destroyed).toEqual({ open: false, closeEvents: 1 });
});
