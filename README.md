# Diagram assistant

Proof of concept for LLM-driven diagram and flowchart creation tool

## Structure

```text
packages/
	ui/    # React + Vite frontend
	api/   # Express backend
```

## Quick start

```bash
npm install
npm run dev
```

This starts both UI and API in parallel.

## Scripts

From repository root:

- `npm run dev` - run UI and API development servers concurrently
- `npm run build` - build all workspace packages
- `npm run test` - run all workspace tests once
- `npm run test:watch` - run all workspace tests in watch mode

Workspace-specific examples:

- `npm run dev -w @diagram-assistant/ui`
- `npm run dev -w @diagram-assistant/api`
- `npm run test -w @diagram-assistant/ui`
- `npm run test -w @diagram-assistant/api`
