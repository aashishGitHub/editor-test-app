/**
 * Example Configuration Files
 * 
 * These are example configurations you can use or customize for your needs.
 */

import { SearchWorkbenchConfig } from '../types/Config';

/**
 * Example: Enable all features (for development/testing)
 */
export const ALL_FEATURES_CONFIG: Partial<SearchWorkbenchConfig> = {
  features: {
    validation: {
      enabled: true,
      basicValidation: true,
      advancedValidators: true,
      realTimeValidation: true,
    },
    autocomplete: {
      enabled: true,
      basicAutocomplete: true,
      advancedContributors: true,
      fieldAutocomplete: true,
      queryTemplates: true,
      visitorPattern: true,
    },
    documentation: {
      enabled: true,
      hoverProvider: true,
      markdownDocs: true,
    },
    index: {
      enabled: true,
      indexParser: true,
      fieldExtraction: true,
      openIndexDefinition: true,
      dynamicFieldDetection: true,
    },
    query: {
      enabled: true,
      formatOnSave: true,
      formatBeforeRun: true,
      queryHistory: true,
      queryTemplates: true,
    },
  },
};

/**
 * Example: Production configuration (only stable features)
 */
export const PRODUCTION_CONFIG: Partial<SearchWorkbenchConfig> = {
  features: {
    validation: {
      enabled: true,
      basicValidation: true,
      advancedValidators: false, // Disable until fully tested
      realTimeValidation: true,
    },
    autocomplete: {
      enabled: true,
      basicAutocomplete: true,
      advancedContributors: false, // Disable until fully tested
      fieldAutocomplete: false, // Requires index connection
      queryTemplates: false,
      visitorPattern: false,
    },
    documentation: {
      enabled: true, // Enabled - hover provider is implemented
      hoverProvider: true,
      markdownDocs: false, // Disable until implemented
    },
    index: {
      enabled: false, // Disable until implemented
      indexParser: false,
      fieldExtraction: false,
      openIndexDefinition: false,
      dynamicFieldDetection: false,
    },
    query: {
      enabled: true,
      formatOnSave: true,
      formatBeforeRun: true,
      queryHistory: false, // Disable until implemented
      queryTemplates: false,
    },
  },
  advanced: {
    validation: {
      debounceMs: 500, // Higher debounce for production
      maxErrors: 20, // Limit errors shown
    },
    autocomplete: {
      triggerCharacters: ['"', ":", ","],
      maxSuggestions: 50, // Limit suggestions
      minWordLength: 0,
    },
    documentation: {
      hoverDelay: 500,
      markdownPath: "/docs/search",
    },
    index: {
      cacheTimeout: 600000, // 10 minutes
      enableCaching: true,
    },
  },
};

/**
 * Example: Development configuration (all features enabled for testing)
 */
export const DEVELOPMENT_CONFIG: Partial<SearchWorkbenchConfig> = {
  features: {
    validation: {
      enabled: true,
      basicValidation: true,
      advancedValidators: true, // Enable for testing
      realTimeValidation: true,
    },
    autocomplete: {
      enabled: true,
      basicAutocomplete: true,
      advancedContributors: true, // Enable for testing
      fieldAutocomplete: true, // Enable for testing
      queryTemplates: true, // Enable for testing
      visitorPattern: true, // Enable for testing
    },
    documentation: {
      enabled: true, // Enabled - hover provider is implemented
      hoverProvider: true,
      markdownDocs: false, // Disable until implemented
    },
    index: {
      enabled: true, // Enable for testing
      indexParser: true,
      fieldExtraction: true,
      openIndexDefinition: true,
      dynamicFieldDetection: true,
    },
    query: {
      enabled: true,
      formatOnSave: true,
      formatBeforeRun: true,
      queryHistory: true, // Enable for testing
      queryTemplates: true,
    },
  },
  advanced: {
    validation: {
      debounceMs: 100, // Lower debounce for faster feedback
      maxErrors: 100, // Show more errors in development
    },
    autocomplete: {
      triggerCharacters: ['"', ":", ",", "."],
      maxSuggestions: 200, // More suggestions in development
      minWordLength: 0,
    },
    documentation: {
      hoverDelay: 100, // Faster hover in development
      markdownPath: "/docs/search",
    },
    index: {
      cacheTimeout: 60000, // 1 minute (shorter for testing)
      enableCaching: true,
    },
  },
};

/**
 * Usage Example:
 * 
 * import { SearchWorkbenchService } from './SearchWorkbenchService';
 * import { PRODUCTION_CONFIG } from './config/example.config';
 * 
 * const service = new SearchWorkbenchService(PRODUCTION_CONFIG);
 */

