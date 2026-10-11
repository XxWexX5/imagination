# Imagination — landing page

> Este arquivo é a fonte de contexto do projeto para o Claude. Sempre que uma conversa
> produzir uma escolha durável (stack, arquitetura, convenção, regra, comando, decisão de
> produto/design), atualize este arquivo na mesma sessão, sem precisar que o usuário peça.
> Registre a decisão e o motivo; edite ou remova o que ficar obsoleto em vez de duplicar.
> Não registre aqui estado passageiro (tarefas em andamento, histórico de commits).

## Stack
- Vite + React + TypeScript (strict), pnpm
- TanStack Query (sem Router/Start: página única, navegação por âncora)
- Tailwind v4 (plugin `@tailwindcss/vite`, configuração no CSS — sem `tailwind.config`)
- Framer Motion via pacote `motion` (importar de `motion/react`), Lenis (`lenis/react`)
- Biome para lint e formatação (NÃO usar ESLint/Prettier)
- Vitest + RTL + MSW (unit/integração), Playwright (e2e)

## Regras
- Imagens ficam em `src/assets` (nunca em `public/`) para receberem hash
- Query keys sempre via `queryOptions` factories tipadas
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
- `src/main.tsx` — providers globais (QueryClient, Lenis); `src/App.tsx` — a página
- `src/lib/query-client.ts` — `createQueryClient()`
- `src/test/setup.ts` — setup do Vitest (jest-dom, MSW); handlers em `src/test/msw/handlers.ts`
- Testes unitários ao lado do código (`src/**/*.test.tsx`); e2e em `e2e/`

## Convenções de código
- Formatação padrão do Biome: tabs e aspas duplas
- Imports relativos com extensão (`./App.tsx`); sem alias de path
- Named exports (sem `export default` em componentes)
- Globals do Vitest habilitados (`describe`/`it`/`expect` sem import)
- MSW v3: a opção é `onUnhandledFrame` (não `onUnhandledRequest`); está em `"error"`, então toda requisição em teste precisa de handler

## Decisões
Registro das escolhas feitas ao longo do projeto, com o motivo.

- **Sem TanStack Router/Start** — a aplicação é uma página única; a navegação é feita por âncoras.
- **Biome no lugar de ESLint/Prettier** — uma única ferramenta para lint e formatação.
- **Imagens em `src/assets`** — passam pelo bundler e recebem hash no nome (cache busting); `public/` não recebe.
- **Query keys via `queryOptions` factories** — chaves tipadas e centralizadas, sem strings soltas.
- **Pacote `motion` em vez de `framer-motion`** — é o nome atual da mesma biblioteca.
- **E2E roda contra o build de produção** (`vite preview`) — testa o que será publicado, não o dev server.
- **Playwright só com Chromium** — suficiente para o início; adicionar outros browsers quando necessário.
- **Gitmoji nos commits** — emoji no início da mensagem para identificar visualmente o tipo de mudança; segue a convenção [gitmoji.dev](https://gitmoji.dev).
