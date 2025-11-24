# Gorin no Sho - Website de Resumos

Website moderno e responsivo para apresentar diferentes resumos e análises do livro **Gorin no Sho - O Livro dos Cinco Elementos**, de Miyamoto Musashi.

## 📚 Sobre o Projeto

Este website organiza resumos do clássico tratado filosófico e estratégico de Miyamoto Musashi em diferentes perspectivas e níveis de profundidade:

- 📝 **Resumo Executivo** - Visão geral em uma página
- 📖 **Resumo Detalhado** - Análise completa capítulo por capítulo
- 💡 **Principais Insights** - Lições e reflexões profundas
- 🎯 **Citações Marcantes** - Passagens inspiradoras
- 🔍 **Análise Crítica** - Avaliação profunda da obra (SWOT, 5W2H)
- 🎓 **Guia de Estudo** - Roteiro estruturado para estudo profundo

## 🚀 Características

- ✨ Design moderno e responsivo
- 🌙 Modo escuro/claro
- 🔍 Busca em tempo real nos resumos
- 📊 Barra de progresso de leitura
- 📱 Totalmente responsivo
- ⚡ Performance otimizada
- 🎨 Interface intuitiva e elegante

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico
- **Tailwind CSS** para estilização
- **JavaScript Vanilla** para interatividade
- **Marked.js** para parsing de Markdown
- **Lucide Icons** para ícones

## 📁 Estrutura do Projeto

```
.
├── index.html              # Página principal
├── app.js                  # Lógica da aplicação
├── README.md              # Documentação
├── summaries/             # Arquivos Markdown dos resumos
│   ├── resumo-executivo.md
│   ├── resumo-detalhado.md
│   ├── principais-insights.md
│   ├── citacoes-marcantes.md
│   ├── analise-critica.md
│   └── guia-de-estudo.md
└── ...
```

## 🎯 Como Usar

### Opção 1: Abrir diretamente no navegador

1. Abra o arquivo `index.html` em um navegador moderno
2. O website funcionará localmente

**Nota:** Para carregar os arquivos Markdown, você precisará de um servidor local devido às políticas CORS do navegador.

### Opção 2: Usar um servidor local

#### Python 3
```bash
python -m http.server 8000 --bind 127.0.0.1
```

#### Node.js (com http-server)
```bash
npx http-server -p 8000
```

#### PHP
```bash
php -S localhost:8000
```

Depois, acesse `http://localhost:8000` no navegador.

## 📝 Formato dos Arquivos Markdown

Os arquivos Markdown devem incluir frontmatter no seguinte formato:

```markdown
---
title: "Título do Resumo"
icon: "nome-do-icone"
description: "Descrição breve"
reading_time: "X min"
category: "categoria"
order: 1
---

# Conteúdo do resumo...
```

### Ícones Disponíveis

- `file-text` - Resumo Executivo
- `book-open` - Resumo Detalhado
- `lightbulb` - Principais Insights
- `quote` - Citações Marcantes
- `search` - Análise Crítica
- `graduation-cap` - Guia de Estudo

## 🎨 Personalização

### Cores

As cores principais podem ser ajustadas no arquivo `index.html` na seção de estilos:

```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Fontes

As fontes são carregadas do Google Fonts:
- **Inter** - Para textos gerais
- **Merriweather** - Para conteúdo de leitura

## 📱 Funcionalidades

### Modo Escuro/Claro
Clique no ícone de lua/sol no canto superior direito para alternar entre os modos.

### Busca
Use o ícone de busca para pesquisar conteúdo em todos os resumos.

### Ajuste de Fonte
Clique no ícone de tipo para ajustar o tamanho da fonte no painel de leitura.

### Progresso de Leitura
A barra de progresso no topo indica o progresso de rolagem da página.

## 🔧 Desenvolvimento

### Adicionar Novos Resumos

1. Crie um novo arquivo Markdown em `summaries/`
2. Adicione o frontmatter apropriado
3. Adicione o arquivo à lista `summaryFiles` em `app.js`

### Modificar Estilos

Os estilos são definidos usando Tailwind CSS e CSS customizado no `<style>` do `index.html`.

## 📄 Licença

Este projeto é uma apresentação educacional dos resumos do livro *Gorin no Sho* de Miyamoto Musashi.

## 🙏 Créditos

- **Autor Original:** Miyamoto Musashi (1584-1645)
- **Tradução:** José Yamashiro
- **Obra:** Gorin no Sho - O Livro dos Cinco Elementos (1643)

## 📚 Recursos Adicionais

- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Marked.js Documentation](https://marked.js.org/)
- [Lucide Icons](https://lucide.dev/)

---

**Nota:** Este website foi criado para fins educacionais e de estudo. Os resumos são baseados na tradução de José Yamashiro do original de Miyamoto Musashi.

