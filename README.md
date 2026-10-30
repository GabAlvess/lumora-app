# LUMORA

Mundo virtual social online, com foco em criação, comunidade e pertencimento. A visão do jogo está em [DOCS](DOCS/README.md).

O repositório contém a documentação do projeto e a primeira versão do **design system SCSS**. A galeria demonstra os componentes; não implementa autenticação, economia, chat ou outras funcionalidades do jogo.

## Preparar e compilar

Requisitos: Node.js 22 ou superior e npm.

```sh
npm ci
npm run build
```

Saída em `dist/`: CSS normal e minificado, sprite SVG com 94 ícones, catálogo de ícones, fonte local Manrope e licenças dos assets. Os arquivos gerados e `node_modules` não são versionados.

## Galeria de componentes

```sh
npm run dev
```

O servidor local usa a porta 4173 e abre a galeria na rota `/`. A interface pode ser vista no navegador do ambiente de desenvolvimento. `PORT` e `HOST` permitem configurar o servidor.

Para recompilar SCSS durante a edição, use outro terminal e atualize a página após a compilação:

```sh
npm run watch
```

## Usar nas próximas telas

- Entrada SCSS: [styles/lumora.scss](styles/lumora.scss).
- Tokens e mixins: [styles/abstracts](styles/abstracts).
- Componentes: [styles/components](styles/components).
- Convenções, exemplos e catálogo de classes: [DOCS/DESIGN-SYSTEM.md](DOCS/DESIGN-SYSTEM.md).
- Exemplo executável: [examples/design-system.html](examples/design-system.html).

## Validar

```sh
npm run build
npm test
```

Os testes usam Playwright e Chromium. O Chromium do sistema é detectado em `/usr/bin/chromium`, quando presente; também é possível informar `CHROMIUM_PATH`. Em uma máquina sem navegador instalado, instale o navegador do Playwright com `npx playwright install chromium`.

As verificações cobrem carregamento dos assets, estados de formulário, navegação por teclado, foco do diálogo, seleção, busca de ícones, responsividade e auditoria automatizada de acessibilidade. Elas não substituem avaliação manual com tecnologias assistivas.
