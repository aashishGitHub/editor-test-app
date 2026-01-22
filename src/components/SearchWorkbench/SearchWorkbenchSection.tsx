import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Editor } from "../editor/editor";
import { useSearchWorkbench } from "../../hooks/useSearchWorkbench";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { IndexDefinitionPanel } from "./IndexDefinitionPanel";
import { RightPanelContainer, RightPanelTab } from "./RightPanelContainer";
import {
  ISearchQueryContext,
  SearchQueryResult,
  QueryStatusProps,
} from "../../services/searchWorkbench/types/QueryContext";
import { editor } from "monaco-editor";
import * as monaco from "monaco-editor";
import { formatQuery } from "./utils/formatQuery";
import {
  QueryMode,
  detectQueryMode,
  convertTextToJsonQuery,
} from "../../services/searchWorkbench";

export const SearchWorkbenchSection = () => {
  const {
    workbenchService,
    queryContext,
    setQueryContext,
    registerEditor,
    getTemplateCategories,
    getGroupedTemplates,
    getTemplateAsString,
  } = useSearchWorkbench();

  const [query, setQuery] = useState<string>(`{
  "query": {
    "match": "search term"
  }
}`);
  const [queryMode, setQueryMode] = useState<QueryMode>("json");
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
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [activeRightTab, setActiveRightTab] =
    useState<RightPanelTab>("definition");
  const [hasExecutedQuery, setHasExecutedQuery] = useState<boolean>(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Memoize template data
  const templateCategories = useMemo(
    () => getTemplateCategories(),
    [getTemplateCategories]
  );
  const groupedTemplates = useMemo(
    () => getGroupedTemplates(),
    [getGroupedTemplates]
  );

  // Handle template selection
  const handleTemplateSelect = useCallback(
    (templateId: string) => {
      if (!templateId) return;

      const templateString = getTemplateAsString(templateId);
      if (templateString) {
        setQuery(templateString);
        setQueryMode("json"); // Language will update via Editor's language prop
        if (editorRef.current) {
          editorRef.current.setValue(templateString);
        }
      }
      setSelectedTemplate("");
    },
    [getTemplateAsString]
  );

  // Update query context when bucket/index changes
  useEffect(() => {
    const context: ISearchQueryContext = {
      bucketName,
      indexName,
    };
    setQueryContext(context);
    // Auto-switch to definition tab when index changes (if no query executed yet or explicit user intent)
    if (!hasExecutedQuery) {
      setActiveRightTab("definition");
    }
  }, [bucketName, indexName, setQueryContext, hasExecutedQuery]);

  // Handle format document (JSON mode only)
  const handleFormat = useCallback(async () => {
    if (queryMode !== "json" || !editorRef.current) return;

    try {
      await formatQuery(editorRef.current);
      const formatted = editorRef.current.getValue();
      setQuery(formatted);
    } catch (err) {
      console.error("Format failed:", err);
    }
  }, [queryMode]);

  // Register editor when it mounts
  const handleEditorMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorRef.current = editorInstance;
      registerEditor(editorInstance);

      // Register format on save (Ctrl+S / Cmd+S)
      editorInstance.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        async () => {
          await handleFormat();
          return false;
        }
      );
    },
    [registerEditor, handleFormat]
  );

  // Handle query change with auto mode detection
  const handleQueryChange = useCallback((value: string | undefined) => {
    const newQuery = value || "";
    setQuery(newQuery);
    setError(undefined);

    // Auto-detect mode
    const detectedMode = detectQueryMode(newQuery);
    setQueryMode(detectedMode);
  }, []);

  // Handle query execution
  const handleRun = useCallback(async () => {
    if (!queryContext) {
      setError("Please set bucket and index name");
      return;
    }

    const currentQuery = editorRef.current?.getValue() || query;

    if (!currentQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    let queryToExecute: string;

    if (queryMode === "text") {
      // Convert plain text to JSON query
      queryToExecute = convertTextToJsonQuery(currentQuery);
    } else {
      // Validate and use JSON directly
      try {
        JSON.parse(currentQuery);
        queryToExecute = currentQuery;
      }       catch (err) {
        // Extract detailed error message with line/column information
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        const positionMatch = errorMessage.match(/position (\d+)/);
        const lineMatch = errorMessage.match(/line (\d+)/);

        let detailedError = `Invalid JSON: ${errorMessage}`;
        
        // If we have position but not line/column, calculate them
        if (positionMatch && !lineMatch) {
          const position = parseInt(positionMatch[1], 10);
          const lines = currentQuery.substring(0, position).split("\n");
          const lineNumber = lines.length;
          const column = lines[lines.length - 1].length + 1;
          detailedError = `Invalid JSON: ${errorMessage} (line ${lineNumber} column ${column})`;
        }

        setError(detailedError);
        return;
      }
    }

    setIsLoading(true);
    setError(undefined);

    try {
      const response = await workbenchService.runSearchQuery(
        queryToExecute,
        queryContext
      );
      setResult(response.result);
      setStatus(response.status);
      setHasExecutedQuery(true);
      // Auto-switch to results tab after query execution
      setActiveRightTab("results");
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
      setHasExecutedQuery(true);
      // Still switch to results to show the error
      setActiveRightTab("results");
    } finally {
      setIsLoading(false);
    }
  }, [query, queryContext, workbenchService, queryMode]);

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
            <div className="editor-header-row">
              <div className="editor-label-with-mode">
                <span className="editor-label">Search Query</span>
                <span
                  className={`query-mode-badge ${queryMode}`}
                  title={
                    queryMode === "json"
                      ? "JSON mode: Structured FTS query detected"
                      : "Text mode: Plain text search (auto-converted on run)"
                  }
                >
                  {queryMode === "json" ? "JSON" : "Text"}
                </span>
              </div>
              <div className="editor-actions">
                <div className="template-dropdown-container">
                  <select
                    className="template-dropdown"
                    value={selectedTemplate}
                    onChange={(e) => {
                      setSelectedTemplate(e.target.value);
                      handleTemplateSelect(e.target.value);
                    }}
                    title="Load a query template"
                  >
                    <option value="" disabled>
                      📋 Templates
                    </option>
                    {templateCategories.map((category) => (
                      <optgroup key={category.id} label={category.label}>
                        {groupedTemplates.get(category.id)?.map((template) => (
                          <option key={template.id} value={template.id}>
                            {template.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                {queryMode === "json" && (
                  <button
                    onClick={handleFormat}
                    className="format-button"
                    type="button"
                    title="Format Document (Ctrl+S / Cmd+S)"
                  >
                    Format
                  </button>
                )}
                <button
                  onClick={handleRun}
                  className="run-button"
                  type="button"
                  disabled={isLoading}
                  title="Run Query"
                >
                  {isLoading ? "Running..." : "▶ Run"}
                </button>
              </div>
            </div>

            <Editor
              editorId="search-workbench-editor"
              language={queryMode === "json" ? "json" : "text"}
              value={query}
              theme="vs-dark"
              onChange={handleQueryChange}
              onMount={handleEditorMount}
              height="400px"
              fontSize={14}
              lineHeight={1.5}
              wordWrap="off"
              options={{
                quickSuggestions: queryMode === "json",
                glyphMargin: false,
                fixedOverflowWidgets: true,
                hover: {
                  enabled: queryMode === "json",
                  delay: 300,
                },
              }}
            />
          </div>
        </div>

        <div className="workbench-right">
          <RightPanelContainer
            activeTab={activeRightTab}
            onTabChange={setActiveRightTab}
            hasResults={hasExecutedQuery || result !== null}
            definitionContent={
              <IndexDefinitionPanel
                bucketName={bucketName}
                indexName={indexName}
              />
            }
            resultsContent={
              <SearchResultsPanel
                result={result}
                status={status}
                error={error}
                isLoading={isLoading}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
