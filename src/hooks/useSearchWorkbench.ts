import { useEffect, useRef, useState, useCallback } from 'react';
import { SearchWorkbenchService, ISearchQueryContext } from '../services/searchWorkbench';
import { editor } from 'monaco-editor';

export function useSearchWorkbench() {
  const [workbenchService] = useState(() => new SearchWorkbenchService());
  const [queryContext, setQueryContextState] = useState<ISearchQueryContext | null>(null);
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
      }
    }
  }, [workbenchService]);

  const getDefaultQuery = useCallback(() => {
    return workbenchService.getDefaultQueryTemplate();
  }, [workbenchService]);

  return {
    workbenchService,
    queryContext,
    setQueryContext,
    getDefaultQuery,
    registerEditor,
  };
}

