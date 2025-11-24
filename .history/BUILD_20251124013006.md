# Guia de Build - Tailwind CSS

Este projeto usa Tailwind CSS configurado corretamente para produção.

## Instalação

Primeira vez configurando o projeto:

```bash
npm install
```

## Comandos Disponíveis

### Build para Produção
```bash
npm run build
```
Gera o arquivo CSS minificado em `dist/output.css`.

### Desenvolvimento (Watch Mode)
```bash
npm run dev
```
Monitora mudanças nos arquivos e recompila automaticamente o CSS.

### Build CSS Apenas
```bash
npm run build-css
```
Compila o CSS uma vez.

### Converter Markdown para HTML
```bash
npm run convert-md
```
Converte todos os arquivos `.md` na pasta `summaries/` para páginas HTML individuais com o mesmo design do site.

### Build Completo
```bash
npm run build-all
```
Compila o CSS e converte todos os arquivos Markdown para HTML.

## Estrutura

- `src/input.css` - Arquivo CSS de entrada com diretivas do Tailwind
- `dist/output.css` - CSS compilado e minificado (gerado)
- `tailwind.config.js` - Configuração do Tailwind CSS
- `postcss.config.js` - Configuração do PostCSS
- `convert-md-to-html.js` - Script para converter Markdown para HTML
- `summaries/*.md` - Arquivos Markdown com frontmatter
- `summaries/*.html` - Páginas HTML geradas (criadas automaticamente)

## Conversão de Markdown

Os arquivos Markdown na pasta `summaries/` são convertidos para páginas HTML individuais que:

- ✅ Mantêm o mesmo design visual do site principal
- ✅ Suportam tema claro/escuro (com persistência via localStorage)
- ✅ Incluem navegação entre páginas
- ✅ Preservam o frontmatter (título, ícone, descrição, etc.)
- ✅ Convertem Markdown para HTML com formatação adequada

### Formato do Frontmatter

Cada arquivo `.md` deve começar com frontmatter:

```yaml
---
title: "Título da Página"
icon: "file-text"
description: "Descrição da página"
reading_time: "10 min"
category: "categoria"
order: 1
---
```

## Notas

- O CSS compilado está em `dist/output.css` e é referenciado nos arquivos HTML
- Sempre execute `npm run build-all` antes de fazer deploy
- O modo watch (`npm run dev`) é útil durante o desenvolvimento
- Após editar arquivos `.md`, execute `npm run convert-md` para regenerar as páginas HTML

