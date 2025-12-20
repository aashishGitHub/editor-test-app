import {
  AUTO_INDENT_OPTIONS,
  AUTO_CLOSING_BRACKETS_OPTIONS,
  AUTO_CLOSING_QUOTES_OPTIONS,
  AUTO_SURROUND_OPTIONS,
} from '../../constants/editorOptions';

type EditingControlsProps = {
  tabSize: number;
  insertSpaces: boolean;
  autoIndent: 'none' | 'keep' | 'brackets' | 'advanced' | 'full';
  autoClosingBrackets: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  autoClosingQuotes: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  autoSurround: 'languageDefined' | 'quotes' | 'brackets' | 'never';
  formatOnPaste: boolean;
  formatOnType: boolean;
  onTabSizeChange: (size: number) => void;
  onInsertSpacesChange: (enabled: boolean) => void;
  onAutoIndentChange: (value: 'none' | 'keep' | 'brackets' | 'advanced' | 'full') => void;
  onAutoClosingBracketsChange: (value: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never') => void;
  onAutoClosingQuotesChange: (value: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never') => void;
  onAutoSurroundChange: (value: 'languageDefined' | 'quotes' | 'brackets' | 'never') => void;
  onFormatOnPasteChange: (enabled: boolean) => void;
  onFormatOnTypeChange: (enabled: boolean) => void;
};

export function EditingControls({
  tabSize,
  insertSpaces,
  autoIndent,
  autoClosingBrackets,
  autoClosingQuotes,
  autoSurround,
  formatOnPaste,
  formatOnType,
  onTabSizeChange,
  onInsertSpacesChange,
  onAutoIndentChange,
  onAutoClosingBracketsChange,
  onAutoClosingQuotesChange,
  onAutoSurroundChange,
  onFormatOnPasteChange,
  onFormatOnTypeChange,
}: EditingControlsProps) {
  return (
    <div className="control-section">
      <h3>Indentation & Formatting</h3>

      <div className="slider-group">
        <label className="dropdown-label">
          <span className="label-text">Tab Size</span>
          <input
            type="range"
            min="2"
            max="8"
            value={tabSize}
            onChange={(e) => onTabSizeChange(Number(e.target.value))}
            className="slider"
          />
          <span className="slider-value">{tabSize} spaces</span>
        </label>
      </div>

      <div className="dropdown-group">
        <label className="dropdown-label">
          <span className="label-text">Auto Indent</span>
          <select
            value={autoIndent}
            onChange={(e) => onAutoIndentChange(e.target.value as any)}
            className="dropdown-select"
          >
            {AUTO_INDENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Auto Closing Brackets</span>
          <select
            value={autoClosingBrackets}
            onChange={(e) => onAutoClosingBracketsChange(e.target.value as any)}
            className="dropdown-select"
          >
            {AUTO_CLOSING_BRACKETS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Auto Closing Quotes</span>
          <select
            value={autoClosingQuotes}
            onChange={(e) => onAutoClosingQuotesChange(e.target.value as any)}
            className="dropdown-select"
          >
            {AUTO_CLOSING_QUOTES_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Auto Surround</span>
          <select
            value={autoSurround}
            onChange={(e) => onAutoSurroundChange(e.target.value as any)}
            className="dropdown-select"
          >
            {AUTO_SURROUND_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={insertSpaces}
            onChange={(e) => onInsertSpacesChange(e.target.checked)}
          />
          Insert Spaces (vs Tabs)
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formatOnPaste}
            onChange={(e) => onFormatOnPasteChange(e.target.checked)}
          />
          Format On Paste
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formatOnType}
            onChange={(e) => onFormatOnTypeChange(e.target.checked)}
          />
          Format On Type
        </label>
      </div>
    </div>
  );
}

