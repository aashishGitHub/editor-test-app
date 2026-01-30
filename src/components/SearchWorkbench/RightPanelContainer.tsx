import { ReactNode } from 'react';

export type RightPanelTab = 'definition' | 'results';

interface RightPanelContainerProps {
  activeTab: RightPanelTab;
  onTabChange: (tab: RightPanelTab) => void;
  hasResults: boolean;
  definitionContent: ReactNode;
  resultsContent: ReactNode;
}

export const RightPanelContainer = ({
  activeTab,
  onTabChange,
  hasResults,
  definitionContent,
  resultsContent,
}: RightPanelContainerProps) => {
  return (
    <div className="right-panel-container">
      {/* Tab Header */}
      <div className="panel-tabs-header">
        <button
          className={`panel-tab ${activeTab === 'definition' ? 'active' : ''}`}
          onClick={() => onTabChange('definition')}
          type="button"
        >
          <span className="tab-icon">📋</span>
          <span className="tab-label">Index Definition</span>
        </button>
        <button
          className={`panel-tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => onTabChange('results')}
          type="button"
        >
          <span className="tab-icon">📊</span>
          <span className="tab-label">Query Results</span>
          {hasResults && <span className="results-indicator">●</span>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="panel-tab-content">
        {activeTab === 'definition' ? definitionContent : resultsContent}
      </div>
    </div>
  );
};
