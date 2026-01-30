import { useState, useEffect } from 'react';
import { IndexDefinition, fetchIndexDefinition } from '../../services/searchWorkbench/MockIndexDefinition';

interface IndexDefinitionPanelProps {
  bucketName: string;
  indexName: string;
}

export const IndexDefinitionPanel = ({ bucketName, indexName }: IndexDefinitionPanelProps) => {
  const [indexDef, setIndexDef] = useState<IndexDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadIndexDefinition = async () => {
      if (!bucketName || !indexName) {
        setIndexDef(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const def = await fetchIndexDefinition(bucketName, indexName);
        setIndexDef(def);
        // Auto-expand first type if available
        if (def?.params.mapping.types) {
          const firstType = Object.keys(def.params.mapping.types)[0];
          if (firstType) {
            setExpandedTypes(new Set([firstType]));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load index definition');
      } finally {
        setIsLoading(false);
      }
    };

    loadIndexDefinition();
  }, [bucketName, indexName]);

  const toggleTypeExpansion = (typeName: string) => {
    setExpandedTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(typeName)) {
        newSet.delete(typeName);
      } else {
        newSet.add(typeName);
      }
      return newSet;
    });
  };

  const getFieldTypeIcon = (type: string): string => {
    switch (type) {
      case 'text': return '📝';
      case 'number': return '🔢';
      case 'boolean': return '✓';
      case 'geopoint': return '📍';
      case 'vector': return '🧮';
      case 'datetime': return '📅';
      default: return '📄';
    }
  };

  const getFieldTypeBadgeClass = (type: string): string => {
    switch (type) {
      case 'text': return 'field-type-text';
      case 'number': return 'field-type-number';
      case 'boolean': return 'field-type-boolean';
      case 'geopoint': return 'field-type-geo';
      case 'vector': return 'field-type-vector';
      default: return 'field-type-default';
    }
  };

  if (isLoading) {
    return (
      <div className="index-definition-panel">
        <div className="index-def-header">
          <div className="index-def-icon">📋</div>
          <h3>Index Definition</h3>
        </div>
        <div className="index-def-loading">
          <div className="loading-spinner"></div>
          <p>Loading index definition...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="index-definition-panel">
        <div className="index-def-header">
          <div className="index-def-icon">📋</div>
          <h3>Index Definition</h3>
        </div>
        <div className="index-def-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!indexDef) {
    return (
      <div className="index-definition-panel">
        <div className="index-def-header">
          <div className="index-def-icon">📋</div>
          <h3>Index Definition</h3>
        </div>
        <div className="index-def-empty">
          <span className="empty-icon">🔍</span>
          <p>Select a bucket and index to view its definition</p>
        </div>
      </div>
    );
  }

  const types = indexDef.params.mapping.types;
  const hasTypes = types && Object.keys(types).length > 0;

  return (
    <div className="index-definition-panel">
      <div className="index-def-header">
        <div className="index-def-icon">📋</div>
        <h3>Index Definition</h3>
        <span className="index-name-badge">{indexDef.name}</span>
      </div>

      {/* Index Overview */}
      <div className="index-overview">
        <div className="overview-row">
          <span className="overview-label">Source:</span>
          <span className="overview-value">{indexDef.sourceName}</span>
        </div>
        <div className="overview-row">
          <span className="overview-label">Type:</span>
          <span className="overview-value">{indexDef.type}</span>
        </div>
        <div className="overview-row">
          <span className="overview-label">Default Analyzer:</span>
          <span className="overview-value analyzer-badge">
            {indexDef.params.mapping.default_analyzer}
          </span>
        </div>
        <div className="overview-row">
          <span className="overview-label">Dynamic Indexing:</span>
          <span className={`overview-value ${indexDef.params.mapping.index_dynamic ? 'enabled' : 'disabled'}`}>
            {indexDef.params.mapping.index_dynamic ? '✓ Enabled' : '✗ Disabled'}
          </span>
        </div>
      </div>

      {/* Type Mappings */}
      <div className="type-mappings-section">
        <h4 className="section-title">
          <span className="section-icon">🗂️</span>
          Type Mappings
          {hasTypes && (
            <span className="type-count">{Object.keys(types).length} type(s)</span>
          )}
        </h4>

        {!hasTypes ? (
          <div className="no-types-message">
            <p>Using dynamic mapping (all fields indexed automatically)</p>
          </div>
        ) : (
          <div className="types-list">
            {Object.entries(types).map(([typeName, typeMapping]) => (
              <div key={typeName} className="type-item">
                <button
                  className={`type-header ${expandedTypes.has(typeName) ? 'expanded' : ''}`}
                  onClick={() => toggleTypeExpansion(typeName)}
                  type="button"
                >
                  <span className="expand-icon">
                    {expandedTypes.has(typeName) ? '▼' : '▶'}
                  </span>
                  <span className="type-name">{typeName}</span>
                  {typeMapping.properties && (
                    <span className="field-count">
                      {Object.keys(typeMapping.properties).length} fields
                    </span>
                  )}
                  <span className={`type-status ${typeMapping.enabled ? 'enabled' : 'disabled'}`}>
                    {typeMapping.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </button>

                {expandedTypes.has(typeName) && typeMapping.properties && (
                  <div className="type-fields">
                    <table className="fields-table">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Analyzer</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(typeMapping.properties).map(([fieldName, fieldDef]) => (
                          <tr key={fieldName} className="field-row">
                            <td className="field-name">
                              <span className="field-icon">{getFieldTypeIcon(fieldDef.type)}</span>
                              {fieldDef.name}
                            </td>
                            <td>
                              <span className={`field-type-badge ${getFieldTypeBadgeClass(fieldDef.type)}`}>
                                {fieldDef.type}
                                {fieldDef.dims && <span className="dims-info">[{fieldDef.dims}]</span>}
                              </span>
                            </td>
                            <td className="field-analyzer">
                              {fieldDef.analyzer || '-'}
                            </td>
                            <td className="field-options">
                              {fieldDef.index && <span className="option-badge index">idx</span>}
                              {fieldDef.store && <span className="option-badge store">store</span>}
                              {fieldDef.include_term_vectors && <span className="option-badge tv">tv</span>}
                              {fieldDef.docvalues && <span className="option-badge dv">dv</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Reference */}
      <div className="quick-reference">
        <h4 className="section-title">
          <span className="section-icon">💡</span>
          Quick Reference
        </h4>
        <div className="reference-grid">
          <div className="reference-item">
            <span className="ref-icon">idx</span>
            <span className="ref-text">Indexed</span>
          </div>
          <div className="reference-item">
            <span className="ref-icon">store</span>
            <span className="ref-text">Stored</span>
          </div>
          <div className="reference-item">
            <span className="ref-icon">tv</span>
            <span className="ref-text">Term Vectors</span>
          </div>
          <div className="reference-item">
            <span className="ref-icon">dv</span>
            <span className="ref-text">Doc Values</span>
          </div>
        </div>
      </div>
    </div>
  );
};
