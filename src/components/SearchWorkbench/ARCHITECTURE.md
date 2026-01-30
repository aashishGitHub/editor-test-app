# Search Workbench Architecture Documentation

## Overview

The Search Workbench is a feature that allows users to write, validate, and execute Couchbase Full-Text Search (FTS) queries in a web-based interface. This document provides a comprehensive understanding of the architecture, data flow, and implementation details.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [Data Flow](#data-flow)
4. [Service Layer](#service-layer)
5. [State Management](#state-management)
6. [Validation System](#validation-system)
7. [Monaco Editor Integration](#monaco-editor-integration)
8. [Key Design Decisions](#key-design-decisions)
9. [Extension Points](#extension-points)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SearchWorkbenchSection                   │
│                    (Main Container Component)                │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
    ┌──────────────────────┐      ┌──────────────────────┐
    │   Query Editor       │      │  SearchResultsPanel   │
    │   (Monaco Editor)    │      │  (Results Display)    │
    └──────────┬───────────┘      └──────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────────┐
    │         useSearchWorkbench Hook           │
    │    (State & Service Orchestration)        │
    └──────────┬───────────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────────┐
    │      SearchWorkbenchService               │
    │    (Core Business Logic)                  │
    └──────┬───────────┬───────────┬──────────┘
           │           │           │
           ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │Validation│ │AutoComplete│ │Mock API │
    │ Service  │ │  Service   │ │ Service │
    └──────────┘ └──────────┘ └──────────┘
```

### Technology Stack

- **React 18**: UI framework
- **Monaco Editor**: Code editor (VS Code's editor)
- **TypeScript**: Type safety
- **Monaco Editor React**: React wrapper for Monaco

---

## Component Structure

### 1. SearchWorkbenchSection (Main Component)

**Location**: `src/components/SearchWorkbench/SearchWorkbenchSection.tsx`

**Responsibilities**:
- Main container component
- Manages local UI state (query, bucket, index, results, loading)
- Coordinates between editor, validation, and results
- Handles user interactions (query changes, execution)

**Key State**:
```typescript
- query: string                    // Current query JSON
- bucketName: string               // Selected bucket
- indexName: string                // Selected index
- result: SearchQueryResult | null // Query execution results
- status: QueryStatusProps         // Query execution status/metrics
- error: string | undefined        // Error messages
- isLoading: boolean              // Loading state
```

**Key Refs**:
```typescript
- editorRef: Ref to Monaco editor instance
- validationServiceRef: Ref to validation service instance
```

### 2. SearchResultsPanel (Results Display)

**Location**: `src/components/SearchWorkbench/SearchResultsPanel.tsx`

**Responsibilities**:
- Displays query execution results
- Shows status, metrics, and error messages
- Renders search result hits
- Handles loading and empty states

**Props**:
```typescript
interface SearchResultsPanelProps {
  result: SearchQueryResult | null;
  status: QueryStatusProps;
  error?: string;
  isLoading: boolean;
}
```

---

## Data Flow

### Query Execution Flow

```
User Types Query
      │
      ▼
handleQueryChange()
      │
      ├──► Updates query state
      │
      └──► EditorValidationService.validateAndSetMarkers()
            │
            ├──► Validates JSON syntax
            ├──► Validates query structure
            └──► Sets Monaco markers (red underlines)
                  │
                  └──► User sees inline errors

User Clicks Run Button
      │
      ▼
handleRun()
      │
      ├──► Validates query (if invalid, shows error)
      │
      ├──► Sets isLoading = true
      │
      └──► SearchWorkbenchService.runSearchQuery()
            │
            ├──► ValidationService.validateSearchQuery()
            │     └──► Returns validation result
            │
            ├──► MockSearchAPI.executeMockSearchQuery()
            │     └──► Returns mock search results
            │
            └──► Calculates metrics (RTT, elapsed, size)
                  │
                  └──► Updates result & status state
                        │
                        └──► SearchResultsPanel displays results
```

### Real-Time Validation Flow

```
User Types in Editor
      │
      ▼
Monaco Editor onChange Event
      │
      ▼
handleQueryChange()
      │
      ├──► Updates query state
      │
      └──► EditorValidationService.validateAndSetMarkers()
            │
            ├──► ValidationService.validateSearchQuery()
            │     ├──► JSON.parse() validation
            │     ├──► Structure validation
            │     └──► Returns markers array
            │
            └──► monaco.editor.setModelMarkers()
                  │
                  └──► Monaco displays red underlines + hover messages
```

---

## Service Layer

### 1. SearchWorkbenchService

**Location**: `src/services/searchWorkbench/SearchWorkbenchService.ts`

**Responsibilities**:
- Main orchestrator for search workbench operations
- Manages editor-to-context mapping
- Coordinates validation, autocomplete, and query execution
- Provides default query template

**Key Methods**:
```typescript
- getDefaultQueryTemplate(): string
- setQueryContext(uri: string, context: ISearchQueryContext): void
- getQueryContext(uri: string): ISearchQueryContext | undefined
- registerEditor(editor: IStandaloneCodeEditor): void
- runSearchQuery(query: string, context: ISearchQueryContext): Promise<...>
- dispose(): void
```

**Editor-to-Context Mapping**:
```typescript
private editorToContext: Map<string, ISearchQueryContext>
// Maps editor model URI to query context (bucket/index)
```

### 2. ValidationService

**Location**: `src/services/searchWorkbench/validation/ValidationService.ts`

**Responsibilities**:
- Validates JSON syntax
- Validates query structure
- Returns Monaco marker data for inline errors

**Key Methods**:
```typescript
- validateSearchQuery(query: string): ValidationResult
  Returns: {
    valid: boolean;
    error?: string;
    markers?: IMarkerData[];
  }
```

**Validation Rules**:
1. JSON syntax validation (JSON.parse)
2. Must be a JSON object (not array or primitive)
3. Must contain "query" field
4. Query.query should contain query string or match clause

### 3. EditorValidationService

**Location**: `src/services/searchWorkbench/validation/EditorValidationService.ts`

**Responsibilities**:
- Bridge between ValidationService and Monaco Editor
- Manages Monaco marker lifecycle
- Sets/clears markers on editor model

**Key Methods**:
```typescript
- validateAndSetMarkers(editor, query): ValidationResult
- clearMarkers(model): void
```

**Marker Management**:
```typescript
monaco.editor.setModelMarkers(
  model,
  'search-query-validation',  // Marker source ID
  markers                      // Array of marker data
);
```

### 4. AutoCompleteService

**Location**: `src/services/searchWorkbench/autoComplete/AutoCompleteService.ts`

**Responsibilities**:
- Provides autocomplete suggestions for JSON query
- Manages query context for context-aware suggestions
- Registers Monaco completion provider

**Key Methods**:
```typescript
- provideCompletionItems(model, position): Promise<CompletionItem[]>
- setQueryContext(uri: string, context: ISearchQueryContext): void
```

**Autocomplete Provider**:
- Registered for 'json' language
- Provides top-level keywords: query, fields, size, from, highlight, etc.
- Context-aware (filters out already-used keys)

### 5. MockSearchAPI

**Location**: `src/services/searchWorkbench/MockSearchAPI.ts`

**Responsibilities**:
- Simulates Couchbase FTS query execution
- Returns mock search results for POC
- Simulates network delay

**Key Methods**:
```typescript
- executeMockSearchQuery(query: string, indexName: string): Promise<SearchQueryResult>
```

---

## State Management

### React Hook Pattern

**Location**: `src/hooks/useSearchWorkbench.ts`

**Purpose**: Encapsulates SearchWorkbenchService and provides clean React API

**State Managed**:
```typescript
- workbenchService: SearchWorkbenchService (singleton)
- queryContext: ISearchQueryContext | null
- queryResult: SearchQueryResult | null
- queryStatus: QueryStatusProps
- isLoading: boolean
```

**API Exposed**:
```typescript
return {
  workbenchService,
  queryContext,
  queryResult,
  queryStatus,
  isLoading,
  setQueryContext,
  getDefaultQuery,
  registerEditor,
  runQuery,
};
```

**Lifecycle Management**:
- Service created once via `useState(() => new SearchWorkbenchService())`
- Editor registered via `registerEditor()` callback
- Cleanup on unmount via `useEffect` cleanup function

---

## Validation System

### Two-Layer Validation

#### Layer 1: ValidationService (Business Logic)
- Pure validation logic
- No Monaco dependencies
- Returns validation result with markers data

#### Layer 2: EditorValidationService (Monaco Integration)
- Wraps ValidationService
- Manages Monaco markers
- Handles editor model lifecycle

### Marker Lifecycle

```
1. User types query
   │
   ▼
2. handleQueryChange() called
   │
   ▼
3. EditorValidationService.validateAndSetMarkers()
   │
   ├──► Clear existing markers
   │
   ├──► ValidationService.validateSearchQuery()
   │     └──► Returns markers array
   │
   └──► monaco.editor.setModelMarkers()
         │
         └──► Monaco displays:
               - Red squiggly underlines
               - Hover tooltips
               - Glyph margin indicators
```

### Marker Data Structure

```typescript
interface IMarkerData {
  severity: MarkerSeverity;      // Error, Warning, Info
  message: string;                // Error message
  startLineNumber: number;        // Start line
  startColumn: number;            // Start column
  endLineNumber: number;          // End line
  endColumn: number;              // End column
}
```

---

## Monaco Editor Integration

### Editor Configuration

**Key Options**:
```typescript
{
  quickSuggestions: true,         // Enable autocomplete
  glyphMargin: true,               // Show error indicators in margin
  fixedOverflowWidgets: true,     // Keep hover within editor bounds
  hover: {
    enabled: true,                // Enable hover tooltips
    delay: 300,                   // Hover delay in ms
  },
}
```

### Editor Instance Management

```typescript
// Get editor instance
const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

// Register on mount
const handleEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
  editorRef.current = editorInstance;
  registerEditor(editorInstance);  // Register with service
  // Validate initial query
  validationService.validateAndSetMarkers(editorInstance, query);
};

// Access model
const model = editorRef.current?.getModel();
const uri = model?.uri.toString();
```

### Marker Display

Monaco automatically displays markers as:
- **Red squiggly underlines** on error lines
- **Hover tooltips** on hover (with wrapping)
- **Glyph margin indicators** (red dots) in left margin
- **Position-aware** (below when no space above)

---

## Key Design Decisions

### 1. Service Layer Pattern

**Decision**: Separate services for validation, autocomplete, and API calls

**Rationale**:
- Separation of concerns
- Testability
- Reusability
- Clear dependencies

### 2. React Hook for State Management

**Decision**: Custom hook (`useSearchWorkbench`) encapsulates service logic

**Rationale**:
- Component-agnostic logic
- Easy testing
- State management encapsulation
- Clean component API

### 3. Real-Time Validation

**Decision**: Validate on every keystroke

**Rationale**:
- Immediate feedback
- Better UX
- Prevents invalid queries early

**Trade-off**: Performance (mitigated by Monaco's efficient marker system)

### 4. Monaco Markers vs Custom UI

**Decision**: Use Monaco's built-in marker system

**Rationale**:
- Native VS Code-like experience
- Automatic positioning
- Consistent with editor ecosystem
- Less custom code

### 5. Mock API for POC

**Decision**: Use mock API instead of real Couchbase connection

**Rationale**:
- POC demonstration
- No infrastructure dependencies
- Faster development
- Easy to replace with real API later

---

## Extension Points

### 1. Replace Mock API with Real Connection

**Location**: `src/services/searchWorkbench/MockSearchAPI.ts`

**Change**:
```typescript
// Replace executeMockSearchQuery with:
export async function executeSearchQuery(
  query: string,
  indexName: string,
  connection: CouchbaseConnection
): Promise<SearchQueryResult> {
  // Real API call to Couchbase FTS endpoint
  const response = await connection.searchIndexes(indexName, query);
  return response;
}
```

### 2. Add Advanced Validation

**Location**: `src/services/searchWorkbench/validation/ValidationService.ts`

**Enhancement**:
- Schema-based validation
- Field type validation
- Query structure deep validation
- Custom validation rules

### 3. Enhanced Autocomplete

**Location**: `src/services/searchWorkbench/autoComplete/SimpleAutocompleteProvider.ts`

**Enhancement**:
- Context-aware field suggestions
- Index field autocomplete
- Query type-specific suggestions
- Template-based completions

### 4. Query History

**New Service**: `src/services/searchWorkbench/QueryHistoryService.ts`

**Features**:
- Save executed queries
- Query history list
- Re-run previous queries
- Local storage persistence

### 5. Multiple Query Tabs

**Enhancement**: Extend `SearchWorkbenchSection` to support tabs

**Changes**:
- Add tab state management
- Multiple editor instances
- Tab-based context switching

### 6. Query Templates

**New Service**: `src/services/searchWorkbench/QueryTemplateService.ts`

**Features**:
- Pre-defined query templates
- Template library
- Custom template creation
- Template variables

---

## File Structure

```
src/
├── components/
│   └── SearchWorkbench/
│       ├── SearchWorkbenchSection.tsx    # Main component
│       ├── SearchResultsPanel.tsx        # Results display
│       ├── index.ts                      # Exports
│       └── ARCHITECTURE.md               # This document
│
├── services/
│   └── searchWorkbench/
│       ├── SearchWorkbenchService.ts     # Main orchestrator
│       ├── MockSearchAPI.ts              # Mock API
│       ├── index.ts                      # Service exports
│       ├── types/
│       │   └── QueryContext.ts           # Type definitions
│       ├── validation/
│       │   ├── ValidationService.ts      # Validation logic
│       │   └── EditorValidationService.ts # Monaco integration
│       └── autoComplete/
│           ├── AutoCompleteService.ts    # Autocomplete orchestration
│           └── SimpleAutocompleteProvider.ts # Implementation
│
└── hooks/
    └── useSearchWorkbench.ts             # React hook
```

---

## Dependencies

### External
- `monaco-editor`: Editor core
- `@monaco-editor/react`: React wrapper
- `react`: UI framework

### Internal
- `../editor/editor`: Editor component
- `../../services/searchWorkbench/*`: Service layer
- `../../hooks/useSearchWorkbench`: State management hook

---

## Testing Strategy

### Unit Tests
- `ValidationService.test.ts`: Validation logic
- `AutoCompleteService.test.ts`: Autocomplete logic
- `MockSearchAPI.test.ts`: API mocking

### Integration Tests
- `SearchWorkbenchSection.test.tsx`: Component integration
- `EditorValidationService.test.ts`: Monaco marker integration

### E2E Tests (Future)
- Playwright/Cypress for full user flows
- Visual regression for markers

---

## Performance Considerations

### Current Optimizations
- Service instances created once (singleton pattern)
- Validation debouncing (via Monaco's internal delay)
- Marker cleanup on unmount

### Future Optimizations
- Debounce validation (300ms delay)
- Lazy load services
- Virtualize large result sets
- Memoize expensive computations

---

## Format on Save Feature

### Overview

The Search Workbench includes automatic JSON formatting capabilities using Monaco Editor's built-in `formatDocument` action. Formatting can be triggered in three ways:

1. **Keyboard Shortcut**: Ctrl+S (Windows/Linux) or Cmd+S (Mac)
2. **Format Before Run**: Automatically formats before query execution
3. **Manual Format Button**: Click the "Format" button in the editor header

### Implementation

**Utility Function**: `utils/formatQuery.ts`
- Uses Monaco's `editor.action.formatDocument` action
- Handles errors gracefully
- Returns formatted query string

**Format Handler**: `handleFormat` callback
- Formats the document
- Updates query state
- Re-validates after formatting

**Keyboard Shortcut**: Registered in `handleEditorMount`
- Uses `editorInstance.addCommand()` with `monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS`
- Prevents default browser save dialog

**Format Before Run**: Integrated into `handleRun`
- Formats document before validation
- Uses formatted query for execution
- Non-blocking (continues even if formatting fails)

### Benefits

- **Consistent Formatting**: All queries formatted uniformly
- **Better Readability**: Properly indented JSON
- **VS Code-like Experience**: Familiar keyboard shortcuts
- **Flexible**: Multiple ways to trigger formatting
- **Built-in Support**: No external dependencies needed

## Known Limitations

1. **Mock API**: No real Couchbase connection (by design for POC)
2. **Basic Validation**: Limited to JSON syntax and structure
3. **Simple Autocomplete**: Top-level keywords only
4. **No Persistence**: Queries not saved
5. **Single Query**: No multi-tab support

---

## Migration Path to Production

1. ✅ Basic editor functionality
2. ✅ Query validation with markers
3. ✅ Autocomplete/IntelliSense
4. ✅ Query execution (mock)
5. ✅ Results display
6. ✅ Format on save (keyboard shortcut, format before run, manual button)
7. ⏳ Replace mock with real API
8. ⏳ Add connection management
9. ⏳ Query history persistence
10. ⏳ Advanced validation
11. ⏳ Multi-tab support

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: Development Team

