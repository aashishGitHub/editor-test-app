# Configuration Guide

## Overview

The Search Workbench uses a feature flag system to enable/disable features at runtime.

---

## Quick Start

### Using Default Config

```typescript
import { SearchWorkbenchService } from './services/searchWorkbench';

// Uses default config (basic features enabled)
const service = new SearchWorkbenchService();
```

### Custom Config

```typescript
const service = new SearchWorkbenchService({
  features: {
    documentation: {
      enabled: true,
      hoverProvider: true,
      markdownDocs: true,
    },
    validation: {
      enabled: true,
      basicValidator: true,
    },
    autocomplete: {
      enabled: true,
      basicAutocomplete: true,
    },
  },
  advanced: {
    maxErrors: 100,
    maxSuggestions: 50,
  },
});
```

---

## Configuration Options

### Features

```typescript
interface Features {
  validation: {
    enabled: boolean;
    basicValidator: boolean;
    // Future: advancedValidators...
  };
  autocomplete: {
    enabled: boolean;
    basicAutocomplete: boolean;
    // Future: fieldAutocomplete...
  };
  documentation: {
    enabled: boolean;
    hoverProvider: boolean;
    markdownDocs: boolean;
  };
  index: {
    enabled: boolean;
    // Future: indexParser...
  };
  query: {
    enabled: boolean;
    // Future: templates...
  };
}
```

### Advanced Settings

```typescript
interface AdvancedSettings {
  maxErrors: number;          // Default: 100
  maxSuggestions: number;     // Default: 50
  debounceMs: number;         // Default: 300
  enableLogging: boolean;     // Default: false
}
```

---

## Runtime Configuration

### Enable/Disable Features

```typescript
const configService = service.getConfigService();

// Enable feature
configService.enableFeature('documentation.hoverProvider');

// Disable feature
configService.disableFeature('documentation.hoverProvider');

// Check if enabled
if (configService.isHoverProviderEnabled()) {
  console.log('Hover provider is enabled');
}
```

### Update Advanced Settings

```typescript
configService.updateAdvancedSettings({
  maxErrors: 200,
  maxSuggestions: 100,
});
```

### Get Current Config

```typescript
const config = configService.getConfig();
console.log(config);
```

---

## Predefined Configs

### DEFAULT_CONFIG

```typescript
import { DEFAULT_CONFIG } from './types/Config';

const service = new SearchWorkbenchService(DEFAULT_CONFIG);
```

**Features**:
- ✅ Hover Provider
- ✅ Basic Validation
- ✅ Basic Autocomplete

### MINIMAL_CONFIG

```typescript
import { MINIMAL_CONFIG } from './types/Config';

const service = new SearchWorkbenchService(MINIMAL_CONFIG);
```

**Features**:
- ✅ Hover Provider (only)

### Example Configs

See `config/example.config.ts` for:
- `PRODUCTION_CONFIG`
- `DEVELOPMENT_CONFIG`
- `ALL_FEATURES_CONFIG` (when all features are implemented)

---

## Subscribe to Config Changes

```typescript
const unsubscribe = configService.subscribe((newConfig) => {
  console.log('Config updated:', newConfig);
});

// Later: unsubscribe when done
unsubscribe();
```

---

## Feature Availability

| Feature | Status | Config Key |
|---------|--------|------------|
| Hover Provider | ✅ Available | `documentation.hoverProvider` |
| Basic Validation | ✅ Available | `validation.basicValidator` |
| Basic Autocomplete | ✅ Available | `autocomplete.basicAutocomplete` |
| Index Parser | ⏳ Coming | `index.indexParser` |
| Field Autocomplete | ⏳ Coming | `autocomplete.fieldAutocomplete` |
| Query Templates | ⏳ Coming | `query.templates` |

---

## Examples

### Production Config

```typescript
const service = new SearchWorkbenchService({
  features: {
    documentation: { enabled: true, hoverProvider: true, markdownDocs: true },
    validation: { enabled: true, basicValidator: true },
    autocomplete: { enabled: true, basicAutocomplete: true },
    index: { enabled: false },
    query: { enabled: false },
  },
  advanced: {
    maxErrors: 50,
    maxSuggestions: 30,
    enableLogging: false,
  },
});
```

### Development Config

```typescript
const service = new SearchWorkbenchService({
  features: {
    documentation: { enabled: true, hoverProvider: true, markdownDocs: true },
    validation: { enabled: true, basicValidator: true },
    autocomplete: { enabled: true, basicAutocomplete: true },
    index: { enabled: true },
    query: { enabled: true },
  },
  advanced: {
    maxErrors: 100,
    maxSuggestions: 100,
    enableLogging: true,
  },
});
```

---

## See Also

- `config/README.md` - Detailed config documentation
- `config/example.config.ts` - Example configurations
- `types/Config.ts` - Type definitions
