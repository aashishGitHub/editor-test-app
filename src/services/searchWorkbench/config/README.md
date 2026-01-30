# Search Workbench Configuration System

## Overview

The Search Workbench Configuration System provides a plug-and-play architecture for enabling/disabling features. This allows you to implement features incrementally and control which features are active at runtime.

## Quick Start

### Basic Usage

```typescript
import { SearchWorkbenchService, DEFAULT_CONFIG } from './services/searchWorkbench';

// Use default configuration
const service = new SearchWorkbenchService();

// Or customize configuration
const customConfig = {
  features: {
    validation: {
      enabled: true,
      basicValidation: true,
      advancedValidators: false,  // Disabled
      realTimeValidation: true,
    },
    autocomplete: {
      enabled: true,
      basicAutocomplete: true,
      advancedContributors: false,  // Disabled
      fieldAutocomplete: false,     // Disabled
    },
  },
};

const service = new SearchWorkbenchService(customConfig);
```

### Runtime Configuration Updates

```typescript
// Get config service
const configService = service.getConfigService();

// Enable a feature
configService.enableFeature('autocomplete.advancedContributors');

// Disable a feature
configService.disableFeature('validation.realTimeValidation');

// Update multiple settings
configService.updateConfig({
  features: {
    documentation: {
      enabled: true,
      hoverProvider: true,
    },
  },
});

// Subscribe to configuration changes
const unsubscribe = configService.subscribe((newConfig) => {
  console.log('Configuration updated:', newConfig);
});
```

## Configuration Structure

### Feature Flags

All features are organized into categories:

- **validation**: Validation features
  - `basicValidation`: Basic JSON and structure validation
  - `advancedValidators`: Specialized validators (boolean, geometry, KNN, etc.)
  - `realTimeValidation`: Validate on every keystroke

- **autocomplete**: Autocomplete features
  - `basicAutocomplete`: Top-level keywords
  - `advancedContributors`: Specialized contributors (boolean, geometry, KNN, etc.)
  - `fieldAutocomplete`: Field name suggestions from index
  - `queryTemplates`: Query templates (geo, KNN, boolean, etc.)
  - `visitorPattern`: Advanced visitor pattern for context-aware suggestions

- **documentation**: Documentation features
  - `hoverProvider`: Hover documentation on keys
  - `markdownDocs`: Load documentation from markdown files

- **index**: Index-related features
  - `indexParser`: Parse index definitions
  - `fieldExtraction`: Extract fields from index
  - `openIndexDefinition`: Open index definition in editor
  - `dynamicFieldDetection`: Detect dynamic fields

- **query**: Query features
  - `formatOnSave`: Format query on save (Ctrl+S/Cmd+S)
  - `formatBeforeRun`: Format query before execution
  - `queryHistory`: Save query history
  - `queryTemplates`: Pre-defined query templates

### Advanced Settings

- **validation**: Validation settings
  - `debounceMs`: Debounce delay for real-time validation (default: 300ms)
  - `maxErrors`: Maximum number of errors to show (default: 50)

- **autocomplete**: Autocomplete settings
  - `triggerCharacters`: Characters that trigger autocomplete (default: `['"', ':', ',']`)
  - `maxSuggestions`: Maximum number of suggestions (default: 100)
  - `minWordLength`: Minimum word length for suggestions (default: 0)

- **documentation**: Documentation settings
  - `hoverDelay`: Delay before showing hover (default: 300ms)
  - `markdownPath`: Path to markdown documentation files (default: `/docs/search`)

- **index**: Index settings
  - `cacheTimeout`: Cache timeout for index definitions (default: 300000ms = 5 minutes)
  - `enableCaching`: Enable caching of index definitions (default: true)

## Feature Implementation Guide

### Step 1: Add Feature Flag

Add your feature flag to `types/Config.ts`:

```typescript
export interface SearchWorkbenchConfig {
  features: {
    // ... existing features
    myNewFeature: {
      enabled: boolean;
      subFeature1: boolean;
      subFeature2: boolean;
    };
  };
}
```

### Step 2: Update Default Config

Set default values in `DEFAULT_CONFIG`:

```typescript
export const DEFAULT_CONFIG: SearchWorkbenchConfig = {
  features: {
    // ... existing features
    myNewFeature: {
      enabled: false,  // Disabled by default
      subFeature1: false,
      subFeature2: false,
    },
  },
};
```

### Step 3: Check Feature Flag in Code

```typescript
// In your service/component
if (configService.isFeatureEnabled('myNewFeature.enabled')) {
  // Implement feature
}
```

### Step 4: Add Convenience Method (Optional)

Add a convenience method to `SearchWorkbenchConfigService`:

```typescript
isMyNewFeatureEnabled(): boolean {
  return this.config.features.myNewFeature.enabled;
}
```

## Example: Implementing Hover Provider

1. **Add feature flag** (already in config):
   ```typescript
   documentation: {
     enabled: false,
     hoverProvider: false,
     markdownDocs: false,
   }
   ```

2. **Check flag before registering**:
   ```typescript
   if (configService.isHoverProviderEnabled()) {
     // Register hover provider
     monaco.languages.registerHoverProvider('json', {
       provideHover: (model, position) => {
         // Implementation
       },
     });
   }
   ```

3. **Enable when ready**:
   ```typescript
   configService.enableFeature('documentation.hoverProvider');
   ```

## Best Practices

1. **Start with features disabled**: Set new features to `false` by default
2. **Use feature flags**: Always check flags before implementing features
3. **Incremental implementation**: Implement features one at a time
4. **Test with flags**: Test both enabled and disabled states
5. **Document features**: Document what each feature does

## Configuration Presets

### DEFAULT_CONFIG
All basic features enabled, advanced features disabled.

### MINIMAL_CONFIG
Only essential features enabled (basic validation, basic autocomplete, format on save).

### Custom Presets
Create your own presets:

```typescript
export const PRODUCTION_CONFIG: SearchWorkbenchConfig = {
  // ... production settings
};

export const DEVELOPMENT_CONFIG: SearchWorkbenchConfig = {
  // ... development settings with all features enabled
};
```

## Migration Guide

When adding new features:

1. Add feature flag to config
2. Set default to `false`
3. Implement feature with flag check
4. Test with flag disabled (should not break)
5. Test with flag enabled
6. Update documentation
7. Enable by default if stable

## Troubleshooting

### Feature not working?
- Check if feature is enabled: `configService.isFeatureEnabled('feature.path')`
- Check console for errors
- Verify feature flag path is correct

### Configuration not updating?
- Ensure you're using the same config service instance
- Check if you're subscribed to changes
- Verify updateConfig is being called

### Performance issues?
- Disable real-time validation: `configService.disableFeature('validation.realTimeValidation')`
- Reduce maxSuggestions in autocomplete settings
- Increase debounce delay for validation

