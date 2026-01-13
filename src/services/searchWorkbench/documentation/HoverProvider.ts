import * as monaco from "monaco-editor";
import * as jsonc from "jsonc-parser";
import { SearchWorkbenchConfigService } from "../config/SearchWorkbenchConfigService";

/**
 * Hover Provider for Search Query JSON
 * Provides documentation when hovering over keys in the JSON query
 * Matches the structure of VSCode-Couchbase documentationProvider.ts
 */
export class SearchQueryHoverProvider implements monaco.languages.HoverProvider {
  private configService?: SearchWorkbenchConfigService;
  private markdownCache: Map<string, string> = new Map();

  constructor(configService?: SearchWorkbenchConfigService) {
    this.configService = configService;
  }

  provideHover(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    _token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.Hover> {
    // Check if hover provider is enabled
    if (!this.configService?.isHoverProviderEnabled()) {
      return null;
    }

    const text = model.getValue();
    const offset = model.getOffsetAt(position);
    const rootNode = jsonc.parseTree(text);

    if (!rootNode) {
      return null;
    }

    let node = jsonc.findNodeAtOffset(rootNode, offset);
    if (!node) {
      return null;
    }

    // Navigate to the property node (parent of the string node)
    node = node.parent;

    // Check if we're on a property key
    if (
      node &&
      node.type === "property" &&
      node.children &&
      node.children[0].type === "string"
    ) {
      const key = node.children[0].value;

      // Get parent type for context-aware documentation
      const parentNode = jsonc.findNodeAtOffset(
        rootNode,
        node.parent?.offset || 0
      );
      const type = this.getParentType(parentNode);

      // Calculate the range for the hover
      const keyNode = node.children[0];
      const startPos = model.getPositionAt(keyNode.offset);
      const endPos = model.getPositionAt(keyNode.offset + keyNode.length);

      const range = {
        startLineNumber: startPos.lineNumber,
        startColumn: startPos.column,
        endLineNumber: endPos.lineNumber,
        endColumn: endPos.column,
      };

      // If markdown docs are enabled, load asynchronously
      if (this.configService?.getConfig().features.documentation.markdownDocs) {
        return this.loadDocumentationAsync(key, type, range);
      }

      // Otherwise, use inline documentation synchronously
      const documentation = this.getDocumentationForKey(key, type);
      if (documentation) {
        return {
          range,
          contents: [documentation],
        };
      }
    }

    return null;
  }

  /**
   * Get the parent type of a node (for context-aware documentation)
   * Matches VSCode-Couchbase implementation
   */
  private getParentType(node: jsonc.Node | undefined): string | null {
    if (!node || !node.parent) {
      return null;
    }
    if (node.parent.type === "property") {
      const parentKeyNode = node.parent.children?.[0];
      if (parentKeyNode && parentKeyNode.type === "string") {
        return parentKeyNode.value;
      }
    }
    return null;
  }

  /**
   * Get documentation for a key (synchronous version for inline docs)
   * Used when markdown docs are disabled
   */
  private getDocumentationForKey(
    key: string,
    type: string | null
  ): monaco.IMarkdownString | null {
    // Return inline documentation as fallback
    return this.getInlineDocumentation(key, type);
  }

  /**
   * Load documentation asynchronously (for markdown files)
   */
  private async loadDocumentationAsync(
    key: string,
    type: string | null,
    range: monaco.IRange
  ): Promise<monaco.languages.Hover | null> {
    // Get file path
    const filePath = this.getDocumentationFilePath(key, type);
    if (!filePath) {
      // Fallback to inline docs
      const inlineDoc = this.getInlineDocumentation(key, type);
      if (inlineDoc) {
        return {
          range,
          contents: [inlineDoc],
        };
      }
      return null;
    }

    // Try to load markdown file
    const markdownDoc = await this.loadMarkdownFile(filePath);
    if (markdownDoc) {
      return {
        range,
        contents: [markdownDoc],
      };
    }

    // Fallback to inline docs if markdown fails
    const inlineDoc = this.getInlineDocumentation(key, type);
    if (inlineDoc) {
      return {
        range,
        contents: [inlineDoc],
      };
    }

    return null;
  }

  /**
   * Get the file path for documentation (matches VSCode-Couchbase logic)
   */
  private getDocumentationFilePath(
    key: string,
    type: string | null
  ): string | null {
    let filePath: string;

    switch (key) {
      case "query":
        filePath =
          type === null
            ? "/docs/search/query.md"
            : "/docs/search/query_string.md";
        break;
      case "must":
        filePath = "/docs/search/must.md";
        break;
      case "must_not":
        filePath = "/docs/search/must_not.md";
        break;
      case "should":
        filePath = "/docs/search/should.md";
        break;
      case "conjuncts":
        filePath = "/docs/search/conjuncts.md";
        break;
      case "disjuncts":
        filePath = "/docs/search/disjuncts.md";
        break;
      case "match":
        filePath = "/docs/search/match.md";
        break;
      case "match_phrase":
        filePath = "/docs/search/match_phrase.md";
        break;
      case "bool":
        filePath = "/docs/search/bool.md";
        break;
      case "prefix":
        filePath = "/docs/search/prefix.md";
        break;
      case "regexp":
        filePath = "/docs/search/regexp.md";
        break;
      case "term":
        filePath = "/docs/search/term.md";
        break;
      case "terms":
        filePath = "/docs/search/terms.md";
        break;
      case "wildcard":
        filePath = "/docs/search/wildcard.md";
        break;
      case "min":
        filePath = "/docs/search/min.md";
        break;
      case "max":
        filePath = "/docs/search/max.md";
        break;
      case "inclusive_max":
        filePath = "/docs/search/inclusive_max.md";
        break;
      case "inclusive_min":
        filePath = "/docs/search/inclusive_min.md";
        break;
      case "start":
        filePath = "/docs/search/start.md";
        break;
      case "end":
        filePath = "/docs/search/end.md";
        break;
      case "inclusive_start":
        filePath = "/docs/search/inclusive_start.md";
        break;
      case "inclusive_end":
        filePath = "/docs/search/inclusive_end.md";
        break;
      case "cidr":
        filePath = "/docs/search/cidr.md";
        break;
      case "knn":
        filePath = "/docs/search/knn.md";
        break;
      case "k":
        filePath = "/docs/search/k.md";
        break;
      case "vector":
        filePath = "/docs/search/vector.md";
        break;
      case "distance":
        filePath = "/docs/search/distance.md";
        break;
      case "location":
        filePath = "/docs/search/location.md";
        break;
      case "lat":
        filePath = "/docs/search/lat.md";
        break;
      case "lon":
        filePath = "/docs/search/lon.md";
        break;
      case "top_left":
        filePath = "/docs/search/top_left.md";
        break;
      case "bottom_right":
        filePath = "/docs/search/bottom_right.md";
        break;
      case "polygon_points":
        filePath = "/docs/search/polygon_points.md";
        break;
      case "geometry":
        filePath = "/docs/search/geometry.md";
        break;
      case "shape":
        filePath = "/docs/search/shape.md";
        break;
      case "type":
        filePath =
          type === "shape"
            ? "/docs/search/type_shape.md"
            : "/docs/search/type_facet.md";
        break;
      case "coordinates":
        filePath = "/docs/search/coordinates.md";
        break;
      case "relation":
        filePath = "/docs/search/relation.md";
        break;
      case "geometries":
        filePath = "/docs/search/geometries.md";
        break;
      case "radius":
        filePath = "/docs/search/radius.md";
        break;
      case "match_all":
        filePath = "/docs/search/match_all.md";
        break;
      case "match_none":
        filePath = "/docs/search/match_none.md";
        break;
      case "analyzer":
        filePath = "/docs/search/analyzer.md";
        break;
      case "boost":
        filePath = "/docs/search/boost.md";
        break;
      case "field":
        filePath = "/docs/search/field.md";
        break;
      case "fuzziness":
        filePath = "/docs/search/fuzziness.md";
        break;
      case "operator":
        filePath = "/docs/search/operator.md";
        break;
      case "prefix_length":
        filePath = "/docs/search/prefix_length.md";
        break;
      case "size":
      case "limit":
        filePath = "/docs/search/limit.md";
        break;
      case "from":
      case "offset":
        filePath = "/docs/search/offset.md";
        break;
      case "fields":
        filePath = "/docs/search/fields.md";
        break;
      case "facets":
        filePath = "/docs/search/facets.md";
        break;
      case "explain":
        filePath = "/docs/search/explain.md";
        break;
      case "sort":
        filePath = "/docs/search/sort.md";
        break;
      case "includeLocations":
        filePath = "/docs/search/includeLocations.md";
        break;
      case "score":
        filePath = "/docs/search/score.md";
        break;
      case "search_after":
        filePath = "/docs/search/search_after.md";
        break;
      case "search_before":
        filePath = "/docs/search/search_before.md";
        break;
      case "collections":
        filePath = "/docs/search/collections.md";
        break;
      case "ctl":
        filePath = "/docs/search/ctl.md";
        break;
      case "timeout":
        filePath = "/docs/search/timeout.md";
        break;
      case "consistency":
        filePath = "/docs/search/consistency.md";
        break;
      case "vectors":
        filePath = "/docs/search/vectors.md";
        break;
      case "level":
        filePath = "/docs/search/level.md";
        break;
      case "results":
        filePath = "/docs/search/results.md";
        break;
      case "highlight":
        filePath = "/docs/search/highlight.md";
        break;
      case "style":
        filePath = "/docs/search/style.md";
        break;
      default:
        return null;
    }

    return filePath;
  }

  /**
   * Load markdown file content asynchronously
   * Matches VSCode-Couchbase file loading approach
   * Uses fetch to load files from public directory
   */
  private async loadMarkdownFile(
    filePath: string
  ): Promise<monaco.IMarkdownString | null> {
    try {
      // Check cache first
      if (this.markdownCache.has(filePath)) {
        const content = this.markdownCache.get(filePath)!;
        return {
          value: content,
          isTrusted: true,
        };
      }

      // Fetch markdown file from public directory
      // In Vite, files in public/ are served at root
      const response = await fetch(filePath);

      if (!response.ok) {
        // File not found, return null to fallback to inline docs
        return null;
      }

      const content = await response.text();

      // Cache the content
      this.markdownCache.set(filePath, content);

      return {
        value: content,
        isTrusted: true,
      };
    } catch (error) {
      console.error(`Error loading markdown file ${filePath}:`, error);
      // Return null to fallback to inline docs
      return null;
    }
  }

  /**
   * Get inline documentation as fallback
   * Provides basic documentation when markdown files are not available
   */
  private getInlineDocumentation(
    key: string,
    parentType: string | null
  ): monaco.IMarkdownString | null {
    // Handle context-aware fields
    if (key === "distance") {
      if (parentType === "knn" || parentType === "vector") {
        return {
          value:
            "**distance**\n\nDistance metric for vector search: 'euclidean', 'cosine', 'dot_product'.",
          isTrusted: true,
        };
      } else {
        return {
          value:
            "**distance**\n\nDistance for radius geo query. String like '10km' or '5mi'.",
          isTrusted: true,
        };
      }
    }

    if (key === "fields" && parentType === "highlight") {
      return {
        value:
          "**fields**\n\nArray of field names to highlight. If not specified, highlights all fields.",
        isTrusted: true,
      };
    }

    // Basic inline documentation for common keys
    // This is a fallback when markdown files are not available
    const basicDocs: Record<string, string> = {
      query:
        "The main query object containing the search query. Can be a query string or a structured query object.",
      fields:
        "Array of field names to return in results. Use `['*']` to return all fields.",
      size: "Maximum number of results to return. Defaults to 10 if not specified.",
      limit: "Alias for `size`. Maximum number of results to return.",
      from: "Offset for pagination. Number of results to skip before returning results.",
      offset: "Alias for `from`. Offset for pagination.",
      highlight:
        "Highlight matching terms in results. Configure highlighting style and fields.",
      facets: "Faceted search aggregations. Group results by field values.",
      sort: "Sort order for results. Can be by field, score, or geo distance.",
      explain:
        "Include query explanation in results. Shows how the query was executed.",
      ctl: "Consistency and timeout controls. Configure query timeout and consistency level.",
      knn: "K-nearest neighbors vector search. Search using vector similarity.",
      collections:
        "Limit search to specific collections. Array of collection names.",
      match:
        "Match query. Searches for terms in the specified field. Supports phrase matching.",
      match_phrase:
        "Match phrase query. Searches for exact phrase in the specified field.",
      match_all: "Match all documents. Returns all documents in the index.",
      match_none: "Match no documents. Returns no results.",
      term: "Term query. Exact match for a single term in the specified field.",
      terms:
        "Terms query. Match any of the specified terms in the specified field.",
      prefix:
        "Prefix query. Matches terms that start with the specified prefix.",
      wildcard:
        "Wildcard query. Matches terms using wildcard patterns (* and ?).",
      regexp: "Regexp query. Matches terms using regular expressions.",
      bool: "Boolean query. Combines multiple queries with boolean logic.",
      must: "Must clause. All queries in this clause must match. Equivalent to AND.",
      must_not:
        "Must not clause. Documents matching queries in this clause are excluded.",
      should:
        "Should clause. At least one query in this clause should match. Equivalent to OR.",
      conjuncts:
        "Conjuncts array. All queries in this array must match (AND logic).",
      disjuncts:
        "Disjuncts array. At least one query in this array must match (OR logic).",
      field:
        "Field name to search in. Can be a single field or nested field path.",
      boost:
        "Boost factor for this query. Higher values increase relevance score.",
      analyzer:
        "Analyzer to use for this query. Overrides the default analyzer.",
      fuzziness:
        "Fuzziness level for fuzzy matching. Allows typos in search terms.",
      operator:
        "Operator for match query. 'and' requires all terms, 'or' matches any term.",
      prefix_length:
        "Prefix length for fuzzy matching. Number of characters that must match exactly.",
      min: "Minimum value for range query (exclusive).",
      max: "Maximum value for range query (exclusive).",
      inclusive_min:
        "Minimum value for range query (inclusive). Use instead of 'min' for inclusive ranges.",
      inclusive_max:
        "Maximum value for range query (inclusive). Use instead of 'max' for inclusive ranges.",
      start: "Start value for date range query.",
      end: "End value for date range query.",
      inclusive_start: "Start value for date range query (inclusive).",
      inclusive_end: "End value for date range query (inclusive).",
      location:
        "Location for geo queries. Object with 'lat' and 'lon' properties.",
      lat: "Latitude for geo location queries.",
      lon: "Longitude for geo location queries.",
      top_left:
        "Top-left corner for rectangle geo query. Object with 'lat' and 'lon'.",
      bottom_right:
        "Bottom-right corner for rectangle geo query. Object with 'lat' and 'lon'.",
      radius: "Radius for circle geo query. String like '10km' or '5mi'.",
      geometry:
        "Geometry object for spatial queries. Contains shape and relation.",
      shape: "Shape object for geometry queries. Defines the geometric shape.",
      type:
        parentType === "shape"
          ? "Shape type: 'Point', 'LineString', 'Polygon', 'Circle', 'Envelope', 'GeometryCollection'."
          : "Type for facet queries. Can be 'term', 'numeric', 'date', etc.",
      coordinates:
        "Coordinates array for geometry shapes. Format depends on shape type.",
      relation:
        "Spatial relation: 'within', 'contains', 'intersects', 'disjoint'.",
      geometries: "Array of geometries for GeometryCollection type.",
      polygon_points: "Array of points defining a polygon boundary.",
      k: "Number of nearest neighbors to return for KNN search.",
      vector: "Vector array for vector similarity search. Array of numbers.",
      vectors: "Array of vectors for multi-vector search.",
      style:
        "Highlight style: 'default', 'html', 'ansi'. Controls how matches are highlighted.",
      timeout:
        "Query timeout in milliseconds. Maximum time to wait for query execution.",
      consistency:
        "Consistency level: 'not_bounded', 'at_plus', 'request_plus'.",
      level: "Consistency level (alias for consistency).",
      score: "Sort by relevance score. Use 'none' to disable scoring.",
      search_after: "Search after this value for pagination. Used with sort.",
      search_before: "Search before this value for pagination. Used with sort.",
      cidr: "CIDR notation for IP range queries (e.g., '192.168.1.0/24').",
      results: "Results configuration. Controls result format and options.",
    };

    const doc = basicDocs[key];
    if (doc) {
      return {
        value: `**${key}**\n\n${doc}`,
        isTrusted: true,
      };
    }

    return null;
  }
}
