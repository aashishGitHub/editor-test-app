import { SearchQueryResult } from './types/QueryContext';

/**
 * Mock Search API - Simulates Couchbase FTS query execution
 * Returns mock search results for POC demonstration
 */
export async function executeMockSearchQuery(
  query: string,
  indexName: string
): Promise<SearchQueryResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));

  // Parse the query to extract some information
  let queryText = 'sample';
  try {
    const queryObj = JSON.parse(query);
    if (queryObj.query?.query) {
      queryText = queryObj.query.query;
    }
  } catch {
    // Use default if parsing fails
  }

  // Generate mock results based on query
  const numHits = Math.floor(Math.random() * 20) + 5;
  const hits = Array.from({ length: numHits }, (_, i) => ({
    id: `doc_${indexName}_${i + 1}`,
    score: (1.0 - i * 0.05).toFixed(2),
    fields: {
      name: `Sample Document ${i + 1}`,
      description: `This is a mock document matching query: "${queryText}"`,
      type: ['hotel', 'airline', 'airport', 'landmark'][i % 4],
      country: ['USA', 'France', 'UK', 'Japan'][i % 4],
    },
  }));

  return {
    status: {
      successful: 1,
    },
    total_hits: numHits,
    took: Math.floor(Math.random() * 10) + 2,
    hits,
  };
}

