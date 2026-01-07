import { useState, useCallback, useEffect, useRef } from 'react';
import { Editor } from './editor/editor';
import { useSearchWorkbench } from '../hooks/useSearchWorkbench';
import { SearchResultsPanel } from './SearchResultsPanel';
import { ISearchQueryContext, SearchQueryResult, QueryStatusProps } from '../services/searchWorkbench/types/QueryContext';
import { editor } from 'monaco-editor';
import { EditorValidationService } from "../services/searchWorkbench/validation/EditorValidationService";

export const SearchWorkbenchSection = () => {
  const {
    workbenchService,
    queryContext,
    setQueryContext,
    getDefaultQuery,
    registerEditor,
  } = useSearchWorkbench();

  const [query, setQuery] = useState<string>(getDefaultQuery());
  const [bucketName, setBucketName] = useState<string>("travel-sample");
  const [indexName, setIndexName] = useState<string>("travel-sample-index");
  const [result, setResult] = useState<SearchQueryResult | null>(null);
  const [status, setStatus] = useState<QueryStatusProps>({
    queryStatus: "fatal",
    rtt: "-",
    elapsed: "-",
    numDocs: "-",
    size: "-",
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const validationServiceRef = useRef<EditorValidationService | null>(null);

  // Update query context when bucket/index changes
  useEffect(() => {
    const context: ISearchQueryContext = {
      bucketName,
      indexName,
    };
    setQueryContext(context);
  }, [bucketName, indexName, setQueryContext]);

  // Initialize validation service
  useEffect(() => {
    validationServiceRef.current = new EditorValidationService();
    return () => {
      // Cleanup markers on unmount
      if (editorRef.current) {
        const model = editorRef.current.getModel();
        if (model && validationServiceRef.current) {
          validationServiceRef.current.clearMarkers(model);
        }
      }
    };
  }, []);

  // Register editor when it mounts
  const handleEditorMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorRef.current = editorInstance;
      registerEditor(editorInstance);

      // Validate initial query
      if (validationServiceRef.current) {
        validationServiceRef.current.validateAndSetMarkers(
          editorInstance,
          query
        );
      }
    },
    [registerEditor, query]
  );

  // Handle query change with real-time validation
  const handleQueryChange = useCallback((value: string | undefined) => {
    const newQuery = value || "";
    setQuery(newQuery);

    // Clear results error when query changes
    setError(undefined);

    // Validate in real-time and set markers
    if (editorRef.current && validationServiceRef.current) {
      validationServiceRef.current.validateAndSetMarkers(
        editorRef.current,
        newQuery
      );
    }
  }, []);

  // Handle query execution
  const handleRun = useCallback(async () => {
    if (!queryContext) {
      setError("Please set bucket and index name");
      return;
    }

    // Validate before running
    if (editorRef.current && validationServiceRef.current) {
      const validation = validationServiceRef.current.validateAndSetMarkers(
        editorRef.current,
        query
      );
      if (!validation.valid) {
        setError(validation.error || "Query validation failed");
        return;
      }
    }

    setIsLoading(true);
    setError(undefined);

    try {
      const response = await workbenchService.runSearchQuery(
        query,
        queryContext
      );
      setResult(response.result);
      setStatus(response.status);
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setStatus({
        queryStatus: "fatal",
        rtt: "-",
        elapsed: "-",
        numDocs: "-",
        size: "-",
      });
    } finally {
      setIsLoading(false);
    }
  }, [query, queryContext, workbenchService]);

  return (
    <div className="search-workbench-section">
      <div className="workbench-header">
        <h2>Search Workbench</h2>
        <p>Write and execute Couchbase Full-Text Search queries</p>
      </div>

      <div className="workbench-content">
        <div className="workbench-left">
          <div className="context-selector">
            <div className="context-item">
              <label htmlFor="bucket-select">Bucket:</label>
              <input
                id="bucket-select"
                type="text"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
                placeholder="travel-sample"
                className="context-input"
              />
            </div>
            <div className="context-item">
              <label htmlFor="index-select">Index:</label>
              <input
                id="index-select"
                type="text"
                value={indexName}
                onChange={(e) => setIndexName(e.target.value)}
                placeholder="travel-sample-index"
                className="context-input"
              />
            </div>
          </div>

          <div className="query-editor-container">
            <div className="editor-label">Search Query (JSON)</div>
            <Editor
              editorId="search-workbench-editor"
              language="json"
              value={query}
              theme="vs-dark"
              onRun={handleRun}
              onChange={handleQueryChange}
              onMount={handleEditorMount}
              height="400px"
              fontSize={14}
              lineHeight={1.5}
              wordWrap="on"
              options={{
                quickSuggestions: true,
                glyphMargin: true, // Enable glyph margin for error indicators
                fixedOverflowWidgets: true, // Keeps widgets within editor bounds
                hover: {
                  enabled: true,
                  delay: 300,
                },
              }}
            />
          </div>
        </div>

        <div className="workbench-right">
          <SearchResultsPanel
            result={result}
            status={status}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

