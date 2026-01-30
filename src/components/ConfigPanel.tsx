import { useState } from 'react';
import { SupportedLanguage, SupportedThemes } from './editor/editor.types';
import { BasicControls } from './controls/BasicControls';
import { DisplayControls } from './controls/DisplayControls';
import { EditingControls } from './controls/EditingControls';
import { SuggestionsControls } from './controls/SuggestionsControls';
import { AdvancedControls } from './controls/AdvancedControls';
import { LayoutControls } from './controls/LayoutControls';
import { PlaceholderControls } from './controls/PlaceholderControls';
import type { ConfigSection } from '../types/editorConfig';
import type { PlaceholderPreset } from '../hooks/useEditorConfig';

interface ConfigPanelProps {
  state: {
    currentLanguage: SupportedLanguage;
    currentTheme: SupportedThemes;
    fontSize: number;
    lineHeight: number;
    editorHeight: number;
    readOnly: boolean;
    showRunButton: boolean;
    minimap: boolean;
    scrollBeyondLastLine: boolean;
    enableSchemaDoc: boolean;
    wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
    cursorStyle: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
    lineNumbers: 'on' | 'off' | 'relative';
    renderWhitespace: 'none' | 'boundary' | 'selection' | 'all';
    renderLineHighlight: 'none' | 'gutter' | 'line' | 'all';
    cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
    cursorSmoothCaretAnimation: 'off' | 'explicit' | 'on';
    glyphMargin: boolean;
    folding: boolean;
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
    // Placeholder state
    placeholderEnabled: boolean;
    placeholderPreset: PlaceholderPreset;
    placeholderCustomText: string;
  };
  setters: any;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onResetDefaults: () => void;
  onCopyConfig: () => void;
  onClearEditorContent: () => void;
}

export const ConfigPanel = ({ state, setters, onLanguageChange, onResetDefaults, onCopyConfig, onClearEditorContent }: ConfigPanelProps) => {
  const [activeSection, setActiveSection] = useState<ConfigSection>('basic');

  return (
    <>
      <div className="storybook-controls">
        <div className="controls-header">
          <h2>⚙️ Configuration Panel</h2>
          <div className="controls-actions">
            <button className="action-btn reset-btn" onClick={onResetDefaults}>
              🔄 Reset All
            </button>
            <button className="action-btn copy-btn" onClick={onCopyConfig}>
              📋 Copy Config
            </button>
          </div>
        </div>

        <div className="section-tabs">
          <button 
            className={`tab-btn ${activeSection === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveSection('basic')}
          >
            🎯 Basic
          </button>
          <button 
            className={`tab-btn ${activeSection === 'display' ? 'active' : ''}`}
            onClick={() => setActiveSection('display')}
          >
            🎨 Display
          </button>
          <button 
            className={`tab-btn ${activeSection === 'editing' ? 'active' : ''}`}
            onClick={() => setActiveSection('editing')}
          >
            ✏️ Editing
          </button>
          <button 
            className={`tab-btn ${activeSection === 'suggestions' ? 'active' : ''}`}
            onClick={() => setActiveSection('suggestions')}
          >
            💡 Suggestions
          </button>
          <button 
            className={`tab-btn ${activeSection === 'advanced' ? 'active' : ''}`}
            onClick={() => setActiveSection('advanced')}
          >
            🔧 Advanced
          </button>
          <button 
            className={`tab-btn ${activeSection === 'layout' ? 'active' : ''}`}
            onClick={() => setActiveSection('layout')}
          >
            📐 Layout
          </button>
          <button 
            className={`tab-btn ${activeSection === 'placeholder' ? 'active' : ''}`}
            onClick={() => setActiveSection('placeholder')}
          >
            📝 Placeholder
          </button>
        </div>
      </div>

      <div className="controls-panel">
        {activeSection === 'basic' && (
          <BasicControls
            currentLanguage={state.currentLanguage}
            currentTheme={state.currentTheme}
            fontSize={state.fontSize}
            lineHeight={state.lineHeight}
            editorHeight={state.editorHeight}
            readOnly={state.readOnly}
            showRunButton={state.showRunButton}
            minimap={state.minimap}
            scrollBeyondLastLine={state.scrollBeyondLastLine}
            enableSchemaDoc={state.enableSchemaDoc}
            onLanguageChange={onLanguageChange}
            onThemeChange={setters.setCurrentTheme}
            onFontSizeChange={setters.setFontSize}
            onLineHeightChange={setters.setLineHeight}
            onEditorHeightChange={setters.setEditorHeight}
            onReadOnlyChange={setters.setReadOnly}
            onShowRunButtonChange={setters.setShowRunButton}
            onMinimapChange={setters.setMinimap}
            onScrollBeyondLastLineChange={setters.setScrollBeyondLastLine}
            onEnableSchemaDocChange={setters.setEnableSchemaDoc}
          />
        )}

        {activeSection === 'display' && (
          <DisplayControls
            wordWrap={state.wordWrap}
            cursorStyle={state.cursorStyle}
            lineNumbers={state.lineNumbers}
            renderWhitespace={state.renderWhitespace}
            renderLineHighlight={state.renderLineHighlight}
            cursorBlinking={state.cursorBlinking}
            cursorSmoothCaretAnimation={state.cursorSmoothCaretAnimation}
            glyphMargin={state.glyphMargin}
            folding={state.folding}
            onWordWrapChange={setters.setWordWrap}
            onCursorStyleChange={setters.setCursorStyle}
            onLineNumbersChange={setters.setLineNumbers}
            onRenderWhitespaceChange={setters.setRenderWhitespace}
            onRenderLineHighlightChange={setters.setRenderLineHighlight}
            onCursorBlinkingChange={setters.setCursorBlinking}
            onCursorSmoothCaretAnimationChange={setters.setCursorSmoothCaretAnimation}
            onGlyphMarginChange={setters.setGlyphMargin}
            onFoldingChange={setters.setFolding}
          />
        )}

        {activeSection === 'editing' && (
          <EditingControls
            tabSize={state.tabSize}
            insertSpaces={state.insertSpaces}
            autoIndent={state.autoIndent}
            autoClosingBrackets={state.autoClosingBrackets}
            autoClosingQuotes={state.autoClosingQuotes}
            autoSurround={state.autoSurround}
            formatOnPaste={state.formatOnPaste}
            formatOnType={state.formatOnType}
            onTabSizeChange={setters.setTabSize}
            onInsertSpacesChange={setters.setInsertSpaces}
            onAutoIndentChange={setters.setAutoIndent}
            onAutoClosingBracketsChange={setters.setAutoClosingBrackets}
            onAutoClosingQuotesChange={setters.setAutoClosingQuotes}
            onAutoSurroundChange={setters.setAutoSurround}
            onFormatOnPasteChange={setters.setFormatOnPaste}
            onFormatOnTypeChange={setters.setFormatOnType}
          />
        )}

        {activeSection === 'suggestions' && (
          <SuggestionsControls
            quickSuggestions={state.quickSuggestions}
            suggestOnTriggerCharacters={state.suggestOnTriggerCharacters}
            acceptSuggestionOnEnter={state.acceptSuggestionOnEnter}
            tabCompletion={state.tabCompletion}
            wordBasedSuggestions={state.wordBasedSuggestions}
            onQuickSuggestionsChange={setters.setQuickSuggestions}
            onSuggestOnTriggerCharactersChange={setters.setSuggestOnTriggerCharacters}
            onAcceptSuggestionOnEnterChange={setters.setAcceptSuggestionOnEnter}
            onTabCompletionChange={setters.setTabCompletion}
            onWordBasedSuggestionsChange={setters.setWordBasedSuggestions}
          />
        )}

        {activeSection === 'advanced' && (
          <AdvancedControls
            codeLens={state.codeLens}
            links={state.links}
            renderControlCharacters={state.renderControlCharacters}
            renderIndentGuides={state.renderIndentGuides}
            highlightActiveIndentGuide={state.highlightActiveIndentGuide}
            bracketPairColorization={state.bracketPairColorization}
            smoothScrolling={state.smoothScrolling}
            mouseWheelZoom={state.mouseWheelZoom}
            onCodeLensChange={setters.setCodeLens}
            onLinksChange={setters.setLinks}
            onRenderControlCharactersChange={setters.setRenderControlCharacters}
            onRenderIndentGuidesChange={setters.setRenderIndentGuides}
            onHighlightActiveIndentGuideChange={setters.setHighlightActiveIndentGuide}
            onBracketPairColorizationChange={setters.setBracketPairColorization}
            onSmoothScrollingChange={setters.setSmoothScrolling}
            onMouseWheelZoomChange={setters.setMouseWheelZoom}
          />
        )}

        {activeSection === 'layout' && (
          <LayoutControls
            showFoldingControls={state.showFoldingControls}
            scrollbarSize={state.scrollbarSize}
            overviewRulerLanes={state.overviewRulerLanes}
            onShowFoldingControlsChange={setters.setShowFoldingControls}
            onScrollbarSizeChange={setters.setScrollbarSize}
            onOverviewRulerLanesChange={setters.setOverviewRulerLanes}
          />
        )}

        {activeSection === 'placeholder' && (
          <PlaceholderControls
            placeholderEnabled={state.placeholderEnabled}
            placeholderPreset={state.placeholderPreset}
            placeholderCustomText={state.placeholderCustomText}
            onPlaceholderEnabledChange={setters.setPlaceholderEnabled}
            onPlaceholderPresetChange={setters.setPlaceholderPreset}
            onPlaceholderCustomTextChange={setters.setPlaceholderCustomText}
            onClearEditorContent={onClearEditorContent}
          />
        )}
      </div>
    </>
  );
};





