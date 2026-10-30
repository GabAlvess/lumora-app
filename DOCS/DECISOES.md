# Registro de decisões

Este documento registra escolhas relevantes e seus motivos. Propostas permanecem pendentes até aprovação explícita.

Adotar uma proposta como **base conceitual** não aprova automaticamente todos os recursos mencionados, os nomes provisórios ou um escopo de implementação.

## DEC-001 — Centralizar a documentação em DOCS

- **Status:** aprovada.
- **Origem:** solicitação do responsável pelo projeto nesta conversa.
- **Contexto:** o Lumora precisa de um local para reunir informações, regras, design, decisões e roadmap.
- **Decisão:** manter a documentação do jogo na pasta `DOCS`, com um índice em `README.md`.
- **Consequências:** novas definições devem ser registradas na área correspondente; mudanças relevantes também devem ser registradas aqui.

## DEC-002 — Adotar o Documento 01 v0.1 como fundação conceitual

- **Status:** adotada como base conceitual; detalhamento de produto em aberto.
- **Origem:** proposta fornecida pelo responsável pelo projeto nesta conversa, com solicitação de atualizar as docs de acordo com ela.
- **Contexto:** a documentação inicial tinha apenas uma estrutura e campos a definir. O material recebido estabelece a visão do LUMORA como jogo social online / mundo virtual.
- **Decisão:** preservar o texto integral em [Documento 01 — Fundação do Projeto](01-FUNDACAO-DO-PROJETO.md), versão 0.1, e usá-lo como referência das páginas temáticas.
- **Diretrizes registradas:** comunidade como criadora de experiências; pilares SOCIAL, CREATE, LIVE, COLLECT e BELONG; ferramentas de construção e RPG como diferenciais; segurança desde a arquitetura; prioridade inicial Web / Desktop; identidade própria com verde entre as cores principais.
- **Pontos em estudo preservados:** direção 2D estilizada com pixel moderno e perspectiva isométrica; duas moedas com nomes provisórios Lums e Cristais; nomes de bairros e grupos; funcionalidades sociais, de RPG e expansões. Estes pontos não se tornam decisões finais ao serem documentados.
- **Limites:** não foram escolhidos tecnologia, faixa etária, fluxo de entrada, regras numéricas, escopo de MVP, prazos ou responsáveis. Nenhuma funcionalidade foi declarada implementada.
- **Próxima etapa indicada pela fonte:** elaborar o Documento 02 — Jornada do Jogador. O arquivo inicial reúne as perguntas, sem definir respostas em nome do projeto.
- **Consequências:** substituir campos genéricos pelas diretrizes disponíveis, manter hipóteses identificadas e organizar um roadmap proposto. Comércio entre jogadores permanece futuro e condicionado à estrutura contra fraude e desequilíbrio econômico; mobile é uma expansão futura.
- **Documentos relacionados:** [Visão](VISAO.md), [Regras](REGRAS.md), [Design](DESIGN.md), [Roadmap](ROADMAP.md) e [Jornada](02-JORNADA-DO-JOGADOR.md).
- **Relação com decisões anteriores:** complementa DEC-001; não a substitui.

## DEC-003 — Iniciar o design system SCSS da interface

- **Status:** implementada como primeira base de UI, sujeita a evolução.
- **Origem:** solicitação do responsável pelo projeto de uma UI moderna, flat e com muitos ícones, acompanhada de referência visual de acesso.
- **Decisão:** criar tokens semânticos, classes com prefixo `lm-` e componentes SCSS independentes de framework; usar verde profundo, creme, superfícies brancas, bordas finas e cantos suaves.
- **Escolhas iniciais de implementação:** Manrope local, ícones SVG Lucide, Sass com `@use` e `@forward`, CSS custom properties e build npm reproduzível com lockfile. Essas escolhas não determinam a engine ou a arquitetura da aplicação.
- **Consequências:** próximas telas podem compor os componentes existentes; a galeria é a referência executável e novos elementos devem reutilizar os tokens. Fontes e ícones incluem suas licenças na saída do build.
- **Limites:** apresentação e comportamento de demonstração; sem autenticação, economia ou funcionalidades de jogo. Paleta de UI e assinatura visual não encerram a arte do mundo ou o logotipo oficial. Acessibilidade automatizada não substitui avaliação manual.
- **Documentos relacionados:** [Design system](DESIGN-SYSTEM.md), [Design](DESIGN.md) e [README técnico](../README.md).
- **Relação com decisões anteriores:** detalha a camada de UI da DEC-002; preserva a fundação original e suas pendências de produto.

## Modelo para novas decisões

Copiar o modelo abaixo e atribuir o próximo identificador disponível.

```markdown
## DEC-NNN — Título

- **Status:** proposta / aprovada / substituída / descartada.
- **Data:** AAAA-MM-DD.
- **Responsável pela aprovação:**
- **Contexto:**
- **Alternativas consideradas:**
- **Decisão:**
- **Motivo:**
- **Consequências e riscos:**
- **Documentos relacionados:**
- **Substitui ou é substituída por:** se aplicável.
```
