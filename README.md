# Samudex

Base em React + Vite pronta para usar React Router.

## Scripts

- `npm run dev`: inicia o servidor local.
- `npm run build`: gera a build de producao.
- `npm run lint`: executa o ESLint.
- `npm run preview`: sobe a build localmente para conferencia.

## Estrutura inicial

- `src/App.tsx`: layout compartilhado com cabecalho e `Outlet`.
- `src/router.tsx`: configuracao central das rotas.
- `src/pages`: paginas iniciais (`/`, `/sobre` e `404`).
- `src/main.tsx`: ponto de entrada com `RouterProvider`.

## Proximo passo

Crie novas paginas em `src/pages` e registre cada caminho em `src/router.tsx`.
