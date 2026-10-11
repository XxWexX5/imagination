# Task: Seção Tracks (03 — Tracks Editorial Section)

## Contexto

Terceira seção da landing, depois de Header, Hero e Album. Layout lido do design
via pen MCP (`imagination.svg.pen`, nó `Ge1AF`).

## Dados extraídos do layout (pen MCP)

Seção `Ge1AF`: 1440×820, fundo `$night` (navy `#0b0916`).

**Coluna esquerda**

| Elemento | Conteúdo | Fonte | Size | Peso | Tracking / LH | Cor |
|---|---|---|---|---|---|---|
| Número | `02` | Playfair Display | 110 | 700 | — | yellow |
| Label | `THE SOUNDTRACK` | Inter | 10 | 700 | 2.8px | turquoise |
| Heading | `FIVE WAYS TO` / `GET LOST` | Playfair Display | 52 | 700 | LH 0.95 | ivory |
| Nota | `A SIDEWAYS ROUTE THROUGH THE INNER WORLD` | Inter | 9 | 600 | 1.6px | lavender |

**Coluna direita — Tracklist (610×590)**

5 rows de 610×88, gap 20px, borda `#8D7BA855`.

Cada row:
| Elemento | Fonte | Size | Peso | Tracking | Cor |
|---|---|---|---|---|---|
| Número (`01`–`05`) | Inter | 10 | 600 | 1.3px | lavender |
| Título (ex: `CHASING LOWS`) | Inter | 16 | 500 | 0.8px | ivory |
| Duração (ex: `3:44`) | Inter | 10 | 400 | 1px | lavender |

**Tracklist:**
1. `01` — CHASING LOWS — 3:44
2. `02` — LOST IN SPACE — 4:12
3. `03` — THE THINGS WE DO — 3:28
4. `04` — IMAGINATION — 3:55
5. `05` — PARADISE STATE OF MIND — 4:06

## Decisão de áudio

- Player usa HTML5 Audio API nativa (sem lib externa)
- Sem embed do Spotify/YouTube para manter o layout fiel
- Sem MP3 por enquanto — adicionar `src` aos tracks quando disponíveis
- Apenas uma faixa toca por vez; ao clicar noutra, a anterior para

## Passos

### 1. Criar `src/components/TrackRow/index.tsx`
Componente com: número, ícone play/pause (lucide-react), título, duração.
Recebe `track`, `isPlaying`, `onToggle` como props.
Destaque visual em turquoise quando tocando.

### 2. Criar `src/pages/Tracks/index.tsx`
Seção com grid de duas colunas (texto esquerda, tracklist direita).
Estado de `playingIndex` gerenciado com `useState`.
Animação `whileInView` com `motion/react`.

### 3. Integrar em `src/App.tsx`
`<Tracks />` após `<Album />`.

### 4. Testes unitários
- `src/components/TrackRow/TrackRow.test.tsx` — 4 testes
- `src/pages/Tracks/Tracks.test.tsx` — 9 testes

### 5. Testes E2E — `e2e/tracks.spec.ts`
- Seção visível, heading, label, 5 tracks, play/pause, navegação, mobile

## Arquivos

| Ação | Arquivo |
|---|---|
| Criar | `src/components/TrackRow/index.tsx` |
| Criar | `src/components/TrackRow/TrackRow.test.tsx` |
| Criar | `src/pages/Tracks/index.tsx` |
| Criar | `src/pages/Tracks/Tracks.test.tsx` |
| Criar | `e2e/tracks.spec.ts` |
| Editar | `src/App.tsx` |

## Verificação

```bash
pnpm typecheck && pnpm check && pnpm test:ci && pnpm test:e2e
```
