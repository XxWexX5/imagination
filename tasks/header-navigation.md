# Task: Header / Top Navigation

## Contexto

Implementar o header da landing page "Imagination" conforme o layout definido no
`imagination.pen` (pencil.dev). O header é fixo no topo, com fundo escuro, wordmark à
esquerda, links de navegação centralizados e um CTA "Listen Now" à direita. No mobile
deve colapsar os links em um menu hamburger.

## Design tokens (extraídos do layout)

### Cores

| Token       | Hex       | Uso                              |
|-------------|-----------|----------------------------------|
| `navy`      | `#0B0916` | Fundo da página                  |
| `charcoal`  | `#171B2B` | Fundo do header (`#120e1fff`)    |
| `turquoise` | `#00B89C` | Link ativo, underline            |
| `yellow`    | `#FFC83D` | Ícone play do CTA                |
| `ivory`     | `#F3E9D5` | Texto padrão, borda do CTA       |
| `lavender`  | `#8D7BA8` | Borda inferior do header (33% α) |

### Tipografia

| Elemento     | Font   | Size | Weight | Letter-spacing |
|-------------|--------|------|--------|----------------|
| Wordmark    | Inter  | 12px | 700    | 2.4px          |
| Nav links   | Inter  | 10px | 600    | 1.7px          |
| CTA label   | Inter  | 10px | 700    | 1.1px          |

### Dimensões

| Propriedade          | Valor                   |
|---------------------|-------------------------|
| Largura do header    | 100% (max 1440px)       |
| Altura               | ~66px (padding-bottom 24px) |
| Gap entre itens      | 65px                    |
| CTA                  | 144×42px, border-radius 21px |
| Active underline     | 29×1px                  |
| Borda inferior       | 1px `#8D7BA833`         |

### Links de navegação

HOME (ativo) · ALBUM · TRACKS · ARTWORK · ABOUT

### CTA "Listen Now"

- Borda: 1px `ivory`
- Ícone play: `lucide` library, cor `yellow`
- Label: "LISTEN NOW"

## Plano de implementação

### 1. Configurar design tokens no Tailwind (CSS)

**Arquivo:** `src/index.css`

Adicionar variáveis CSS customizadas no `@theme` do Tailwind v4 para as cores e fontes
do layout:

```
--color-navy, --color-charcoal, --color-turquoise, --color-yellow,
--color-ivory, --color-lavender, --color-coral, --color-orange
--font-display (Playfair Display), --font-body (Inter)
```

Importar as Google Fonts (Inter e Playfair Display) no `index.html`.

### 2. Instalar dependência de ícones

**Pacote:** `lucide-react`

O layout usa ícones da biblioteca Lucide (play, menu/X). Lucide é tree-shakeable,
leve e popular.

### 3. Criar o componente Header

**Arquivo:** `src/components/Header.tsx`

Estrutura:
```
<header>  (fixed, top, z-50, fundo charcoal, borda inferior lavender/33%)
  <nav>   (max-w, flex, items-center, justify-between)
    <span> FOSTER THE PEOPLE (wordmark)
    
    <!-- Desktop: links visíveis -->
    <ul>   (hidden md:flex, gap)
      <li> HOME (turquoise, underline ativo)
      <li> ALBUM
      <li> TRACKS
      <li> ARTWORK
      <li> ABOUT
    </ul>
    
    <!-- CTA Listen Now -->
    <a>    (border ivory, rounded-full, flex items-center)
      <Play icon yellow />
      <span> LISTEN NOW
    </a>

    <!-- Mobile: botão hamburger -->
    <button> (md:hidden)
      <Menu /> ou <X />
    </button>
  </nav>
</header>
```

- Links são âncoras (`#home`, `#album`, etc.)
- Link ativo determinado por prop ou estado
- Menu mobile: overlay ou drawer com animação (Framer Motion)
- Acessibilidade: `aria-expanded`, `aria-label`, `role="navigation"`

### 4. Mobile menu

- Ao clicar no hamburger, abre um painel fullscreen ou sidebar
- Fundo `navy` com os mesmos links em tamanho maior
- Animação de entrada/saída com `motion/react`
- Fecha ao clicar em um link ou no botão X
- Trava scroll do body quando aberto

### 5. Integrar no App

**Arquivo:** `src/App.tsx`

- Importar `Header` e renderizar antes do conteúdo principal
- Adicionar `id` nas seções futuras para navegação por âncora

### 6. Testes

#### Unitários (`src/components/Header.test.tsx`)
- Renderiza o wordmark "FOSTER THE PEOPLE"
- Renderiza todos os 5 links de navegação
- Renderiza o CTA "LISTEN NOW"
- Link ativo tem estilo diferenciado (cor turquoise)

#### Integração (`src/components/Header.test.tsx`)
- Toggle do menu mobile: abrir/fechar
- Menu fecha ao clicar em um link
- Acessibilidade: `aria-expanded` muda com o estado

#### E2E (`e2e/header.spec.ts`)
- Header visível ao carregar a página
- Navegação funciona (clique nos links)
- Mobile: menu hamburger abre/fecha (viewport 375px)
- CTA "Listen Now" está visível

## Verificação

```bash
pnpm typecheck && pnpm check && pnpm test:ci && pnpm test:e2e
```

## Arquivos modificados/criados

| Ação     | Arquivo                          |
|----------|----------------------------------|
| Editar   | `src/index.css`                  |
| Editar   | `index.html`                     |
| Editar   | `src/App.tsx`                    |
| Criar    | `src/components/Header.tsx`      |
| Criar    | `src/components/Header.test.tsx` |
| Criar    | `e2e/header.spec.ts`             |
| Instalar | `lucide-react`                   |
