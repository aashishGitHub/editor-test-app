import {
  WORD_WRAP_OPTIONS,
  CURSOR_STYLE_OPTIONS,
  LINE_NUMBERS_OPTIONS,
  RENDER_WHITESPACE_OPTIONS,
  RENDER_LINE_HIGHLIGHT_OPTIONS,
  CURSOR_BLINKING_OPTIONS,
  CURSOR_SMOOTH_CARET_ANIMATION_OPTIONS,
} from '../../constants/editorOptions';

type DisplayControlsProps = {
  wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  cursorStyle: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
  lineNumbers: 'on' | 'off' | 'relative';
  renderWhitespace: 'none' | 'boundary' | 'selection' | 'all';
  renderLineHighlight: 'none' | 'gutter' | 'line' | 'all';
  cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
  cursorSmoothCaretAnimation: 'off' | 'explicit' | 'on';
  glyphMargin: boolean;
  folding: boolean;
  onWordWrapChange: (value: 'off' | 'on' | 'wordWrapColumn' | 'bounded') => void;
  onCursorStyleChange: (value: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin') => void;
  onLineNumbersChange: (value: 'on' | 'off' | 'relative') => void;
  onRenderWhitespaceChange: (value: 'none' | 'boundary' | 'selection' | 'all') => void;
  onRenderLineHighlightChange: (value: 'none' | 'gutter' | 'line' | 'all') => void;
  onCursorBlinkingChange: (value: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid') => void;
  onCursorSmoothCaretAnimationChange: (value: 'off' | 'explicit' | 'on') => void;
  onGlyphMarginChange: (enabled: boolean) => void;
  onFoldingChange: (enabled: boolean) => void;
};

export function DisplayControls({
  wordWrap,
  cursorStyle,
  lineNumbers,
  renderWhitespace,
  renderLineHighlight,
  cursorBlinking,
  cursorSmoothCaretAnimation,
  glyphMargin,
  folding,
  onWordWrapChange,
  onCursorStyleChange,
  onLineNumbersChange,
  onRenderWhitespaceChange,
  onRenderLineHighlightChange,
  onCursorBlinkingChange,
  onCursorSmoothCaretAnimationChange,
  onGlyphMarginChange,
  onFoldingChange,
}: DisplayControlsProps) {
  return (
    <div className="control-section">
      <h3>Visual Settings</h3>
      <div className="dropdown-group">
        <label className="dropdown-label">
          <span className="label-text">Word Wrap</span>
          <select
            value={wordWrap}
            onChange={(e) => onWordWrapChange(e.target.value as any)}
            className="dropdown-select"
          >
            {WORD_WRAP_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Cursor Style</span>
          <select
            value={cursorStyle}
            onChange={(e) => onCursorStyleChange(e.target.value as any)}
            className="dropdown-select"
          >
            {CURSOR_STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Line Numbers</span>
          <select
            value={lineNumbers}
            onChange={(e) => onLineNumbersChange(e.target.value as any)}
            className="dropdown-select"
          >
            {LINE_NUMBERS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Render Whitespace</span>
          <select
            value={renderWhitespace}
            onChange={(e) => onRenderWhitespaceChange(e.target.value as any)}
            className="dropdown-select"
          >
            {RENDER_WHITESPACE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Line Highlight</span>
          <select
            value={renderLineHighlight}
            onChange={(e) => onRenderLineHighlightChange(e.target.value as any)}
            className="dropdown-select"
          >
            {RENDER_LINE_HIGHLIGHT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Cursor Blinking</span>
          <select
            value={cursorBlinking}
            onChange={(e) => onCursorBlinkingChange(e.target.value as any)}
            className="dropdown-select"
          >
            {CURSOR_BLINKING_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Smooth Caret Animation</span>
          <select
            value={cursorSmoothCaretAnimation}
            onChange={(e) => onCursorSmoothCaretAnimationChange(e.target.value as any)}
            className="dropdown-select"
          >
            {CURSOR_SMOOTH_CARET_ANIMATION_OPTIONS.map((option) => (
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
            checked={glyphMargin}
            onChange={(e) => onGlyphMarginChange(e.target.checked)}
          />
          Glyph Margin (breakpoints area)
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={folding}
            onChange={(e) => onFoldingChange(e.target.checked)}
          />
          Code Folding
        </label>
      </div>
    </div>
  );
}

