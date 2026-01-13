import * as monaco from 'monaco-editor';

/**
 * Validation rule interface
 */
interface ValidationRule {
  type: string;
  isTopLevel?: boolean;
}

/**
 * Property rules mapping property names to their expected types
 * This is used to validate that properties have the correct type
 */
export const PROPERTY_RULES: Record<string, ValidationRule> = {
  ctl: { type: 'json' },
  highlight: { type: 'json' },
  facets: { type: 'json' },
  knn: { type: 'array' },
  size: { type: 'number' },
  from: { type: 'number' },
  fields: { type: 'array' },
  explain: { type: 'boolean' },
  sort: { type: 'array' },
  includeLocations: { type: 'boolean' },
  score: { type: 'string' },
  search_after: { type: 'array' },
  search_before: { type: 'array' },
  limit: { type: 'number' },
  offset: { type: 'number' },
  collections: { type: 'array' },
  consistency: { type: 'json' },
  vectors: { type: 'json' },
  match_all: { type: 'json' },
  match_none: { type: 'json' },
  must: { type: 'json' },
  must_not: { type: 'json' },
  should: { type: 'json' },
  shape: { type: 'json' },
  field: { type: 'string' },
  vector: { type: 'array' },
  timeout: { type: 'number' },
  k: { type: 'number' },
  style: { type: 'string' },
  results: { type: 'string' },
  level: { type: 'string' },
  match: { type: 'string' },
  analyzer: { type: 'string' },
  operator: { type: 'string' },
  boost: { type: 'number' },
  fuzziness: { type: 'number' },
  prefix_length: { type: 'number' },
  match_phrase: { type: 'string' },
  bool: { type: 'boolean' },
  prefix: { type: 'string' },
  term: { type: 'string' },
  regexp: { type: 'string' },
  terms: { type: 'array' },
  wildcard: { type: 'string' },
  cidr: { type: 'string' },
  inclusive_min: { type: 'boolean' },
  inclusive_max: { type: 'boolean' },
  inclusive_start: { type: 'boolean' },
  inclusive_end: { type: 'boolean' },
  start: { type: 'string' },
  end: { type: 'string' },
  conjuncts: { type: 'array' },
  disjuncts: { type: 'array' },
  relation: { type: 'string' },
  type: { type: 'string' },
  coordinates: { type: 'array' },
  radius: { type: 'string' },
  geometries: { type: 'array' },
  geometry: { type: 'json' },
};

/**
 * Get the position of a property in JSON string
 * Uses regex to find the property key and estimates value position
 */
export function getPropertyPosition(
  jsonString: string,
  propertyKey: string,
  parentPath: string[] = []
): { line: number; column: number; endLine: number; endColumn: number } | null {
  const lines = jsonString.split('\n');
  
  // Build regex to match the property key
  // Escape special regex characters in the key
  const escapedKey = propertyKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keyPattern = new RegExp(`"${escapedKey}"\\s*:`, 'g');
  
  let foundLine = -1;
  let foundColumn = -1;
  let endLine = -1;
  let endColumn = -1;
  
  // Track depth to handle nested objects
  let currentDepth = 0;
  let targetDepth = -1;
  let inTargetPath = parentPath.length === 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Update depth based on braces
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    currentDepth += openBraces - closeBraces;
    
    // Check if we're entering the target parent path
    if (!inTargetPath && parentPath.length > 0) {
      for (const pathKey of parentPath) {
        const pathPattern = new RegExp(`"${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*:`, 'g');
        if (pathPattern.test(line)) {
          inTargetPath = true;
          targetDepth = currentDepth;
          break;
        }
      }
    }
    
    // Check if we've exited the target object
    if (inTargetPath && targetDepth >= 0 && currentDepth < targetDepth) {
      break;
    }
    
    // Look for the property key
    if (inTargetPath) {
      keyPattern.lastIndex = 0; // Reset regex
      const match = keyPattern.exec(line);
      if (match) {
        foundLine = i + 1;
        foundColumn = match.index + 1;
        
        // Find the value start (after colon and whitespace)
        let valueStart = match.index + match[0].length;
        while (valueStart < line.length && /\s/.test(line[valueStart])) {
          valueStart++;
        }
        
        // Estimate value end - look for comma, closing brace, or end of line
        let valueEnd = valueStart;
        let valueLine = i;
        
        if (valueStart < line.length) {
          const valueChar = line[valueStart];
          
          if (valueChar === '{') {
            // Object - find matching brace
            let braceCount = 1;
            let searchPos = valueStart + 1;
            let searchLine = i;
            
            while (braceCount > 0 && searchLine < lines.length) {
              const searchLineText = searchLine === i ? line : lines[searchLine];
              const startPos = searchLine === i ? searchPos : 0;
              
              for (let j = startPos; j < searchLineText.length; j++) {
                if (searchLineText[j] === '{') braceCount++;
                if (searchLineText[j] === '}') braceCount--;
                if (braceCount === 0) {
                  valueEnd = j + 1;
                  valueLine = searchLine;
                  break;
                }
              }
              
              if (braceCount > 0) {
                searchLine++;
                searchPos = 0;
              }
            }
          } else if (valueChar === '[') {
            // Array - find matching bracket
            let bracketCount = 1;
            let searchPos = valueStart + 1;
            let searchLine = i;
            
            while (bracketCount > 0 && searchLine < lines.length) {
              const searchLineText = searchLine === i ? line : lines[searchLine];
              const startPos = searchLine === i ? searchPos : 0;
              
              for (let j = startPos; j < searchLineText.length; j++) {
                if (searchLineText[j] === '[') bracketCount++;
                if (searchLineText[j] === ']') bracketCount--;
                if (bracketCount === 0) {
                  valueEnd = j + 1;
                  valueLine = searchLine;
                  break;
                }
              }
              
              if (bracketCount > 0) {
                searchLine++;
                searchPos = 0;
              }
            }
          } else if (valueChar === '"') {
            // String - find closing quote
            valueEnd = valueStart + 1;
            while (valueEnd < line.length) {
              if (line[valueEnd] === '"' && line[valueEnd - 1] !== '\\') {
                valueEnd++;
                break;
              }
              valueEnd++;
            }
          } else {
            // Primitive - find comma, closing brace, or end of line
            const remaining = line.substring(valueStart);
            const commaIndex = remaining.search(/[,}\]]/);
            if (commaIndex > 0) {
              valueEnd = valueStart + commaIndex;
            } else {
              valueEnd = line.length;
            }
          }
        } else {
          // Value starts on next line - estimate
          valueEnd = 1;
          valueLine = i + 1;
        }
        
        endLine = valueLine + 1;
        endColumn = Math.max(1, valueEnd);
        
        return {
          line: foundLine,
          column: foundColumn,
          endLine,
          endColumn,
        };
      }
    }
  }
  
  return null;
}

/**
 * Validate property type against PROPERTY_RULES
 */
export function validatePropertyType(
  propertyKey: string,
  propertyValue: any,
  jsonString: string,
  parentPath: string[] = []
): monaco.editor.IMarkerData | null {
  // Check if property has a rule
  if (!(propertyKey in PROPERTY_RULES)) {
    return null;
  }

  const rule = PROPERTY_RULES[propertyKey];
  const expectedType = rule.type;
  const actualType = getValueType(propertyValue);

  // Type mismatch
  if (actualType !== expectedType) {
    const position = getPropertyPosition(jsonString, propertyKey, parentPath);
    
    if (position) {
      return {
        severity: monaco.MarkerSeverity.Error,
        message: `Expected ${expectedType} for property '${propertyKey}', found ${actualType}`,
        startLineNumber: position.line,
        startColumn: position.column,
        endLineNumber: position.endLine,
        endColumn: position.endColumn,
      };
    } else {
      // Fallback if position not found
      return {
        severity: monaco.MarkerSeverity.Error,
        message: `Expected ${expectedType} for property '${propertyKey}', found ${actualType}`,
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      };
    }
  }

  return null;
}

/**
 * Get the type of a value as a string
 */
function getValueType(value: any): string {
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'object') {
    return 'json';
  }
  return typeof value;
}

/**
 * Recursively validate all properties in an object against PROPERTY_RULES
 */
export function validateObjectProperties(
  obj: any,
  jsonString: string,
  parentPath: string[] = []
): monaco.editor.IMarkerData[] {
  const markers: monaco.editor.IMarkerData[] = [];

  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return markers;
  }

  // Validate each property
  for (const [key, value] of Object.entries(obj)) {
    // Validate property type
    const typeMarker = validatePropertyType(key, value, jsonString, parentPath);
    if (typeMarker) {
      markers.push(typeMarker);
    }

    // Recursively validate nested objects
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedMarkers = validateObjectProperties(
        value,
        jsonString,
        [...parentPath, key]
      );
      markers.push(...nestedMarkers);
    }

    // Recursively validate array items that are objects
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          const nestedMarkers = validateObjectProperties(
            item,
            jsonString,
            [...parentPath, key, `[${index}]`]
          );
          markers.push(...nestedMarkers);
        }
      });
    }
  }

  return markers;
}

