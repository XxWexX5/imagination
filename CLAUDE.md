# Imagination — landing page

> Este arquivo é a fonte de contexto do projeto para o Claude. Sempre que uma conversa
> produzir uma escolha durável (stack, arquitetura, convenção, regra, comando, decisão de
> produto/design), atualize este arquivo na mesma sessão, sem precisar que o usuário peça.
> Registre a decisão e o motivo; edite ou remova o que ficar obsoleto em vez de duplicar.
> Não registre aqui estado passageiro (tarefas em andamento, histórico de commits).

## Stack
- Vite + React + TypeScript (strict), pnpm (página única, navegação por âncora)
- Tailwind v4 (plugin `@tailwindcss/vite`, configuração no CSS — sem `tailwind.config`)
- Framer Motion via pacote `motion` (importar de `motion/react`), Lenis (`lenis/react`)
- Biome para lint e formatação (NÃO usar ESLint/Prettier)
- Vitest + RTL + MSW (unit/integração), Playwright (e2e)

## Regras
- Imagens ficam em `src/assets` (nunca em `public/`) para receberem hash

- Commits em Conventional Commits com Gitmoji (ex: `✨ feat: add hero section`, `🐛 fix: correct nav link`, `♻️ refactor: extract button component`)
- Antes de finalizar: `pnpm typecheck && pnpm check && pnpm test:ci`

## Comandos
- `pnpm dev` — servidor de desenvolvimento
- `pnpm build` / `pnpm preview` — build de produção e preview
- `pnpm typecheck` — `tsc -b`
- `pnpm check` / `pnpm check:fix` — Biome (lint + formatação)
- `pnpm test` (watch) / `pnpm test:ci` (execução única) — Vitest
- `pnpm test:e2e` — Playwright (faz build e sobe o preview na porta 4173)

## Estrutura
- `src/main.tsx` — provider global (Lenis smooth scroll); `src/App.tsx` — composição de layout
- `src/components/<Nome>/index.tsx` — componentes reutilizáveis (Header, Footer, etc.)
- `src/pages/<Nome>/index.tsx` — seções/páginas da aplicação (Home, etc.)
- `src/assets/<secao>/` — imagens de cada seção (ex.: `src/assets/album/*.webp`)

- `src/lib/use-active-section.ts` — scroll-spy: devolve o id da seção em vista (usado pelo Header)
- `src/test/setup.ts` — setup do Vitest (jest-dom, MSW); handlers em `src/test/msw/handlers.ts`
- Testes unitários ao lado do código (`src/**/Nome.test.tsx`); e2e em `e2e/`
- `tasks/<secao>.md` — plano de cada seção (dados do layout, passos, testes); criar antes de implementar a seção

## Convenções de código
- Formatação padrão do Biome: tabs e aspas duplas
- Imports relativos com extensão (`./App.tsx`); sem alias de path
- Named exports (sem `export default` em componentes)
- Globals do Vitest habilitados (`describe`/`it`/`expect` sem import)
- `IntersectionObserver` tem stub em `src/test/setup.ts` (o jsdom não tem; `whileInView` do motion precisa)
- E2E: escopar locators pela seção (`page.locator("#home")…`), pois textos e botões se repetem entre seções (ex.: "LISTEN NOW" no header e no hero)
- MSW v3: a opção é `onUnhandledFrame` (não `onUnhandledRequest`); está em `"error"`, então toda requisição em teste precisa de handler

## Decisões
Registro das escolhas feitas ao longo do projeto, com o motivo.

- **Biome no lugar de ESLint/Prettier** — uma única ferramenta para lint e formatação.
- **Imagens em `src/assets`** — passam pelo bundler e recebem hash no nome (cache busting); `public/` não recebe.
- **Pacote `motion` em vez de `framer-motion`** — é o nome atual da mesma biblioteca.
- **E2E roda contra o build de produção** (`vite preview`) — testa o que será publicado, não o dev server.
- **Playwright só com Chromium** — suficiente para o início; adicionar outros browsers quando necessário.
- **Gitmoji nos commits** — emoji no início da mensagem para identificar visualmente o tipo de mudança; segue a convenção [gitmoji.dev](https://gitmoji.dev).
- **Organização por pastas com `index.tsx`** — componentes em `src/components/<Nome>/index.tsx`, páginas em `src/pages/<Nome>/index.tsx`; testes ao lado (`Nome.test.tsx`).
- **lucide-react para ícones** — tree-shakeable, leve e com catálogo amplo.
- **Design lido pelo pen CLI** — `pen interactive --app desktop --in ~/Documents/imagination.pen` com `execute` (`Get`/`Print`) para extrair medidas e textos; não chamar `save()`. Enviar consultas filtradas (pular nós `path`): a saída por stdin é cortada perto de 73 KB.
- **Artes vetoriais do design entram como WebP exportado do pen** (`Export([ids],"webp",<dir>)`, 2x) — cada arte tem centenas de paths; recriar em código não compensa.
- **Seções abaixo da dobra animam com `whileInView` + `viewport={{ once: true }}`** — mesma entrada fade + slide do Hero, disparada ao rolar.
- **Item ativo do menu segue o scroll** (`useActiveSection`) — fica ativa a última seção cujo topo passou de uma linha a 35% da área visível abaixo do header; no fim da página vale a última seção. O clique no menu não marca o item: o scroll resultante é que marca. O link ativo recebe `aria-current="location"` (usar isso nos testes, não a classe de cor).
