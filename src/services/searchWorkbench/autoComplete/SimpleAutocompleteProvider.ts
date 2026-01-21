import * as monaco from 'monaco-editor';
import { ISearchQueryContext } from '../types/QueryContext';
import { SearchWorkbenchConfigService } from "../config/SearchWorkbenchConfigService";

/**
 * Simple Autocomplete Provider for Search Query JSON
 * Provides basic keyword suggestions for top-level fields
 */
export class SimpleAutocompleteProvider {
  private _configService?: SearchWorkbenchConfigService; // Reserved for future use
  private topLevelKeywords = [
    "query",
    "fields",
    "size",
    "from",
    "highlight",
    "facets",
    "sort",
    "explain",
    "ctl",
    "knn",
  ];

  constructor(configService?: SearchWorkbenchConfigService) {
    this._configService = configService;
    // Config service will be used for future features like query templates, field autocomplete, etc.
  }

  /**
   * Provides completion items for the Monaco editor
   */
  async provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    _context?: ISearchQueryContext
  ): Promise<monaco.languages.CompletionItem[]> {
    // Check config for feature flags (if config service is provided)
    if (
      this._configService &&
      !this._configService.isBasicAutocompleteEnabled()
    ) {
      return [];
    }
    const textUntilPosition = model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    // Check if we're at a position where we can suggest top-level keywords
    const isAtTopLevel = this.isAtTopLevel(textUntilPosition, position);

    if (!isAtTopLevel) {
      return [];
    }

    // Get existing keys to avoid suggesting duplicates
    const existingKeys = this.getExistingKeys(textUntilPosition);

    // Filter out already used keys
    const availableKeywords = this.topLevelKeywords.filter(
      (keyword) => !existingKeys.includes(keyword)
    );

    // Create completion items
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    return availableKeywords.map((keyword) => {
      const completionItem: monaco.languages.CompletionItem = {
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: this.getInsertText(keyword),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: this.getDocumentation(keyword),
        detail: "Search Query Field",
        range: range,
      };
      return completionItem;
    });
  }

  /**
   * Check if cursor is at a position where top-level keywords can be suggested
   */
  private isAtTopLevel(text: string, position: monaco.Position): boolean {
    // Simple check: if we're after an opening brace or comma at the root level
    const lines = text.split("\n");
    const currentLine = lines[position.lineNumber - 1] || "";
    const beforeCursor = currentLine.substring(0, position.column - 1).trim();

    // Check if we're after { or , or at the start of a new line after {
    if (
      beforeCursor === "" ||
      beforeCursor === "{" ||
      beforeCursor.endsWith(",")
    ) {
      return true;
    }

    // Check if we're at the start of a line and previous line ends with {
    if (position.lineNumber > 1) {
      const prevLine = lines[position.lineNumber - 2] || "";
      if (prevLine.trim().endsWith("{") && beforeCursor === "") {
        return true;
      }
    }

    return false;
  }

  /**
   * Get existing keys from the JSON text
   */
  private getExistingKeys(text: string): string[] {
    const keys: string[] = [];
    const keyRegex = /"([^"]+)":/g;
    let match;
    while ((match = keyRegex.exec(text)) !== null) {
      keys.push(match[1]);
    }
    return keys;
  }

  /**
   * Get insert text for a keyword
   */
  private getInsertText(keyword: string): string {
    const templates: Record<string, string> = {
      query: '\n"query": {\n    "query": "$1"\n  }',
      fields: '\n"fields": ["*"]',
      size: '\n"size": $1',
      from: '\n"from": $1',
      highlight: '\n"highlight": {\n    "fields": ["$1"]\n  }',
      facets: '\n"facets": {\n    "$1": {}\n  }',
      sort: '\n"sort": ["$1"]',
      explain: '\n"explain": $1',
      ctl: '\n"ctl": {\n    "consistency": {\n      "level": "$1"\n    }\n  }',
      knn: '\n"knn": [{\n    "k": $1,\n    "field": "$2",\n    "vector": [$3]\n}]',
    };

    return templates[keyword] || `\n"${keyword}": $1`;
  }

  /**
   * Get documentation for a keyword
   */
  private getDocumentation(keyword: string): string {
    const docs: Record<string, string> = {
      query: "The main query object containing the search query",
      fields: "Array of field names to return in results",
      size: "Maximum number of results to return",
      from: "Offset for pagination",
      highlight: "Highlight matching terms in results",
      facets: "Faceted search aggregations",
      sort: "Sort order for results",
      explain: "Include query explanation",
      ctl: "Consistency and timeout controls",
      knn: "K-nearest neighbors vector search",
    };

    return docs[keyword] || `Search query field: ${keyword}`;
  }
}

