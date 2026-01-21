import * as monaco from 'monaco-editor';
import { validateObjectProperties } from "./validationUtil";
import { SearchWorkbenchConfigService } from "../config/SearchWorkbenchConfigService";

/**
 * Validation Service - Validates search query JSON structure
 * Simplified validation for POC demonstration
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  markers?: monaco.editor.IMarkerData[];
}

export class ValidationService {
  private configService?: SearchWorkbenchConfigService;

  constructor(configService?: SearchWorkbenchConfigService) {
    this.configService = configService;
  }

  /**
   * Validates a search query JSON string and returns Monaco markers for inline errors
   */
  validateSearchQuery(query: string): ValidationResult {
    const markers: monaco.editor.IMarkerData[] = [];

    // Check if query is empty
    if (!query || query.trim().length === 0) {
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: "Query cannot be empty",
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      });
      return {
        valid: false,
        error: "Query cannot be empty",
        markers,
      };
    }

    // Validate JSON syntax
    let parsedQuery;
    try {
      parsedQuery = JSON.parse(query);
    } catch (error) {
      // Parse JSON error to extract line/column information
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const positionMatch = errorMessage.match(/position (\d+)/);
      const lineMatch = errorMessage.match(/line (\d+)/);
      const columnMatch = errorMessage.match(/column (\d+)/);

      let lineNumber = 1;
      let column = 1;

      if (lineMatch) {
        lineNumber = parseInt(lineMatch[1], 10);
      } else if (positionMatch) {
        // Calculate line and column from position
        const position = parseInt(positionMatch[1], 10);
        const lines = query.substring(0, position).split("\n");
        lineNumber = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      if (columnMatch) {
        column = parseInt(columnMatch[1], 10);
      }

      // Get the line content to determine the end column for better highlighting
      const queryLines = query.split("\n");
      const errorLine = queryLines[lineNumber - 1] || "";
      const endColumn = Math.max(column + 1, errorLine.length + 1);

      // Create detailed error message with line and column info
      const detailedMessage = `Invalid JSON: ${errorMessage}${
        !lineMatch ? ` (line ${lineNumber}, column ${column})` : ""
      }`;

      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: detailedMessage,
        startLineNumber: lineNumber,
        startColumn: 1, // Start from beginning of line for better visibility
        endLineNumber: lineNumber,
        endColumn: endColumn,
      });

      return {
        valid: false,
        error: detailedMessage,
        markers,
      };
    }

    // Check if it's an object
    if (
      typeof parsedQuery !== "object" ||
      parsedQuery === null ||
      Array.isArray(parsedQuery)
    ) {
      const lines = query.split("\n");
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: "Query must be a JSON object",
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: Math.min(2, lines.length),
        endColumn: lines[0]?.length || 1,
      });
      return {
        valid: false,
        error: "Query must be a JSON object",
        markers,
      };
    }

    // Check for required 'query' field
    if (!parsedQuery.query) {
      const queryLine = this.findPropertyLine(query, "query");
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: 'Query must contain a "query" field',
        startLineNumber: queryLine.line,
        startColumn: queryLine.column,
        endLineNumber: queryLine.line,
        endColumn: queryLine.column + 10,
      });
      return {
        valid: false,
        error: 'Query must contain a "query" field',
        markers,
      };
    }

    // Check if query.query exists (basic structure check)
    if (typeof parsedQuery.query === "object" && parsedQuery.query !== null) {
      if (
        !parsedQuery.query.query &&
        !parsedQuery.query.match &&
        !parsedQuery.query.match_all
      ) {
        const nestedQueryLine = this.findPropertyLine(query, "query", true);
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: "Query.query should contain a query string or match clause",
          startLineNumber: nestedQueryLine.line,
          startColumn: nestedQueryLine.column,
          endLineNumber: nestedQueryLine.line,
          endColumn: nestedQueryLine.column + 10,
        });
      }
    }

    // Validate properties against PROPERTY_RULES
    const propertyMarkers = validateObjectProperties(parsedQuery, query);
    markers.push(...propertyMarkers);

    // Limit markers based on config
    const maxErrors =
      this.configService?.getConfig().advanced.validation.maxErrors || 50;
    const limitedMarkers = markers.slice(0, maxErrors);

    return {
      valid: limitedMarkers.length === 0,
      markers: limitedMarkers.length > 0 ? limitedMarkers : undefined,
    };
  }

  /**
   * Find the line and column of a property in JSON string
   */
  private findPropertyLine(
    json: string,
    property: string,
    nested: boolean = false
  ): { line: number; column: number } {
    const lines = json.split("\n");

    if (nested) {
      // Find nested query property
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('"query"') && line.includes(":")) {
          // Check if this is inside a nested query object
          const beforeLine = lines.slice(0, i + 1).join("\n");
          const openBraces = (beforeLine.match(/\{/g) || []).length;
          const closeBraces = (beforeLine.match(/\}/g) || []).length;
          if (openBraces > closeBraces + 1) {
            // This is nested
            const colonIndex = line.indexOf(":");
            return {
              line: i + 1,
              column: colonIndex + 1,
            };
          }
        }
      }
    }

    // Find top-level property
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes(`"${property}"`)) {
        const colonIndex = line.indexOf(":");
        return {
          line: i + 1,
          column: colonIndex > -1 ? colonIndex + 1 : 1,
        };
      }
    }

    return { line: 1, column: 1 };
  }
}

