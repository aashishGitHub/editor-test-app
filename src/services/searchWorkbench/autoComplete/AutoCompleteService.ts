import * as monaco from 'monaco-editor';
import { ISearchQueryContext } from '../types/QueryContext';
import { SimpleAutocompleteProvider } from './SimpleAutocompleteProvider';
import { SearchWorkbenchConfigService } from "../config/SearchWorkbenchConfigService";

export class AutoCompleteService {
  private provider: SimpleAutocompleteProvider;
  private queryContext: Map<string, ISearchQueryContext>;
  private configService?: SearchWorkbenchConfigService;

  constructor(configService?: SearchWorkbenchConfigService) {
    this.configService = configService;
    this.provider = new SimpleAutocompleteProvider(configService);
    this.queryContext = new Map();
  }

  async provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ): Promise<monaco.languages.CompletionItem[]> {
    // Check if autocomplete is enabled
    if (!this.configService?.isBasicAutocompleteEnabled()) {
      return [];
    }

    const context = this.queryContext.get(model.uri.toString());

    const suggestions = await this.provider.provideCompletionItems(
      model,
      position,
      context
    );

    // Limit suggestions based on config
    const maxSuggestions =
      this.configService?.getConfig().advanced.autocomplete.maxSuggestions ||
      100;
    return suggestions.slice(0, maxSuggestions);
  }

  setQueryContext(uri: string, context: ISearchQueryContext): void {
    this.queryContext.set(uri, context);
  }

  getQueryContext(uri: string): ISearchQueryContext | undefined {
    return this.queryContext.get(uri);
  }

  clearQueryContext(uri: string): void {
    this.queryContext.delete(uri);
  }
}

