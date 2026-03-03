# Obul Documentation Site

Preview Test

A Vite + React + TypeScript documentation website for Obul - a unified payment infrastructure for AI agents.

## Quick Start

```bash
cd app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
app/
├── docs/                    # Markdown documentation files
│   ├── docs.json            # Sidebar navigation config
│   ├── core/                # Core concept docs
│   ├── getting-started/     # Getting started guides
│   ├── reference/           # Technical reference
│   ├── products/            # Product documentation
│   └── faq.md               # FAQ page
├── public/
│   └── images/              # Documentation images
├── src/
│   ├── App.tsx              # Main app with markdown rendering
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles + Tailwind
│   ├── components/ui/       # Radix UI components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
└── package.json
```

## Sidebar Configuration

The sidebar is configured in `app/docs/docs.json`.

### Structure

```json
{
  "name": "Obul Documentation",
  "description": "One API key. Infinite agents.",
  "sidebar": [
    {
      "group": "Group Name",
      "items": [
        {
          "label": "Page Title",
          "slug": "url-slug",
          "file": "path/to/file.md",
          "badge": "Coming Soon"  // optional
        }
      ]
    }
  ]
}
```

### Adding New Sidebar Groups

1. Add a new object to the `sidebar` array in `docs.json`
2. Set the `group` name (appears as section header)
3. Add `items` with label, slug, and file path

### Ordering Docs

Docs within a group appear in the order listed. To reorder, simply rearrange the items in the JSON array.

## Adding New Documentation

### 1. Create the Markdown File

Create a new `.md` file in the `app/docs/` directory:

```markdown
---
title: Your Page Title
description: Brief description for SEO and cards
sidebar_position: 1  # optional - controls order within folder
---

# Your Content Here

Your documentation content...
```

### 2. Add to Sidebar

Add an entry to the appropriate group in `app/docs.json`:

```json
{
  "label": "Your Page Title",
  "slug": "section/your-page",
  "file": "section/your-page.md"
}
```

### 3. Add Images

Place images in `app/public/images/` and reference them:

```markdown
![Alt text](/images/your-image.png)
```

## Markdown Features

### Supported Syntax

- **Bold**: `**text**`
- *Italic*: `*text*`
- Code blocks with syntax highlighting
- Tables
- Lists (ordered/unordered)
- Blockquotes
- Links (internal/external)
- Images

### Custom Renderers

The app includes custom renderers for:
- `strong` / `em` - Bold and italic text
- `paragraph` - Styled paragraphs
- `list` / `listitem` - Ordered and unordered lists
- `table` / `tablecell` - Tables with custom styling
- `blockquote` - Styled blockquotes
- `heading` - Headings with anchor links
- `link` - Links with external icon
- `code` - Code blocks with copy button

## Available UI Components

The project includes 50+ Radix UI components in `app/src/components/ui/`:

| Component | Description |
|----------|-------------|
| Accordion | Collapsible content sections |
| Alert | Alert messages |
| AlertDialog | Confirmation dialogs |
| AspectRatio | Fixed aspect ratio containers |
| Avatar | User avatars |
| Badge | Status badges |
| Breadcrumb | Navigation breadcrumbs |
| Button | Interactive buttons |
| Calendar | Date picker |
| Card | Content cards |
| Carousel | Image/content carousel |
| Checkbox | Checkbox inputs |
| Collapsible | Expandable content |
| Command | Command palette |
| ContextMenu | Right-click menus |
| Dialog | Modal dialogs |
| Drawer | Slide-out panels |
| DropdownMenu | Dropdown menus |
| Form | Form with validation |
| HoverCard | Hover preview cards |
| Input | Text inputs |
| InputGroup | Input with addon |
| InputOTP | One-time password input |
| Kbd | Keyboard shortcut display |
| Label | Form labels |
| Menubar | Menu bar |
| NavigationMenu | Navigation menus |
| Pagination | Page navigation |
| Popover | Floating content |
| Progress | Progress bars |
| RadioGroup | Radio button groups |
| Resizable | Resizable panels |
| ScrollArea | Scrollable containers |
| Select | Dropdown select |
| Separator | Visual separator |
| Sheet | Side panel |
| Sidebar | Sidebar navigation |
| Skeleton | Loading placeholders |
| Slider | Range sliders |
| Sonner | Toast notifications |
| Spinner | Loading spinner |
| Switch | Toggle switches |
| Table | Data tables |
| Tabs | Tabbed content |
| Textarea | Multi-line text input |
| Toggle | Toggle buttons |
| ToggleGroup | Toggle button groups |
| Tooltip | Tooltip overlays |

## Styling

The project uses Tailwind CSS with a custom Obul theme:

- Custom colors: `--obul-gold`, `--obul-gold-light`, `--obul-gold-dark`
- Dark theme by default
- Grid background pattern
- Custom prose styles for markdown content

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Marked.js** - Markdown parsing
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icons

## License

MIT
