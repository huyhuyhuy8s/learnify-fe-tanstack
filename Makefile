setup:
	npm i -g sass sass-migrator pnpm
	pnpm install
	sass-migrator module --migrate-deps node_modules/.pnpm/material-symbols\@0.42.3/node_modules/material-symbols/rounded.scss

bootstrap:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build
