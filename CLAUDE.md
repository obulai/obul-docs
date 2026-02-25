# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **documentation website** for Obul - a platform providing unified payment infrastructure ("One API key. Infinite agents.") enabling AI agents to make payments via the x402 protocol. The docs site is built with Vite + React + TypeScript.

## Common Commands

```bash
cd app

# Development
npm run dev          # Start Vite dev server with HMR
npm run lint         # Run ESLint

# Build & Preview
npm run build        # Type-check with tsc then build with Vite
npm run preview      # Preview production build locally
```

## Architecture

The documentation app follows a **static content approach**:

- **Markdown-based docs**: Content lives in `/app/docs/**/*.md` files with YAML frontmatter
- **Navigation config**: `/app/docs/docs.json` defines sidebar structure, groups, and metadata
- **React SPA**: Single-page app using hash-based routing (`/#/slug`)
- **Marked.js**: Parses markdown to HTML with custom renderers for code blocks, headings, tables, etc.

### Key Source Files

- `/app/src/App.tsx` - Main application with Sidebar, Header, TableOfContents components
- `/app/src/main.tsx` - React entry point
- `/app/docs/docs.json` - Docs navigation configuration
- `/app/vite.config.ts` - Vite build configuration
- `/app/tailwind.config.js` - Tailwind with custom OBUL theme colors

### Adding New Documentation

1. Create a markdown file in `/app/docs/` (e.g., `docs/core/new-topic.md`)
2. Add frontmatter with `title`, `description`, and optional `sidebar_position`
3. Add entry to appropriate group in `/app/docs/docs.json`

```markdown
---
title: New Topic
description: Brief description for SEO and cards
sidebar_position: 1
---

# Content here...
```

### Tip Boxes

The docs support tip/warning/info/danger boxes using the following syntax:

```markdown
:::tip
Your tip content here...
:::

:::warning
Warning content here...
:::

:::info
Info content here...
:::

:::danger
Danger content here...
:::
```

- `:::tip` - Green tip box with 💡 icon
- `:::warning` - Yellow warning box with ⚠️ icon  
- `:::info` - Blue info box with ℹ️ icon
- `:::danger` - Red danger box with 🚨 icon
