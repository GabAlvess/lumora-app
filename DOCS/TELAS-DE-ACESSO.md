# Telas de login e registro

**Status:** primeira implementação de interface; autenticação real pendente.

As telas reutilizam o [design system](DESIGN-SYSTEM.md) e a referência visual do projeto: formulário em fundo creme à esquerda, ilustração do universo à direita, verde profundo, ícones e bordas suaves. No celular, o formulário tem prioridade e a imagem não é requisitada.

## Rotas e prévias

| Rota | Tela | Prévias |
| --- | --- | --- |
| `/` | Redireciona para `/login`. | — |
| `/login` | Usuário ou e-mail, senha e opções de acesso. | [Desktop](assets/login-desktop.png) · [Celular](assets/login-mobile.png) |
| `/registro` | Nome de usuário, e-mail, senha e confirmação. | [Desktop](assets/registro-desktop.png) · [Celular](assets/registro-mobile.png) |
| `/design-system` | Galeria de componentes preservada. | [Documentação](DESIGN-SYSTEM.md) |

Use `npm ci` e `npm run dev`, conforme o [README](../README.md).

## Fluxo de interface

- Login e registro possuem links de navegação entre si.
- Os campos têm rótulos, autocomplete, ajuda e mensagens de erro associadas. O primeiro erro recebe foco; após a tentativa ou saída do campo, a mensagem acompanha a correção.
- Botões de senha alternam visibilidade e nome acessível sem mudar o valor preenchido.
- “Lembrar de mim” é uma seleção visual; não mantém sessão nesta entrega.
- “Esqueceu sua senha?” abre um diálogo de recuperação com validação de e-mail, Escape e retorno de foco.
- Google, Discord e Apple são opções visuais com feedback de indisponibilidade. Nenhum provedor está conectado.
- Termos, privacidade e suporte abrem informações sobre o estado de preparação. Não foram inventados documentos legais, aceite contratual ou canais de atendimento.

## Validações locais iniciais

Estas regras são provisórias para exercitar a interface. Não substituem validação do servidor ou uma política final de contas.

| Campo | Comportamento |
| --- | --- |
| Usuário ou e-mail no login | Obrigatório; sem consulta a contas existentes. |
| Nome de usuário no registro | De 3 a 20 caracteres, com letras Unicode, números e sublinhado; sem consulta de disponibilidade ou moderação. |
| E-mail | Obrigatório e com validação nativa de formato; sem confirmação ou envio. |
| Senha no registro | Pelo menos 8 caracteres. A senha do login é apenas obrigatória para não impor uma nova política a credenciais futuras. |
| Confirmação | Idêntica à senha; a mensagem também se atualiza ao editar a senha original. |

Faixa etária, proteção de menores, consentimentos, nomes reservados, unicidade e política definitiva de senha permanecem pendentes.

## Limite desta entrega

O JavaScript não faz requisições de autenticação, não usa `localStorage` ou `sessionStorage`, não cria usuários e não simula sessões. Os formulários são limpos ao sair da página.

Após dados válidos, a interface informa que o acesso ou a criação de contas ainda não está disponível. A recuperação informa que nenhum e-mail foi enviado. Não existe confirmação fictícia de conta criada ou acesso bem-sucedido.

Sem JavaScript, o aviso permanece visível e os botões de envio ficam desabilitados. Os formulários usam `method="post"`, e o servidor estático aceita somente GET e HEAD; não há fallback que coloque senhas na URL.

## Organização técnica

- [src/auth/layout.mjs](../src/auth/layout.mjs): layout, marca, ambientação e diálogos compartilhados.
- [src/auth/fields.mjs](../src/auth/fields.mjs): campos, ícones e provedores.
- [login.mjs](../src/auth/pages/login.mjs) e [registro.mjs](../src/auth/pages/registro.mjs): conteúdo de cada tela.
- [src/auth/auth.js](../src/auth/auth.js): validação, foco, senha visível e feedback.
- [styles/pages/auth.scss](../styles/pages/auth.scss): composição usando os componentes existentes.
- [src/assets](../src/assets/README.md): ilustração gerada para a interface; não é captura de um jogo implementado.
- [scripts/build-pages.mjs](../scripts/build-pages.mjs): gera o HTML e copia o JavaScript para `dist`.

`npm run build` prepara tudo. Após alterar templates ou JavaScript, execute `npm run build:pages`. O `npm run watch` recompila SCSS, incluindo os estilos das telas. `dist` continua gerado e não versionado.

Fonte, ícones e ilustração são locais. Os símbolos de provedores usam Simple Icons, com licença em `dist/licenses/simple-icons.txt`. No celular, `picture` usa um fallback leve, evitando baixar a ilustração escondida.

## Verificação e próxima integração

Os [testes de acesso](../tests/auth.spec.js) cobrem navegação, validação, senha, confirmação, recuperação e foco, provedores, informações, ausência de armazenamento e envio, fallback sem JavaScript, larguras de 320 a 1440px e auditoria automatizada de acessibilidade. A suíte da galeria foi preservada. Esses testes não certificam acessibilidade completa nem a segurança de um serviço futuro.

Antes de abrir contas reais, será necessário integrar autenticação, cadastro, confirmação de e-mail, recuperação, sessões e provedores sociais, além de definir regras finais de conta, termos, privacidade, consentimentos e proteção de menores. A criação do avatar e a chegada ao mundo continuam no [Documento 02](02-JORNADA-DO-JOGADOR.md).
