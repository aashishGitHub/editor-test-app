import { editor } from "monaco-editor";

/**
 * Format JSON string using native JSON.parse/stringify
 * Collapses vector arrays to a single line for readability
 */
function formatJsonString(jsonString: string): string | null {
  try {
    const parsed = JSON.parse(jsonString);
    const formatted = JSON.stringify(parsed, null, 2);
    // Collapse vector arrays to single line (keeps data, removes newlines/extra spaces)
    const vectorPattern = /"vector":\s*\[\s*([\s\S]*?)\s*\]/g;
    return formatted.replace(vectorPattern, (_match, content) => {
      // Remove newlines and extra spaces, keep comma-separated values
      const collapsed = content.replace(/\s+/g, ' ').trim();
      return `"vector": [${collapsed}]`;
    });
  } catch {
    return null;
  }
}

/**
 * Format JSON query in the editor
 * Uses native JSON formatting since Monaco workers are not configured
 * @param editorInstance - Monaco editor instance
 * @returns Formatted query string or null if formatting failed
 */
export async function formatQuery(
  editorInstance: editor.IStandaloneCodeEditor
): Promise<string | null> {
  try {
    const currentValue = editorInstance.getValue();
    const formatted = formatJsonString(currentValue);

    if (formatted) {
      editorInstance.setValue(formatted);
      return formatted;
    }

    return null;
  } catch (error) {
    console.error("Format failed:", error);
    return null;
  }
}
