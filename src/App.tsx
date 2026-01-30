import { useEditorConfig } from './hooks/useEditorConfig';
import { ConfigPanel } from './components/ConfigPanel';
import { EditorSection } from './components/EditorSection';
import { EventsPanel, LogsPanel, OutputPanel } from './components/ActivityPanels';
import { FeaturesSection } from './components/FeaturesSection';
import { SearchWorkbenchSection } from "./components/SearchWorkbench";
import "./App.css";

function App() {
  const { state, setters, handlers } = useEditorConfig();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Monaco Editor Test App</h1>
        <p>Test all features of the Monaco Editor component</p>
      </header>

      <ConfigPanel
        state={state}
        setters={setters}
        onLanguageChange={handlers.handleLanguageChange}
        onResetDefaults={handlers.resetToDefaults}
        onCopyConfig={handlers.copyConfig}
        onClearEditorContent={() => handlers.handleEditorChange('')}
      />

      <EditorSection
        editorValue={state.editorValue}
        changeCount={state.changeCount}
        currentLanguage={state.currentLanguage}
        currentTheme={state.currentTheme}
        showRunButton={state.showRunButton}
        enableSchemaDoc={state.enableSchemaDoc}
        fontSize={state.fontSize}
        lineHeight={state.lineHeight}
        editorHeight={state.editorHeight}
        readOnly={state.readOnly}
        wordWrap={state.wordWrap}
        cursorStyle={state.cursorStyle}
        minimap={state.minimap}
        lineNumbers={state.lineNumbers}
        renderWhitespace={state.renderWhitespace}
        scrollBeyondLastLine={state.scrollBeyondLastLine}
        glyphMargin={state.glyphMargin}
        folding={state.folding}
        renderLineHighlight={state.renderLineHighlight}
        cursorBlinking={state.cursorBlinking}
        cursorSmoothCaretAnimation={state.cursorSmoothCaretAnimation}
        tabSize={state.tabSize}
        insertSpaces={state.insertSpaces}
        autoIndent={state.autoIndent}
        autoClosingBrackets={state.autoClosingBrackets}
        autoClosingQuotes={state.autoClosingQuotes}
        autoSurround={state.autoSurround}
        formatOnPaste={state.formatOnPaste}
        formatOnType={state.formatOnType}
        quickSuggestions={state.quickSuggestions}
        suggestOnTriggerCharacters={state.suggestOnTriggerCharacters}
        acceptSuggestionOnEnter={state.acceptSuggestionOnEnter}
        tabCompletion={state.tabCompletion}
        wordBasedSuggestions={state.wordBasedSuggestions}
        codeLens={state.codeLens}
        links={state.links}
        renderControlCharacters={state.renderControlCharacters}
        renderIndentGuides={state.renderIndentGuides}
        highlightActiveIndentGuide={state.highlightActiveIndentGuide}
        bracketPairColorization={state.bracketPairColorization}
        smoothScrolling={state.smoothScrolling}
        mouseWheelZoom={state.mouseWheelZoom}
        showFoldingControls={state.showFoldingControls}
        scrollbarSize={state.scrollbarSize}
        overviewRulerLanes={state.overviewRulerLanes}
        placeholderEnabled={state.placeholderEnabled}
        placeholderPreset={state.placeholderPreset}
        placeholderCustomText={state.placeholderCustomText}
        onRun={handlers.handleRun}
        onChange={handlers.handleEditorChange}
        onDidPaste={handlers.handlePaste}
      />

      <EventsPanel
        events={state.pasteEvents}
        onClear={handlers.clearPasteEvents}
      />

      <LogsPanel logs={state.logs} onClear={handlers.clearLogs} />

      <OutputPanel output={state.output} onClear={handlers.clearOutput} />

      <FeaturesSection />

      <SearchWorkbenchSection />
    </div>
  );
}

export default App;
