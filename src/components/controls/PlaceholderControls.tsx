import { PLACEHOLDER_PRESETS } from '../editor/utils/placeholder-overlay';
import type { PlaceholderPreset } from '../../hooks/useEditorConfig';

const PRESET_OPTIONS: { value: PlaceholderPreset; label: string }[] = [
  { value: 'JSON_QUERY', label: 'JSON Query' },
  { value: 'SQL', label: 'SQL' },
  { value: 'JAVASCRIPT', label: 'JavaScript' },
  { value: 'GENERIC', label: 'Generic' },
  { value: 'CUSTOM', label: 'Custom Text' },
];

type PlaceholderControlsProps = {
  placeholderEnabled: boolean;
  placeholderPreset: PlaceholderPreset;
  placeholderCustomText: string;
  onPlaceholderEnabledChange: (enabled: boolean) => void;
  onPlaceholderPresetChange: (preset: PlaceholderPreset) => void;
  onPlaceholderCustomTextChange: (text: string) => void;
  onClearEditorContent: () => void;
};

export function PlaceholderControls({
  placeholderEnabled,
  placeholderPreset,
  placeholderCustomText,
  onPlaceholderEnabledChange,
  onPlaceholderPresetChange,
  onPlaceholderCustomTextChange,
  onClearEditorContent,
}: PlaceholderControlsProps) {
  // Get the current placeholder text based on preset selection
  const getCurrentPlaceholderText = () => {
    if (placeholderPreset === 'CUSTOM') {
      return placeholderCustomText;
    }
    return PLACEHOLDER_PRESETS[placeholderPreset];
  };

  return (
    <>
      <div className="control-section">
        <h3>Placeholder Overlay</h3>
        <p className="control-description">
          Shows placeholder text when the editor is empty. The placeholder disappears when you start typing.
        </p>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={placeholderEnabled}
              onChange={(e) => onPlaceholderEnabledChange(e.target.checked)}
            />
            Enable Placeholder
          </label>
        </div>
      </div>

      {placeholderEnabled && (
        <>
          <div className="control-section">
            <h3>Placeholder Preset</h3>
            <div className="button-group">
              {PRESET_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`control-button ${placeholderPreset === option.value ? 'active' : ''}`}
                  onClick={() => onPlaceholderPresetChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {placeholderPreset === 'CUSTOM' && (
            <div className="control-section">
              <h3>Custom Placeholder Text</h3>
              <textarea
                className="custom-textarea"
                value={placeholderCustomText}
                onChange={(e) => onPlaceholderCustomTextChange(e.target.value)}
                placeholder="Enter your custom placeholder text..."
                rows={5}
              />
            </div>
          )}

          <div className="control-section">
            <h3>Preview</h3>
            <div className="placeholder-preview">
              <pre>{getCurrentPlaceholderText()}</pre>
            </div>
          </div>

          <div className="control-section">
            <h3>Test Placeholder</h3>
            <p className="control-description">
              Clear the editor content to see the placeholder in action.
            </p>
            <button 
              className="control-button active"
              onClick={onClearEditorContent}
            >
              Clear Editor Content
            </button>
          </div>
        </>
      )}
    </>
  );
}
