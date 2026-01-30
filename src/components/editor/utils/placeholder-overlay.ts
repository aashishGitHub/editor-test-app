import { editor as editorNamespace, IDisposable } from 'monaco-editor';

/**
 * Configuration options for the placeholder overlay
 */
export interface PlaceholderOverlayConfig {
  /** The placeholder text to display when editor is empty */
  text: string;
  /** Whether the placeholder is enabled (default: true) */
  enabled?: boolean;
  /** Custom CSS class for styling (default: 'monaco-placeholder') */
  className?: string;
  /** Custom inline styles to apply */
  style?: Partial<CSSStyleDeclaration>;
}

/**
 * PlaceholderOverlayService
 * 
 * A service that manages placeholder text overlay for Monaco Editor.
 * The placeholder is shown when the editor is empty and hidden when content is added.
 * Uses an overlay approach that doesn't interfere with editor input.
 * 
 * @example
 * ```typescript
 * // In your editor mount callback:
 * const placeholderService = new PlaceholderOverlayService(editor, {
 *   text: 'Enter your query here...',
 *   enabled: true,
 * });
 * 
 * // To disable later:
 * placeholderService.disable();
 * 
 * // To enable again:
 * placeholderService.enable();
 * 
 * // To update text:
 * placeholderService.updateText('New placeholder text');
 * 
 * // To cleanup when done:
 * placeholderService.dispose();
 * ```
 */
export class PlaceholderOverlayService {
  private editor: editorNamespace.IStandaloneCodeEditor;
  private config: Required<PlaceholderOverlayConfig>;
  private overlayWidget: editorNamespace.IOverlayWidget | null = null;
  private domNode: HTMLDivElement | null = null;
  private disposables: IDisposable[] = [];
  private isVisible: boolean = false;

  constructor(
    editor: editorNamespace.IStandaloneCodeEditor,
    config: PlaceholderOverlayConfig
  ) {
    this.editor = editor;
    this.config = {
      text: config.text,
      enabled: config.enabled ?? true,
      className: config.className ?? 'monaco-placeholder',
      style: config.style ?? {},
    };

    this.initialize();
  }

  /**
   * Initialize the placeholder overlay service
   */
  private initialize(): void {
    // Create the overlay widget
    this.createOverlayWidget();

    // Listen to content changes
    const contentChangeDisposable = this.editor.onDidChangeModelContent(() => {
      this.updateVisibility();
    });
    this.disposables.push(contentChangeDisposable);

    // Listen to model changes (when switching files)
    const modelChangeDisposable = this.editor.onDidChangeModel(() => {
      this.updateVisibility();
    });
    this.disposables.push(modelChangeDisposable);

    // Listen to focus changes to ensure placeholder doesn't interfere
    const focusDisposable = this.editor.onDidFocusEditorText(() => {
      this.updateVisibility();
    });
    this.disposables.push(focusDisposable);

    // Initial visibility check
    this.updateVisibility();
  }

  /**
   * Create the overlay widget for the placeholder
   * Uses overlay widget which doesn't interfere with text input
   */
  private createOverlayWidget(): void {
    this.domNode = document.createElement('div');
    this.domNode.className = this.config.className;
    this.applyStyles();
    this.domNode.textContent = this.config.text;

    this.overlayWidget = {
      getId: () => 'placeholder-overlay-widget',
      getDomNode: () => this.domNode!,
      getPosition: () => null, // We'll position it manually via CSS
    };
  }

  /**
   * Apply styles to the placeholder DOM node
   */
  private applyStyles(): void {
    if (!this.domNode) return;

    // Get editor layout info for proper positioning
    const layoutInfo = this.editor.getLayoutInfo();
    const lineHeight = this.editor.getOption(editorNamespace.EditorOption.lineHeight);
    const fontInfo = this.editor.getOption(editorNamespace.EditorOption.fontInfo);

    // Calculate position: account for line numbers gutter and padding
    const leftOffset = layoutInfo.contentLeft;
    const topOffset = this.editor.getTopForLineNumber(1);

    // Apply positioning and styling
    Object.assign(this.domNode.style, {
      position: 'absolute',
      top: `${topOffset + 4}px`, // Add small padding from top
      left: `${leftOffset}px`,
      color: '#6b7280',
      fontStyle: 'italic',
      pointerEvents: 'none', // Critical: allows clicks to pass through
      whiteSpace: 'pre-wrap',
      opacity: '0.6',
      fontFamily: fontInfo.fontFamily,
      fontSize: `${fontInfo.fontSize}px`,
      lineHeight: `${lineHeight}px`,
      zIndex: '1', // Below editor content
      maxWidth: `${layoutInfo.contentWidth - 20}px`,
      overflow: 'hidden',
    });

    // Apply custom styles (override defaults)
    Object.assign(this.domNode.style, this.config.style);
  }

  /**
   * Update placeholder visibility based on editor content
   */
  private updateVisibility(): void {
    if (!this.config.enabled || !this.overlayWidget) return;

    const model = this.editor.getModel();
    const isEmpty = !model || model.getValue().length === 0;

    if (isEmpty && !this.isVisible) {
      this.show();
    } else if (!isEmpty && this.isVisible) {
      this.hide();
    }
  }

  /**
   * Show the placeholder overlay
   */
  private show(): void {
    if (this.overlayWidget && !this.isVisible) {
      // Re-apply styles to get current layout
      this.applyStyles();
      this.editor.addOverlayWidget(this.overlayWidget);
      this.isVisible = true;
    }
  }

  /**
   * Hide the placeholder overlay
   */
  private hide(): void {
    if (this.overlayWidget && this.isVisible) {
      this.editor.removeOverlayWidget(this.overlayWidget);
      this.isVisible = false;
    }
  }

  /**
   * Enable the placeholder overlay
   */
  public enable(): void {
    this.config.enabled = true;
    this.updateVisibility();
  }

  /**
   * Disable the placeholder overlay
   */
  public disable(): void {
    this.config.enabled = false;
    this.hide();
  }

  /**
   * Check if placeholder is currently enabled
   */
  public isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Check if placeholder is currently visible
   */
  public isPlaceholderVisible(): boolean {
    return this.isVisible;
  }

  /**
   * Update the placeholder text
   */
  public updateText(text: string): void {
    this.config.text = text;
    if (this.domNode) {
      this.domNode.textContent = text;
    }
  }

  /**
   * Update the placeholder configuration
   */
  public updateConfig(config: Partial<PlaceholderOverlayConfig>): void {
    if (config.text !== undefined) {
      this.config.text = config.text;
      if (this.domNode) {
        this.domNode.textContent = config.text;
      }
    }

    if (config.className !== undefined) {
      this.config.className = config.className;
      if (this.domNode) {
        this.domNode.className = config.className;
      }
    }

    if (config.style !== undefined) {
      this.config.style = config.style;
      this.applyStyles();
    }

    if (config.enabled !== undefined) {
      this.config.enabled = config.enabled;
      if (config.enabled) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }

  /**
   * Dispose of the service and clean up resources
   */
  public dispose(): void {
    this.hide();
    
    // Dispose all listeners
    this.disposables.forEach(d => d.dispose());
    this.disposables = [];

    this.overlayWidget = null;
    this.domNode = null;
  }
}

/**
 * Factory function to create a placeholder overlay service
 * 
 * @param editor - The Monaco editor instance
 * @param config - Configuration for the placeholder
 * @returns PlaceholderOverlayService instance
 * 
 * @example
 * ```typescript
 * const placeholderService = createPlaceholderOverlay(editor, {
 *   text: '// Enter your code here...',
 *   enabled: true,
 * });
 * ```
 */
export function createPlaceholderOverlay(
  editor: editorNamespace.IStandaloneCodeEditor,
  config: PlaceholderOverlayConfig
): PlaceholderOverlayService {
  return new PlaceholderOverlayService(editor, config);
}

/**
 * Default placeholder texts for common use cases
 */
export const PLACEHOLDER_PRESETS = {
  JSON_QUERY: `{
  "query": {
    "match": "search term",
    "field": "field_name"
  },
  "size": 10,
  "from": 0
}`,
  
  SQL: `-- Enter your SQL query here
-- Example:
-- SELECT * FROM table_name WHERE condition;`,
  
  JAVASCRIPT: `// Enter your JavaScript code here
// Example:
// const result = await fetchData();`,
  
  GENERIC: `Enter your code here...`,
} as const;
