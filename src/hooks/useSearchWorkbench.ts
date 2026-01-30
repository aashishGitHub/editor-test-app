import { useEffect, useRef, useState, useCallback } from 'react';
import { SearchWorkbenchService, ISearchQueryContext, SearchQueryResult, QueryStatusProps } from '../services/searchWorkbench';
import { editor } from 'monaco-editor';

export function useSearchWorkbench() {
  const [workbenchService] = useState(() => new SearchWorkbenchService());
  const [queryContext, setQueryContextState] = useState<ISearchQueryContext | null>(null);
  const [queryResult, setQueryResult] = useState<SearchQueryResult | null>(null);
  const [queryStatus, setQueryStatus] = useState<QueryStatusProps>({
    queryStatus: 'fatal',
    rtt: '-',
    elapsed: '-',
    numDocs: '-',
    size: '-',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isRegisteredRef = useRef(false);

  const registerEditor = useCallback((editorInstance: editor.IStandaloneCodeEditor) => {
    if (!isRegisteredRef.current) {
      editorInstanceRef.current = editorInstance;
      workbenchService.registerEditor(editorInstance);
      isRegisteredRef.current = true;
    }
  }, [workbenchService]);

  useEffect(() => {
    return () => {
      if (isRegisteredRef.current) {
        workbenchService.dispose();
        isRegisteredRef.current = false;
        editorInstanceRef.current = null;
      }
    };
  }, [workbenchService]);

  const setQueryContext = useCallback((context: ISearchQueryContext) => {
    if (editorInstanceRef.current) {
      const model = editorInstanceRef.current.getModel();
      if (model) {
        workbenchService.setQueryContext(model.uri.toString(), context);
        setQueryContextState(context);
      } else {
        // If no model yet, just set the context state
        setQueryContextState(context);
      }
    } else {
      // If no editor yet, just set the context state
      setQueryContextState(context);
    }
  }, [workbenchService]);

  const getDefaultQuery = useCallback(() => {
    return workbenchService.getDefaultQueryTemplate();
  }, [workbenchService]);

  const getQueryTemplates = useCallback(() => {
    return workbenchService.getQueryTemplates();
  }, [workbenchService]);

  const getTemplateCategories = useCallback(() => {
    return workbenchService.getQueryTemplateCategories();
  }, [workbenchService]);

  const getTemplateAsString = useCallback(
    (id: string) => {
      return workbenchService.getQueryTemplateAsString(id);
    },
    [workbenchService]
  );

  const getGroupedTemplates = useCallback(() => {
    return workbenchService.getGroupedQueryTemplates();
  }, [workbenchService]);

  const runQuery = useCallback(
    async (query: string, context: ISearchQueryContext) => {
      setIsLoading(true);
      try {
        const response = await workbenchService.runSearchQuery(query, context);
        setQueryResult(response.result);
        setQueryStatus(response.status);
        return response;
      } finally {
        setIsLoading(false);
      }
    },
    [workbenchService]
  );

  return {
    workbenchService,
    queryContext,
    queryResult,
    queryStatus,
    isLoading,
    setQueryContext,
    getDefaultQuery,
    registerEditor,
    runQuery,
    // Template methods
    getQueryTemplates,
    getTemplateCategories,
    getTemplateAsString,
    getGroupedTemplates,
  };
}

