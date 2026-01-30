# Search Workbench Component

A comprehensive React component for writing, validating, and executing Couchbase Full-Text Search queries.

## Quick Start

```tsx
import { SearchWorkbenchSection } from './components/SearchWorkbench';

function App() {
  return <SearchWorkbenchSection />;
}
```

## Components

### SearchWorkbenchSection
Main container component that orchestrates the entire search workbench experience.

**Features**:
- Monaco Editor for JSON query editing
- Real-time validation with inline error markers
- Query context management (bucket/index)
- Query execution with results display
- Autocomplete/IntelliSense support

### SearchResultsPanel
Displays query execution results, status, and metrics.

**Features**:
- Status indicators (Success/Error/Running)
- Performance metrics (RTT, Elapsed, Documents, Size)
- Result list with pagination
- Error message display
- Loading states

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Key Features

1. **Real-Time Validation**: JSON syntax and structure validation with inline markers
2. **Autocomplete**: Context-aware suggestions for query fields
3. **Monaco Editor Integration**: Full VS Code-like editing experience
4. **Query Execution**: Execute queries and view results
5. **Error Handling**: Comprehensive error display and validation
6. **Format on Save**: Automatic JSON formatting via keyboard shortcut (Ctrl+S/Cmd+S), format before run, or manual format button

## Dependencies

- `monaco-editor`: Code editor
- `@monaco-editor/react`: React wrapper
- `../../services/searchWorkbench/*`: Service layer
- `../../hooks/useSearchWorkbench`: State management hook

## Usage Example

```tsx
import { SearchWorkbenchSection } from './components/SearchWorkbench';

function MyApp() {
  return (
    <div>
      <h1>My Application</h1>
      <SearchWorkbenchSection />
    </div>
  );
}
```

## Styling

Component uses CSS classes defined in `App.css`:
- `.search-workbench-section`
- `.workbench-header`
- `.workbench-content`
- `.query-editor-container`
- `.search-results-panel`

## Related Files

- **Services**: `src/services/searchWorkbench/`
- **Hooks**: `src/hooks/useSearchWorkbench.ts`
- **Types**: `src/services/searchWorkbench/types/`
- **Styles**: `src/App.css` (search workbench section)

