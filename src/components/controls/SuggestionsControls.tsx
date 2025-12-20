import {
  ACCEPT_SUGGESTION_ON_ENTER_OPTIONS,
  TAB_COMPLETION_OPTIONS,
  WORD_BASED_SUGGESTIONS_OPTIONS,
} from '../../constants/editorOptions';

type SuggestionsControlsProps = {
  quickSuggestions: boolean;
  suggestOnTriggerCharacters: boolean;
  acceptSuggestionOnEnter: 'on' | 'off' | 'smart';
  tabCompletion: 'on' | 'off' | 'onlySnippets';
  wordBasedSuggestions: 'off' | 'currentDocument' | 'matchingDocuments' | 'allDocuments';
  onQuickSuggestionsChange: (enabled: boolean) => void;
  onSuggestOnTriggerCharactersChange: (enabled: boolean) => void;
  onAcceptSuggestionOnEnterChange: (value: 'on' | 'off' | 'smart') => void;
  onTabCompletionChange: (value: 'on' | 'off' | 'onlySnippets') => void;
  onWordBasedSuggestionsChange: (value: 'off' | 'currentDocument' | 'matchingDocuments' | 'allDocuments') => void;
};

export function SuggestionsControls({
  quickSuggestions,
  suggestOnTriggerCharacters,
  acceptSuggestionOnEnter,
  tabCompletion,
  wordBasedSuggestions,
  onQuickSuggestionsChange,
  onSuggestOnTriggerCharactersChange,
  onAcceptSuggestionOnEnterChange,
  onTabCompletionChange,
  onWordBasedSuggestionsChange,
}: SuggestionsControlsProps) {
  return (
    <div className="control-section">
      <h3>IntelliSense & Autocomplete</h3>

      <div className="dropdown-group">
        <label className="dropdown-label">
          <span className="label-text">Accept Suggestion On Enter</span>
          <select
            value={acceptSuggestionOnEnter}
            onChange={(e) => onAcceptSuggestionOnEnterChange(e.target.value as any)}
            className="dropdown-select"
          >
            {ACCEPT_SUGGESTION_ON_ENTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Tab Completion</span>
          <select
            value={tabCompletion}
            onChange={(e) => onTabCompletionChange(e.target.value as any)}
            className="dropdown-select"
          >
            {TAB_COMPLETION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="dropdown-label">
          <span className="label-text">Word Based Suggestions</span>
          <select
            value={wordBasedSuggestions}
            onChange={(e) => onWordBasedSuggestionsChange(e.target.value as any)}
            className="dropdown-select"
          >
            {WORD_BASED_SUGGESTIONS_OPTIONS.map((option) => (
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
            checked={quickSuggestions}
            onChange={(e) => onQuickSuggestionsChange(e.target.checked)}
          />
          Quick Suggestions
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={suggestOnTriggerCharacters}
            onChange={(e) => onSuggestOnTriggerCharactersChange(e.target.checked)}
          />
          Suggest On Trigger Characters
        </label>
      </div>
    </div>
  );
}

