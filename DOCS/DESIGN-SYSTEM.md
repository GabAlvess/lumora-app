# Design system do Lumora

**Versão:** 0.2 — base de UI com celular do jogador.

**Referências:** [fundação v0.1](01-FUNDACAO-DO-PROJETO.md), [direção de design](DESIGN.md) e imagem de acesso fornecida pelo responsável pelo projeto nesta conversa. A imagem orienta a linguagem visual; não foi adicionada como asset de distribuição nem define funcionalidades de login social.

**Prévias da galeria:** [desktop](assets/design-system-desktop.png) e [celular](assets/design-system-mobile.png). Para interagir com todos os componentes, execute `npm run dev` conforme o [README](../README.md).

## Direção da interface

- Interface moderna e flat, com verde profundo, fundo creme e superfícies brancas.
- Ícones de contorno frequentes, acompanhados por texto ou nome acessível.
- Bordas finas, cantos suaves, espaçamento generoso e hierarquia de ações.
- Sem gradientes, efeitos de vidro ou sombras em cards e botões. A sombra fica restrita a elementos flutuantes.
- Tipografia Manrope variável, servida localmente, com fallback para fontes do sistema.
- CSS e SCSS independentes de framework. A escolha da engine, do backend e do framework da aplicação permanece em aberto.

A interface flat é a camada de navegação e componentes. A direção artística do mundo e dos avatares continua sendo um assunto próprio. A composição de folha e texto na galeria é uma assinatura de demonstração, não um logotipo final aprovado.

## Estrutura

```text
styles/
  lumora.scss                 # entrada pública
  abstracts/
    _tokens.scss              # mapas Sass configuráveis
    _mixins.scss              # breakpoint, foco e helpers
    _index.scss               # exports para @use
  base/                       # custom properties, reset e tipografia
  layout/                     # containers, stack, cluster, grid e split
  components/                 # componentes por responsabilidade
  utilities/                  # espaçamento e helpers com prefixo lm-
scripts/
  icons.mjs                   # seleção dos 95 ícones
  build-assets.mjs            # sprite, fonte e licenças locais
  serve.mjs                   # servidor de referência
examples/
  design-system.html          # galeria e markup de referência
  design-system.scss          # layout exclusivo da galeria
  design-system.js            # comportamento exclusivo da galeria
```

Não copie o layout `ds-*` da galeria para telas de produto. As classes reutilizáveis começam com **`lm-`**.

## Tokens

Os valores estão centralizados em [styles/abstracts/_tokens.scss](../styles/abstracts/_tokens.scss) e publicados como custom properties em [base/_properties.scss](../styles/base/_properties.scss).

| Papel | Token CSS | Valor inicial |
| --- | --- | --- |
| Ação principal | `--lm-primary` | `#244C3B` |
| Hover principal | `--lm-primary-hover` | `#1B3C2B` |
| Apoio verde | `--lm-primary-soft` | `#E2ECE5` |
| Fundo | `--lm-bg` | `#F7F6F2` |
| Superfície | `--lm-surface` | `#FFFFFF` |
| Texto | `--lm-text` | `#24372D` |
| Texto secundário | `--lm-text-secondary` | `#526258` |
| Texto discreto | `--lm-text-muted` | `#68736C` |
| Borda de superfície | `--lm-border` | `#DCE2D9` |
| Borda de controle | `--lm-border-control` | `#87958A` |
| Foco | `--lm-focus` | `#32654D` |
| Sucesso | `--lm-success` | `#28613E` |
| Atenção | `--lm-warning` | `#805510` |
| Erro / ação destrutiva | `--lm-danger` | `#AD3038` |
| Informação | `--lm-info` | `#28627B` |
| Destaque lilás | `--lm-accent` | `#75628F` |

Cada cor de feedback tem um token de superfície `*-soft`. A escala de verdes vai de `--lm-forest-50` a `--lm-forest-900`.

- **Espaçamento:** `--lm-space-{0,1,2,3,4,5,6,8,10,12,16,20}`, de 0 a 80px, em rem, com base de 4px na configuração padrão do navegador.
- **Tipografia:** `--lm-text-{xs,sm,md,lg,xl,2xl,3xl,4xl}`, de 12 a 48px em rem. Corpo de 16px, entrelinha 1,6; títulos com entrelinha 1,2.
- **Raios:** `--lm-radius-{xs,sm,md,lg,xl,pill}`: 6, 10, 14, 20, 28px e cápsula.
- **Controles:** `--lm-control-sm` 36px, `md` 48px e `lg` 56px. O compacto é para contextos densos; prefira 48px para ações de toque.
- **Ícones:** `--lm-icon-{sm,md,lg,xl}`: 16, 20, 24 e 32px.
- **Movimento:** 120 e 180ms. O wrapper respeita `prefers-reduced-motion`.
- **Breakpoints Sass:** `sm` 36rem, `md` 48rem, `lg` 64rem e `xl` 80rem. A base é responsiva a partir de telas pequenas.

Use tokens semânticos nos componentes; a escala bruta serve para definir a identidade. Tokens locais, como `--lm-gap`, `--lm-columns`, `--lm-grid-min` e `--lm-avatar-size`, permitem ajustar a composição.

## Integração por CSS

Execute `npm ci` e `npm run build`. Sirva o diretório `dist` preservando sua estrutura: a fonte fica em `dist/fonts`, e as licenças ficam em `dist/licenses`.

```html
<link rel="stylesheet" href="/dist/lumora.css">
<body class="lm-ui">
  <button class="lm-button lm-button--primary" type="button">
    <svg class="lm-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <use href="/dist/lumora-icons.svg#lm-icon-plus"></use>
    </svg>
    Criar espaço
  </button>
</body>
```

Também é possível colocar `lm-ui` apenas no wrapper da aplicação. O reset de elementos é limitado a esse wrapper, enquanto as custom properties padrão são declaradas em `:root`. Fora do wrapper, use os componentes com sua própria base e mantenha as regras de foco, `hidden` e movimento reduzido equivalentes.

## Integração por SCSS

```scss
// O caminho da fonte é relativo ao CSS final; configure antes de carregar a entrada.
@use 'styles/abstracts' with ($font-path: '/assets/fonts/');
@use 'styles/lumora';
```

Copie a fonte gerada e o sprite para os caminhos escolhidos pela aplicação. Sass moderno usa `@use` e `@forward`; não é necessário um framework CSS ou JavaScript para compilar.

Para ajustes pontuais de tema, prefira variáveis CSS no wrapper:

```scss
.minha-interface.lm-ui {
  --lm-primary: #244c3b;
  --lm-primary-hover: #1b3c2b;
  --lm-primary-active: #122c20;
  --lm-primary-soft: #e2ece5;
}
```

Atualize os estados relacionados e valide contraste ao mudar cores. A v0.2 inclui o tema claro; um tema escuro ainda não foi especificado.

## Catálogo de componentes

| Arquivo em `styles/components` | Classes principais | Variações e estados |
| --- | --- | --- |
| `_icons.scss` | `lm-icon`, `lm-icon-tile` | `--sm`, `--lg`, `--xl`; cor herdada. |
| `_buttons.scss` | `lm-button`, `lm-button-group` | `--primary`, `--secondary`, `--outline`, `--ghost`, `--danger`, `--sm`, `--lg`, `--icon`, `--block`; hover, active, focus-visible, disabled e busy. |
| `_forms.scss` | `lm-field`, `lm-label`, `lm-input`, `lm-control`, `lm-select`, `lm-textarea`, `lm-fieldset`, `lm-range` | `lm-field__hint`, `lm-field__error`; readonly, disabled, foco e `aria-invalid`. |
| `_selection.scss` | `lm-choice`, `lm-checkbox`, `lm-radio`, `lm-switch`, `lm-chip` | Checked, indeterminate, disabled e `aria-pressed`; alto contraste nativo em forced-colors. |
| `_surfaces.scss` | `lm-card`, `lm-panel`, `lm-empty`, `lm-disclosure` | Card `__header`, `__body`, `__footer`, `__media`, `--interactive`; disclosure nativo com `details`. |
| `_navigation.scss` | `lm-topbar`, `lm-nav`, `lm-tabs`, `lm-tab`, `lm-tab-panel`, `lm-segmented`, `lm-breadcrumb`, `lm-pagination` | `lm-nav__item`, `lm-segmented__item`; `aria-current`, `aria-selected` e `aria-pressed`. |
| `_feedback.scss` | `lm-badge`, `lm-alert`, `lm-toast`, `lm-toast-region`, `lm-progress`, `lm-spinner`, `lm-skeleton` | Tons `--success`, `--warning`, `--danger`, `--info` em badge e alert; badges também `--neutral` e `--accent`; skeleton `--circle`. |
| `_overlays.scss` | `lm-dialog`, `lm-dropdown`, `lm-tooltip-anchor`, `lm-tooltip` | Dialog `--wide`, `__header`, `__body`, `__footer`; dropdown `__menu`, `__item`, `__item--danger`. |
| `_data.scss` | `lm-avatar`, `lm-avatar-group`, `lm-status`, `lm-list`, `lm-table`, `lm-stat` | Avatar `--sm`, `--lg`, `--xl`, `--square`, `--accent`, `--warm`, `__status`; status `--away`, `--offline`; list `__item`, `__content`; stat `__label`, `__value`. |
| `_phone.scss` | `lm-phone`, `lm-phone-launcher` | Celular ancorado no canto inferior direito, aplicativos, cabeçalho, conteúdo rolável e início. Controlador opcional `dist/player-phone.mjs`. |
| `_social.scss` | `lm-toolbar`, `lm-currency`, `lm-item-grid`, `lm-item`, `lm-message` | Currency `--accent`; item `aria-pressed`; message `--self`, `__bubble`, `__author`, `__time`. Apenas apresentação. |

As classes de elemento e modificador sempre usam o prefixo completo, por exemplo `lm-button lm-button--outline`, e não apenas `--outline`.

### Composição e utilitários

- Layout: `lm-container`, `lm-stack`, `lm-cluster`, `lm-between`, `lm-grid`, `lm-grid--auto`, `lm-split`, `lm-shell`.
- Separadores: `lm-divider`, `lm-divider-label`.
- Tipografia: `lm-display`, `lm-heading` com `--xl`, `--lg`, `--md`, `--sm`; `lm-body`, `lm-caption`, `lm-eyebrow`, `lm-link` e `lm-brand`.
- Utilitários: `lm-gap-*`, `lm-p-*`, `lm-px-*`, `lm-py-*`, `lm-w-full`, `lm-min-w-0`, `lm-truncate`, `lm-scroll-x`, `lm-text-center`, `lm-text-muted`, `lm-text-primary`, `lm-text-danger`, `lm-font-semibold`, `lm-sr-only` e `lm-skip-link`.

```html
<div class="lm-grid lm-grid--auto lm-gap-6">
  <article class="lm-card">
    <div class="lm-card__body lm-stack">
      <h2 class="lm-heading lm-heading--md">Seu primeiro espaço</h2>
      <p class="lm-caption">Um lugar para começar novas histórias.</p>
      <button class="lm-button lm-button--secondary" type="button">Explorar</button>
    </div>
  </article>
</div>
```

## Formulários e estados acessíveis

```html
<div class="lm-field">
  <label class="lm-label" for="nome">Nome do personagem</label>
  <input class="lm-input" id="nome" aria-invalid="true" aria-describedby="nome-erro">
  <p class="lm-field__error" id="nome-erro">Escolha outro nome.</p>
</div>

<label class="lm-choice">
  <input class="lm-switch" type="checkbox" role="switch">
  Receber notificações
</label>
```

- Use `label` associado ao controle e `aria-describedby` para ajuda e erros. Não use placeholder como único rótulo.
- Use `disabled` nos controles nativos; o CSS de `aria-disabled` é visual e exige impedir a ação na aplicação.
- `aria-busy="true"` comunica carregamento; não desabilita uma ação sozinho. Preserve o nome da ação e controle submissões duplicadas na aplicação.
- Botões sem texto precisam de `aria-label`; o SVG decorativo recebe `aria-hidden="true"` e `focusable="false"`.
- O foco por teclado usa contorno visível de 3px. Não remova o foco sem substituição equivalente.
- Estados de presença, erro ou sucesso precisam de texto ou nome acessível além da cor.
- Coloque conteúdo largo, como tabelas, em `lm-scroll-x`, com região identificada e foco quando necessário.

## Ícones

Os 95 ícones locais vêm de **Lucide**, sob licença ISC. A seleção está em [scripts/icons.mjs](../scripts/icons.mjs), e os IDs do sprite seguem `lm-icon-NOME`, por exemplo `lm-icon-leaf`, `lm-icon-users`, `lm-icon-coffee` e `lm-icon-shield-check`.

O tamanho padrão é 20px, em grade de 24 × 24, traço de 1,75px, `fill: none` e `stroke: currentColor`. Não há fonte de ícones, CDN ou download de assets em tempo de uso. O sprite deve ser servido na mesma origem da página; abrir o HTML diretamente por `file://` não é a forma de uso suportada.

A licença da fonte Manrope é preservada em `dist/licenses/manrope.txt`; a dos ícones, em `dist/licenses/lucide.txt`. Mantenha essas licenças ao distribuir os assets.

## Comportamento e limites

SCSS padroniza apresentação, não implementa regras do jogo. A aplicação deverá gerenciar estados, validação, permissões, chamadas de rede e acessibilidade de interações compostas.

A galeria inclui JavaScript de demonstração para abas com teclado, seleção, busca de ícones, senha visível, notificações, tooltip e menu. O diálogo usa `dialog.showModal()` e formulário `method="dialog"`, com fechamento nativo por Escape e ciclo de Tab entre seus controles. Disclosure e dropdown usam `details`/`summary`; o dropdown não declara `role="menu"` e seus botões seguem navegação normal por Tab.

Ao integrar, sincronize `aria-selected`, `aria-controls`, `tabindex` e `hidden` em abas; gerencie foco e Escape nas sobreposições. O tooltip é complementar e não deve ser a única fonte de informação. As mensagens da galeria não expiram automaticamente, para permitir sua leitura.

Avatares, mensagens, moedas, espaços e ações são exemplos fictícios. Nenhum formulário envia ou armazena credenciais. Nenhuma economia, autenticação, moderação ou criação de espaços foi implementada.

## Verificação e evolução

Compile com `npm run build` e teste com `npm test`, conforme o [README do repositório](../README.md). Os testes usam Chromium, incluindo larguras de 320, 390, 768 e 1440px, teclado, foco, estados, movimento reduzido e verificações automatizadas WCAG 2.2 AA via axe.

O suporte inicial usa recursos de navegadores modernos, incluindo `:has`, `dialog`, unidades `dvh` e propriedades lógicas. Uma matriz formal de navegadores, testes com leitores de tela e uma auditoria manual completa permanecem pendentes. A validação automatizada não certifica conformidade integral de acessibilidade.

Novos componentes devem reutilizar os tokens e incluir estados relevantes na galeria. Mudanças visuais importantes devem atualizar este documento e [DECISOES.md](DECISOES.md).

## Celular do jogador

O celular é a central de controle do jogador: reúne amigos, quartos, personagem, loja e configurações. Reutiliza os tokens e componentes desta biblioteca e aparece no canto inferior direito. A galeria inclui a seção **Celular do jogador** e um acionador persistente para experimentar as cinco telas.

A apresentação reutilizável está em `styles/components/_phone.scss`; o controlador opcional e independente de framework está em `scripts/player-phone.mjs` e é distribuído em `dist/player-phone.mjs`. Ele implementa abertura, fechamento, histórico, início, foco e Escape. O JavaScript exclusivo da galeria fornece os dados fictícios e as ações de demonstração.

Veja [Celular do jogador](CELULAR.md) para anatomia, estados, API e integração com os controles do jogo. Prévias: [desktop](assets/player-phone-desktop.png) e [tela pequena](assets/player-phone-mobile.png). Nenhuma lista de amigos, compra, configuração ou personalização real está conectada a um backend.
