import * as monaco from 'monaco-editor';
import { ISearchQueryContext } from '../types/QueryContext';
import { SimpleAutocompleteProvider } from './SimpleAutocompleteProvider';

export class AutoCompleteService {
  private provider: SimpleAutocompleteProvider;
  private queryContext: Map<string, ISearchQueryContext>;

  constructor() {
    this.provider = new SimpleAutocompleteProvider();
    this.queryContext = new Map();
  }

  async provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): Promise<monaco.languages.CompletionItem[]> {
    const context = this.queryContext.get(model.uri.toString());

    const suggestions = await this.provider.provideCompletionItems(
      model,
      position,
      context,
    );

    return suggestions;
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

