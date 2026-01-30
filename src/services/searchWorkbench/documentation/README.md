# Hover Provider Documentation

## Overview

The Hover Provider feature provides inline documentation when hovering over keys in the Search Query JSON. This helps users understand what each field does without leaving the editor.

## Features

- ✅ **Inline Documentation**: Built-in documentation for all common search query fields
- ✅ **Context-Aware**: Provides different documentation based on parent context (e.g., `type` in `shape` vs `facet`)
- ✅ **Comprehensive Coverage**: Documents 50+ search query fields including:
  - Top-level fields (query, fields, size, from, etc.)
  - Query types (match, term, prefix, wildcard, etc.)
  - Boolean query fields (must, should, must_not, etc.)
  - Geo query fields (location, distance, radius, etc.)
  - KNN/Vector search fields (k, vector, distance, etc.)
  - Highlight fields (style, fields)
  - And more...

## Usage

### Enable Hover Provider

```typescript
import { SearchWorkbenchService } from './services/searchWorkbench';

// Create service with hover provider enabled
const service = new SearchWorkbenchService({
  features: {
    documentation: {
      enabled: true,
      hoverProvider: true,
      markdownDocs: false,  // Not yet implemented
    },
  },
});

// Or enable at runtime
const configService = service.getConfigService();
configService.enableFeature('documentation.hoverProvider');
```

### How It Works

1. User hovers over a key in the JSON query
2. Hover Provider detects the key and its context
3. Documentation is displayed in a hover tooltip
4. Documentation includes:
   - Key name (bold)
   - Description of what the field does
   - Usage examples (when applicable)

### Example

When hovering over `"query"` in:
```json
{
  "query": {
    "query": "search term"
  }
}
```

The hover will show:
```
query

The main query object containing the search query. Can be a query string or a structured query object.
```

## Implementation Details

### Architecture

- **HoverProvider.ts**: Main implementation
  - Uses `jsonc-parser` to parse JSON and find keys
  - Detects cursor position and context
  - Returns Monaco hover content

- **Integration**: Registered in `SearchWorkbenchService.registerEditor()`
  - Only registered if `hoverProvider` feature is enabled
  - Automatically disposed when service is disposed

### Key Detection

The provider:
1. Parses the JSON using `jsonc.parseTree()`
2. Finds the node at the cursor position
3. Navigates to the property node (parent of string node)
4. Extracts the key name
5. Determines parent context for context-aware docs

### Documentation Sources

Currently supports:
- **Inline Documentation**: Built-in documentation dictionary
- **Markdown Files**: Placeholder for future enhancement (when `markdownDocs` is enabled)

## Configuration

### Settings

```typescript
{
  features: {
    documentation: {
      enabled: true,
      hoverProvider: true,      // Enable/disable hover provider
      markdownDocs: false,      // Future: Load from markdown files
    },
  },
  advanced: {
    documentation: {
      hoverDelay: 300,          // Delay before showing hover (ms)
      markdownPath: '/docs/search',  // Path to markdown files
    },
  },
}
```

## Future Enhancements

- [ ] **Markdown File Support**: Load documentation from markdown files
- [ ] **Examples**: Show usage examples in hover
- [ ] **Links**: Add links to full documentation
- [ ] **Syntax Highlighting**: Highlight code examples in hover
- [ ] **Multi-line Documentation**: Support longer, formatted documentation

## Testing

To test the hover provider:

1. Enable the feature in configuration
2. Open a search query in the editor
3. Hover over any key (e.g., `"query"`, `"fields"`, `"match"`)
4. Verify documentation appears in hover tooltip

## Troubleshooting

### Hover not appearing?

- Check if feature is enabled: `configService.isHoverProviderEnabled()`
- Verify JSON is valid (hover only works on valid JSON keys)
- Check browser console for errors
- Ensure Monaco editor hover is enabled in editor options

### Wrong documentation shown?

- Check if context detection is working correctly
- Verify key name matches documentation dictionary
- Check parent type detection for context-aware docs

