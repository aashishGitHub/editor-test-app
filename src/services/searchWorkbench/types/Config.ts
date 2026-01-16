/**
 * Search Workbench Feature Configuration
 * 
 * This configuration allows enabling/disabling features in a plug-and-play manner.
 * Set a feature to true to enable it, false to disable it.
 */

export interface SearchWorkbenchConfig {
  // Core Features
  features: {
    // Validation Features
    validation: {
      enabled: boolean;
      basicValidation: boolean;        // Basic JSON and structure validation
      advancedValidators: boolean;     // Specialized validators (boolean, geometry, KNN, etc.)
      realTimeValidation: boolean;     // Validate on every keystroke
    };
    
    // Autocomplete Features
    autocomplete: {
      enabled: boolean;
      basicAutocomplete: boolean;       // Top-level keywords
      advancedContributors: boolean;   // Specialized contributors (boolean, geometry, KNN, etc.)
      fieldAutocomplete: boolean;       // Field name suggestions from index
      queryTemplates: boolean;         // Query templates (geo, KNN, boolean, etc.)
      visitorPattern: boolean;          // Advanced visitor pattern for context-aware suggestions
    };
    
    // Documentation Features
    documentation: {
      enabled: boolean;
      hoverProvider: boolean;           // Hover documentation on keys
      markdownDocs: boolean;            // Load documentation from markdown files
    };
    
    // Index Features
    index: {
      enabled: boolean;
      indexParser: boolean;             // Parse index definitions
      fieldExtraction: boolean;          // Extract fields from index
      openIndexDefinition: boolean;     // Open index definition in editor
      dynamicFieldDetection: boolean;   // Detect dynamic fields
    };
    
    // Query Features
    query: {
      enabled: boolean;
      formatOnSave: boolean;            // Format query on save (Ctrl+S/Cmd+S)
      formatBeforeRun: boolean;         // Format query before execution
      queryHistory: boolean;            // Save query history
      queryTemplates: boolean;          // Pre-defined query templates
    };
  };
  
  // Provider Configuration
  providers: {
    // Autocomplete Providers
    autocompleteProviders: string[];    // List of enabled autocomplete providers
    
    // Validator Providers
    validatorProviders: string[];       // List of enabled validator providers
    
    // Documentation Providers
    documentationProviders: string[];  // List of enabled documentation providers
  };
  
  // Advanced Settings
  advanced: {
    // Validation Settings
    validation: {
      debounceMs: number;               // Debounce delay for real-time validation
      maxErrors: number;                 // Maximum number of errors to show
    };
    
    // Autocomplete Settings
    autocomplete: {
      triggerCharacters: string[];      // Characters that trigger autocomplete
      maxSuggestions: number;           // Maximum number of suggestions
      minWordLength: number;            // Minimum word length for suggestions
    };
    
    // Documentation Settings
    documentation: {
      hoverDelay: number;               // Delay before showing hover (ms)
      markdownPath: string;              // Path to markdown documentation files
    };
    
    // Index Settings
    index: {
      cacheTimeout: number;             // Cache timeout for index definitions (ms)
      enableCaching: boolean;            // Enable caching of index definitions
    };
  };
}

/**
 * Default configuration - all features enabled
 */
export const DEFAULT_CONFIG: SearchWorkbenchConfig = {
  features: {
    validation: {
      enabled: true,
      basicValidation: true,
      advancedValidators: false,        // Disabled by default - implement one by one
      realTimeValidation: true,
    },
    autocomplete: {
      enabled: true,
      basicAutocomplete: true,
      advancedContributors: false,      // Disabled by default - implement one by one
      fieldAutocomplete: false,         // Disabled by default - requires index parser
      queryTemplates: false,             // Disabled by default - implement one by one
      visitorPattern: false,             // Disabled by default - implement one by one
    },
    documentation: {
      enabled: true,                     // Enabled - hover provider is implemented
      hoverProvider: true,                // Enabled - provides inline documentation
      markdownDocs: true,                // Enabled - loads markdown files from public/docs/search
    },
    index: {
      enabled: false,                   // Disabled by default - implement one by one
      indexParser: false,
      fieldExtraction: false,
      openIndexDefinition: false,
      dynamicFieldDetection: false,
    },
    query: {
      enabled: true,
      formatOnSave: true,
      formatBeforeRun: true,
      queryHistory: false,              // Disabled by default
      queryTemplates: false,            // Disabled by default
    },
  },
  providers: {
    autocompleteProviders: ['SimpleAutocompleteProvider'],
    validatorProviders: ['BasicValidator'],
    documentationProviders: ['HoverProvider'],
  },
  advanced: {
    validation: {
      debounceMs: 300,
      maxErrors: 50,
    },
    autocomplete: {
      triggerCharacters: ['"', ':', ','],
      maxSuggestions: 100,
      minWordLength: 0,
    },
    documentation: {
      hoverDelay: 300,
      markdownPath: '/docs/search',
    },
    index: {
      cacheTimeout: 300000,             // 5 minutes
      enableCaching: true,
    },
  },
};

/**
 * Minimal configuration - only basic features
 */
export const MINIMAL_CONFIG: SearchWorkbenchConfig = {
  features: {
    validation: {
      enabled: true,
      basicValidation: true,
      advancedValidators: false,
      realTimeValidation: true,
    },
    autocomplete: {
      enabled: true,
      basicAutocomplete: true,
      advancedContributors: false,
      fieldAutocomplete: false,
      queryTemplates: false,
      visitorPattern: false,
    },
    documentation: {
      enabled: true,
      hoverProvider: true,
      markdownDocs: false,
    },
    index: {
      enabled: false,
      indexParser: false,
      fieldExtraction: false,
      openIndexDefinition: false,
      dynamicFieldDetection: false,
    },
    query: {
      enabled: true,
      formatOnSave: true,
      formatBeforeRun: true,
      queryHistory: false,
      queryTemplates: false,
    },
  },
  providers: {
    autocompleteProviders: ['SimpleAutocompleteProvider'],
    validatorProviders: ['BasicValidator'],
    documentationProviders: ['HoverProvider'],
  },
  advanced: {
    validation: {
      debounceMs: 300,
      maxErrors: 50,
    },
    autocomplete: {
      triggerCharacters: ['"', ':', ','],
      maxSuggestions: 100,
      minWordLength: 0,
    },
    documentation: {
      hoverDelay: 300,
      markdownPath: '/docs/search',
    },
    index: {
      cacheTimeout: 300000,
      enableCaching: true,
    },
  },
};

