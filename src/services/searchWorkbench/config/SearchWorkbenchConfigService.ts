import { SearchWorkbenchConfig, DEFAULT_CONFIG } from '../types/Config';

/**
 * Search Workbench Configuration Service
 * 
 * Manages configuration for the Search Workbench features.
 * Allows runtime configuration changes and provides feature flags.
 */
export class SearchWorkbenchConfigService {
  private config: SearchWorkbenchConfig;
  private listeners: Set<(config: SearchWorkbenchConfig) => void> = new Set();

  constructor(initialConfig?: Partial<SearchWorkbenchConfig>) {
    this.config = this.mergeConfig(DEFAULT_CONFIG, initialConfig || {});
  }

  /**
   * Get the current configuration
   */
  getConfig(): Readonly<SearchWorkbenchConfig> {
    return { ...this.config };
  }

  /**
   * Update configuration (partial update supported)
   */
  updateConfig(updates: Partial<SearchWorkbenchConfig>): void {
    this.config = this.mergeConfig(this.config, updates);
    this.notifyListeners();
  }

  /**
   * Reset to default configuration
   */
  resetToDefault(): void {
    this.config = { ...DEFAULT_CONFIG };
    this.notifyListeners();
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(featurePath: string): boolean {
    const parts = featurePath.split('.');
    let current: any = this.config.features;
    
    for (const part of parts) {
      if (current[part] === undefined) {
        return false;
      }
      current = current[part];
    }
    
    return current === true || (typeof current === 'object' && current.enabled === true);
  }

  /**
   * Enable a feature
   */
  enableFeature(featurePath: string): void {
    this.setFeature(featurePath, true);
  }

  /**
   * Disable a feature
   */
  disableFeature(featurePath: string): void {
    this.setFeature(featurePath, false);
  }

  /**
   * Set a feature value
   */
  private setFeature(featurePath: string, value: boolean): void {
    const parts = featurePath.split('.');
    const lastPart = parts.pop()!;
    let current: any = this.config.features;
    
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    current[lastPart] = value;
    this.notifyListeners();
  }

  /**
   * Subscribe to configuration changes
   */
  subscribe(listener: (config: SearchWorkbenchConfig) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of configuration changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.getConfig());
      } catch (error) {
        console.error('Error in config listener:', error);
      }
    });
  }

  /**
   * Deep merge configuration objects
   */
  private mergeConfig(
    base: SearchWorkbenchConfig,
    updates: Partial<SearchWorkbenchConfig>
  ): SearchWorkbenchConfig {
    const merged = { ...base };

    if (updates.features) {
      merged.features = this.deepMerge(base.features, updates.features);
    }

    if (updates.providers) {
      merged.providers = {
        ...base.providers,
        ...updates.providers,
        autocompleteProviders: updates.providers.autocompleteProviders || base.providers.autocompleteProviders,
        validatorProviders: updates.providers.validatorProviders || base.providers.validatorProviders,
        documentationProviders: updates.providers.documentationProviders || base.providers.documentationProviders,
      };
    }

    if (updates.advanced) {
      merged.advanced = this.deepMerge(base.advanced, updates.advanced);
    }

    return merged;
  }

  /**
   * Deep merge helper
   */
  private deepMerge(base: any, updates: any): any {
    const result = { ...base };
    
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (
          typeof updates[key] === 'object' &&
          updates[key] !== null &&
          !Array.isArray(updates[key]) &&
          typeof base[key] === 'object' &&
          base[key] !== null &&
          !Array.isArray(base[key])
        ) {
          result[key] = this.deepMerge(base[key], updates[key]);
        } else {
          result[key] = updates[key];
        }
      }
    }
    
    return result;
  }

  // Convenience methods for common feature checks
  isBasicValidationEnabled(): boolean {
    return this.config.features.validation.enabled && 
           this.config.features.validation.basicValidation;
  }

  isAdvancedValidationEnabled(): boolean {
    return this.config.features.validation.enabled && 
           this.config.features.validation.advancedValidators;
  }

  isRealTimeValidationEnabled(): boolean {
    return this.config.features.validation.enabled && 
           this.config.features.validation.realTimeValidation;
  }

  isBasicAutocompleteEnabled(): boolean {
    return this.config.features.autocomplete.enabled && 
           this.config.features.autocomplete.basicAutocomplete;
  }

  isAdvancedAutocompleteEnabled(): boolean {
    return this.config.features.autocomplete.enabled && 
           this.config.features.autocomplete.advancedContributors;
  }

  isFieldAutocompleteEnabled(): boolean {
    return this.config.features.autocomplete.enabled && 
           this.config.features.autocomplete.fieldAutocomplete;
  }

  isQueryTemplatesEnabled(): boolean {
    return this.config.features.autocomplete.enabled && 
           this.config.features.autocomplete.queryTemplates;
  }

  isHoverProviderEnabled(): boolean {
    return this.config.features.documentation.enabled && 
           this.config.features.documentation.hoverProvider;
  }

  isIndexParserEnabled(): boolean {
    return this.config.features.index.enabled && 
           this.config.features.index.indexParser;
  }

  isFieldExtractionEnabled(): boolean {
    return this.config.features.index.enabled && 
           this.config.features.index.fieldExtraction;
  }

  isOpenIndexDefinitionEnabled(): boolean {
    return this.config.features.index.enabled && 
           this.config.features.index.openIndexDefinition;
  }
}

