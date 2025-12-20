import type { SupportedLanguage, SupportedThemes } from '../components/editor/editor.types';

export type EditorConfig = {
  language: SupportedLanguage;
  theme: SupportedThemes;
  fontSize: number;
  lineHeight: number;
  height: number;
  readOnly: boolean;
  wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  cursorStyle: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
  minimap: boolean;
  lineNumbers: 'on' | 'off' | 'relative';
  renderWhitespace: 'none' | 'boundary' | 'selection' | 'all';
  scrollBeyondLastLine: boolean;
  glyphMargin: boolean;
  folding: boolean;
  renderLineHighlight: 'none' | 'gutter' | 'line' | 'all';
  cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
  cursorSmoothCaretAnimation: 'off' | 'explicit' | 'on';
  tabSize: number;
  insertSpaces: boolean;
  autoIndent: 'none' | 'keep' | 'brackets' | 'advanced' | 'full';
  autoClosingBrackets: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  autoClosingQuotes: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  autoSurround: 'languageDefined' | 'quotes' | 'brackets' | 'never';
  formatOnPaste: boolean;
  formatOnType: boolean;
  quickSuggestions: boolean;
  suggestOnTriggerCharacters: boolean;
  acceptSuggestionOnEnter: 'on' | 'off' | 'smart';
  tabCompletion: 'on' | 'off' | 'onlySnippets';
  wordBasedSuggestions: 'off' | 'currentDocument' | 'matchingDocuments' | 'allDocuments';
  codeLens: boolean;
  links: boolean;
  renderControlCharacters: boolean;
  renderIndentGuides: boolean;
  highlightActiveIndentGuide: boolean;
  bracketPairColorization: boolean;
  smoothScrolling: boolean;
  mouseWheelZoom: boolean;
  showFoldingControls: 'always' | 'never' | 'mouseover';
  scrollbarSize: number;
  overviewRulerLanes: number;
};

export type ConfigSection = 'basic' | 'display' | 'editing' | 'suggestions' | 'advanced' | 'layout';

