import * as monaco from 'monaco-editor';
import { ValidationService, ValidationResult } from './ValidationService';

/**
 * Service to manage Monaco editor markers for validation errors
 */
export class EditorValidationService {
  private validationService: ValidationService;

  constructor() {
    this.validationService = new ValidationService();
  }

  /**
   * Validate query and set markers in the editor
   */
  validateAndSetMarkers(
    editor: monaco.editor.IStandaloneCodeEditor,
    query: string
  ): ValidationResult {
    const model = editor.getModel();
    if (!model) {
      return { valid: true };
    }

    // Clear existing markers
    this.clearMarkers(model);

    // Validate query
    const result = this.validationService.validateSearchQuery(query);

    // Set markers if validation failed
    if (result.markers && result.markers.length > 0) {
      monaco.editor.setModelMarkers(
        model,
        "search-query-validation",
        result.markers
      );
    }

    return result;
  }

  /**
   * Clear all validation markers
   */
  clearMarkers(model: monaco.editor.ITextModel): void {
    monaco.editor.setModelMarkers(model, "search-query-validation", []);
  }
}
