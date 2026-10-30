# Celular do jogador

O celular é a central de controle do Lumora, solicitada pelo responsável pelo projeto. O acionador fica no canto inferior direito; o aparelho aberto mantém a mesma posição e reúne os aplicativos de controle do jogador.

## Aplicativos

| Aplicativo | Responsabilidade | Demonstração no DS |
| --- | --- | --- |
| Amigos | Lista de amigos e interações sociais. | Busca por nome, presença com texto e ação de conversa ilustrativa. |
| Quartos | Descobrir, acessar e gerenciar os quartos. | Quartos fictícios com ações de visita ilustrativas. |
| Personagem | Personalização do personagem. | Seleção de cores na prévia de interface; sem modelo final de avatar. |
| Loja | Catálogo e compras disponíveis no jogo. | Seleção e experimentação ilustrativa de itens, sem cobranças. |
| Configurações | Todas as configurações disponíveis no jogo. | Categorias de áudio, exibição/acessibilidade, privacidade/notificações, controles e conta/ajuda. |

As categorias e opções específicas são exemplos de composição, sem definir regras de produto. Serviços, autorização, dados reais, persistência e ações pertencem à aplicação. Outras funções poderão ser adicionadas como aplicativos ou telas internas.

## Anatomia e aparência

- **Acionador:** `lm-phone-launcher`, posição fixa no canto inferior direito.
- **Aparelho:** `dialog.lm-phone`, moldura verde, superfície creme e sombra reservada ao elemento flutuante.
- **Cabeçalho:** título da tela, voltar quando houver histórico e fechar sempre disponível.
- **Conteúdo:** `lm-phone__content`, com rolagem independente, sem deslocar cabeçalho ou início.
- **Aplicativos:** `lm-phone__apps` e `lm-phone__app`, ícones Lucide com rótulos visíveis.
- **Base:** `lm-phone__dock`, com acesso ao início.

Reutiliza cores semânticas, Manrope, bordas, raios, espaçamento, foco e componentes existentes. Não adiciona gradientes, vidro ou uma paleta paralela. Os controles de navegação usam alvos de 48px.

Variáveis locais: `--lm-phone-width` (23rem) e `--lm-phone-height` (40rem). O componente limita essas dimensões ao viewport com unidades `dvh` e respeita `safe-area-inset-*`; o conteúdo rola em telas baixas e com zoom. A moldura e os comandos permanecem dentro da tela.

### Entrada e saída

O aparelho entra subindo de fora da tela e sai descendo até desaparecer. A transição de `transform` dura **320ms**, configurável por `--lm-phone-duration`, com curva `cubic-bezier(.22, 1, .36, 1)` para desaceleração suave. O controlador aguarda o término da saída antes de fechar o diálogo, devolver o foco e emitir `lm:phone-close`; o cenário continua inerte durante todo o movimento.

Reabrir durante a saída reverte a transição a partir da posição atual, sem fechar o diálogo ou emitir eventos duplicados. `destroy()` fecha imediatamente e libera os controles. Com `prefers-reduced-motion: reduce`, abertura e fechamento são imediatos. O acionador e a posição final do aparelho permanecem os mesmos.

## Estados e navegação

- **Recolhido:** acionador visível com `aria-expanded="false"`.
- **Início:** perfil ilustrativo, aplicativos e atalhos.
- **Aplicativo aberto:** conteúdo interno com voltar, início e fechar.
- **Carregando:** seção afetada com `aria-busy="true"` e mensagem de status.
- **Vazio:** mensagem contextual, incluindo busca sem resultados.
- **Erro:** mensagem com ação de tentar novamente.

Na galeria, abra **Amigos → Estados da lista · demonstração** para selecionar carregando, vazio e erro. Não há uma requisição real nem temporizador simulando rede. Buscar um nome inexistente também demonstra o estado sem resultados.

Fechar preserva o aplicativo e os valores locais da sessão; início limpa o histórico de navegação. Escape retorna pela pilha de telas e, no início, recolhe o celular. Não se escolheu um atalho global de abertura para evitar conflitos com o futuro mapa de controles.

## Integração

Compile com `npm run build`. Use o CSS, sprite e fonte já distribuídos pelo DS e importe o controlador opcional:

```js
import { initPlayerPhone } from '/dist/player-phone.mjs';

const root = document.querySelector('[data-lm-phone]');
const phone = initPlayerPhone(root);

root.addEventListener('lm:phone-open', () => {
  // Suspender comandos de movimento/atalhos na engine.
});
root.addEventListener('lm:phone-close', () => {
  // Retomar comandos, respeitando outros menus ou bloqueios do jogo.
});

// A aplicação pode chamar phone.open(), phone.close(), phone.navigate('friends'),
// phone.back() e consultar phone.currentView. Ao desmontar: phone.destroy().
```

O markup completo está em [examples/design-system.html](../examples/design-system.html), dentro de `[data-lm-phone]`. Estrutura mínima:

```html
<div data-lm-phone>
  <button type="button" class="lm-button lm-phone-launcher" data-phone-open
    aria-controls="celular-jogo" aria-haspopup="dialog" aria-expanded="false">Celular</button>
  <dialog class="lm-phone" id="celular-jogo" aria-labelledby="titulo-celular">
    <div class="lm-phone__screen">
      <header class="lm-phone__header">
        <button type="button" class="lm-button" data-phone-back hidden>Voltar</button>
        <h2 class="lm-phone__title" id="titulo-celular" data-phone-title tabindex="-1">Seu celular</h2>
        <button type="button" class="lm-button" data-phone-close>Fechar</button>
      </header>
      <div class="lm-phone__content">
        <section data-phone-view="home" data-phone-label="Seu celular">
          <button type="button" class="lm-phone__app" data-phone-go="friends">Amigos</button>
        </section>
        <section data-phone-view="friends" data-phone-label="Amigos" hidden>
          <!-- Renderizar a lista fornecida pela aplicação. -->
        </section>
      </div>
      <footer class="lm-phone__dock">
        <button type="button" class="lm-button" data-phone-home>Início</button>
      </footer>
    </div>
  </dialog>
</div>
```

Cada `data-phone-view` deve ser único dentro da instância. `home` é obrigatório. `data-phone-label` alimenta o título; `data-phone-go` aponta para uma tela existente. IDs e atributos ARIA devem ser únicos por instância. O controlador aceita rotas adicionais sem conhecer os dados ou as regras dos aplicativos.

| API / evento | Contrato |
| --- | --- |
| `open()`, `close()` | Iniciam a entrada/saída; operações repetidas são inofensivas. O fechamento se conclui após a transição. |
| `navigate(view)` | Retorna `true` para uma tela conhecida; `false` para desconhecida, durante a saída ou após desmontagem. |
| `back()` | Retorna `true` quando havia histórico; `false` durante a saída, após desmontagem ou sem histórico. |
| `currentView` | Identificador da tela atual. |
| `destroy()` | Fecha, libera ouvintes e impede novas operações nessa instância. |
| `lm:phone-open`, `lm:phone-close` | Eventos propagados pelo wrapper, com `detail.view`. Abertura no início da entrada; fechamento ao concluir a saída. |
| `lm:phone-navigate` | Emitido após uma mudança de tela, com `detail.view`. |

O controlador não injeta HTML, não faz requisições e não usa armazenamento. O JavaScript da galeria gerencia os exemplos separadamente.

## Teclado e acessibilidade

O aparelho usa `dialog.showModal()`: o cenário fica visível e inerte até fechar. O foco vai ao título ao abrir ou trocar de tela, Tab permanece no aparelho e fechar devolve o foco ao elemento que o abriu. Os aplicativos têm nomes visíveis; botões de ícone têm nomes acessíveis. A cor complementa textos e estados nativos.

Eventos de teclado originados no aparelho não propagam até handlers de jogo na fase de bubbling. **A engine também deve suspender sua entrada nos eventos de abertura e fechamento**, sobretudo se usa listeners em captura, polling de teclado ou gamepad. O DS sozinho não controla a engine. Use o estado agregado de menus do jogo para evitar que fechar o celular reative comandos enquanto outra interface está aberta.

O reset `lm-ui` respeita a preferência do sistema de movimento reduzido. O switch ilustrativo de movimento no jogo não altera essa preferência nem implementa uma configuração real.

## Verificação

Execute `npm run build` e `npm test`. Os testes do celular cobrem os cinco aplicativos, foco, Escape, reabertura, eventos e API, busca, estados de lista, controles locais, limites em telas estreitas/baixas e axe nas telas abertas. As verificações não substituem testes com a engine, leitores de tela ou serviços reais.

Prévias: [desktop](assets/player-phone-desktop.png) e [tela pequena](assets/player-phone-mobile.png).
