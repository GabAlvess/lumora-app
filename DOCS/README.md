# Documentação do Lumora

LUMORA é um mundo virtual social online em que jogadores criam personagens, constroem espaços, convivem, participam de comunidades e desenvolvem suas próprias histórias e experiências.

**Conceito central:** Seu mundo. Sua história. Seu lugar.

Este é o ponto de entrada para as informações, regras, design, decisões e roadmap do projeto.

## Índice

| Documento | Conteúdo | Estado |
| --- | --- | --- |
| [Documento 01 — Fundação do Projeto](01-FUNDACAO-DO-PROJETO.md) | Texto integral da proposta fornecida, versão 0.1. | Conceito inicial; fonte da documentação temática. |
| [Visão do jogo](VISAO.md) | Missão, cinco pilares, público, universo e posicionamento. | Síntese da fundação. |
| [Regras e mecânicas](REGRAS.md) | Sistemas de jogo, economia, convivência e requisitos de segurança. | Diretrizes conceituais e recursos em estudo. |
| [Design](DESIGN.md) | Experiência, personagens, construção, identidade visual e interface. | Direções iniciais; detalhes a definir. |
| [Design system](DESIGN-SYSTEM.md) | Tokens, classes SCSS, componentes, ícones e exemplos de integração. | Base de UI v0.2 com celular do jogador. |
| [Celular do jogador](CELULAR.md) | Central de controle, aplicativos, estados e integração. | Componente e demonstração implementados no DS. |
| [Decisões](DECISOES.md) | Escolhas, contexto e limites de cada definição. | Registro de decisões. |
| [Roadmap](ROADMAP.md) | Próxima etapa, sequência proposta e possibilidades futuras. | Planejamento sem prazos ou escopo de MVP fechado. |
| [Documento 02 — Jornada do Jogador](02-JORNADA-DO-JOGADOR.md) | Perguntas sobre a primeira experiência, do site à cidade. | Rascunho a definir. |

## Como ler os estados

- **Diretriz conceitual:** orientação expressa na fundação; não significa funcionalidade implementada.
- **Em estudo / provisório:** possibilidade ou nome que ainda pode mudar.
- **A definir:** o material ainda não responde à questão.
- **Proposta de planejamento:** organização sugerida para o trabalho; não é compromisso de entrega.

A fundação é um conceito inicial. As funcionalidades citadas não compõem automaticamente a primeira versão jogável.

## Como manter esta documentação

- Usar o Documento 01 como referência da proposta recebida; registrar evoluções nos documentos correspondentes e em novas versões identificadas.
- Distinguir diretrizes conceituais, propostas, decisões aprovadas e recursos implementados.
- Preservar como provisórios os nomes e sistemas apresentados dessa forma na fundação.
- Usar **A definir** para informações desconhecidas, sem inventar requisitos, valores ou regras.
- Registrar mudanças relevantes em [DECISOES.md](DECISOES.md), com contexto, motivo e consequências.
- Atualizar o índice e o roadmap quando houver mudanças de escopo ou prioridade.
- Evitar guardar senhas, tokens ou outros dados sensíveis.

## Estado atual

A fundação conceitual v0.1 está registrada e organizada por tema. A prioridade inicial é **Web / Desktop**, com futura adaptação móvel considerada desde o design.

A base de interface SCSS e a galeria de componentes estão implementadas conforme a referência visual recebida. Isso não implementa os sistemas do jogo nem define a stack completa da aplicação.

A próxima etapa conceitual indicada pela proposta é detalhar o **Documento 02 — Jornada do Jogador**. Tecnologia do jogo, fluxo de entrada, regras operacionais, escopo do protótipo e critérios de lançamento permanecem a definir.
