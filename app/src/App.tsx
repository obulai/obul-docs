import { useState, useEffect, useMemo } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-http';
import { 
  Menu, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  Twitter, 
  MessageCircle,
  FileText,
  Bot,
} from 'lucide-react';
import { SearchModal, SearchTrigger } from './components/Search';
import './App.css';

// Types
interface DocItem {
  label: string;
  slug: string;
  file: string;
  badge?: string;
}

interface SidebarGroup {
  group: string;
  items: DocItem[];
}

interface DocsConfig {
  name: string;
  description: string;
  sidebar: SidebarGroup[];
  nav: {
    links: { label: string; href: string }[];
    social: { discord: string; twitter: string; github: string };
  };
}

interface DocContent {
  title: string;
  description: string;
  content: string;
  sidebar_position?: number;
  status?: string;
}

// Import docs config
import docsConfig from '../docs/docs.json';

// Import all markdown files
const docFiles = import.meta.glob('../docs/**/*.md', { as: 'raw', eager: true });

// Parse frontmatter from markdown
function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const body = match[2];
  
  const data: Record<string, string> = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  
  return { data, content: body };
}

// Parse :::tip blocks to HTML
function parseTipBlocks(markdown: string): string {
  const tipBlockRegex = /:::(\w+)\s*([\s\S]*?):::/g;
  return markdown.replace(tipBlockRegex, (_match, type, content) => {
    const tipTypes: Record<string, { icon: string; class: string }> = {
      tip: { icon: '💡', class: 'bg-green-500/10 border-green-500/30' },
      warning: { icon: '⚠️', class: 'bg-yellow-500/10 border-yellow-500/30' },
      danger: { icon: '🚨', class: 'bg-red-500/10 border-red-500/30' },
      info: { icon: 'ℹ️', class: 'bg-blue-500/10 border-blue-500/30' },
    };
    const { icon, class: bgClass } = tipTypes[type] || tipTypes.tip;
    
    // Process inner content for markdown
    const innerContent = marked.parseInline(content.trim());
    
    return `<div class="tip-block ${bgClass} rounded-lg p-4 my-4 border-l-4">
      <div class="tip-header flex items-center gap-2 font-semibold text-foreground mb-2">
        <span>${icon}</span>
        <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </div>
      <div class="tip-content text-foreground/80">${innerContent}</div>
    </div>`;
  });
}

// Configure marked for syntax highlighting
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer for marked
const renderer = new marked.Renderer();

// Helper to render tokens to HTML
function renderTokens(tokens: any[]): string {
  if (!tokens || !Array.isArray(tokens)) return '';
  return tokens.map((t: any) => {
    if (t.type === 'text') {
      // Text tokens can contain nested tokens (like **bold** inside)
      if (t.tokens && t.tokens.length > 0) {
        return renderTokens(t.tokens);
      }
      return t.text;
    }
    if (t.type === 'strong') return `<strong>${renderTokens(t.tokens || [])}</strong>`;
    if (t.type === 'em') return `<em>${renderTokens(t.tokens || [])}</em>`;
    if (t.type === 'codespan') return `<code class="bg-secondary px-1 py-0.5 rounded text-sm">${t.text}</code>`;
    if (t.type === 'link') return `<a href="${t.href}" class="docs-link">${renderTokens(t.tokens || [])}</a>`;
    if (t.type === 'newline') return '<br />';
    return t.text || t.raw || '';
  }).join('');
}

// Custom code block rendering with syntax highlighting
(renderer as any).code = ({ text, lang }: { text: string; lang?: string }) => {
  const language = lang || 'text';
  const languageMap: Record<string, string> = {
    'bash': 'bash',
    'sh': 'bash',
    'shell': 'bash',
    'js': 'javascript',
    'javascript': 'javascript',
    'ts': 'typescript',
    'typescript': 'typescript',
    'py': 'python',
    'python': 'python',
    'go': 'go',
    'json': 'json',
    'yaml': 'yaml',
    'yml': 'yaml',
    'http': 'http',
  };
  
  const prismLang = languageMap[language] || 'text';
  let highlightedCode: string;
  
  try {
    if (prismLang !== 'text' && Prism.languages[prismLang]) {
      highlightedCode = Prism.highlight(text, Prism.languages[prismLang], prismLang);
    } else {
      highlightedCode = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  } catch {
    highlightedCode = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  return `
    <div class="code-block my-4">
      <div class="code-block-header">
        <div class="code-block-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="code-block-lang">${language}</span>
        <button class="copy-btn" data-code="${encodeURIComponent(text)}">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          Copy
        </button>
      </div>
      <pre class="code-block-pre"><code class="language-${prismLang}">${highlightedCode}</code></pre>
    </div>
  `;
};

// Custom heading rendering with anchors
(renderer as any).heading = ({ tokens, depth }: { tokens: any[]; depth: number }) => {
  const text = renderTokens(tokens);
  const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  const sizes: Record<number, string> = {
    1: 'text-3xl font-bold mt-8 mb-4',
    2: 'text-2xl font-semibold mt-8 mb-3',
    3: 'text-xl font-semibold mt-6 mb-2',
    4: 'text-lg font-medium mt-4 mb-2',
  };
  return `
    <h${depth} id="${slug}" class="group ${sizes[depth] || ''} text-foreground" style="scroll-margin-top: 80px;">
      ${text}
      <a href="#${slug}" class="heading-anchor">#</a>
    </h${depth}>
  `;
};

// Custom link rendering
(renderer as any).link = ({ href, tokens }: { href: string; tokens: any[] }) => {
  const text = renderTokens(tokens);
  const isExternal = href.startsWith('http');
  const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
  const icon = isExternal ? '<svg class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>' : '';
  return `<a href="${href}" ${target} class="docs-link">${text}${icon}</a>`;
};

// Custom image rendering
(renderer as any).image = ({ href, title, text }: { href: string; title?: string | null; text: string }) => {
  return `<img src="${href}" alt="${text}" title="${title || ''}" class="max-w-full h-auto my-4 rounded-lg border border-obul-gold/30" />`;
};

// Custom table rendering
(renderer as any).table = ({ header, rows }: { header: any[]; rows: any[][] }) => {
  const headerHtml = `<tr>${header.map((h: any) => `<th class="px-4 py-3 text-left text-sm font-semibold text-foreground/80 bg-secondary border-b border-border">${renderTokens(h.tokens || [h])}</th>`).join('')}</tr>`;
  const bodyHtml = rows.map(row => `<tr>${row.map((cell: any) => {
    const cellContent = renderTokens(cell.tokens || [cell]);
    return `<td class="px-4 py-3 text-sm text-foreground/70 border-b border-border">${cellContent}</td>`;
  }).join('')}</tr>`).join('');
  return `
    <div class="overflow-x-auto my-6">
      <table class="docs-table">
        <thead>${headerHtml}</thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `;
};

// Custom list rendering
(renderer as any).list = ({ items, ordered }: { items: any[]; ordered?: boolean }) => {
  const tag = ordered ? 'ol' : 'ul';
  const className = ordered ? 'list-decimal' : 'list-disc';
  const itemsHtml = items.map((item: any) => `<li class="text-foreground/80">${renderTokens(item.tokens || [])}</li>`).join('');
  return `<${tag} class="${className} pl-6 my-4 space-y-1">${itemsHtml}</${tag}>`;
};

// Custom list item rendering
(renderer as any).listitem = ({ tokens }: { tokens: any[] }) => {
  return renderTokens(tokens);
};

// Custom blockquote rendering
(renderer as any).blockquote = ({ tokens }: { tokens: any[] }) => {
  const text = renderTokens(tokens);
  return `<blockquote class="border-l-4 border-obul-gold/50 pl-4 my-4 italic text-foreground/70">${text}</blockquote>`;
};

// Custom paragraph rendering
(renderer as any).paragraph = ({ tokens }: { tokens: any[] }) => {
  const text = renderTokens(tokens);
  return `<p class="my-4 text-foreground/80 leading-7">${text}</p>`;
};

// Custom strong/em rendering
(renderer as any).strong = ({ tokens }: { tokens: any[] }) => {
  const text = tokens.map((t: any) => t.text || t.raw || '').join('');
  return `<strong class="text-foreground font-semibold">${text}</strong>`;
};

(renderer as any).em = ({ tokens }: { tokens: any[] }) => {
  const text = tokens.map((t: any) => t.text || t.raw || '').join('');
  return `<em class="italic">${text}</em>`;
};

// Custom text rendering
(renderer as any).text = ({ text }: { text: string }) => {
  return text;
};

marked.use({ renderer });

// Load all docs content
function loadDocs(): Record<string, DocContent> {
  const docs: Record<string, DocContent> = {};
  
  Object.entries(docFiles).forEach(([path, content]) => {
    const relativePath = path.replace('../docs/', '');
    const { data, content: body } = parseFrontmatter(content as string);
    
    docs[relativePath] = {
      title: data.title || 'Untitled',
      description: data.description || '',
      content: marked.parse(parseTipBlocks(body)) as string,
      sidebar_position: data.sidebar_position ? parseInt(data.sidebar_position) : undefined,
      status: data.status,
    };
  });
  
  return docs;
}

// Find doc file by slug
function findDocFileBySlug(slug: string, config: DocsConfig): string | null {
  for (const group of config.sidebar) {
    for (const item of group.items) {
      if (item.slug === slug) {
        return item.file;
      }
    }
  }
  return null;
}

// Get first doc slug
function getFirstDocSlug(config: DocsConfig): string {
  return config.sidebar[0]?.items[0]?.slug || '';
}

// Sidebar component
function Sidebar({ 
  config, 
  currentSlug, 
  onNavigate, 
  isOpen, 
  onClose 
}: { 
  config: DocsConfig; 
  currentSlug: string; 
  onNavigate: (slug: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50
        w-72 h-screen
        bg-[#0a0a0a] border-r border-border
        flex flex-col
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <a href="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white glow-gold tracking-wider">OBUL</span>
          </a>
          <p className="text-xs text-muted-foreground mt-1">Documentation</p>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {config.sidebar.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                {group.group}
              </h3>
              <ul className="space-y-0.5">
                {group.items.map((item, itemIndex) => {
                  const isActive = item.slug === currentSlug;
                  return (
                    <li key={itemIndex}>
                      <button
                        onClick={() => {
                          onNavigate(item.slug);
                          onClose();
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-md text-sm
                          transition-colors flex items-center justify-between
                          ${isActive 
                            ? 'bg-obul-gold/10 text-obul-gold' 
                            : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                          }
                        `}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="badge-coming-soon">{item.badge}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        {/* Footer links */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <a 
              href={config.nav.social.discord} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-obul-gold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a 
              href={config.nav.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-obul-gold transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href={config.nav.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-obul-gold transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
          
          {/* LLM Links */}
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              LLM-Friendly
            </p>
            <div className="flex flex-col gap-1">
              <a href="/llms.txt" className="llm-link flex items-center gap-1">
                <FileText className="w-3 h-3" />
                llms.txt
              </a>
              <a href="/llms-full.txt" className="llm-link flex items-center gap-1">
                <FileText className="w-3 h-3" />
                llms-full.txt
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Header component
function Header({ 
  onMenuToggle, 
  onOpenSearch,
  config 
}: { 
  onMenuToggle: () => void;
  onOpenSearch: () => void;
  config: DocsConfig;
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: Menu button + Logo (mobile) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <span className="lg:hidden text-lg font-bold text-white tracking-wider">OBUL</span>
        </div>
        
        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <SearchTrigger onClick={onOpenSearch} />
        </div>
        
        {/* Right: Nav links */}
        <div className="flex items-center gap-4">
          {config.nav.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-sm text-foreground/70 hover:text-obul-gold transition-colors"
            >
              {link.label}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

// Table of contents component
function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h2s = doc.querySelectorAll('h2');
    return Array.from(h2s).map(h2 => ({
      id: h2.id,
      text: h2.textContent?.replace('#', '').trim() || '',
    }));
  }, [content]);
  
  return (
    <div className="hidden xl:block w-56 pr-4">
      <div className="sticky top-20">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          On this page
        </h4>
        {headings.length > 0 ? (
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li key={index}>
                <a
                  href={`#${heading.id}`}
                  className="text-sm text-foreground/60 hover:text-obul-gold transition-colors line-clamp-2"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground/50">No sections</p>
        )}
      </div>
    </div>
  );
}

// Main App component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || getFirstDocSlug(docsConfig as DocsConfig);
  });
  
  const docs = useMemo(() => loadDocs(), []);
  const config = docsConfig as DocsConfig;
  
  // Get current doc content
  const currentDocFile = findDocFileBySlug(currentSlug, config);
  const currentDoc = currentDocFile ? docs[currentDocFile] : null;
  
  // Handle navigation
  const handleNavigate = (slug: string) => {
    setCurrentSlug(slug);
    window.location.hash = slug;
    window.scrollTo(0, 0);
  };
  
  // Handle hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      // Only navigate if it's a valid doc slug (contains /), not an anchor link
      if (hash && hash.includes('/') && hash !== currentSlug) {
        setCurrentSlug(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentSlug]);
  
  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Add copy button listeners
  useEffect(() => {
    const buttons = document.querySelectorAll('.copy-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const code = decodeURIComponent(btn.getAttribute('data-code') || '');
        await navigator.clipboard.writeText(code);
        btn.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied!';
        setTimeout(() => {
          btn.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy';
        }, 2000);
      });
    });
  }, [currentDoc?.content]);
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] grid-pattern">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          config={config}
          currentSlug={currentSlug}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Header
            onMenuToggle={() => setSidebarOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
            config={config}
          />
          
          <main className="flex">
            {/* Content area */}
            <div className="flex-1 min-w-0">
              {currentDoc ? (
                <article className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
                  {/* Status badge */}
                  {currentDoc.status && (
                    <div className="mb-4">
                      <span className="badge-coming-soon capitalize">
                        {currentDoc.status}
                      </span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <h1 className="text-4xl font-bold text-white mb-4">
                    {currentDoc.title}
                  </h1>
                  
                  {/* Description */}
                  {currentDoc.description && (
                    <p className="text-lg text-muted-foreground mb-8">
                      {currentDoc.description}
                    </p>
                  )}
                  
                  {/* Content */}
                  <div 
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentDoc.content }}
                  />
                  
                  {/* Footer navigation */}
                  <div className="mt-16 pt-8 border-t border-border">
                    <div className="flex items-center justify-between">
                      <a
                        href="https://my.obul.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-obul-gold hover:text-obul-gold-light transition-colors"
                      >
                        Go to Dashboard
                        <ChevronRight className="w-4 h-4" />
                      </a>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Need help?</span>
                        <a 
                          href="mailto:support@obul.ai" 
                          className="text-obul-gold hover:text-obul-gold-light transition-colors"
                        >
                          Contact Support
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <p className="text-muted-foreground">Document not found</p>
                </div>
              )}
            </div>
            
            {/* Table of contents */}
            {currentDoc && (
              <TableOfContents content={currentDoc.content} />
            )}
          </main>
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
