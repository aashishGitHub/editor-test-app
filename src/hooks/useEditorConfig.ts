import { useState, useCallback } from 'react';
import { SupportedLanguage, SupportedThemes } from '../components/editor/editor.types';
import { editor as editorNamespace } from 'monaco-editor';
import { SAMPLE_CODE } from '../constants/sampleCode';

export const useEditorConfig = () => {
  // Basic settings
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('javascript');
  const [currentTheme, setCurrentTheme] = useState<SupportedThemes>('vs-dark');
  const [editorValue, setEditorValue] = useState(SAMPLE_CODE[currentLanguage]);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [editorHeight, setEditorHeight] = useState(500);
  const [readOnly, setReadOnly] = useState(false);
  const [showRunButton, setShowRunButton] = useState(true);
  const [enableSchemaDoc, setEnableSchemaDoc] = useState(false);

  // Display settings
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

  // Editing settings
  const [tabSize, setTabSize] = useState(4);
  const [insertSpaces, setInsertSpaces] = useState(true);
  const [autoIndent, setAutoIndent] = useState<'none' | 'keep' | 'brackets' | 'advanced' | 'full'>('full');
  const [autoClosingBrackets, setAutoClosingBrackets] = useState<'always' | 'languageDefined' | 'beforeWhitespace' | 'never'>('languageDefined');
  const [autoClosingQuotes, setAutoClosingQuotes] = useState<'always' | 'languageDefined' | 'beforeWhitespace' | 'never'>('languageDefined');
  const [autoSurround, setAutoSurround] = useState<'languageDefined' | 'quotes' | 'brackets' | 'never'>('languageDefined');
  const [formatOnPaste, setFormatOnPaste] = useState(false);
  const [formatOnType, setFormatOnType] = useState(false);

  // Suggestions settings
  const [quickSuggestions, setQuickSuggestions] = useState(true);
  const [suggestOnTriggerCharacters, setSuggestOnTriggerCharacters] = useState(true);
  const [acceptSuggestionOnEnter, setAcceptSuggestionOnEnter] = useState<'on' | 'off' | 'smart'>('on');
  const [tabCompletion, setTabCompletion] = useState<'on' | 'off' | 'onlySnippets'>('off');
  const [wordBasedSuggestions, setWordBasedSuggestions] = useState<'off' | 'currentDocument' | 'matchingDocuments' | 'allDocuments'>('matchingDocuments');

  // Advanced settings
  const [codeLens, setCodeLens] = useState(true);
  const [links, setLinks] = useState(true);
  const [renderControlCharacters, setRenderControlCharacters] = useState(false);
  const [renderIndentGuides, setRenderIndentGuides] = useState(true);
  const [highlightActiveIndentGuide, setHighlightActiveIndentGuide] = useState(true);
  const [bracketPairColorization, setBracketPairColorization] = useState(true);
  const [smoothScrolling, setSmoothScrolling] = useState(false);
  const [mouseWheelZoom, setMouseWheelZoom] = useState(false);

  // Layout settings
  const [showFoldingControls, setShowFoldingControls] = useState<'always' | 'never' | 'mouseover'>('mouseover');
  const [scrollbarSize, setScrollbarSize] = useState(10);
  const [overviewRulerLanes, setOverviewRulerLanes] = useState(3);

  // Activity tracking
  const [output, setOutput] = useState<string>('');
  const [changeCount, setChangeCount] = useState(0);
  const [pasteEvents, setPasteEvents] = useState<string[]>([]);
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

  return {
    // State values
    state: {
      currentLanguage,
      currentTheme,
      editorValue,
      fontSize,
      lineHeight,
      editorHeight,
      readOnly,
      showRunButton,
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
      enableSchemaDoc,
      output,
      changeCount,
      pasteEvents,
      logs,
    },
    // Setters
    setters: {
      setCurrentTheme,
      setFontSize,
      setLineHeight,
      setEditorHeight,
      setReadOnly,
      setShowRunButton,
      setWordWrap,
      setCursorStyle,
      setMinimap,
      setLineNumbers,
      setRenderWhitespace,
      setScrollBeyondLastLine,
      setGlyphMargin,
      setFolding,
      setRenderLineHighlight,
      setCursorBlinking,
      setCursorSmoothCaretAnimation,
      setTabSize,
      setInsertSpaces,
      setAutoIndent,
      setAutoClosingBrackets,
      setAutoClosingQuotes,
      setAutoSurround,
      setFormatOnPaste,
      setFormatOnType,
      setQuickSuggestions,
      setSuggestOnTriggerCharacters,
      setAcceptSuggestionOnEnter,
      setTabCompletion,
      setWordBasedSuggestions,
      setCodeLens,
      setLinks,
      setRenderControlCharacters,
      setRenderIndentGuides,
      setHighlightActiveIndentGuide,
      setBracketPairColorization,
      setSmoothScrolling,
      setMouseWheelZoom,
      setShowFoldingControls,
      setScrollbarSize,
      setOverviewRulerLanes,
      setEnableSchemaDoc,
    },
    // Handlers
    handlers: {
      handleLanguageChange,
      handleRun,
      handleEditorChange,
      handlePaste,
      clearOutput,
      clearLogs,
      clearPasteEvents,
      resetToDefaults,
      copyConfig,
    },
  };
};




