# Task: Seção Album (02 — Album Editorial Section)

## Contexto

Próxima seção da landing depois de Header e Hero. O plano foi montado lendo o design
**pelo pen CLI** (`pen interactive --app desktop --in ~/Documents/imagination.pen`, só
com `Get`/`Print`, sem salvar nada), que funcionou conectado ao app aberto.

## Dados extraídos do layout (pen CLI)

Seção `w8yIbM`: 1440×820, fundo `#08183B` (sem token; usar valor arbitrário como o Hero faz).
As variáveis do design (`night/ink/lagoon/tomato/sun/tangerine/haze/paper`) são aliases
das cores que já existem em `src/index.css`; usar os tokens existentes.

**Coluna esquerda**

| Elemento | Conteúdo | Fonte | Size | Peso | Tracking / LH | Cor | Pos (x,y) |
|---|---|---|---|---|---|---|---|
| Número | `01` | Playfair Display | 110 | 700 | — | coral | 82, 78 |
| Label | `THE ALBUM` | Inter | 10 | 700 | 2.8px | turquoise | 88, 202 |
| Heading | `A JOURNEY THROUGH` / `YOUR IMAGINATION` | Playfair Display | 48 | 700 | LH 0.98 | ivory | 84, 244 (w 540) |
| Corpo | `Imagination takes you through a colorful landscape of feelings, dreams, and places that only exist inside your mind.` | Inter | 15 | 400 | LH 1.6 | lavender | 88, 402 (w 370) |
| CTA | `EXPLORE ARTWORK ↗` | Inter | 10 | 700 | 1.2px | turquoise | 88, 606 |

CTA: 198×46, radius 23, borda 1px turquoise, sem preenchimento.

**Coluna direita**

| Elemento | Nó | Tamanho | Pos (x,y) |
|---|---|---|---|
| Arte principal "Inner Island" (fundo transparente) | `T2edrN` | 394×448 | 892, 62 |
| Legenda `IMAGINATION / SINGLE / 2019` (Inter 9, 600, tracking 1.7, lavender) | `F42K0D` | — | 892, 522 |
| Crop 1 — Character Detail | `Mbys1` | 154×170 | 790, 566 |
| Crop 2 — Island Detail | `B9NMf` | 154×170 | 964, 566 |
| Crop 3 — Lagoon Detail | `QOLNY` | 154×170 | 1138, 566 |

Crops: fundo navy, borda 1px `#8D7BA866`, gap de 20px entre eles.
Os nós com `opacity: 0` (placeholders e "Study 1–3") são sobras do design e ficam de fora.

## Passos

### 1. Exportar as artes pelo pen CLI para `src/assets/album/`
As artes são vetores com 200–300 paths cada; não vale recriar em código.

```
pen interactive --app desktop --in ~/Documents/imagination.pen
pen > execute({ input: 'Export(["T2edrN","Mbys1","B9NMf","QOLNY"],"webp","<abs>/src/assets/album")' })
```

- WebP em 2x (padrão do Export), que preserva a transparência da arte principal.
- Renomear `<nodeId>.webp` para `inner-island.webp`, `crop-character.webp`,
  `crop-island.webp`, `crop-lagoon.webp`.
- `Export` não altera o `.pen`; não chamar `save()`.
- Fica em `src/assets` (regra do projeto: hash do bundler), nunca em `public/`.

### 2. Criar `src/pages/Album/index.tsx`
Named export `Album`, seguindo o padrão de `src/pages/Home/index.tsx`:

```
<section id="album" class="bg-[#08183B]">
  <div class="mx-auto max-w-[1440px] px-6 md:px-16 lg:px-[84px] grid lg:grid-cols-2">
    <div>                       coluna de texto
      <span aria-hidden>01</span>
      <p>THE ALBUM</p>
      <h2>A JOURNEY THROUGH<br/>YOUR IMAGINATION</h2>
      <p>corpo</p>
      <a href="#artwork">EXPLORE ARTWORK <ArrowUpRight/></a>
    </div>
    <div>                       coluna de arte
      <figure><img inner-island/><figcaption>IMAGINATION / SINGLE / 2019</figcaption></figure>
      <ul> 3 crops </ul>
    </div>
  </div>
</section>
```

- `id="album"` casa com o link `#album` que o Header já tem; CTA aponta para `#artwork`.
- Seta do CTA com `ArrowUpRight` do `lucide-react` (já instalado), no lugar do glifo `↗`.
- Arte principal com `alt` descritivo; crops decorativos com `alt=""`.
- Imagens com `width`/`height` explícitos e `loading="lazy"` (seção abaixo da dobra).
- Animações de entrada com `motion/react` usando `whileInView` + `viewport={{ once: true }}`,
  no mesmo estilo fade + slide do Hero.
- Responsivo: uma coluna no mobile (texto, depois arte; crops em linha de 3), duas a partir de `lg`.

### 3. Integrar em `src/App.tsx`
Renderizar `<Album />` logo depois de `<Home />` dentro do `<main>`.

### 4. Testes unitários — `src/pages/Album/Album.test.tsx`
- Seção tem `id="album"`
- Heading nível 2 com "A JOURNEY THROUGH YOUR IMAGINATION"
- Label "THE ALBUM", número "01" e o texto do corpo
- CTA é link com nome "EXPLORE ARTWORK" e `href="#artwork"`
- Arte principal presente pelo `alt`; legenda "IMAGINATION / SINGLE / 2019"
- 3 crops renderizados

`src/App.test.tsx` continua valendo (h1 do Hero); só confirmar que passa com a nova seção.

### 5. E2E — `e2e/album.spec.ts`
- Seção `#album` fica visível ao rolar até ela
- Heading, corpo e CTA visíveis
- Clicar em ALBUM no header leva à seção (`toBeInViewport`)
- Imagens carregaram (`naturalWidth > 0`)
- Mobile (375×812): heading e CTA visíveis, sem scroll horizontal

### 6. Atualizar `CLAUDE.md`
- Estrutura: `tasks/<secao>.md` guarda o plano de cada seção; `src/assets/album/`.
- Decisões: design lido pelo pen CLI; artes vetoriais do design entram como WebP
  exportado do pen, e não recriadas em código.

## Arquivos

| Ação | Arquivo |
|---|---|
| Criar | `src/assets/album/*.webp` (4 arquivos, via pen CLI) |
| Criar | `src/pages/Album/index.tsx` |
| Criar | `src/pages/Album/Album.test.tsx` |
| Criar | `e2e/album.spec.ts` |
| Editar | `src/App.tsx` |
| Editar | `src/test/setup.ts` (stub de `IntersectionObserver`) |
| Editar | `tsconfig.node.json` (lib `DOM` para os e2e) |
| Editar | `e2e/hero.spec.ts` (locators escopados em `#home`) |
| Editar | `CLAUDE.md` |

## Riscos a checar na execução

- `whileInView` depende de `IntersectionObserver`, que o jsdom não tem. Se os testes
  unitários quebrarem, adicionar um stub em `src/test/setup.ts`.
- Confirmar que o `Export` pelo CLI em modo `--app desktop` grava no caminho absoluto dado.
- O CLI corta saídas grandes ao receber comandos por stdin (~73 KB); manter as consultas filtradas.

## Verificação

```bash
pnpm typecheck && pnpm check && pnpm test:ci && pnpm test:e2e
```

Comparação visual: exportar um PNG do nó `w8yIbM` pelo pen CLI para o scratchpad e
comparar com um screenshot do Playwright da seção `#album` em 1440px de largura.
