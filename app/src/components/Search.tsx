import { useState, useEffect, useCallback } from 'react';
import { Search, X, Loader2, FileText } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
}

interface PagefindAPI {
  search: (query: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<{
        meta: { title: string };
        excerpt: string;
        url: string;
      }>;
    }>;
  }>;
  init: () => Promise<void>;
}

declare global {
  interface Window {
    pagefind?: PagefindAPI;
  }
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Pagefind
  useEffect(() => {
    if (!isOpen) return;

    const loadPagefind = async () => {
      let pagefind = window.pagefind;
      if (!pagefind) {
        try {
          const pagefindUrl = `${window.location.origin}/pagefind/pagefind.js`;
          pagefind = await import(/* @vite-ignore */ pagefindUrl);
          window.pagefind = pagefind;
        } catch (err) {
          setError('Search not available in development. Run npm run build first.');
          return;
        }
      }
      await pagefind!.init?.();
    };

    loadPagefind();
  }, [isOpen]);

  // Search handler
  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim() || !window.pagefind) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const search = await window.pagefind.search(searchQuery);
      const searchResults = await Promise.all(
        search.results.slice(0, 8).map(async (result) => {
          const data = await result.data();
          return {
            id: result.id,
            title: data.meta.title,
            excerpt: data.excerpt,
            url: data.url,
          };
        })
      );
      setResults(searchResults);
    } catch (err) {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle result click
  const handleResultClick = (url: string) => {
    // Extract slug from URL (remove leading slash, docs/ prefix, and .html)
    const slug = url.replace(/^\//, '').replace(/^docs\//, '').replace(/\.html$/, '');
    onNavigate(slug);
    onClose();
    setQuery('');
    setResults([]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const input = document.getElementById('search-input');
      input?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#30363d]">
          <Search className="w-5 h-5 text-[#8b949e]" />
          <input
            id="search-input"
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-[#8b949e] outline-none text-base"
          />
          {isLoading && <Loader2 className="w-5 h-5 text-[#8b949e] animate-spin" />}
          <button
            onClick={onClose}
            className="p-1.5 text-[#8b949e] hover:text-foreground hover:bg-[#21262d] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {error ? (
            <div className="px-4 py-8 text-center text-[#8b949e]">
              <p>{error}</p>
              <p className="text-sm mt-2 text-[#484f58]">
                Press ESC to close
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full px-4 py-3 text-left hover:bg-[#161b22] transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-[#8b949e] mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground group-hover:text-[#d4b86a] transition-colors">
                        {result.title}
                      </h4>
                      <p 
                        className="text-sm text-[#8b949e] mt-1 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="px-4 py-8 text-center text-[#8b949e]">
              <p>No results found for &quot;{query}&quot;</p>
              <p className="text-sm mt-2 text-[#484f58]">
                Try different keywords
              </p>
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-[#8b949e]">
              <p className="text-sm">Start typing to search...</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#484f58]">
                <kbd className="px-2 py-1 bg-[#21262d] rounded">ESC</kbd>
                <span>to close</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between text-xs text-[#8b949e]">
          <span>Powered by Pagefind</span>
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-[#21262d] rounded">↑↓</kbd>
            <span>to select</span>
            <kbd className="px-1.5 py-0.5 bg-[#21262d] rounded">Enter</kbd>
            <span>to open</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search trigger button for header
interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full max-w-md px-4 py-2 bg-secondary rounded-md text-sm text-muted-foreground hover:text-foreground border border-border hover:border-obul-gold/50 transition-all"
    >
      <Search className="w-4 h-4" />
      <span className="flex-1 text-left">Search documentation...</span>
      <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs bg-background rounded border border-border">
        ⌘K
      </kbd>
    </button>
  );
}
