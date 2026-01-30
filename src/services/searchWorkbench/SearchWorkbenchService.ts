import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import { ISearchQueryContext, SearchQueryResult, QueryStatusProps } from './types/QueryContext';
import { executeMockSearchQuery } from './MockSearchAPI';
import { ValidationService } from './validation/ValidationService';
import { EditorValidationService } from './validation/EditorValidationService';
import { AutoCompleteService } from './autoComplete/AutoCompleteService';
import { SearchWorkbenchConfigService } from "./config/SearchWorkbenchConfigService";
import type { SearchWorkbenchConfig } from "./types/Config";
import { SearchQueryHoverProvider } from "./documentation/HoverProvider";
import {
  QUERY_TEMPLATES,
  getTemplateById,
  getTemplatesByCategory,
  getTemplateCategories,
  getTemplateAsString,
  getGroupedTemplates,
  type QueryTemplate,
  type TemplateCategory,
} from "./templates";

export class SearchWorkbenchService {
  private editorToContext: Map<string, ISearchQueryContext>;
  private validationService: ValidationService;
  private editorValidationService: EditorValidationService;
  private autoCompleteService: AutoCompleteService;
  private configService: SearchWorkbenchConfigService;
  private autocompleteDisposable: { dispose: () => void } | null = null;
  private hoverDisposable: { dispose: () => void } | null = null;
  private validationDisposable: { dispose: () => void } | null = null;
  private hoverProvider: SearchQueryHoverProvider;
  private validationDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(config?: Partial<SearchWorkbenchConfig>) {
    this.editorToContext = new Map();
    this.configService = new SearchWorkbenchConfigService(config);
    this.validationService = new ValidationService(this.configService);
    this.editorValidationService = new EditorValidationService(this.configService);
    this.autoCompleteService = new AutoCompleteService(this.configService);
    this.hoverProvider = new SearchQueryHoverProvider(this.configService);
  }

  /**
   * Get the configuration service
   */
  getConfigService(): SearchWorkbenchConfigService {
    return this.configService;
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<SearchWorkbenchConfig>): void {
    this.configService.updateConfig(updates);
    // Re-initialize services if needed based on config changes
    this.reinitializeServices();
  }

  /**
   * Re-initialize services based on current configuration
   */
  private reinitializeServices(): void {
    // Dispose existing autocomplete if configuration changed
    if (this.autocompleteDisposable) {
      this.autocompleteDisposable.dispose();
      this.autocompleteDisposable = null;
    }

    // Dispose existing hover provider if configuration changed
    if (this.hoverDisposable) {
      this.hoverDisposable.dispose();
      this.hoverDisposable = null;
    }

    // Dispose existing validation listener if configuration changed
    if (this.validationDisposable) {
      this.validationDisposable.dispose();
      this.validationDisposable = null;
    }

    // Services will check config on next use
    // This allows lazy initialization based on feature flags
  }

  /**
   * Get default query template
   */
  getDefaultQueryTemplate(): string {
    return JSON.stringify(
      {
        query: {
          query: "your_query_here",
        },
        fields: ["*"],
      },
      null,
      2
    );
  }

  /**
   * Get all available query templates
   */
  getQueryTemplates(): QueryTemplate[] {
    return QUERY_TEMPLATES;
  }

  /**
   * Get template by ID
   */
  getQueryTemplateById(id: string): QueryTemplate | undefined {
    return getTemplateById(id);
  }

  /**
   * Get templates by category
   */
  getQueryTemplatesByCategory(category: TemplateCategory): QueryTemplate[] {
    return getTemplatesByCategory(category);
  }

  /**
   * Get all template categories
   */
  getQueryTemplateCategories(): { id: TemplateCategory; label: string }[] {
    return getTemplateCategories();
  }

  /**
   * Get template as formatted JSON string
   */
  getQueryTemplateAsString(id: string): string {
    return getTemplateAsString(id);
  }

  /**
   * Get templates grouped by category
   */
  getGroupedQueryTemplates(): Map<TemplateCategory, QueryTemplate[]> {
    return getGroupedTemplates();
  }

  /**
   * Set query context for an editor
   */
  setQueryContext(uri: string, context: ISearchQueryContext): void {
    this.editorToContext.set(uri, context);
    this.autoCompleteService.setQueryContext(uri, context);
  }

  /**
   * Get query context for an editor
   */
  getQueryContext(uri: string): ISearchQueryContext | undefined {
    return this.editorToContext.get(uri);
  }

  /**
   * Register Monaco editor and set up autocomplete, hover, and validation
   */
  registerEditor(editorInstance: editor.IStandaloneCodeEditor): void {
    const model = editorInstance.getModel();

    if (!model) {
      return;
    }

    // Dispose existing providers if any
    if (this.autocompleteDisposable) {
      this.autocompleteDisposable.dispose();
    }
    if (this.validationDisposable) {
      this.validationDisposable.dispose();
    }

    // Only register autocomplete if enabled
    if (this.configService.isBasicAutocompleteEnabled()) {
      const config = this.configService.getConfig();
      const triggerChars = config.advanced.autocomplete.triggerCharacters;

      // Register autocomplete provider for JSON language
      this.autocompleteDisposable =
        monaco.languages.registerCompletionItemProvider("json", {
          provideCompletionItems: async (
            model: monaco.editor.ITextModel,
            position: monaco.Position
          ) => {
            const items = await this.autoCompleteService.provideCompletionItems(
              model,
              position
            );
            return {
              suggestions: items,
            };
          },
          triggerCharacters: triggerChars,
        });
    }

    // Register hover provider if enabled
    if (this.configService.isHoverProviderEnabled()) {
      this.hoverDisposable = monaco.languages.registerHoverProvider(
        "json",
        this.hoverProvider
      );
    }

    // Register real-time validation on content change
    if (this.configService.isBasicValidationEnabled()) {
      const debounceMs = this.configService.getConfig().advanced.validation.debounceMs ?? 300;
      
      // Run initial validation
      this.editorValidationService.validateAndSetMarkers(
        editorInstance,
        model.getValue()
      );

      // Set up content change listener with debounce
      const contentChangeDisposable = model.onDidChangeContent(() => {
        // Clear existing timer
        if (this.validationDebounceTimer) {
          clearTimeout(this.validationDebounceTimer);
        }

        // Debounce validation to avoid excessive calls while typing
        this.validationDebounceTimer = setTimeout(() => {
          this.editorValidationService.validateAndSetMarkers(
            editorInstance,
            model.getValue()
          );
        }, debounceMs);
      });

      this.validationDisposable = {
        dispose: () => {
          contentChangeDisposable.dispose();
          if (this.validationDebounceTimer) {
            clearTimeout(this.validationDebounceTimer);
          }
        }
      };
    }
  }

  /**
   * Run a search query
   */
  async runSearchQuery(
    query: string,
    context: ISearchQueryContext
  ): Promise<{
    result: SearchQueryResult | null;
    status: QueryStatusProps;
    error?: string;
  }> {
    const start = Date.now();

    // Validate query (only if validation is enabled)
    if (this.configService.isBasicValidationEnabled()) {
      const validation = this.validationService.validateSearchQuery(query);
      if (!validation.valid) {
        return {
          result: null,
          status: {
            queryStatus: "fatal",
            rtt: "-",
            elapsed: "-",
            numDocs: "-",
            size: "-",
          },
          error: validation.error,
        };
      }
    }

    try {
      // Execute mock search query
      const searchResult = await executeMockSearchQuery(
        query,
        context.indexName
      );
      const end = Date.now();
      const rtt = end - start;

      // Calculate result size
      const resultJson = JSON.stringify(searchResult.hits);
      const resultSize = new TextEncoder().encode(resultJson).length;

      const status: QueryStatusProps = {
        queryStatus: searchResult.status.successful === 1 ? "success" : "fatal",
        rtt: `${rtt} MS`,
        elapsed: `${searchResult.took} MS`,
        numDocs: `${searchResult.total_hits} docs`,
        size:
          resultSize > 1000
            ? `${(resultSize / 1000).toFixed(2)} KB`
            : `${resultSize} Bytes`,
      };

      return {
        result: searchResult,
        status,
      };
    } catch (error) {
      const end = Date.now();
      const rtt = end - start;

      return {
        result: null,
        status: {
          queryStatus: "fatal",
          rtt: `${rtt} MS`,
          elapsed: "-",
          numDocs: "-",
          size: "-",
        },
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    if (this.autocompleteDisposable) {
      this.autocompleteDisposable.dispose();
      this.autocompleteDisposable = null;
    }
    if (this.hoverDisposable) {
      this.hoverDisposable.dispose();
      this.hoverDisposable = null;
    }
    if (this.validationDisposable) {
      this.validationDisposable.dispose();
      this.validationDisposable = null;
    }
    if (this.validationDebounceTimer) {
      clearTimeout(this.validationDebounceTimer);
      this.validationDebounceTimer = null;
    }
    this.editorToContext.clear();
  }
}

// Export types for convenience
export type { ISearchQueryContext, SearchQueryResult, QueryStatusProps } from './types/QueryContext';
export type { QueryTemplate, TemplateCategory } from './templates';
export { QUERY_TEMPLATES, getTemplateById, getTemplateAsString } from './templates';

