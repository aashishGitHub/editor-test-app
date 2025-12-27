import * as monaco from 'monaco-editor';
import { AutocompleteVisitor } from './AutocompleteVisitor';
import { ISearchQueryContext } from '../types/QueryContext';
import { IndexService } from '../index/IndexService';

export class AutoCompleteService {
  private visitor: AutocompleteVisitor;
  private queryContext: Map<string, ISearchQueryContext>;

  constructor(indexService: IndexService) {
    this.visitor = new AutocompleteVisitor(indexService);
    this.queryContext = new Map();
  }

  async provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): Promise<monaco.languages.CompletionItem[]> {
    const context = this.queryContext.get(model.uri.toString());

    const suggestions = await this.visitor.getAutoCompleteContributor(
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

