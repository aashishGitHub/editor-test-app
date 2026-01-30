import { useRef, useEffect } from 'react';
import './utils/configure-monaco';
import { Editor as BaseEditor, OnChange } from '@monaco-editor/react';
import { Icon } from 'components/icon';
import { Spinner } from 'components/spinner';
import { editor, editor as editorNamespace } from 'monaco-editor';
import { CSSDimension, OnRunHandler, PasteEventHandler, SupportedLanguage, SupportedThemes } from './editor.types';
import type { SchemaDoc } from './languages/types';
import { generateSchema, isCustomLanguage } from './utils/custom-languages';
import { getEditorStyles, getPlayButtonStyles } from './utils/get-styles';
import { 
  PlaceholderOverlayService, 
  PlaceholderOverlayConfig,
  createPlaceholderOverlay,
  PLACEHOLDER_PRESETS 
} from './utils/placeholder-overlay';
import './styles/editor.scss';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

/**
 * Placeholder configuration for the editor
 */
export type EditorPlaceholderConfig = PlaceholderOverlayConfig;

/**
 * Re-export placeholder presets for easy access
 */
export { PLACEHOLDER_PRESETS };

type EditorProps = {
  editorId?: string;
  language: SupportedLanguage;
  value?: string;
  theme?: SupportedThemes;
  onRun?: OnRunHandler;
  readOnly?: boolean;
  schemaDoc?: SchemaDoc;
  fontSize?: number;
  lineHeight?: number;
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  onChange?: OnChange;
  onDidPaste?: PasteEventHandler;
  onMount?: (editor: editorNamespace.IStandaloneCodeEditor) => void;
  height?: CSSDimension;
  options?: editor.IStandaloneEditorConstructionOptions;
  /**
   * Placeholder configuration. When provided, shows placeholder text when editor is empty.
   * Set to undefined/null to disable, or use { text: '...', enabled: false } to configure but disable.
   * 
   * @example
   * // Simple usage:
   * placeholder={{ text: 'Enter your code here...' }}
   * 
   * // With preset:
   * placeholder={{ text: PLACEHOLDER_PRESETS.JSON_QUERY }}
   * 
   * // Disabled by default but configurable:
   * placeholder={{ text: 'Your query...', enabled: false }}
   */
  placeholder?: PlaceholderOverlayConfig;
};

export function Editor({
  editorId = 'cb-editor',
  language,
  value = '',
  theme = 'vs-dark',
  onRun,
  readOnly = false,
  schemaDoc,
  fontSize = 16,
  lineHeight = 1.6,
  wordWrap = 'on',
  onChange,
  onDidPaste,
  onMount,
  height = '100px',
  options = {},
  placeholder,
}: EditorProps) {
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const placeholderServiceRef = useRef<PlaceholderOverlayService | null>(null);

  // Cleanup placeholder service on unmount
  useEffect(() => {
    return () => {
      if (placeholderServiceRef.current) {
        placeholderServiceRef.current.dispose();
        placeholderServiceRef.current = null;
      }
    };
  }, []);

  // Update placeholder config when props change
  useEffect(() => {
    if (placeholderServiceRef.current && placeholder) {
      placeholderServiceRef.current.updateConfig(placeholder);
    }
  }, [placeholder]);

  const onEditorMount = (editor: editorNamespace.IStandaloneCodeEditor) => {
    if (schemaDoc && isCustomLanguage(language)) {
      generateSchema(language, schemaDoc).then((dispose) => {
        editor.onDidDispose(dispose);
      });
    }

    editorRef.current = editor;
    if (onDidPaste) {
      editorRef.current.onDidPaste(onDidPaste);
    }

    // Initialize placeholder overlay if configured
    if (placeholder) {
      placeholderServiceRef.current = createPlaceholderOverlay(editor, placeholder);
    }
    
    // Call external onMount callback if provided
    if (onMount) {
      onMount(editor);
    }
  };

  return (
    <div {...getEditorStyles(theme)}>
      {onRun ? (
        <div className="flex w-full justify-end px-4 pb-2.5">
          <button
            className={getPlayButtonStyles(theme)}
            onClick={onRun}
            type="button"
          >
            <span className="sr-only">Run</span>
            <span className="pl-0.5">
              <Icon name="play" size="large" />
            </span>
          </button>
        </div>
      ) : null}
      <BaseEditor
        className="editor-wrapper"
        height={height}
        theme={theme}
        language={language}
        value={value}
        onChange={onChange}
        wrapperProps={{ id: editorId }}
        onMount={onEditorMount}
        loading={<Spinner size="large" />}
        options={{
          readOnly,
          minimap: { enabled: false },
          padding: { top: 4, bottom: 16 },
          wordWrap,
          fontSize,
          lineHeight,
          ...options,
        }}
        // `options` takes IStandaloneEditorConstructionProps: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html
      />
    </div>
  );
}

