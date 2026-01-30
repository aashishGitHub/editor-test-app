import { Editor, PLACEHOLDER_PRESETS } from './editor/editor';
import { SupportedLanguage, SupportedThemes } from './editor/editor.types';
import { SAMPLE_SCHEMA_DOC } from '../constants/schemaDoc';
import type { PlaceholderPreset } from '../hooks/useEditorConfig';
import type { PlaceholderOverlayConfig } from './editor/utils/placeholder-overlay';

interface EditorSectionProps {
  editorValue: string;
  changeCount: number;
  currentLanguage: SupportedLanguage;
  currentTheme: SupportedThemes;
  showRunButton: boolean;
  enableSchemaDoc: boolean;
  fontSize: number;
  lineHeight: number;
  editorHeight: number;
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
  // Placeholder settings
  placeholderEnabled: boolean;
  placeholderPreset: PlaceholderPreset;
  placeholderCustomText: string;
  onRun?: () => void;
  onChange: (value: string | undefined) => void;
  onDidPaste: (e: any) => void;
}

export const EditorSection = (props: EditorSectionProps) => {
  const {
    editorValue,
    changeCount,
    currentLanguage,
    currentTheme,
    showRunButton,
    enableSchemaDoc,
    fontSize,
    lineHeight,
    editorHeight,
    readOnly,
    wordWrap,
    cursorStyle,
    minimap,
    lineNumbers,
    renderWhitespace,
    scrollBeyondLastLine,
    glyphMargin,
    folding,
    renderLineHighlight,
    cursorBlinking,
    cursorSmoothCaretAnimation,
    tabSize,
    insertSpaces,
    autoIndent,
    autoClosingBrackets,
    autoClosingQuotes,
    autoSurround,
    formatOnPaste,
    formatOnType,
    quickSuggestions,
    suggestOnTriggerCharacters,
    acceptSuggestionOnEnter,
    tabCompletion,
    wordBasedSuggestions,
    codeLens,
    links,
    renderControlCharacters,
    renderIndentGuides,
    highlightActiveIndentGuide,
    bracketPairColorization,
    smoothScrolling,
    mouseWheelZoom,
    showFoldingControls,
    scrollbarSize,
    overviewRulerLanes,
    placeholderEnabled,
    placeholderPreset,
    placeholderCustomText,
    onRun,
    onChange,
    onDidPaste,
  } = props;

  // Build placeholder config if enabled
  const getPlaceholderConfig = (): PlaceholderOverlayConfig | undefined => {
    if (!placeholderEnabled) {
      return undefined;
    }
    
    const text = placeholderPreset === 'CUSTOM' 
      ? placeholderCustomText 
      : PLACEHOLDER_PRESETS[placeholderPreset];
    
    return {
      text,
      enabled: true,
    };
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>Editor Preview</h2>
        <div className="editor-stats">
          <span className="stat-badge">Changes: {changeCount}</span>
          <span className="stat-badge">Lines: {editorValue.split('\n').length}</span>
          <span className="stat-badge">Chars: {editorValue.length}</span>
        </div>
      </div>
      <div className="editor-wrapper">
        <Editor
          editorId="demo-editor"
          language={currentLanguage}
          value={editorValue}
          theme={currentTheme}
          onRun={showRunButton ? onRun : undefined}
          readOnly={readOnly}
          schemaDoc={enableSchemaDoc && (currentLanguage === 'N1QL' || currentLanguage === 'SqlPlusPlus') ? SAMPLE_SCHEMA_DOC : undefined}
          fontSize={fontSize}
          lineHeight={lineHeight}
          wordWrap={wordWrap}
          onChange={onChange}
          onDidPaste={onDidPaste}
          height={`${editorHeight}px`}
          placeholder={getPlaceholderConfig()}
          options={{
            cursorStyle,
            minimap: { enabled: minimap },
            lineNumbers,
            renderWhitespace,
            scrollBeyondLastLine,
            glyphMargin,
            folding,
            renderLineHighlight,
            cursorBlinking,
            cursorSmoothCaretAnimation,
            tabSize,
            insertSpaces,
            autoIndent,
            autoClosingBrackets,
            autoClosingQuotes,
            autoSurround,
            formatOnPaste,
            formatOnType,
            quickSuggestions,
            suggestOnTriggerCharacters,
            acceptSuggestionOnEnter,
            tabCompletion,
            wordBasedSuggestions: wordBasedSuggestions !== 'off',
            codeLens,
            links,
            renderControlCharacters,
            'guides': {
              indentation: renderIndentGuides,
              highlightActiveIndentation: highlightActiveIndentGuide,
              bracketPairs: bracketPairColorization,
            },
            smoothScrolling,
            mouseWheelZoom,
            showFoldingControls,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: scrollbarSize,
              horizontalScrollbarSize: scrollbarSize,
            },
            overviewRulerLanes,
          }}
        />
      </div>
    </div>
  );
};





