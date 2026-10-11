# The Visual Universe — Seção 04 (Artwork Gallery)

## Dados do design (pen id: GIvDc)

- **Container**: 1440×900, fundo navy (#08183b)
- **Número**: "03" — $display 110px bold, $tangerine
- **Label**: "THE VISUAL UNIVERSE" — $sans 10px bold, $lagoon
- **Heading**: "EVERYTHING\nIS A LANDSCAPE" — $display 48px bold, $paper
- **CTA text**: "SELECT A STUDY ↗" — $sans 9px bold, $haze
- **Captions**:
  - "01 / THE WANDERER"
  - "02 / THE INNER ISLAND"
  - "03 / AFTER THE SUN"

## Layout

Two-column: texto esquerda, galeria masonry direita.
Masonry com CSS columns (2–3 colunas responsivas).
Animações whileInView staggered (motion/react).
Apenas visual — sem lightbox ou interação de clique.

## Imagens

Exportar do pen como WebP 2x → `src/assets/images/`.

### Frames para exportar

- Dream Island Panorama (RtO3r): 600×300 — landscape wide
- Character Portrait (cwtIk): 168×324 — retrato
- Sunlit Palms (z50lj): 168×324 — retrato
- Turquoise Lagoon (JlAuo): 168×324 — retrato
- Wide Sunset (b9VcQe): 352×260 — landscape
- Traveler (d4oCm): 168×324 — retrato
- Lagoon (M9l5a): 168×220 — retrato curto
- Inner World (sDdWo): 300×364 — retrato largo
- Surreal Horizon (K06Qo): 220×250 — quadrado
- Portrait Fragment (jCG3G): 168×324 — retrato

## Passos

1. [x] Criar este task file
2. [ ] Exportar imagens do pen
3. [ ] Criar `src/pages/VisualUniverse/index.tsx`
4. [ ] Integrar no `src/App.tsx`
5. [ ] Adicionar link no Header
6. [ ] Testes unitários
7. [ ] Testes E2E
8. [ ] Verificação: `pnpm typecheck && pnpm check && pnpm test:ci && pnpm test:e2e`
