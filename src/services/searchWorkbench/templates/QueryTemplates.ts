/**
 * Search Query Templates
 * 
 * Pre-defined query templates for common Full-Text Search operations.
 * Based on Couchbase FTS query syntax.
 */

export interface QueryTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  template: object;
}

export type TemplateCategory = 
  | 'basic'
  | 'match'
  | 'range'
  | 'geo'
  | 'boolean'
  | 'vector'
  | 'advanced';

/**
 * All available query templates organized by category
 */
export const QUERY_TEMPLATES: QueryTemplate[] = [
  // Basic Templates
  {
    id: 'simple-query',
    name: 'Simple Query',
    description: 'Basic query string search',
    category: 'basic',
    template: {
      query: {
        query: "search_term"
      },
      fields: ["*"]
    }
  },
  {
    id: 'match-all',
    name: 'Match All',
    description: 'Matches all documents in the index',
    category: 'basic',
    template: {
      query: {
        match_all: {}
      },
      fields: ["*"]
    }
  },
  {
    id: 'match-none',
    name: 'Match None',
    description: 'Matches no documents (useful for testing)',
    category: 'basic',
    template: {
      query: {
        match_none: {}
      }
    }
  },

  // Match Templates
  {
    id: 'match-query',
    name: 'Match Query',
    description: 'Full-text match on a specific field',
    category: 'match',
    template: {
      query: {
        match: "search_term",
        field: "field_name"
      },
      fields: ["*"]
    }
  },
  {
    id: 'match-phrase',
    name: 'Match Phrase',
    description: 'Match an exact phrase in order',
    category: 'match',
    template: {
      query: {
        match_phrase: "exact phrase here",
        field: "field_name"
      },
      fields: ["*"]
    }
  },
  {
    id: 'prefix-query',
    name: 'Prefix Query',
    description: 'Match terms starting with a prefix',
    category: 'match',
    template: {
      query: {
        prefix: "pre",
        field: "field_name"
      },
      fields: ["*"]
    }
  },
  {
    id: 'regexp-query',
    name: 'Regexp Query',
    description: 'Match using regular expression',
    category: 'match',
    template: {
      query: {
        regexp: "pattern.*",
        field: "field_name"
      },
      fields: ["*"]
    }
  },
  {
    id: 'wildcard-query',
    name: 'Wildcard Query',
    description: 'Match using wildcard patterns (* and ?)',
    category: 'match',
    template: {
      query: {
        wildcard: "term*",
        field: "field_name"
      },
      fields: ["*"]
    }
  },
  {
    id: 'term-query',
    name: 'Term Query',
    description: 'Exact term match (no analysis)',
    category: 'match',
    template: {
      query: {
        term: "exact_term",
        field: "field_name"
      },
      fields: ["*"]
    }
  },
  {
    id: 'fuzzy-query',
    name: 'Fuzzy Query',
    description: 'Match with edit distance tolerance',
    category: 'match',
    template: {
      query: {
        term: "search_term",
        field: "field_name",
        fuzziness: 1
      },
      fields: ["*"]
    }
  },

  // Range Templates
  {
    id: 'numeric-range',
    name: 'Numeric Range',
    description: 'Search within a numeric range',
    category: 'range',
    template: {
      query: {
        min: 0,
        max: 100,
        inclusive_min: true,
        inclusive_max: true,
        field: "numeric_field"
      },
      fields: ["*"]
    }
  },
  {
    id: 'date-range',
    name: 'Date Range',
    description: 'Search within a date range',
    category: 'range',
    template: {
      query: {
        start: "2024-01-01T00:00:00Z",
        end: "2024-12-31T23:59:59Z",
        inclusive_start: true,
        inclusive_end: true,
        field: "date_field"
      },
      fields: ["*"]
    }
  },

  // Boolean Templates
  {
    id: 'boolean-must',
    name: 'Boolean Must (AND)',
    description: 'All conditions must match',
    category: 'boolean',
    template: {
      query: {
        must: {
          conjuncts: [
            { match: "term1", field: "field1" },
            { match: "term2", field: "field2" }
          ]
        }
      },
      fields: ["*"]
    }
  },
  {
    id: 'boolean-should',
    name: 'Boolean Should (OR)',
    description: 'At least one condition should match',
    category: 'boolean',
    template: {
      query: {
        should: {
          disjuncts: [
            { match: "term1", field: "field1" },
            { match: "term2", field: "field2" }
          ],
          min: 1
        }
      },
      fields: ["*"]
    }
  },
  {
    id: 'boolean-must-not',
    name: 'Boolean Must Not (NOT)',
    description: 'Exclude documents matching conditions',
    category: 'boolean',
    template: {
      query: {
        must_not: {
          disjuncts: [
            { match: "excluded_term", field: "field_name" }
          ]
        }
      },
      fields: ["*"]
    }
  },
  {
    id: 'boolean-compound',
    name: 'Compound Boolean',
    description: 'Complex boolean with must, should, and must_not',
    category: 'boolean',
    template: {
      query: {
        must: {
          conjuncts: [
            { match: "required_term", field: "field1" }
          ]
        },
        should: {
          disjuncts: [
            { match: "optional_term1", field: "field2" },
            { match: "optional_term2", field: "field2" }
          ],
          min: 1
        },
        must_not: {
          disjuncts: [
            { match: "excluded_term", field: "field3" }
          ]
        }
      },
      fields: ["*"]
    }
  },
  {
    id: 'conjuncts',
    name: 'Conjuncts (AND)',
    description: 'Multiple queries that all must match',
    category: 'boolean',
    template: {
      query: {
        conjuncts: [
          { match: "term1", field: "field1" },
          { match: "term2", field: "field2" }
        ]
      },
      fields: ["*"]
    }
  },
  {
    id: 'disjuncts',
    name: 'Disjuncts (OR)',
    description: 'Multiple queries where any can match',
    category: 'boolean',
    template: {
      query: {
        disjuncts: [
          { match: "term1", field: "field1" },
          { match: "term2", field: "field2" }
        ]
      },
      fields: ["*"]
    }
  },

  // Geo Templates
  {
    id: 'geo-distance',
    name: 'Geo Distance (Radius)',
    description: 'Search within radius of a point',
    category: 'geo',
    template: {
      query: {
        location: {
          lon: -122.4194,
          lat: 37.7749
        },
        distance: "10km",
        field: "geo_field"
      },
      fields: ["*"]
    }
  },
  {
    id: 'geo-bounding-box',
    name: 'Geo Bounding Box',
    description: 'Search within a rectangular area',
    category: 'geo',
    template: {
      query: {
        top_left: {
          lon: -122.5,
          lat: 37.9
        },
        bottom_right: {
          lon: -122.3,
          lat: 37.6
        },
        field: "geo_field"
      },
      fields: ["*"]
    }
  },
  {
    id: 'geo-polygon',
    name: 'Geo Polygon',
    description: 'Search within a polygon area',
    category: 'geo',
    template: {
      query: {
        polygon_points: [
          { lon: -122.5, lat: 37.8 },
          { lon: -122.4, lat: 37.9 },
          { lon: -122.3, lat: 37.8 },
          { lon: -122.4, lat: 37.7 }
        ],
        field: "geo_field"
      },
      fields: ["*"]
    }
  },

  // Vector Templates
  {
    id: 'vector-search',
    name: 'Vector Search (KNN)',
    description: 'K-nearest neighbors vector similarity search',
    category: 'vector',
    template: {
      query: {
        match_none: {}
      },
      knn: [
        {
          k: 10,
          field: "vector_field",
          vector: [0.1, 0.2, 0.3, 0.4, 0.5]
        }
      ],
      fields: ["*"]
    }
  },
  {
    id: 'hybrid-search',
    name: 'Hybrid Search',
    description: 'Combine text search with vector search',
    category: 'vector',
    template: {
      query: {
        match: "search_term",
        field: "text_field"
      },
      knn: [
        {
          k: 10,
          field: "vector_field",
          vector: [0.1, 0.2, 0.3, 0.4, 0.5]
        }
      ],
      fields: ["*"]
    }
  },

  // Advanced Templates
  {
    id: 'with-highlight',
    name: 'With Highlighting',
    description: 'Query with result highlighting',
    category: 'advanced',
    template: {
      query: {
        match: "search_term",
        field: "content"
      },
      fields: ["*"],
      highlight: {
        style: "html",
        fields: ["content"]
      }
    }
  },
  {
    id: 'with-facets',
    name: 'With Facets',
    description: 'Query with faceted search results',
    category: 'advanced',
    template: {
      query: {
        query: "search_term"
      },
      fields: ["*"],
      facets: {
        category_facet: {
          field: "category",
          size: 10
        }
      }
    }
  },
  {
    id: 'with-sort',
    name: 'With Sorting',
    description: 'Query with custom sort order',
    category: 'advanced',
    template: {
      query: {
        query: "search_term"
      },
      fields: ["*"],
      sort: [
        { by: "field", field: "score", desc: true },
        "-_id"
      ]
    }
  },
  {
    id: 'paginated',
    name: 'Paginated Results',
    description: 'Query with pagination (from/size)',
    category: 'advanced',
    template: {
      query: {
        query: "search_term"
      },
      fields: ["*"],
      size: 10,
      from: 0
    }
  },
  {
    id: 'with-explain',
    name: 'With Explain',
    description: 'Query with scoring explanation',
    category: 'advanced',
    template: {
      query: {
        match: "search_term",
        field: "content"
      },
      fields: ["*"],
      explain: true
    }
  },
  {
    id: 'collection-scoped',
    name: 'Collection Scoped',
    description: 'Query scoped to specific collections',
    category: 'advanced',
    template: {
      query: {
        query: "search_term"
      },
      fields: ["*"],
      collections: ["collection_name"]
    }
  }
];

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: TemplateCategory): QueryTemplate[] {
  return QUERY_TEMPLATES.filter(t => t.category === category);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): QueryTemplate | undefined {
  return QUERY_TEMPLATES.find(t => t.id === id);
}

/**
 * Get all template categories
 */
export function getTemplateCategories(): { id: TemplateCategory; label: string }[] {
  return [
    { id: 'basic', label: 'Basic Queries' },
    { id: 'match', label: 'Match Queries' },
    { id: 'range', label: 'Range Queries' },
    { id: 'boolean', label: 'Boolean Queries' },
    { id: 'geo', label: 'Geo Queries' },
    { id: 'vector', label: 'Vector Search' },
    { id: 'advanced', label: 'Advanced Options' }
  ];
}

/**
 * Get template as formatted JSON string
 */
export function getTemplateAsString(id: string): string {
  const template = getTemplateById(id);
  if (!template) {
    return '';
  }
  return JSON.stringify(template.template, null, 2);
}

/**
 * Get grouped templates for dropdown
 */
export function getGroupedTemplates(): Map<TemplateCategory, QueryTemplate[]> {
  const grouped = new Map<TemplateCategory, QueryTemplate[]>();
  
  for (const category of getTemplateCategories()) {
    grouped.set(category.id, getTemplatesByCategory(category.id));
  }
  
  return grouped;
}
