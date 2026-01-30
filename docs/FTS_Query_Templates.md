# FTS Query Templates Specification

## Overview

This document outlines the pre-defined query templates available in the FTS Query Workbench. These templates help users quickly construct common Full-Text Search queries without needing to write JSON from scratch.

---

## Template Categories

| Category | Description | Template Count |
|----------|-------------|----------------|
| Basic Queries | Simple, fundamental query types | 3 |
| Match Queries | Text matching and pattern-based queries | 7 |
| Range Queries | Numeric and date range searches | 2 |
| Boolean Queries | Logical combinations of queries | 6 |
| Geo Queries | Location-based searches | 3 |
| Vector Search | AI/ML vector similarity searches | 2 |
| Advanced Options | Result customization and features | 6 |

**Total Templates: 29**

---

## 1. Basic Queries

### 1.1 Simple Query
**Description:** Basic query string search - the simplest way to search.

```json
{
  "query": {
    "query": "search_term"
  },
  "fields": ["*"]
}
```

**Use Case:** Quick, simple text searches across all indexed fields.

---

### 1.2 Match All
**Description:** Matches all documents in the index.

```json
{
  "query": {
    "match_all": {}
  },
  "fields": ["*"]
}
```

**Use Case:** Retrieve all documents, useful for testing or browsing data.

---

### 1.3 Match None
**Description:** Matches no documents (useful for testing).

```json
{
  "query": {
    "match_none": {}
  }
}
```

**Use Case:** Testing query structure, baseline comparisons, or as a placeholder in compound queries.

---

## 2. Match Queries

### 2.1 Match Query
**Description:** Full-text match on a specific field with text analysis.

```json
{
  "query": {
    "match": "search_term",
    "field": "field_name"
  },
  "fields": ["*"]
}
```

**Use Case:** Search for analyzed text in a specific field (e.g., search "running" matches "run", "runs", "running").

---

### 2.2 Match Phrase
**Description:** Match an exact phrase in order.

```json
{
  "query": {
    "match_phrase": "exact phrase here",
    "field": "field_name"
  },
  "fields": ["*"]
}
```

**Use Case:** Find documents containing an exact sequence of words (e.g., "New York City").

---

### 2.3 Prefix Query
**Description:** Match terms starting with a prefix.

```json
{
  "query": {
    "prefix": "pre",
    "field": "field_name"
  },
  "fields": ["*"]
}
```

**Use Case:** Autocomplete functionality, finding words starting with specific characters (e.g., "auto" matches "automatic", "automobile").

---

### 2.4 Regexp Query
**Description:** Match using regular expression patterns.

```json
{
  "query": {
    "regexp": "pattern.*",
    "field": "field_name"
  },
  "fields": ["*"]
}
```

**Use Case:** Complex pattern matching (e.g., email validation, SKU patterns).

---

### 2.5 Wildcard Query
**Description:** Match using wildcard patterns (* and ?).

```json
{
  "query": {
    "wildcard": "term*",
    "field": "field_name"
  },
  "fields": ["*"]
}
```

**Use Case:** Flexible matching where `*` matches any characters and `?` matches single character.

---

### 2.6 Term Query
**Description:** Exact term match (no text analysis applied).

```json
{
  "query": {
    "term": "exact_term",
    "field": "field_name"
  },
  "fields": ["*"]
}
```

**Use Case:** Exact matching for IDs, codes, or keywords that shouldn't be analyzed.

---

### 2.7 Fuzzy Query
**Description:** Match with edit distance tolerance for typo handling.

```json
{
  "query": {
    "term": "search_term",
    "field": "field_name",
    "fuzziness": 1
  },
  "fields": ["*"]
}
```

**Use Case:** Handle typos and misspellings (e.g., "recieve" matches "receive" with fuzziness 1).

---

## 3. Range Queries

### 3.1 Numeric Range
**Description:** Search within a numeric range.

```json
{
  "query": {
    "min": 0,
    "max": 100,
    "inclusive_min": true,
    "inclusive_max": true,
    "field": "numeric_field"
  },
  "fields": ["*"]
}
```

**Use Case:** Filter by price range, age range, quantity limits, etc.

---

### 3.2 Date Range
**Description:** Search within a date/time range.

```json
{
  "query": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-12-31T23:59:59Z",
    "inclusive_start": true,
    "inclusive_end": true,
    "field": "date_field"
  },
  "fields": ["*"]
}
```

**Use Case:** Filter by creation date, event dates, time periods, etc.

---

## 4. Boolean Queries

### 4.1 Boolean Must (AND)
**Description:** All conditions must match.

```json
{
  "query": {
    "must": {
      "conjuncts": [
        { "match": "term1", "field": "field1" },
        { "match": "term2", "field": "field2" }
      ]
    }
  },
  "fields": ["*"]
}
```

**Use Case:** Find documents matching ALL specified criteria.

---

### 4.2 Boolean Should (OR)
**Description:** At least one condition should match.

```json
{
  "query": {
    "should": {
      "disjuncts": [
        { "match": "term1", "field": "field1" },
        { "match": "term2", "field": "field2" }
      ],
      "min": 1
    }
  },
  "fields": ["*"]
}
```

**Use Case:** Find documents matching ANY of the specified criteria.

---

### 4.3 Boolean Must Not (NOT)
**Description:** Exclude documents matching conditions.

```json
{
  "query": {
    "must_not": {
      "disjuncts": [
        { "match": "excluded_term", "field": "field_name" }
      ]
    }
  },
  "fields": ["*"]
}
```

**Use Case:** Exclude specific terms or categories from results.

---

### 4.4 Compound Boolean
**Description:** Complex boolean with must, should, and must_not combined.

```json
{
  "query": {
    "must": {
      "conjuncts": [
        { "match": "required_term", "field": "field1" }
      ]
    },
    "should": {
      "disjuncts": [
        { "match": "optional_term1", "field": "field2" },
        { "match": "optional_term2", "field": "field2" }
      ],
      "min": 1
    },
    "must_not": {
      "disjuncts": [
        { "match": "excluded_term", "field": "field3" }
      ]
    }
  },
  "fields": ["*"]
}
```

**Use Case:** Advanced filtering with required terms, preferred terms, and exclusions.

---

### 4.5 Conjuncts (AND)
**Description:** Multiple queries that all must match (simplified AND).

```json
{
  "query": {
    "conjuncts": [
      { "match": "term1", "field": "field1" },
      { "match": "term2", "field": "field2" }
    ]
  },
  "fields": ["*"]
}
```

**Use Case:** Simple AND logic for combining multiple match conditions.

---

### 4.6 Disjuncts (OR)
**Description:** Multiple queries where any can match (simplified OR).

```json
{
  "query": {
    "disjuncts": [
      { "match": "term1", "field": "field1" },
      { "match": "term2", "field": "field2" }
    ]
  },
  "fields": ["*"]
}
```

**Use Case:** Simple OR logic for alternative matching conditions.

---

## 5. Geo Queries

### 5.1 Geo Distance (Radius)
**Description:** Search within a radius of a geographic point.

```json
{
  "query": {
    "location": {
      "lon": -122.4194,
      "lat": 37.7749
    },
    "distance": "10km",
    "field": "geo_field"
  },
  "fields": ["*"]
}
```

**Use Case:** Find locations within X kilometers/miles of a point (e.g., "restaurants near me").

---

### 5.2 Geo Bounding Box
**Description:** Search within a rectangular geographic area.

```json
{
  "query": {
    "top_left": {
      "lon": -122.5,
      "lat": 37.9
    },
    "bottom_right": {
      "lon": -122.3,
      "lat": 37.6
    },
    "field": "geo_field"
  },
  "fields": ["*"]
}
```

**Use Case:** Find locations within a rectangular region (e.g., map viewport).

---

### 5.3 Geo Polygon
**Description:** Search within a polygon-shaped geographic area.

```json
{
  "query": {
    "polygon_points": [
      { "lon": -122.5, "lat": 37.8 },
      { "lon": -122.4, "lat": 37.9 },
      { "lon": -122.3, "lat": 37.8 },
      { "lon": -122.4, "lat": 37.7 }
    ],
    "field": "geo_field"
  },
  "fields": ["*"]
}
```

**Use Case:** Find locations within custom-shaped regions (e.g., city boundaries, delivery zones).

---

## 6. Vector Search (AI/ML)

### 6.1 Vector Search (KNN)
**Description:** K-nearest neighbors vector similarity search.

```json
{
  "query": {
    "match_none": {}
  },
  "knn": [
    {
      "k": 10,
      "field": "vector_field",
      "vector": [0.1, 0.2, 0.3, 0.4, 0.5]
    }
  ],
  "fields": ["*"]
}
```

**Use Case:** Semantic search, image similarity, recommendation systems using embeddings.

---

### 6.2 Hybrid Search
**Description:** Combine traditional text search with vector similarity search.

```json
{
  "query": {
    "match": "search_term",
    "field": "text_field"
  },
  "knn": [
    {
      "k": 10,
      "field": "vector_field",
      "vector": [0.1, 0.2, 0.3, 0.4, 0.5]
    }
  ],
  "fields": ["*"]
}
```

**Use Case:** Combine keyword relevance with semantic similarity for better search results.

---

## 7. Advanced Options

### 7.1 With Highlighting
**Description:** Query with result highlighting to show matched terms.

```json
{
  "query": {
    "match": "search_term",
    "field": "content"
  },
  "fields": ["*"],
  "highlight": {
    "style": "html",
    "fields": ["content"]
  }
}
```

**Use Case:** Display search results with matched terms highlighted for better UX.

---

### 7.2 With Facets
**Description:** Query with faceted search results for filtering.

```json
{
  "query": {
    "query": "search_term"
  },
  "fields": ["*"],
  "facets": {
    "category_facet": {
      "field": "category",
      "size": 10
    }
  }
}
```

**Use Case:** E-commerce filtering (e.g., show counts by category, brand, price range).

---

### 7.3 With Sorting
**Description:** Query with custom sort order.

```json
{
  "query": {
    "query": "search_term"
  },
  "fields": ["*"],
  "sort": [
    { "by": "field", "field": "score", "desc": true },
    "-_id"
  ]
}
```

**Use Case:** Sort results by date, price, relevance, or other fields.

---

### 7.4 Paginated Results
**Description:** Query with pagination (from/size).

```json
{
  "query": {
    "query": "search_term"
  },
  "fields": ["*"],
  "size": 10,
  "from": 0
}
```

**Use Case:** Implement pagination for large result sets.

---

### 7.5 With Explain
**Description:** Query with scoring explanation for debugging.

```json
{
  "query": {
    "match": "search_term",
    "field": "content"
  },
  "fields": ["*"],
  "explain": true
}
```

**Use Case:** Debug and understand why documents are ranked the way they are.

---

### 7.6 Collection Scoped
**Description:** Query scoped to specific collections.

```json
{
  "query": {
    "query": "search_term"
  },
  "fields": ["*"],
  "collections": ["collection_name"]
}
```

**Use Case:** Search within specific collections in a multi-collection index.

---

## Template Selection UI

### Dropdown Structure
```
📋 Templates
├── Basic Queries
│   ├── Simple Query
│   ├── Match All
│   └── Match None
├── Match Queries
│   ├── Match Query
│   ├── Match Phrase
│   ├── Prefix Query
│   ├── Regexp Query
│   ├── Wildcard Query
│   ├── Term Query
│   └── Fuzzy Query
├── Range Queries
│   ├── Numeric Range
│   └── Date Range
├── Boolean Queries
│   ├── Boolean Must (AND)
│   ├── Boolean Should (OR)
│   ├── Boolean Must Not (NOT)
│   ├── Compound Boolean
│   ├── Conjuncts (AND)
│   └── Disjuncts (OR)
├── Geo Queries
│   ├── Geo Distance (Radius)
│   ├── Geo Bounding Box
│   └── Geo Polygon
├── Vector Search
│   ├── Vector Search (KNN)
│   └── Hybrid Search
└── Advanced Options
    ├── With Highlighting
    ├── With Facets
    ├── With Sorting
    ├── Paginated Results
    ├── With Explain
    └── Collection Scoped
```

---

## Future Considerations

### Potential Additional Templates
- [ ] Docid Query - Search by document ID
- [ ] Phrase Prefix - Match phrase with prefix on last term
- [ ] Multi-field Match - Search across multiple fields
- [ ] Boosted Query - Query with field boosting
- [ ] Custom Scoring - Query with custom score functions
- [ ] Geo Distance Facets - Facets by distance ranges

### Template Customization
- [ ] User-defined templates (saved queries)
- [ ] Recent queries quick access
- [ ] Template favorites

---

## References

- [Couchbase FTS Query Documentation](https://docs.couchbase.com/server/current/fts/fts-searching-from-the-ui.html)
- [FTS Query Syntax Reference](https://docs.couchbase.com/server/current/fts/fts-query-types.html)
- [Vector Search Documentation](https://docs.couchbase.com/server/current/vector-search/vector-search.html)
