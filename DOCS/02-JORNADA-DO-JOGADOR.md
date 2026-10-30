# LUMORA
## Documento 02 — Jornada do Jogador

**Status:** em elaboração; interfaces de login e registro implementadas, integração e demais etapas a definir.
**Origem:** próxima etapa indicada na seção 37 do [Documento 01 — Fundação do Projeto](01-FUNDACAO-DO-PROJETO.md), versão 0.1.

## Objetivo

Definir a primeira experiência real do jogador, do contato com o site à participação no universo de Lumora. Este documento reúne as perguntas da fundação. As definições iniciais de interface estão indicadas abaixo; não representam uma jornada completa ou um serviço de autenticação implementado.

## Diretrizes que orientam a jornada

- Priorizar Web / Desktop, considerando futura adaptação móvel.
- Expressar SOCIAL, CREATE, LIVE, COLLECT e BELONG sem obrigar todos os jogadores a seguir um único estilo.
- Apresentar um mundo vivo, a possibilidade de criar e o sentimento de pertencimento.
- Tratar segurança e proteção de menores desde o início.
- Não exigir que todos os sistemas da visão de longo prazo existam na primeira experiência.

## 1. Site e apresentação

**Pergunta da fundação:** como será o site?

**Definição inicial de interface:** a entrada atual abre `/login`, com acesso a `/registro`, mantendo o design system e a ambientação ilustrada do universo. A apresentação pública completa do site permanece a definir. Veja [Telas de acesso](TELAS-DE-ACESSO.md).

## 2. Cadastro e conta

**Perguntas da fundação:** como será o cadastro? Como o jogador cria sua conta?

**Interface implementada:** formulário de registro com nome de usuário, e-mail, senha e confirmação; validação local e navegação para login. O login recebe usuário ou e-mail e senha, com controle de visibilidade e recuperação em diálogo.

**Integração pendente:** criação real da conta, confirmação de e-mail, autenticação, sessões e recuperação. Os provedores sociais são opções visuais sem integração. Termos, privacidade e consentimentos ainda precisam ser definidos; esta interface não representa abertura de contas.

## 3. Escolha de nome

**Pergunta da fundação:** como escolhe seu nome?

**Regra provisória de interface:** nome de usuário com 3 a 20 caracteres, letras Unicode, números e sublinhado. Disponibilidade, unicidade, nomes reservados e moderação permanecem a definir no serviço de contas.

**Distinção pendente:** este campo identifica a conta na interface inicial; a relação com nomes de personagem e identidades de RPG ainda não foi definida.

## 4. Criação do personagem

**Pergunta da fundação:** como cria seu personagem?

**Base conceitual disponível:** personalização básica de tom de pele, rosto, cabelo, roupas, calçados e acessórios; identidade reconhecível.

**Fluxo e opções iniciais:** a definir.

## 5. Primeira chegada

**Pergunta da fundação:** onde aparece pela primeira vez?

**Definição:** a definir. A existência de uma cidade ou região central não determina o ponto de chegada.

## 6. Primeiro espaço

**Pergunta da fundação:** qual será seu primeiro quarto?

**Base conceitual disponível:** o jogador poderá possuir espaços próprios; receber um pequeno quarto ou residência inicialmente é uma possibilidade.

**Tipo, aparência, acesso e forma de obtenção:** a definir.

## 7. Aprendizado inicial

**Pergunta da fundação:** o que o jogo ensinará?

**Definição:** a definir, incluindo as primeiras ações e a apresentação das ferramentas necessárias à jornada escolhida.

## 8. Encontro com outros jogadores

**Pergunta da fundação:** como encontrará outros jogadores?

**Base conceitual disponível:** espaços públicos podem facilitar encontros espontâneos; amizades e comunidades fazem parte da visão social.

**Fluxo inicial:** a definir.

## 9. Primeira missão

**Pergunta da fundação:** qual será sua primeira missão?

**Objetivo, funcionamento e eventual recompensa:** a definir. Nenhuma missão foi especificada no Documento 01.

## 10. Descoberta da cidade

**Pergunta da fundação:** como conhecerá a cidade de Lumora?

**Definição:** a definir. Mapa, bairros, nomes e locais de visita ainda não são definitivos.

## 11. Interface principal

**Pergunta da fundação:** como funcionará a interface principal?

**Navegação, controles, informações e acesso às ferramentas:** a definir.

## Pendências transversais

As questões abaixo são pontos de detalhamento derivados da fundação, não respostas adicionais já aprovadas:

- Quais ações são essenciais para a primeira sessão e quais podem ser descobertas depois?
- Como apresentar regras, denúncia, bloqueio e silenciamento de forma acessível?
- Quais requisitos de faixa etária, privacidade e proteção de menores se aplicam ao cadastro e às interações?
- Como avaliar se o jogador compreendeu a experiência e encontrou uma oportunidade de criar ou pertencer?
- Quais dependências dessa jornada integrarão o protótipo?

## Critério de conclusão proposto

Descrever o fluxo de ponta a ponta, registrar as decisões em [DECISOES.md](DECISOES.md), identificar os sistemas necessários e manter as pendências explícitas. O [roadmap](ROADMAP.md) será atualizado a partir dessas definições.
