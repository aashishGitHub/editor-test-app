import { useEffect } from 'react';
import { Editor } from './editor';
import { useSearchWorkbench } from '../../hooks/useSearchWorkbench';
import { editor as editorNamespace } from 'monaco-editor';
import { ISearchQueryContext } from '../../services/searchWorkbench';

import { CSSDimension } from './editor.types';

interface SearchWorkbenchEditorProps {
  editorId?: string;
  value?: string;
  theme?: 'vs-dark' | 'vs-light';
  onRun?: () => void;
  queryContext?: ISearchQueryContext;
  onChange?: (value: string | undefined) => void;
  height?: CSSDimension;
}

export function SearchWorkbenchEditor({
  editorId = 'search-workbench-editor',
  value,
  theme = 'vs-dark',
  onRun,
  queryContext,
  onChange,
  height = '400px' as CSSDimension,
}: SearchWorkbenchEditorProps) {
  const { setQueryContext, getDefaultQuery, registerEditor } = useSearchWorkbench();

  useEffect(() => {
    if (queryContext) {
      setQueryContext(queryContext);
    }
  }, [queryContext, setQueryContext]);

  const onEditorMount = (editor: editorNamespace.IStandaloneCodeEditor) => {
    registerEditor(editor);
    
    // Set query context after editor is mounted
    if (queryContext) {
      setQueryContext(queryContext);
    }
  };

  const defaultValue = value !== undefined ? value : getDefaultQuery();

  return (
    <div>
      <Editor
        editorId={editorId}
        language="json"
        value={defaultValue}
        theme={theme}
        onRun={onRun}
        onChange={onChange}
        height={height}
        options={{
          wordWrap: "off",
          minimap: { enabled: false },
        }}
        onMount={onEditorMount}
      />
    </div>
  );
}

