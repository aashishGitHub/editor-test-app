# FTS Search Workbench Initiative

## Description

Developing Full-Text Search (FTS) queries in Couchbase currently requires developers to manually write complex JSON queries without adequate tooling support, leading to slow development cycles and frequent errors. Developers must reference external documentation, lack real-time validation, and have no contextual help while building queries. This results in increased time-to-market for search features and higher support costs.

The **Search Workbench** is an intelligent, Monaco Editor-based interface that provides developers with a professional IDE experience for building, testing, and optimizing Couchbase Full-Text Search queries. The workbench includes intelligent autocomplete, hover documentation, real-time validation, query templates, and execution capabilities to dramatically improve developer productivity.

**Benefits**:
- Reduce FTS query development time by 70%
- Eliminate syntax errors with real-time validation
- Lower barrier to entry for developers new to FTS
- Improve query quality with inline documentation and examples
- Enable rapid prototyping and testing of search features

PRD → [FTS_Query_Templates.md](./FTS_Query_Templates.md)

NOTE: Dependency on Monaco Editor integration with Couchbase Capella UI.

---

## Private Beta

**Date**: February 15, 2026

### Key Features:

#### Core Editor Experience
- **Monaco Editor Integration**: Full VS Code-like editing experience with syntax highlighting for JSON queries
- **9 Language Support**: JSON, JavaScript, TypeScript, Python, Java, SQL, N1QL, SQL++, and CustomJava
- **Theme Support**: Light and Dark theme switching
- **55+ Configuration Options**: Comprehensive editor customization via Storybook-style UI

#### Intelligent Query Development
- **Hover Documentation**: 69 markdown documentation files providing contextual help for all FTS query parameters
- **Basic Autocomplete**: Keyword suggestions for query structure and common fields
- **Real-time Validation**: JSON syntax and structure validation with inline error markers
- **Query Execution**: Execute queries against mock API with formatted results display
- **Format on Save**: Automatic JSON formatting via keyboard shortcuts (Ctrl+S/Cmd+S)

#### Query Templates (29 Pre-defined Templates)
Support for creating queries using templates across:
- Basic Queries (3 templates)
- Match Queries (7 templates)
- Range Queries (2 templates)
- Boolean Queries (6 templates)
- Geo Queries (3 templates)
- Vector Search (2 templates)
- Advanced Options (6 templates)

#### Search Results
- Performance metrics display (RTT, Elapsed time, Document count, Size)
- Result pagination
- Error message display
- Loading states and status indicators

#### Configuration & Management
- **Feature Flags System**: Toggle features via configuration
- **Export/Import Configurations**: Save and load editor configurations as JSON
- **Query Context Management**: Bucket and index selection

### Deployment:
- Initially available as standalone React application
- Web-based access via localhost (http://localhost:5173)
- No authentication required for Private Beta

### Dependencies:
- Monaco Editor (VS Code editor component)
- React 18 + TypeScript + Vite stack
- jsonc-parser for JSON validation
- Mock Search API for query execution testing

---

## Public Preview & GA

**Date**: April 15, 2026

### Key Features:

#### Advanced Autocomplete & IntelliSense
- **Field-aware Autocomplete**: Context-sensitive suggestions based on index definition
- **Parameter Validation**: Type-aware validation for query parameters
- **Smart Suggestions**: Autocomplete for field names from connected indexes
- **Query Mode Detection**: Auto-detect simple vs advanced query modes

#### Integration with Couchbase Capella
- **Live Index Connection**: Connect to real Couchbase clusters and indexes
- **Index Schema Parsing**: Automatic extraction of field definitions from index
- **Real Query Execution**: Execute queries against live Couchbase FTS indexes
- **Authentication**: Secure connection with cluster credentials

#### Enhanced Query Development
- **Query History**: Save and retrieve recent queries
- **Custom Templates**: User-defined query templates for reuse
- **Query Snippets**: Quick-insert common query patterns
- **Query Explain**: Detailed scoring explanation and debugging information
- **Multi-query Support**: Tabbed interface for managing multiple queries

#### Results & Visualization
- **Advanced Result Formatting**: Syntax-highlighted JSON results
- **Facet Visualization**: Graphical display of facet results
- **Result Export**: Export results to JSON, CSV
- **Search Analytics**: Query performance tracking and optimization suggestions
- **Hit Highlighting**: Visual highlighting of matched terms in results

#### Collaboration Features
- **Share Queries**: Generate shareable links to queries
- **Query Comments**: Annotate queries with documentation
- **Team Templates**: Shared query templates across team
- **Version Control**: Track query changes over time

#### Observability & Monitoring
- **Query Performance Metrics**: Track query execution times and patterns
- **Error Analytics**: Aggregate and analyze query errors
- **Usage Statistics**: Dashboard showing most-used features and query types
- **A/B Testing Support**: Compare query variants and performance

#### Additional Cloud Services
- **Multi-Cloud Support**: AWS, Azure, and GCP Capella deployments
- **Offline Mode**: Work on queries without active connection
- **Query Optimizer**: Suggestions for improving query performance
- **Bulk Query Testing**: Test multiple query variations in batch

### Performance & Scalability
- Query execution latency < 100ms for local operations
- Support for indexes with 10,000+ fields
- Handle result sets up to 1,000 documents per page
- Real-time validation with < 50ms debounce

### Dependencies:
- Capella UI integration and embedding
- Authentication service integration
- Real-time index schema API
- Query history storage service
- Analytics and telemetry infrastructure
- Billing and usage tracking integration

---

## Success Metrics

### Private Beta
- **Developer Adoption**: 50+ internal developers using workbench
- **Query Accuracy**: 95% of queries execute without errors on first attempt
- **Time Savings**: 60% reduction in query development time vs manual JSON writing
- **Documentation Access**: 80% of users access hover documentation weekly

### Public Preview & GA
- **External Adoption**: 1,000+ Capella customers using workbench
- **Query Success Rate**: 98% of queries execute successfully
- **Feature Usage**: 70% of users utilize autocomplete and templates
- **Support Ticket Reduction**: 40% decrease in FTS-related support tickets
- **User Satisfaction**: 4.5/5 star rating in user surveys

---

## Risks & Mitigations

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Monaco Editor performance with large queries | High | Implement virtualization and lazy loading |
| Schema parsing for complex indexes | Medium | Fallback to manual field configuration |
| Real-time validation latency | Medium | Debouncing and incremental validation |

### Product Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Learning curve for advanced features | Medium | Comprehensive onboarding and tutorials |
| Query template coverage gaps | Low | User feedback loop for new templates |
| Integration complexity with Capella UI | High | Phased rollout with feature flags |

---

## Rollout Plan

### Phase 1: Private Beta (February 2026)
- Internal dogfooding with 10-20 developers
- Gather feedback on core features
- Iterate on UX and documentation
- Bug fixes and stabilization

### Phase 2: Limited Preview (March 2026)
- Release to select 50 enterprise customers
- Monitor usage patterns and performance
- Collect feature requests and pain points
- Refine autocomplete and validation

### Phase 3: Public Preview (April 2026)
- General availability to all Capella customers
- Marketing campaign and documentation release
- Training webinars and tutorials
- Continuous monitoring and improvement

### Phase 4: GA (June 2026)
- Full production release with SLA support
- Advanced features enabled for all users
- Integration with billing and analytics
- Long-term roadmap execution

---

## Related Documentation

- [FTS Query Templates Specification](./FTS_Query_Templates.md)
- [Feature Comparison Matrix](../src/services/searchWorkbench/FEATURE_COMPARISON.md)
- [Feature Implementation Status](../src/services/searchWorkbench/FEATURE_IMPLEMENTATION_STATUS.md)
- [Architecture Overview](../src/components/SearchWorkbench/ARCHITECTURE.md)
- [Configuration Guide](../src/services/searchWorkbench/CONFIGURATION_GUIDE.md)
- [Demo Guide](../DEMO_GUIDE.md)

---

## Team & Ownership

**Product Owner**: [TBD]  
**Engineering Lead**: [TBD]  
**Design Lead**: [TBD]  
**QA Lead**: [TBD]

**Engineering Team**:
- Frontend Engineers (2)
- Backend Engineers (1)
- DevOps Engineer (1)

**Dependencies**:
- Capella UI Team (integration)
- Search Team (FTS API)
- Documentation Team (content)
- Design Team (UX)

---

**Status**: 🟢 On Track  
**Current Phase**: Private Beta Development (30% Complete)  
**Next Milestone**: Private Beta Release - February 15, 2026
