# LUMORA

Mundo virtual social online, com foco em criação, comunidade e pertencimento. A visão do jogo está em [DOCS](DOCS/README.md).

O repositório contém a documentação, o **design system SCSS** e as primeiras **telas de login e registro**. As interfaces têm navegação e validação local; autenticação real, cadastro de contas e funcionalidades do jogo ainda não estão integrados.

## Preparar e compilar

Requisitos: Node.js 22 ou superior e npm.

```sh
npm ci
npm run build
```

Saída em `dist/`: CSS normal e minificado, sprite SVG com 95 ícones, catálogo, ícones de provedores, fonte local Manrope, ilustração, páginas de acesso, controlador opcional `player-phone.mjs` e licenças dos assets. Os arquivos gerados e `node_modules` não são versionados.

## Telas e galeria de componentes

```sh
npm run dev
```

O servidor local usa a porta 4173. `/` abre o login; `/login` e `/registro` são as telas de acesso, e `/design-system` preserva a galeria de componentes. `PORT` e `HOST` permitem configurar o servidor.

As telas não enviam nem armazenam credenciais e informam a indisponibilidade do serviço ao enviar formulários válidos. Veja [escopo, prévias e integração pendente](DOCS/TELAS-DE-ACESSO.md).

Para recompilar SCSS durante a edição, use outro terminal e atualize a página após a compilação:

```sh
npm run watch
```

Após alterar os templates ou o JavaScript das telas, execute `npm run build:pages` e atualize a página.

## Usar nas próximas telas

- Entrada SCSS: [styles/lumora.scss](styles/lumora.scss).
- Tokens e mixins: [styles/abstracts](styles/abstracts).
- Componentes: [styles/components](styles/components).
- Convenções, exemplos e catálogo de classes: [DOCS/DESIGN-SYSTEM.md](DOCS/DESIGN-SYSTEM.md).
- Celular do jogador: [componente, API e integração](DOCS/CELULAR.md).
- Exemplo executável: [examples/design-system.html](examples/design-system.html).

## Validar

```sh
npm run build
npm test
```

Os testes usam Playwright e Chromium. O Chromium do sistema é detectado em `/usr/bin/chromium`, quando presente; também é possível informar `CHROMIUM_PATH`. Em uma máquina sem navegador instalado, instale o navegador do Playwright com `npx playwright install chromium`.

As verificações cobrem as telas de acesso e a galeria: carregamento, validação, navegação, senha visível, ausência de envio e armazenamento de credenciais, foco dos diálogos, seleção, busca de ícones, responsividade e auditoria automatizada de acessibilidade. Elas não substituem avaliação manual com tecnologias assistivas nem testes futuros do serviço de autenticação.
