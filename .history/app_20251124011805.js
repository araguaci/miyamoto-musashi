// Application State
const state = {
    summaries: [],
    currentSummary: null,
    darkMode: localStorage.getItem('darkMode') === 'true',
    fontSize: parseInt(localStorage.getItem('fontSize')) || 16,
    searchQuery: ''
};

// Icon mapping for categories
const iconMap = {
    'file-text': 'file-text',
    'book-open': 'book-open',
    'lightbulb': 'lightbulb',
    'quote': 'quote',
    'search': 'search',
    'graduation-cap': 'graduation-cap'
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadSummaries();
    setupEventListeners();
    updateProgressBar();
});

// Theme Management
function initializeTheme() {
    if (state.darkMode) {
        document.documentElement.classList.add('dark');
    }
    updateThemeIcon();
}

function toggleTheme() {
    state.darkMode = !state.darkMode;
    localStorage.setItem('darkMode', state.darkMode);
    
    if (state.darkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', state.darkMode ? 'sun' : 'moon');
        lucide.createIcons();
    }
}

// Load summaries from markdown files
async function loadSummaries() {
    const summaryFiles = [
        'summaries/resumo-executivo.md',
        'summaries/resumo-detalhado.md',
        'summaries/principais-insights.md',
        'summaries/citacoes-marcantes.md',
        'summaries/analise-critica.md',
        'summaries/guia-de-estudo.md'
    ];
    
    try {
        const summaries = await Promise.all(
            summaryFiles.map(async (file) => {
                try {
                    const response = await fetch(file);
                    if (!response.ok) {
                        console.warn(`Failed to load ${file}: ${response.status}`);
                        return null;
                    }
                    const text = await response.text();
                    const parsed = parseMarkdownFrontmatter(text, file);
                    return parsed;
                } catch (error) {
                    console.error(`Error loading ${file}:`, error);
                    return null;
                }
            })
        );
        
        state.summaries = summaries.filter(s => s !== null).sort((a, b) => (a.order || 999) - (b.order || 999));
        
        if (state.summaries.length === 0) {
            console.warn('No summaries loaded. Make sure you are running a local server.');
            const grid = document.getElementById('summaries-grid');
            if (grid) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="mb-4" style="color: var(--text-secondary);">
                            Não foi possível carregar os resumos.
                        </p>
                        <p class="text-sm" style="color: var(--text-tertiary);">
                            Certifique-se de estar executando um servidor local (ex: python -m http.server 8000)
                        </p>
                    </div>
                `;
            }
        } else {
            renderSummaryCards();
        }
    } catch (error) {
        console.error('Error loading summaries:', error);
    }
}

// Parse markdown frontmatter
function parseMarkdownFrontmatter(text, file) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = text.match(frontmatterRegex);
    
    if (match) {
        const frontmatter = {};
        match[1].split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                // Remove quotes if present
                value = value.replace(/^["']|["']$/g, '');
                frontmatter[key] = value;
            }
        });
        
        return {
            ...frontmatter,
            content: match[2],
            file: file,
            order: parseInt(frontmatter.order) || 999
        };
    }
    
    // Fallback if no frontmatter
    return {
        title: file.split('/').pop().replace('.md', ''),
        icon: 'file-text',
        description: 'Resumo do livro',
        reading_time: '10 min',
        category: 'other',
        order: 999,
        content: text,
        file: file
    };
}

// Render summary cards
function renderSummaryCards() {
    const grid = document.getElementById('summaries-grid');
    if (!grid) return;

    // Preserve the Dokodo card if it exists
    const dokodoCard = grid.querySelector('article[onclick*="dokodo.html"]');
    const dokodoCardHTML = dokodoCard ? dokodoCard.outerHTML : '';

    // Remove skeleton loaders
    const skeletons = grid.querySelectorAll('.skeleton');
    skeletons.forEach(skeleton => skeleton.remove());

    // Generate summary cards HTML
    const summaryCardsHTML = state.summaries.map((summary, index) => {
        const iconName = iconMap[summary.icon] || 'file-text';
        return `
            <article class="card-hover fade-in rounded-xl shadow-lg p-6 cursor-pointer border"
                 style="background: var(--surface-elevated); border-color: var(--border-primary);"
                 data-summary-id="${summary.file}"
                 onclick="openReader('${summary.file}')"
                 role="button"
                 tabindex="0"
                 onkeypress="if(event.key === 'Enter') openReader('${summary.file}')"
                 aria-label="Abrir ${summary.title}">
                <div class="flex flex-col space-y-4">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-md">
                            <i data-lucide="${iconName}" class="w-6 h-6 text-white"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-xl font-bold mb-2 line-clamp-2" style="color: var(--text-primary);">
                                ${summary.title}
                            </h3>
                        </div>
                    </div>
                    <p class="text-sm leading-relaxed line-clamp-3" style="color: var(--text-secondary);">
                        ${summary.description}
                    </p>
                    <div class="flex items-center justify-between pt-3 border-t" style="border-color: var(--border-primary);">
                        <div class="flex items-center gap-1.5 text-xs" style="color: var(--text-tertiary);">
                            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                            <span>${summary.reading_time}</span>
                        </div>
                        <span class="category-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style="background: var(--primary-100); color: var(--primary-700);">
                            ${summary.category}
                        </span>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // Set innerHTML with Dokodo card first, then summary cards
    grid.innerHTML = dokodoCardHTML + summaryCardsHTML;

    lucide.createIcons();

    // Add stagger animation
    setTimeout(() => {
        const cards = grid.querySelectorAll('.card-hover');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
        });
    }, 0);
}

// Open reader panel
function openReader(file) {
    const summary = state.summaries.find(s => s.file === file);
    if (!summary) return;
    
    state.currentSummary = summary;
    
    // Update reader content
    document.getElementById('reader-title').textContent = summary.title;
    document.getElementById('reader-meta').textContent = 
        `${summary.reading_time} de leitura • ${summary.category}`;
    
    // Render markdown content
    const content = document.getElementById('reader-content');
    if (marked) {
        content.innerHTML = marked.parse(summary.content);
    } else {
        content.innerHTML = `<pre>${summary.content}</pre>`;
    }
    
    // Show reader panel
    document.getElementById('reader-panel').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Update progress bar
    updateProgressBar();
}

// Close reader panel
function closeReader() {
    document.getElementById('reader-panel').classList.add('hidden');
    document.body.style.overflow = '';
    state.currentSummary = null;
}

// Update progress bar based on scroll
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Search functionality
function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    searchBtn?.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
        searchInput.focus();
    });
    
    closeSearch?.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    searchModal?.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.add('hidden');
        }
    });
    
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        state.searchQuery = query;
        
        if (query.length < 2) {
            searchResults.innerHTML = '<p class="text-gray-500 text-center py-8">Digite pelo menos 2 caracteres para buscar</p>';
            return;
        }
        
        const results = searchInSummaries(query);
        renderSearchResults(results);
    });
}

function searchInSummaries(query) {
    return state.summaries.map(summary => {
        const titleMatch = summary.title.toLowerCase().includes(query);
        const descMatch = summary.description.toLowerCase().includes(query);
        const contentMatch = summary.content.toLowerCase().includes(query);
        
        if (titleMatch || descMatch || contentMatch) {
            // Extract relevant snippet
            const contentLower = summary.content.toLowerCase();
            const index = contentLower.indexOf(query);
            let snippet = '';
            
            if (index !== -1) {
                const start = Math.max(0, index - 100);
                const end = Math.min(summary.content.length, index + query.length + 100);
                snippet = summary.content.substring(start, end);
                if (start > 0) snippet = '...' + snippet;
                if (end < summary.content.length) snippet = snippet + '...';
            } else {
                snippet = summary.description;
            }
            
            return {
                summary,
                snippet,
                relevance: titleMatch ? 3 : (descMatch ? 2 : 1)
            };
        }
        return null;
    }).filter(r => r !== null).sort((a, b) => b.relevance - a.relevance);
}

function renderSearchResults(results) {
    const searchResults = document.getElementById('search-results');

    if (results.length === 0) {
        searchResults.innerHTML = '<p class="text-center py-8" style="color: var(--text-tertiary);">Nenhum resultado encontrado</p>';
        return;
    }

    searchResults.innerHTML = results.map(result => {
        const iconName = iconMap[result.summary.icon] || 'file-text';
        return `
            <div class="p-4 rounded-lg cursor-pointer transition-colors mb-2"
                 style="background: transparent;"
                 onmouseover="this.style.background='var(--surface-overlay)'"
                 onmouseout="this.style.background='transparent'"
                 onclick="openReader('${result.summary.file}'); document.getElementById('search-modal').classList.add('hidden');">
                <div class="flex items-start space-x-3">
                    <i data-lucide="${iconName}" class="w-5 h-5 mt-1" style="color: var(--primary-600);"></i>
                    <div class="flex-1">
                        <h4 class="font-semibold mb-1" style="color: var(--text-primary);">
                            ${result.summary.title}
                        </h4>
                        <p class="text-sm line-clamp-2" style="color: var(--text-secondary);">
                            ${result.snippet}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    lucide.createIcons();
}

// Font size management
function setupFontSize() {
    const fontSizeBtn = document.getElementById('font-size-btn');
    const sizes = [14, 16, 18, 20];
    let currentIndex = sizes.indexOf(state.fontSize) >= 0 
        ? sizes.indexOf(state.fontSize) 
        : 1;
    
    fontSizeBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % sizes.length;
        state.fontSize = sizes[currentIndex];
        localStorage.setItem('fontSize', state.fontSize);
        
        const readerContent = document.getElementById('reader-content');
        if (readerContent) {
            readerContent.style.fontSize = state.fontSize + 'px';
        }
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    
    // Close reader
    document.getElementById('close-reader')?.addEventListener('click', closeReader);
    
    // Close reader on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeReader();
            document.getElementById('search-modal')?.classList.add('hidden');
        }
    });
    
    // Search
    setupSearch();
    
    // Font size
    setupFontSize();
}

// Make functions globally available
window.openReader = openReader;
window.closeReader = closeReader;

