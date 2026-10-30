# Design

**Base:** [Documento 01 — Fundação do Projeto](01-FUNDACAO-DO-PROJETO.md), versão 0.1, especialmente seções 8 a 14, 28, 29 e 32, e referência visual de interface fornecida pelo responsável pelo projeto. A UI tem uma base SCSS inicial; arte do mundo, avatares e telas de produto ainda precisam ser detalhados.

## Design system de interface

A [base de UI v0.1](DESIGN-SYSTEM.md) implementa a direção solicitada: moderna, flat, com uso frequente de ícones, verde profundo, fundo creme, superfícies claras, bordas finas e cantos suaves. Ela inclui tokens, classes de componentes, estados e uma galeria de referência.

O código é independente de framework e usa Manrope local e 94 ícones SVG Lucide. A galeria demonstra componentes; não determina o fluxo real de cadastro ou acesso e não implementa sistemas do jogo.

## Experiência do jogador

A experiência deve comunicar um mundo vivo, liberdade para criar e oportunidade de pertencer. As percepções desejadas são: “Há muita coisa acontecendo aqui”, “Eu posso criar algo aqui” e “Eu tenho meu lugar aqui”.

O design deve atender a diferentes formas de participação: socializar, construir, colecionar, interpretar, organizar eventos, empreender no universo, explorar e criar experiências. Esses perfis podem coexistir.

A primeira sessão será detalhada no [Documento 02 — Jornada do Jogador](02-JORNADA-DO-JOGADOR.md). O fluxo de entrada, a primeira missão, o aprendizado e o local inicial ainda estão em aberto.

## Interface e navegação

**Prioridade inicial:** Web / Desktop. A interface deve considerar futura adaptação a dispositivos móveis, sem exigir o desenvolvimento simultâneo de três plataformas distintas.

Site, cadastro, escolha de nome, editor de avatar, entrada no mundo, primeiro espaço, descoberta de pessoas e cidade, e interface principal são assuntos da próxima etapa. Não há wireframes, mapa de navegação, esquema de controles, resoluções ou formatos de distribuição definidos.

## Direção visual inicial

A direção **considerada** é **2D estilizado + pixel moderno + perspectiva isométrica**. O objetivo é preservar parte da nostalgia dos mundos virtuais clássicos com identidade própria, mais detalhes, melhor iluminação, animações mais suaves, variedade de personagens e ambientes vivos.

Essa direção ainda precisa de exploração e validação visual. Não há definição final de resolução dos sprites, grade, proporções, câmera, técnica de iluminação ou pipeline de arte.

## Identidade da marca

O **verde** é uma das principais cores previstas, associado a vida, natureza, energia, crescimento e renovação.

Cores complementares **consideradas na fundação**: azul-petróleo, creme, dourado suave, lilás e tons escuros. A primeira paleta de interface está definida nos [tokens do design system](DESIGN-SYSTEM.md), incluindo verde `#244C3B`, creme `#F7F6F2` e branco. É uma base de implementação sujeita a evolução; não fecha a paleta artística do universo.

A identidade deve combinar fantasia, natureza, tecnologia, comunidade e modernidade. A UI usa Manrope e ícones Lucide de contorno. Logotipo oficial e manual completo de aplicação da marca permanecem a definir.

## Personagens, cenários e objetos

### Avatares

O avatar deve ser altamente reconhecível. A personalização básica do conceito abrange tom de pele, rosto, cabelo, roupas, calçados e acessórios.

Maquiagem, tatuagens, barbas, pets, animações, expressões, poses, efeitos, estilos de caminhada e itens especiais são possíveis expansões. O conjunto inicial e seus detalhes visuais ainda não foram selecionados.

### Universo e espaços oficiais

O mundo combina natureza, arquitetura urbana, tecnologia, fantasia leve e design contemporâneo. Deve parecer familiar e, ao mesmo tempo, distinto da realidade.

Uma cidade ou região central está em estudo, assim como bairros e espaços públicos para encontros espontâneos. Nomes provisórios e exemplos de ambientes estão em [VISAO.md](VISAO.md); não representam um mapa aprovado.

### Construção e conteúdo da comunidade

As ferramentas devem ser fáceis de usar e permitir liberdade criativa. A visão abrange de quartos e casas a organizações, cidades e universos de RPG.

Móveis, decoração e itens de construção devem apoiar a expressão dos jogadores. Catálogo, coleções permanentes e sazonais fazem parte do conceito; a lista de recursos visuais da primeira versão permanece em aberto.

## Animação e efeitos

A proposta busca animações mais suaves e ambientes vivos. Expressões, poses, efeitos e diferentes estilos de caminhada são possibilidades de expansão de avatar. Quantidades, transições, efeitos de interação, requisitos de desempenho e prioridades ainda serão definidos.

## Áudio

A fundação não especifica direção musical, efeitos sonoros ou feedback auditivo. Permanecem **a definir**.

## Acessibilidade

A fundação ainda não estabelece uma política completa de acessibilidade. A base de UI já inclui foco visível, controles nativos, padrões de rótulos e erros, redução de movimento e verificações automatizadas. Testes manuais com tecnologias assistivas, requisitos de acessibilidade do mundo e alternativas a sinais visuais ou sonoros continuam a detalhar. Ver limites em [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Segurança na experiência

Denúncia, bloqueio, silenciamento e regras acessíveis precisam ser considerados desde o início, conforme as diretrizes de [REGRAS.md](REGRAS.md). Fluxos, textos e apresentação ainda serão especificados. A proteção de menores faz parte da fundação e deve ser tratada junto à jornada.

## Materiais e referências

O Documento 01 é a referência conceitual atual. Habbo e mundos virtuais clássicos aparecem como contexto do gênero; a proposta exige identidade visual própria.

Novas referências e materiais devem registrar origem, finalidade, licença quando aplicável e status de aprovação. A referência de acesso recebida orientou o design system; fontes e ícones locais têm suas licenças preservadas no build. A galeria e sua assinatura visual são demonstrações, não telas de produto ou logotipo final aprovados.

## Responsáveis

Designers e responsáveis por cada área: a definir.
