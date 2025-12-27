interface EventsPanelProps {
  events: string[];
  onClear: () => void;
}

export const EventsPanel = ({ events, onClear }: EventsPanelProps) => {
  if (events.length === 0) return null;

  return (
    <div className="events-container">
      <div className="events-header">
        <h3>Paste Events</h3>
        <button className="clear-btn" onClick={onClear}>Clear</button>
      </div>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <span className="event-icon">📋</span>
            <span>{event}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface LogsPanelProps {
  logs: string[];
  onClear: () => void;
}

export const LogsPanel = ({ logs, onClear }: LogsPanelProps) => {
  if (logs.length === 0) return null;

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h3>Activity Log</h3>
        <button className="clear-btn" onClick={onClear}>Clear</button>
      </div>
      <div className="logs-list">
        {logs.map((log, index) => (
          <div key={index} className="log-item">{log}</div>
        ))}
      </div>
    </div>
  );
};

interface OutputPanelProps {
  output: string;
  onClear: () => void;
}

export const OutputPanel = ({ output, onClear }: OutputPanelProps) => {
  if (!output) return null;

  return (
    <div className="output-container">
      <div className="output-header">
        <h2>Output</h2>
        <button className="clear-btn" onClick={onClear}>Clear</button>
      </div>
      <pre className="output-content">{output}</pre>
    </div>
  );
};



