import { useState, useCallback } from 'react';
import { Editor } from './components/editor/editor';
import { SupportedLanguage, SupportedThemes } from './components/editor/editor.types';
import { editor as editorNamespace } from 'monaco-editor';
import { BasicControls } from './components/controls/BasicControls';
import { DisplayControls } from './components/controls/DisplayControls';
import { EditingControls } from './components/controls/EditingControls';
import { SuggestionsControls } from './components/controls/SuggestionsControls';
import { AdvancedControls } from './components/controls/AdvancedControls';
import { LayoutControls } from './components/controls/LayoutControls';
import { SAMPLE_CODE } from './constants/sampleCode';
import { SAMPLE_SCHEMA_DOC } from './constants/schemaDoc';
import type { ConfigSection } from './types/editorConfig';
import './App.css';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('javascript');
  const [currentTheme, setCurrentTheme] = useState<SupportedThemes>('vs-dark');
  const [editorValue, setEditorValue] = useState(SAMPLE_CODE[currentLanguage]);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [editorHeight, setEditorHeight] = useState(500);
  const [readOnly, setReadOnly] = useState(false);
  const [showRunButton, setShowRunButton] = useState(true);
  const [wordWrap, setWordWrap] = useState<'off' | 'on' | 'wordWrapColumn' | 'bounded'>('on');
  const [cursorStyle, setCursorStyle] = useState<'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin'>('line');
  const [minimap, setMinimap] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<'on' | 'off' | 'relative'>('on');
  const [renderWhitespace, setRenderWhitespace] = useState<'none' | 'boundary' | 'selection' | 'all'>('none');
  const [scrollBeyondLastLine, setScrollBeyondLastLine] = useState(true);
  const [glyphMargin, setGlyphMargin] = useState(true);
  const [folding, setFolding] = useState(true);
  const [renderLineHighlight, setRenderLineHighlight] = useState<'none' | 'gutter' | 'line' | 'all'>('line');
  const [cursorBlinking, setCursorBlinking] = useState<'blink' | 'smooth' | 'phase' | 'expand' | 'solid'>('blink');
  const [cursorSmoothCaretAnimation, setCursorSmoothCaretAnimation] = useState<'off' | 'explicit' | 'on'>('off');
  const [tabSize, setTabSize] = useState(4);
  const [insertSpaces, setInsertSpaces] = useState(true);
  const [autoIndent, setAutoIndent] = useState<'none' | 'keep' | 'brackets' | 'advanced' | 'full'>('full');
  const [autoClosingBrackets, setAutoClosingBrackets] = useState<'always' | 'languageDefined' | 'beforeWhitespace' | 'never'>('languageDefined');
  const [autoClosingQuotes, setAutoClosingQuotes] = useState<'always' | 'languageDefined' | 'beforeWhitespace' | 'never'>('languageDefined');
  const [autoSurround, setAutoSurround] = useState<'languageDefined' | 'quotes' | 'brackets' | 'never'>('languageDefined');
  const [formatOnPaste, setFormatOnPaste] = useState(false);
  const [formatOnType, setFormatOnType] = useState(false);
  const [quickSuggestions, setQuickSuggestions] = useState(true);
  const [suggestOnTriggerCharacters, setSuggestOnTriggerCharacters] = useState(true);
  const [acceptSuggestionOnEnter, setAcceptSuggestionOnEnter] = useState<'on' | 'off' | 'smart'>('on');
  const [tabCompletion, setTabCompletion] = useState<'on' | 'off' | 'onlySnippets'>('off');
  const [wordBasedSuggestions, setWordBasedSuggestions] = useState<'off' | 'currentDocument' | 'matchingDocuments' | 'allDocuments'>('matchingDocuments');
  const [codeLens, setCodeLens] = useState(true);
  const [links, setLinks] = useState(true);
  const [renderControlCharacters, setRenderControlCharacters] = useState(false);
  const [renderIndentGuides, setRenderIndentGuides] = useState(true);
  const [highlightActiveIndentGuide, setHighlightActiveIndentGuide] = useState(true);
  const [bracketPairColorization, setBracketPairColorization] = useState(true);
  const [smoothScrolling, setSmoothScrolling] = useState(false);
  const [mouseWheelZoom, setMouseWheelZoom] = useState(false);
  const [showFoldingControls, setShowFoldingControls] = useState<'always' | 'never' | 'mouseover'>('mouseover');
  const [scrollbarSize, setScrollbarSize] = useState(10);
  const [overviewRulerLanes, setOverviewRulerLanes] = useState(3);
  const [activeSection, setActiveSection] = useState<ConfigSection>('basic');
  const [output, setOutput] = useState<string>('');
  const [changeCount, setChangeCount] = useState(0);
  const [pasteEvents, setPasteEvents] = useState<string[]>([]);
  const [enableSchemaDoc, setEnableSchemaDoc] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  }, []);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    setEditorValue(SAMPLE_CODE[lang] || '// Write your code here...');
    addLog(`Language changed to: ${lang}`);
    setChangeCount(0);
  };

  const handleRun = () => {
    const timestamp = new Date().toLocaleTimeString();
    setOutput(`Executed code in ${currentLanguage} at ${timestamp}\n\nCode:\n${editorValue}`);
    addLog(`Code executed in ${currentLanguage}`);
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    setEditorValue(value || '');
    setChangeCount(prev => prev + 1);
  }, []);

  const handlePaste = useCallback((e: editorNamespace.IPasteEvent) => {
    const pastedText = e.range ? `Pasted at line ${e.range.startLineNumber}` : 'Pasted content';
    setPasteEvents(prev => [pastedText, ...prev.slice(0, 4)]);
    addLog(`Paste event detected`);
  }, [addLog]);

  const clearOutput = () => {
    setOutput('');
    addLog('Output cleared');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const clearPasteEvents = () => {
    setPasteEvents([]);
  };

  const resetToDefaults = () => {
    setCurrentLanguage('javascript');
    setCurrentTheme('vs-dark');
    setEditorValue(SAMPLE_CODE['javascript']);
    setFontSize(16);
    setLineHeight(1.6);
    setEditorHeight(500);
    setReadOnly(false);
    setShowRunButton(true);
    setWordWrap('on');
    setCursorStyle('line');
    setMinimap(false);
    setLineNumbers('on');
    setRenderWhitespace('none');
    setScrollBeyondLastLine(true);
    setGlyphMargin(true);
    setFolding(true);
    setRenderLineHighlight('line');
    setCursorBlinking('blink');
    setCursorSmoothCaretAnimation('off');
    setTabSize(4);
    setInsertSpaces(true);
    setAutoIndent('full');
    setAutoClosingBrackets('languageDefined');
    setAutoClosingQuotes('languageDefined');
    setAutoSurround('languageDefined');
    setFormatOnPaste(false);
    setFormatOnType(false);
    setQuickSuggestions(true);
    setSuggestOnTriggerCharacters(true);
    setAcceptSuggestionOnEnter('on');
    setTabCompletion('off');
    setWordBasedSuggestions('matchingDocuments');
    setCodeLens(true);
    setLinks(true);
    setRenderControlCharacters(false);
    setRenderIndentGuides(true);
    setHighlightActiveIndentGuide(true);
    setBracketPairColorization(true);
    setSmoothScrolling(false);
    setMouseWheelZoom(false);
    setShowFoldingControls('mouseover');
    setScrollbarSize(10);
    setOverviewRulerLanes(3);
    setEnableSchemaDoc(false);
    addLog('Reset all settings to defaults');
  };

  const getCurrentConfig = () => {
    return {
      language: currentLanguage,
      theme: currentTheme,
      fontSize,
      lineHeight,
      height: editorHeight,
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
    };
  };

  const copyConfig = () => {
    const config = getCurrentConfig();
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    addLog('Configuration copied to clipboard');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Monaco Editor Test App</h1>
        <p>Test all features of the Monaco Editor component</p>
      </header>

      <div className="storybook-controls">
        <div className="controls-header">
          <h2>⚙️ Configuration Panel</h2>
          <div className="controls-actions">
            <button className="action-btn reset-btn" onClick={resetToDefaults}>
              🔄 Reset All
            </button>
            <button className="action-btn copy-btn" onClick={copyConfig}>
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
        </div>
      </div>

      <div className="controls-panel">
        {activeSection === 'basic' && (
          <BasicControls
            currentLanguage={currentLanguage}
            currentTheme={currentTheme}
            fontSize={fontSize}
            lineHeight={lineHeight}
            editorHeight={editorHeight}
            readOnly={readOnly}
            showRunButton={showRunButton}
            minimap={minimap}
            scrollBeyondLastLine={scrollBeyondLastLine}
            enableSchemaDoc={enableSchemaDoc}
            onLanguageChange={handleLanguageChange}
            onThemeChange={setCurrentTheme}
            onFontSizeChange={setFontSize}
            onLineHeightChange={setLineHeight}
            onEditorHeightChange={setEditorHeight}
            onReadOnlyChange={setReadOnly}
            onShowRunButtonChange={setShowRunButton}
            onMinimapChange={setMinimap}
            onScrollBeyondLastLineChange={setScrollBeyondLastLine}
            onEnableSchemaDocChange={setEnableSchemaDoc}
          />
        )}

        {activeSection === 'display' && (
          <DisplayControls
            wordWrap={wordWrap}
            cursorStyle={cursorStyle}
            lineNumbers={lineNumbers}
            renderWhitespace={renderWhitespace}
            renderLineHighlight={renderLineHighlight}
            cursorBlinking={cursorBlinking}
            cursorSmoothCaretAnimation={cursorSmoothCaretAnimation}
            glyphMargin={glyphMargin}
            folding={folding}
            onWordWrapChange={setWordWrap}
            onCursorStyleChange={setCursorStyle}
            onLineNumbersChange={setLineNumbers}
            onRenderWhitespaceChange={setRenderWhitespace}
            onRenderLineHighlightChange={setRenderLineHighlight}
            onCursorBlinkingChange={setCursorBlinking}
            onCursorSmoothCaretAnimationChange={setCursorSmoothCaretAnimation}
            onGlyphMarginChange={setGlyphMargin}
            onFoldingChange={setFolding}
          />
        )}

        {activeSection === 'editing' && (
          <EditingControls
            tabSize={tabSize}
            insertSpaces={insertSpaces}
            autoIndent={autoIndent}
            autoClosingBrackets={autoClosingBrackets}
            autoClosingQuotes={autoClosingQuotes}
            autoSurround={autoSurround}
            formatOnPaste={formatOnPaste}
            formatOnType={formatOnType}
            onTabSizeChange={setTabSize}
            onInsertSpacesChange={setInsertSpaces}
            onAutoIndentChange={setAutoIndent}
            onAutoClosingBracketsChange={setAutoClosingBrackets}
            onAutoClosingQuotesChange={setAutoClosingQuotes}
            onAutoSurroundChange={setAutoSurround}
            onFormatOnPasteChange={setFormatOnPaste}
            onFormatOnTypeChange={setFormatOnType}
          />
        )}

        {activeSection === 'suggestions' && (
          <SuggestionsControls
            quickSuggestions={quickSuggestions}
            suggestOnTriggerCharacters={suggestOnTriggerCharacters}
            acceptSuggestionOnEnter={acceptSuggestionOnEnter}
            tabCompletion={tabCompletion}
            wordBasedSuggestions={wordBasedSuggestions}
            onQuickSuggestionsChange={setQuickSuggestions}
            onSuggestOnTriggerCharactersChange={setSuggestOnTriggerCharacters}
            onAcceptSuggestionOnEnterChange={setAcceptSuggestionOnEnter}
            onTabCompletionChange={setTabCompletion}
            onWordBasedSuggestionsChange={setWordBasedSuggestions}
          />
        )}

        {activeSection === 'advanced' && (
          <AdvancedControls
            codeLens={codeLens}
            links={links}
            renderControlCharacters={renderControlCharacters}
            renderIndentGuides={renderIndentGuides}
            highlightActiveIndentGuide={highlightActiveIndentGuide}
            bracketPairColorization={bracketPairColorization}
            smoothScrolling={smoothScrolling}
            mouseWheelZoom={mouseWheelZoom}
            onCodeLensChange={setCodeLens}
            onLinksChange={setLinks}
            onRenderControlCharactersChange={setRenderControlCharacters}
            onRenderIndentGuidesChange={setRenderIndentGuides}
            onHighlightActiveIndentGuideChange={setHighlightActiveIndentGuide}
            onBracketPairColorizationChange={setBracketPairColorization}
            onSmoothScrollingChange={setSmoothScrolling}
            onMouseWheelZoomChange={setMouseWheelZoom}
          />
        )}

        {activeSection === 'layout' && (
          <LayoutControls
            showFoldingControls={showFoldingControls}
            scrollbarSize={scrollbarSize}
            overviewRulerLanes={overviewRulerLanes}
            onShowFoldingControlsChange={setShowFoldingControls}
            onScrollbarSizeChange={setScrollbarSize}
            onOverviewRulerLanesChange={setOverviewRulerLanes}
          />
        )}
      </div>

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
            onRun={showRunButton ? handleRun : undefined}
            readOnly={readOnly}
            schemaDoc={enableSchemaDoc && (currentLanguage === 'N1QL' || currentLanguage === 'SqlPlusPlus') ? SAMPLE_SCHEMA_DOC : undefined}
            fontSize={fontSize}
            lineHeight={lineHeight}
            wordWrap={wordWrap}
            onChange={handleEditorChange}
            onDidPaste={handlePaste}
            height={`${editorHeight}px`}
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

      {pasteEvents.length > 0 && (
        <div className="events-container">
          <div className="events-header">
            <h3>Paste Events</h3>
            <button className="clear-btn" onClick={clearPasteEvents}>Clear</button>
          </div>
          <div className="events-list">
            {pasteEvents.map((event, index) => (
              <div key={index} className="event-item">
                <span className="event-icon">📋</span>
                <span>{event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="logs-container">
          <div className="logs-header">
            <h3>Activity Log</h3>
            <button className="clear-btn" onClick={clearLogs}>Clear</button>
          </div>
          <div className="logs-list">
            {logs.map((log, index) => (
              <div key={index} className="log-item">{log}</div>
            ))}
          </div>
        </div>
      )}

      {output && (
        <div className="output-container">
          <div className="output-header">
            <h2>Output</h2>
            <button className="clear-btn" onClick={clearOutput}>Clear</button>
          </div>
          <pre className="output-content">{output}</pre>
        </div>
      )}

      <div className="features-section">
        <h2>Editor Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>✨ Syntax Highlighting</h3>
            <p>Support for multiple programming languages with syntax highlighting</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Custom Themes</h3>
            <p>Switch between light and dark themes</p>
          </div>
          <div className="feature-card">
            <h3>🔧 Configurable</h3>
            <p>Font size, word wrap, read-only mode, and more</p>
          </div>
          <div className="feature-card">
            <h3>▶️ Run Button</h3>
            <p>Optional run button for executing code</p>
          </div>
          <div className="feature-card">
            <h3>🗃️ Custom Languages</h3>
            <p>Support for custom languages like N1QL and SQL++</p>
          </div>
          <div className="feature-card">
            <h3>📝 Monaco Editor</h3>
            <p>Powered by the same editor that powers VS Code</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
