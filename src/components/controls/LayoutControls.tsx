import { SHOW_FOLDING_CONTROLS_OPTIONS } from '../../constants/editorOptions';

type LayoutControlsProps = {
  showFoldingControls: 'always' | 'never' | 'mouseover';
  scrollbarSize: number;
  overviewRulerLanes: number;
  onShowFoldingControlsChange: (value: 'always' | 'never' | 'mouseover') => void;
  onScrollbarSizeChange: (size: number) => void;
  onOverviewRulerLanesChange: (lanes: number) => void;
};

export function LayoutControls({
  showFoldingControls,
  scrollbarSize,
  overviewRulerLanes,
  onShowFoldingControlsChange,
  onScrollbarSizeChange,
  onOverviewRulerLanesChange,
}: LayoutControlsProps) {
  return (
    <div className="control-section">
      <h3>Layout & Scrollbars</h3>

      <div className="dropdown-group">
        <label className="dropdown-label">
          <span className="label-text">Folding Controls</span>
          <select
            value={showFoldingControls}
            onChange={(e) => onShowFoldingControlsChange(e.target.value as any)}
            className="dropdown-select"
          >
            {SHOW_FOLDING_CONTROLS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="slider-group">
        <label className="dropdown-label">
          <span className="label-text">Scrollbar Size</span>
          <input
            type="range"
            min="5"
            max="20"
            value={scrollbarSize}
            onChange={(e) => onScrollbarSizeChange(Number(e.target.value))}
            className="slider"
          />
          <span className="slider-value">{scrollbarSize}px</span>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Overview Ruler Lanes</span>
          <input
            type="range"
            min="0"
            max="3"
            value={overviewRulerLanes}
            onChange={(e) => onOverviewRulerLanesChange(Number(e.target.value))}
            className="slider"
          />
          <span className="slider-value">{overviewRulerLanes}</span>
        </label>
      </div>
    </div>
  );
}

