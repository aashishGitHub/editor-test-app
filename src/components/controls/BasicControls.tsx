import type { SupportedLanguage, SupportedThemes } from '../editor/editor.types';
import { LANGUAGES, THEMES } from '../../constants/editorOptions';

type BasicControlsProps = {
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
  onLanguageChange: (lang: SupportedLanguage) => void;
  onThemeChange: (theme: SupportedThemes) => void;
  onFontSizeChange: (size: number) => void;
  onLineHeightChange: (height: number) => void;
  onEditorHeightChange: (height: number) => void;
  onReadOnlyChange: (readOnly: boolean) => void;
  onShowRunButtonChange: (show: boolean) => void;
  onMinimapChange: (enabled: boolean) => void;
  onScrollBeyondLastLineChange: (enabled: boolean) => void;
  onEnableSchemaDocChange: (enabled: boolean) => void;
};

export function BasicControls({
  currentLanguage,
  currentTheme,
  fontSize,
  lineHeight,
  editorHeight,
  readOnly,
  showRunButton,
  minimap,
  scrollBeyondLastLine,
  enableSchemaDoc,
  onLanguageChange,
  onThemeChange,
  onFontSizeChange,
  onLineHeightChange,
  onEditorHeightChange,
  onReadOnlyChange,
  onShowRunButtonChange,
  onMinimapChange,
  onScrollBeyondLastLineChange,
  onEnableSchemaDocChange,
}: BasicControlsProps) {
  return (
    <>
      <div className="control-section">
        <h3>Language Selection</h3>
        <div className="button-group">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              className={`control-button ${currentLanguage === lang ? 'active' : ''}`}
              onClick={() => onLanguageChange(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <h3>Theme</h3>
        <div className="button-group">
          {THEMES.map((theme) => (
            <button
              key={theme.value}
              className={`control-button ${currentTheme === theme.value ? 'active' : ''}`}
              onClick={() => onThemeChange(theme.value)}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <h3>Font Size</h3>
        <div className="slider-group">
          <input
            type="range"
            min="10"
            max="30"
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="slider"
          />
          <span className="slider-value">{fontSize}px</span>
        </div>
      </div>

      <div className="control-section">
        <h3>Typography</h3>
        <div className="slider-group">
          <label className="dropdown-label">
            <span className="label-text">Line Height</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={lineHeight}
              onChange={(e) => onLineHeightChange(Number(e.target.value))}
              className="slider"
            />
            <span className="slider-value">{lineHeight.toFixed(1)}</span>
          </label>
        </div>
      </div>

      <div className="control-section">
        <h3>Editor Behavior</h3>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={readOnly}
              onChange={(e) => onReadOnlyChange(e.target.checked)}
            />
            Read Only
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showRunButton}
              onChange={(e) => onShowRunButtonChange(e.target.checked)}
            />
            Show Run Button ▶️ (Top-right in editor)
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={minimap}
              onChange={(e) => onMinimapChange(e.target.checked)}
            />
            Show Minimap
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={scrollBeyondLastLine}
              onChange={(e) => onScrollBeyondLastLineChange(e.target.checked)}
            />
            Scroll Beyond Last Line
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={enableSchemaDoc}
              onChange={(e) => onEnableSchemaDocChange(e.target.checked)}
            />
            Enable Schema Doc (N1QL/SQL++)
          </label>
        </div>
      </div>

      <div className="control-section">
        <h3>Editor Dimensions</h3>
        <div className="slider-group">
          <label className="dropdown-label">
            <span className="label-text">Editor Height</span>
            <input
              type="range"
              min="200"
              max="800"
              step="50"
              value={editorHeight}
              onChange={(e) => onEditorHeightChange(Number(e.target.value))}
              className="slider"
            />
            <span className="slider-value">{editorHeight}px</span>
          </label>
        </div>
      </div>
    </>
  );
}

