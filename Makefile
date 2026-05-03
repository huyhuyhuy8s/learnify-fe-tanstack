setup:
	npm i -g sass sass-migrator pnpm
	pnpm install
	sass-migrator module --migrate-deps node_modules/.pnpm/material-symbols\@0.42.3/node_modules/material-symbols/rounded.scss
	pnpm codegen

bootstrap:
	pnpm install
	pnpm codegen

dev:
	pnpm install
	pnpm codegen
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

lint-fix:
	pnpm lint:fix

codegen:
	pnpm codegen
