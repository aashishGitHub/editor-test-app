/**
 * Query Mode Detection Utility
 * 
 * Automatically detects whether a query is JSON or plain text,
 * enabling seamless support for both query formats.
 */

export type QueryMode = 'json' | 'text';

/**
 * Detect if the query is JSON or plain text
 * 
 * Rules:
 * - If content starts with { or [, it's treated as JSON
 * - Everything else is treated as plain text search
 */
export function detectQueryMode(query: string): QueryMode {
  const trimmed = query.trim();
  
  // Empty or whitespace-only is treated as text
  if (!trimmed) {
    return 'text';
  }
  
  // If it starts with { or [, it's likely JSON
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return 'json';
  }
  
  return 'text';
}

/**
 * Convert plain text query to JSON format for execution
 * 
 * Wraps the text in the standard Couchbase FTS query structure:
 * { "query": { "query": "user text here" }, "fields": ["*"] }
 */
export function convertTextToJsonQuery(textQuery: string): string {
  return JSON.stringify({
    query: {
      query: textQuery.trim()
    },
    fields: ["*"]
  }, null, 2);
}

/**
 * Check if content is valid JSON
 */
export function isValidJson(content: string): boolean {
  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get a user-friendly label for the query mode
 */
export function getQueryModeLabel(mode: QueryMode): string {
  return mode === 'json' ? 'JSON Query' : 'Text Search';
}

/**
 * Get default content for each mode
 */
export function getDefaultContent(mode: QueryMode): string {
  if (mode === 'json') {
    return JSON.stringify({
      query: {
        query: "your_query_here"
      },
      fields: ["*"]
    }, null, 2);
  }
  return 'Enter your search text here...';
}
