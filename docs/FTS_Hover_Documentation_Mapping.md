# FTS Hover Documentation Mapping

## Overview

This document lists all the FTS query properties that require hover documentation in the Search Workbench. Each property needs a markdown file that will be displayed when users hover over the property name in the JSON editor.

**Request to Docs Team:** Please provide Capella-specific documentation links/content for each of these properties. The current implementation references Couchbase Server documentation, and we need equivalent Capella documentation.

---

## Documentation Files Required

### File Path Convention
All documentation files are expected at: `/docs/search/{property_name}.md`

---

## 1. Query Structure Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `query` (root) | `/docs/search/query.md` | [FTS Query Object](https://docs.couchbase.com/server/current/fts/fts-query-types.html) | ⬜ |
| `query` (nested string) | `/docs/search/query_string.md` | [Query String Syntax](https://docs.couchbase.com/server/current/fts/fts-query-string-syntax.html) | ⬜ |
| `fields` | `/docs/search/fields.md` | [Stored Fields](https://docs.couchbase.com/server/current/fts/fts-response-object-schema.html#fields) | ⬜ |
| `collections` | `/docs/search/collections.md` | [Collection Scoped Search](https://docs.couchbase.com/server/current/fts/fts-creating-indexes.html#specifying-collections) | ⬜ |

---

## 2. Match Query Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `match` | `/docs/search/match.md` | [Match Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#match) | ⬜ |
| `match_phrase` | `/docs/search/match_phrase.md` | [Match Phrase Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#match-phrase) | ⬜ |
| `match_all` | `/docs/search/match_all.md` | [Match All Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#match-all) | ⬜ |
| `match_none` | `/docs/search/match_none.md` | [Match None Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#match-none) | ⬜ |
| `prefix` | `/docs/search/prefix.md` | [Prefix Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#prefix) | ⬜ |
| `regexp` | `/docs/search/regexp.md` | [Regexp Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#regexp) | ⬜ |
| `wildcard` | `/docs/search/wildcard.md` | [Wildcard Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#wildcard) | ⬜ |
| `term` | `/docs/search/term.md` | [Term Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#term) | ⬜ |
| `terms` | `/docs/search/terms.md` | [Terms Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#terms) | ⬜ |
| `bool` | `/docs/search/bool.md` | [Boolean Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#boolean) | ⬜ |

---

## 3. Boolean Query Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `must` | `/docs/search/must.md` | [Must Clause](https://docs.couchbase.com/server/current/fts/fts-query-types.html#boolean) | ⬜ |
| `must_not` | `/docs/search/must_not.md` | [Must Not Clause](https://docs.couchbase.com/server/current/fts/fts-query-types.html#boolean) | ⬜ |
| `should` | `/docs/search/should.md` | [Should Clause](https://docs.couchbase.com/server/current/fts/fts-query-types.html#boolean) | ⬜ |
| `conjuncts` | `/docs/search/conjuncts.md` | [Conjuncts (AND)](https://docs.couchbase.com/server/current/fts/fts-query-types.html#conjunction-intersection) | ⬜ |
| `disjuncts` | `/docs/search/disjuncts.md` | [Disjuncts (OR)](https://docs.couchbase.com/server/current/fts/fts-query-types.html#disjunction-union) | ⬜ |

---

## 4. Range Query Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `min` | `/docs/search/min.md` | [Numeric Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#numeric-range) | ⬜ |
| `max` | `/docs/search/max.md` | [Numeric Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#numeric-range) | ⬜ |
| `inclusive_min` | `/docs/search/inclusive_min.md` | [Numeric Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#numeric-range) | ⬜ |
| `inclusive_max` | `/docs/search/inclusive_max.md` | [Numeric Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#numeric-range) | ⬜ |
| `start` | `/docs/search/start.md` | [Date Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#date-range) | ⬜ |
| `end` | `/docs/search/end.md` | [Date Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#date-range) | ⬜ |
| `inclusive_start` | `/docs/search/inclusive_start.md` | [Date Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#date-range) | ⬜ |
| `inclusive_end` | `/docs/search/inclusive_end.md` | [Date Range](https://docs.couchbase.com/server/current/fts/fts-query-types.html#date-range) | ⬜ |

---

## 5. Geo Query Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `location` | `/docs/search/location.md` | [Geo Location](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-location) | ⬜ |
| `lat` | `/docs/search/lat.md` | [Geo Location](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-location) | ⬜ |
| `lon` | `/docs/search/lon.md` | [Geo Location](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-location) | ⬜ |
| `distance` | `/docs/search/distance.md` | [Geo Distance](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-distance) | ⬜ |
| `top_left` | `/docs/search/top_left.md` | [Geo Bounding Box](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-bounding-box) | ⬜ |
| `bottom_right` | `/docs/search/bottom_right.md` | [Geo Bounding Box](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-bounding-box) | ⬜ |
| `polygon_points` | `/docs/search/polygon_points.md` | [Geo Polygon](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-polygon) | ⬜ |
| `radius` | `/docs/search/radius.md` | [Geo Radius](https://docs.couchbase.com/server/current/fts/fts-query-types.html#geo-distance) | ⬜ |

---

## 6. GeoJSON/Geometry Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `geometry` | `/docs/search/geometry.md` | [Geospatial Queries](https://docs.couchbase.com/server/current/fts/fts-geojson-queries.html) | ⬜ |
| `shape` | `/docs/search/shape.md` | [GeoJSON Shapes](https://docs.couchbase.com/server/current/fts/fts-geojson-queries.html#shapes) | ⬜ |
| `type` (shape context) | `/docs/search/type_shape.md` | [GeoJSON Types](https://docs.couchbase.com/server/current/fts/fts-geojson-queries.html#shapes) | ⬜ |
| `type` (facet context) | `/docs/search/type_facet.md` | [Facet Types](https://docs.couchbase.com/server/current/fts/fts-response-facets.html) | ⬜ |
| `coordinates` | `/docs/search/coordinates.md` | [GeoJSON Coordinates](https://docs.couchbase.com/server/current/fts/fts-geojson-queries.html) | ⬜ |
| `relation` | `/docs/search/relation.md` | [Spatial Relations](https://docs.couchbase.com/server/current/fts/fts-geojson-queries.html#relations) | ⬜ |
| `geometries` | `/docs/search/geometries.md` | [GeometryCollection](https://docs.couchbase.com/server/current/fts/fts-geojson-queries.html) | ⬜ |

---

## 7. Vector Search (KNN) Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `knn` | `/docs/search/knn.md` | [Vector Search](https://docs.couchbase.com/server/current/vector-search/vector-search.html) | ⬜ |
| `k` | `/docs/search/k.md` | [K Parameter](https://docs.couchbase.com/server/current/vector-search/vector-search.html#knn-search) | ⬜ |
| `vector` | `/docs/search/vector.md` | [Vector Query](https://docs.couchbase.com/server/current/vector-search/vector-search.html#knn-search) | ⬜ |
| `vectors` | `/docs/search/vectors.md` | [Multi-Vector Search](https://docs.couchbase.com/server/current/vector-search/vector-search.html) | ⬜ |

---

## 8. Query Modifiers

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `field` | `/docs/search/field.md` | [Field Parameter](https://docs.couchbase.com/server/current/fts/fts-query-types.html) | ⬜ |
| `boost` | `/docs/search/boost.md` | [Query Boosting](https://docs.couchbase.com/server/current/fts/fts-query-types.html#boost) | ⬜ |
| `analyzer` | `/docs/search/analyzer.md` | [Analyzers](https://docs.couchbase.com/server/current/fts/fts-using-analyzers.html) | ⬜ |
| `fuzziness` | `/docs/search/fuzziness.md` | [Fuzzy Matching](https://docs.couchbase.com/server/current/fts/fts-query-types.html#fuzzy) | ⬜ |
| `operator` | `/docs/search/operator.md` | [Match Operator](https://docs.couchbase.com/server/current/fts/fts-query-types.html#match) | ⬜ |
| `prefix_length` | `/docs/search/prefix_length.md` | [Prefix Length](https://docs.couchbase.com/server/current/fts/fts-query-types.html#fuzzy) | ⬜ |

---

## 9. Result Control Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `size` / `limit` | `/docs/search/limit.md` | [Pagination](https://docs.couchbase.com/server/current/fts/fts-pagination.html) | ⬜ |
| `from` / `offset` | `/docs/search/offset.md` | [Pagination](https://docs.couchbase.com/server/current/fts/fts-pagination.html) | ⬜ |
| `sort` | `/docs/search/sort.md` | [Sorting](https://docs.couchbase.com/server/current/fts/fts-sorting.html) | ⬜ |
| `score` | `/docs/search/score.md` | [Scoring](https://docs.couchbase.com/server/current/fts/fts-scoring.html) | ⬜ |
| `explain` | `/docs/search/explain.md` | [Explain](https://docs.couchbase.com/server/current/fts/fts-response-object-schema.html#explanation) | ⬜ |
| `search_after` | `/docs/search/search_after.md` | [Keyset Pagination](https://docs.couchbase.com/server/current/fts/fts-pagination.html#keyset-pagination) | ⬜ |
| `search_before` | `/docs/search/search_before.md` | [Keyset Pagination](https://docs.couchbase.com/server/current/fts/fts-pagination.html#keyset-pagination) | ⬜ |
| `includeLocations` | `/docs/search/includeLocations.md` | [Term Locations](https://docs.couchbase.com/server/current/fts/fts-response-object-schema.html#locations) | ⬜ |

---

## 10. Highlighting Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `highlight` | `/docs/search/highlight.md` | [Highlighting](https://docs.couchbase.com/server/current/fts/fts-highlighting.html) | ⬜ |
| `style` | `/docs/search/style.md` | [Highlight Styles](https://docs.couchbase.com/server/current/fts/fts-highlighting.html#styles) | ⬜ |

---

## 11. Facets Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `facets` | `/docs/search/facets.md` | [Faceted Search](https://docs.couchbase.com/server/current/fts/fts-response-facets.html) | ⬜ |
| `results` | `/docs/search/results.md` | [Facet Results](https://docs.couchbase.com/server/current/fts/fts-response-facets.html) | ⬜ |

---

## 12. Control Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `ctl` | `/docs/search/ctl.md` | [Query Control](https://docs.couchbase.com/server/current/fts/fts-consistency.html) | ⬜ |
| `timeout` | `/docs/search/timeout.md` | [Query Timeout](https://docs.couchbase.com/server/current/fts/fts-consistency.html#timeout) | ⬜ |
| `consistency` | `/docs/search/consistency.md` | [Consistency](https://docs.couchbase.com/server/current/fts/fts-consistency.html) | ⬜ |
| `level` | `/docs/search/level.md` | [Consistency Level](https://docs.couchbase.com/server/current/fts/fts-consistency.html#levels) | ⬜ |

---

## 13. Network/CIDR Properties

| Property | File Path | Current Server Docs Reference | Capella Docs Needed |
|----------|-----------|-------------------------------|---------------------|
| `cidr` | `/docs/search/cidr.md` | [IP Range Query](https://docs.couchbase.com/server/current/fts/fts-query-types.html#ip-range) | ⬜ |

---

## Summary

| Category | Property Count |
|----------|----------------|
| Query Structure | 4 |
| Match Queries | 10 |
| Boolean Queries | 5 |
| Range Queries | 8 |
| Geo Queries | 8 |
| GeoJSON/Geometry | 7 |
| Vector Search | 4 |
| Query Modifiers | 6 |
| Result Control | 8 |
| Highlighting | 2 |
| Facets | 2 |
| Control | 4 |
| Network | 1 |
| **Total** | **69** |

---

## Markdown File Format

Each documentation file should follow this format:

```markdown
# {Property Name}

{Brief description of what the property does}

## Syntax

```json
{
  "{property}": {value_type}
}
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ... | ... | ... | ... |

## Example

```json
{
  "query": {
    "{property}": "example_value"
  }
}
```

## See Also

- [Related Property 1](link)
- [Related Property 2](link)
```

---

## Notes for Docs Team

1. **Context-Aware Documentation**: Some properties (like `distance`, `type`, `fields`) have different meanings based on their parent context. We handle this in code but may need separate documentation files.

2. **Capella vs Server**: Please confirm if Capella FTS has any differences from Server FTS that need to be documented differently.

3. **Version Compatibility**: Please note any properties that are only available in specific Capella versions.

4. **Links**: We can support external documentation links in the hover content. Please provide canonical URLs.

---

## Contact

For questions about this documentation mapping, please contact the DevEx team.
