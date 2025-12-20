# App.tsx Refactoring Guide

## Overview

The `App.tsx` file has been refactored to follow best UI development practices, including separation of concerns, component modularity, and proper organization of configuration data.

## What Changed

### 1. **Constants Separation**

All configuration options and sample data have been moved to dedicated constant files:

- **`src/constants/editorOptions.ts`**: Contains all dropdown/select options as typed arrays
  - Languages list
  - Theme options
  - Word wrap, cursor style, line numbers, etc.
  - All configuration dropdown options

- **`src/constants/sampleCode.ts`**: Contains sample code for each language

- **`src/constants/schemaDoc.ts`**: Contains the sample schema document for N1QL/SQL++

- **`src/constants/index.ts`**: Barrel export for all constants

### 2. **Type Definitions**

Created a centralized type definition file:

- **`src/types/editorConfig.ts`**: 
  - `EditorConfig` type with all editor configuration options
  - `ConfigSection` type for section navigation

### 3. **Component Extraction**

Control sections have been extracted into separate, focused components:

- **`BasicControls.tsx`**: Language, theme, font size, line height, editor behavior, dimensions
- **`DisplayControls.tsx`**: Visual settings (word wrap, cursor, line numbers, whitespace, etc.)
- **`EditingControls.tsx`**: Indentation, formatting, auto-closing options
- **`SuggestionsControls.tsx`**: IntelliSense and autocomplete settings
- **`AdvancedControls.tsx`**: Advanced features (code lens, links, guides, etc.)
- **`LayoutControls.tsx`**: Layout and scrollbar settings
- **`index.ts`**: Barrel export for all controls

### 4. **Refactored App.tsx**

The main `App.tsx` file is now:
- **Cleaner**: Reduced from 1110 lines to ~530 lines
- **More maintainable**: Configuration logic separated into focused components
- **Easier to test**: Each control component can be tested independently
- **Better organized**: Clear separation between state management and UI rendering

## Benefits

### 1. **Separation of Concerns**
- Configuration data is separate from component logic
- UI controls are modular and reusable
- Type definitions are centralized

### 2. **Standard HTML Elements**
- Uses native `<select>` elements with option arrays
- Native `<input>` elements for checkboxes and ranges
- Standard `<button>` elements
- No custom component dependencies for basic controls

### 3. **Type Safety**
- All configuration options are properly typed
- Dropdown values use TypeScript union types
- Props are fully typed in all components

### 4. **Maintainability**
- Adding new options: Just update the constant array
- Modifying controls: Edit specific control component
- Type changes: Update types in one place
- Testing: Test components in isolation

### 5. **DRY Principle**
- Configuration options defined once
- Reusable component pattern
- Barrel exports for clean imports

## Usage Examples

### Adding a New Language

```typescript
// In src/constants/editorOptions.ts
export const LANGUAGES: SupportedLanguage[] = [
  'javascript',
  'typescript',
  'python',
  'java',
  'json',
  'N1QL',
  'SqlPlusPlus',
  'shell',
  'text',
  'rust', // Add new language here
];

// Add sample code in src/constants/sampleCode.ts
export const SAMPLE_CODE: Record<string, string> = {
  // ... existing code
  rust: `// Rust Example
fn main() {
    println!("Hello, world!");
}`,
};
```

### Adding a New Configuration Option

1. Add the option array to `editorOptions.ts`
2. Add state management to `App.tsx`
3. Add prop to appropriate control component
4. Update the type in `editorConfig.ts` if needed

### Importing Components

```typescript
// Clean barrel imports
import { BasicControls, DisplayControls } from './components/controls';
import { SAMPLE_CODE, LANGUAGES } from './constants';
```

## File Structure

```
editor-test-app/
├── src/
│   ├── components/
│   │   └── controls/
│   │       ├── BasicControls.tsx
│   │       ├── DisplayControls.tsx
│   │       ├── EditingControls.tsx
│   │       ├── SuggestionsControls.tsx
│   │       ├── AdvancedControls.tsx
│   │       ├── LayoutControls.tsx
│   │       └── index.ts
│   ├── constants/
│   │   ├── editorOptions.ts
│   │   ├── sampleCode.ts
│   │   ├── schemaDoc.ts
│   │   └── index.ts
│   ├── types/
│   │   └── editorConfig.ts
│   ├── App.tsx
│   └── ...
```

## Best Practices Followed

1. ✅ **Separation of Concerns**: Business logic, UI, and data are separated
2. ✅ **Standard Elements**: Uses native HTML elements
3. ✅ **Type Safety**: Fully typed with TypeScript
4. ✅ **DRY Principle**: No repeated configuration data
5. ✅ **Modularity**: Components are small and focused
6. ✅ **Testability**: Each component can be tested independently
7. ✅ **Maintainability**: Easy to modify and extend
8. ✅ **Clean Imports**: Barrel exports for organized imports

## Migration Notes

- All existing functionality is preserved
- No breaking changes to the editor component
- Same CSS classes and styling
- All event handlers work the same way
- No changes to external APIs

## Testing

Run TypeScript compiler to verify types:
```bash
npm run tsc --noEmit
```

Run the development server:
```bash
npm run dev
```

