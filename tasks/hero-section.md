# Plano: Hero Section

## Contexto

Implementar a seção Hero da landing page "Imagination" conforme o layout no `imagination.pen`.
O Hero ocupa a primeira tela (1440×920), com texto à esquerda e a ilustração animada à direita.
O usuário já possui um SVG animado (`src/assets/imagination.svg` + `src/animation.css`) que
deve substituir a imagem estática do layout. O CTA "Listen Now" deve abrir um popover com
opções (Spotify, YouTube, seção futura) em vez de navegar diretamente.

## Dados extraídos do layout (pencil.dev)

### Estrutura do Hero (1440×920, fundo `#120E1F`)

**Lado esquerdo — Conteúdo textual:**

| Elemento     | Conteúdo                              | Font             | Size | Weight | Tracking | Cor       | Posição (x,y) |
|-------------|---------------------------------------|------------------|------|--------|----------|-----------|----------------|
| Eyebrow     | `FOSTER THE PEOPLE  /  2019`          | Inter            | 11px | 700    | 2.8px    | turquoise | (84, 226)      |
| Título      | `IMAGINATION`                         | Playfair Display | 76px | 700    | 0.6px    | ivory     | (78, 270)      |
| Tagline     | `REAL PLACES LIVE IN\nYOUR IMAGINATION` | Inter          | 15px | 600    | 1.8px    | yellow    | (86, 378)      |
| CTA         | `LISTEN NOW` + ícone play             | Inter            | 10px | 700    | 1.5px    | ivory     | (86, 496)      |
| Scroll Cue  | `SCROLL TO EXPLORE   ↓`              | Inter            | 9px  | 600    | 2px      | lavender  | (86, 824)      |

**CTA "Hero Listen":**
- 180×48px, border-radius 24px, borda 1px ivory
- Ícone play 16×16 (lucide), cor ivory

**Lado direito — Artwork:**
- Posição: (517, 86), ocupando ~1091×846
- Substituir pela animação SVG existente (`imagination.svg` + `animation.css`)

### Scroll Cue
- Texto lavender no rodapé da seção, centralizado à esquerda

## Passos

### 1. Criar componente `src/components/ListenPopover/index.tsx`

Popover acionado pelo botão "Listen Now" com 3 opções:
- **Spotify** — link externo (ex: `https://open.spotify.com/...`)
- **YouTube** — link externo (ex: `https://youtube.com/...`)
- **Na página** — âncora para seção futura (`#listen`)

Cada opção com ícone (lucide-react: `Music`, `Youtube` / SVG customizado, `Play`) + label.

Implementação:
- Estado `open` controlado por `useState`
- Posicionado acima ou abaixo do botão
- Animação de entrada/saída com `motion/react` (`AnimatePresence`)
- Fecha ao clicar fora (`useEffect` com listener no document)
- Fecha ao pressionar `Escape`
- Acessibilidade: `aria-haspopup`, `aria-expanded`, `role="menu"`, `role="menuitem"`

### 2. Mover animações do SVG para o componente

O arquivo `src/animation.css` será removido. As animações CSS serão incorporadas num
arquivo CSS co-localizado com o componente Hero: `src/pages/Home/hero-animation.css`.
Isso mantém a animação acoplada ao componente que a usa, em vez de solta na raiz do `src/`.

O SVG permanece em `src/assets/imagination.svg` (regra do projeto: imagens em `src/assets`
para receber hash do bundler).

### 3. Criar componente `src/pages/Home/index.tsx` (reescrever)

Estrutura do Hero:
```
<section id="home">
  <!-- Layout flex: texto à esquerda, SVG à direita -->
  <div> <!-- Coluna esquerda -->
    <span>  Eyebrow (turquoise)
    <h1>    IMAGINATION (Playfair Display, ivory)
    <p>     Tagline (yellow)
    <ListenPopover />  CTA com popover
  </div>

  <div> <!-- Coluna direita -->
    <div class="container-animation">
      <!-- SVG inline importado como componente React -->
    </div>
  </div>

  <span>  Scroll Cue (lavender, posição absoluta no rodapé)
</section>
```

- Importar o SVG como componente React (usando `?react` do vite)
- Importar `./hero-animation.css` para as animações do SVG
- Layout responsivo: no mobile, SVG fica atrás do texto (z-index) ou abaixo
- Animações de entrada com `motion/react` (fade + slide nos textos)

### 4. Integrar no `src/App.tsx`

A Home já está integrada. Apenas garantir que o componente atualizado funciona.

### 5. Testes unitários e integração

**`src/components/ListenPopover/ListenPopover.test.tsx`:**
- Renderiza o botão "LISTEN NOW"
- Popover abre ao clicar
- Mostra as 3 opções (Spotify, YouTube, seção)
- Fecha ao clicar fora
- Fecha ao pressionar Escape
- `aria-expanded` reflete o estado
- Links externos têm `target="_blank"` e `rel="noopener noreferrer"`

**`src/pages/Home/Home.test.tsx`:**
- Renderiza o eyebrow "FOSTER THE PEOPLE / 2019"
- Renderiza o título "IMAGINATION" como h1
- Renderiza a tagline
- Renderiza o CTA "LISTEN NOW"
- Renderiza o scroll cue "SCROLL TO EXPLORE"
- SVG da animação está presente no DOM

### 6. Testes E2E (`e2e/hero.spec.ts`)

- Seção hero visível ao carregar
- Título "IMAGINATION" visível
- Eyebrow e tagline visíveis
- CTA "LISTEN NOW" visível
- Popover abre ao clicar no CTA, mostra opções
- Popover fecha ao clicar fora
- Scroll cue visível
- Mobile (375px): layout se adapta, conteúdo visível

## Verificação

```bash
pnpm typecheck && pnpm check && pnpm test:ci && pnpm test:e2e
```

## Arquivos

| Ação    | Arquivo                                              |
|---------|------------------------------------------------------|
| Criar   | `src/components/ListenPopover/index.tsx`             |
| Criar   | `src/components/ListenPopover/ListenPopover.test.tsx`|
| Editar  | `src/pages/Home/index.tsx`                           |
| Criar   | `src/pages/Home/hero-animation.css`                  |
| Criar   | `src/pages/Home/Home.test.tsx`                       |
| Criar   | `e2e/hero.spec.ts`                                   |
| Remover | `src/animation.css`                                  |
