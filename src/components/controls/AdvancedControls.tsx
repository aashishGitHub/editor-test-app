type AdvancedControlsProps = {
  codeLens: boolean;
  links: boolean;
  renderControlCharacters: boolean;
  renderIndentGuides: boolean;
  highlightActiveIndentGuide: boolean;
  bracketPairColorization: boolean;
  smoothScrolling: boolean;
  mouseWheelZoom: boolean;
  onCodeLensChange: (enabled: boolean) => void;
  onLinksChange: (enabled: boolean) => void;
  onRenderControlCharactersChange: (enabled: boolean) => void;
  onRenderIndentGuidesChange: (enabled: boolean) => void;
  onHighlightActiveIndentGuideChange: (enabled: boolean) => void;
  onBracketPairColorizationChange: (enabled: boolean) => void;
  onSmoothScrollingChange: (enabled: boolean) => void;
  onMouseWheelZoomChange: (enabled: boolean) => void;
};

export function AdvancedControls({
  codeLens,
  links,
  renderControlCharacters,
  renderIndentGuides,
  highlightActiveIndentGuide,
  bracketPairColorization,
  smoothScrolling,
  mouseWheelZoom,
  onCodeLensChange,
  onLinksChange,
  onRenderControlCharactersChange,
  onRenderIndentGuidesChange,
  onHighlightActiveIndentGuideChange,
  onBracketPairColorizationChange,
  onSmoothScrollingChange,
  onMouseWheelZoomChange,
}: AdvancedControlsProps) {
  return (
    <div className="control-section">
      <h3>Advanced Features</h3>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={codeLens}
            onChange={(e) => onCodeLensChange(e.target.checked)}
          />
          Code Lens
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={links}
            onChange={(e) => onLinksChange(e.target.checked)}
          />
          Detect Links
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={renderControlCharacters}
            onChange={(e) => onRenderControlCharactersChange(e.target.checked)}
          />
          Render Control Characters
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={renderIndentGuides}
            onChange={(e) => onRenderIndentGuidesChange(e.target.checked)}
          />
          Render Indent Guides
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={highlightActiveIndentGuide}
            onChange={(e) => onHighlightActiveIndentGuideChange(e.target.checked)}
          />
          Highlight Active Indent Guide
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={bracketPairColorization}
            onChange={(e) => onBracketPairColorizationChange(e.target.checked)}
          />
          Bracket Pair Colorization
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={smoothScrolling}
            onChange={(e) => onSmoothScrollingChange(e.target.checked)}
          />
          Smooth Scrolling
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={mouseWheelZoom}
            onChange={(e) => onMouseWheelZoomChange(e.target.checked)}
          />
          Mouse Wheel Zoom
        </label>
      </div>
    </div>
  );
}

