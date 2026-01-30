import { SearchQueryResult, QueryStatusProps } from '../../services/searchWorkbench/types/QueryContext';

interface SearchResultsPanelProps {
  result: SearchQueryResult | null;
  status: QueryStatusProps;
  error?: string;
  isLoading: boolean;
}

export const SearchResultsPanel = ({ result, status, error, isLoading }: SearchResultsPanelProps) => {
  const getStatusColor = () => {
    switch (status.queryStatus) {
      case 'success':
        return '#10b981'; // green
      case 'fatal':
        return '#ef4444'; // red
      case 'running':
        return '#3b82f6'; // blue
      default:
        return '#6b7280'; // gray
    }
  };

  const getStatusText = () => {
    switch (status.queryStatus) {
      case 'success':
        return 'Success';
      case 'fatal':
        return 'Error';
      case 'running':
        return 'Running...';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="search-results-panel">
        <div className="results-header">
          <h3>Query Results</h3>
          <div className="status-badge" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
            Running...
          </div>
        </div>
        <div className="results-content loading">
          <p>Executing query...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-panel">
      <div className="results-header">
        <h3>Query Results</h3>
        <div
          className="status-badge"
          style={{
            backgroundColor: getStatusColor(),
            color: 'white',
          }}
        >
          {getStatusText()}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="metrics-container">
        <div className="metric-item">
          <span className="metric-label">RTT:</span>
          <span className="metric-value">{status.rtt}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Elapsed:</span>
          <span className="metric-value">{status.elapsed}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Documents:</span>
          <span className="metric-value">{status.numDocs}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Size:</span>
          <span className="metric-value">{status.size}</span>
        </div>
      </div>

      {result && result.hits && result.hits.length > 0 ? (
        <div className="results-content">
          <div className="results-summary">
            <strong>Total Hits: {result.total_hits}</strong>
          </div>
          <div className="results-list">
            {result.hits.slice(0, 10).map((hit: any, index: number) => (
              <div key={index} className="result-item">
                <div className="result-header">
                  <span className="result-id">ID: {hit.id}</span>
                  {hit.score && <span className="result-score">Score: {hit.score}</span>}
                </div>
                {hit.fields && (
                  <div className="result-fields">
                    <pre>{JSON.stringify(hit.fields, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))}
            {result.hits.length > 10 && (
              <div className="results-more">
                <em>... and {result.hits.length - 10} more results</em>
              </div>
            )}
          </div>
        </div>
      ) : result ? (
        <div className="results-content">
          <p>No results found.</p>
        </div>
      ) : (
        <div className="results-content empty">
          <p>No query executed yet. Write a query and click Run to see results.</p>
        </div>
      )}
    </div>
  );
};

