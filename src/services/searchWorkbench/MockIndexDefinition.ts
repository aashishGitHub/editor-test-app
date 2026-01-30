/**
 * Mock Index Definition Service
 * Simulates fetching index definitions from a Couchbase cluster
 */

export interface IndexFieldMapping {
  name: string;
  type: string;
  analyzer?: string;
  index?: boolean;
  store?: boolean;
  include_term_vectors?: boolean;
  include_in_all?: boolean;
  docvalues?: boolean;
  dims?: number; // For vector fields
}

export interface IndexTypeMapping {
  enabled: boolean;
  dynamic: boolean;
  properties?: Record<string, IndexFieldMapping>;
}

export interface IndexDefinition {
  name: string;
  type: string;
  sourceName: string;
  sourceType: string;
  planParams: {
    maxPartitionsPerPIndex: number;
    numReplicas: number;
  };
  params: {
    doc_config: {
      docid_prefix_delim: string;
      docid_regexp: string;
      mode: string;
      type_field: string;
    };
    mapping: {
      analysis: Record<string, unknown>;
      default_analyzer: string;
      default_datetime_parser: string;
      default_field: string;
      default_mapping: IndexTypeMapping;
      default_type: string;
      docvalues_dynamic: boolean;
      index_dynamic: boolean;
      store_dynamic: boolean;
      type_field: string;
      types: Record<string, IndexTypeMapping>;
    };
    store: {
      indexType: string;
      segmentVersion: number;
    };
  };
  uuid?: string;
}

// Mock index definitions for demo purposes
const mockIndexDefinitions: Record<string, IndexDefinition> = {
  "travel-sample-index": {
    name: "travel-sample-index",
    type: "fulltext-index",
    sourceName: "travel-sample",
    sourceType: "couchbase",
    planParams: {
      maxPartitionsPerPIndex: 1024,
      numReplicas: 0,
    },
    params: {
      doc_config: {
        docid_prefix_delim: "",
        docid_regexp: "",
        mode: "scope.collection.type_field",
        type_field: "type",
      },
      mapping: {
        analysis: {},
        default_analyzer: "standard",
        default_datetime_parser: "dateTimeOptional",
        default_field: "_all",
        default_mapping: {
          enabled: true,
          dynamic: true,
        },
        default_type: "_default",
        docvalues_dynamic: false,
        index_dynamic: true,
        store_dynamic: false,
        type_field: "_type",
        types: {
          "inventory.hotel": {
            enabled: true,
            dynamic: false,
            properties: {
              name: {
                name: "name",
                type: "text",
                analyzer: "en",
                index: true,
                store: true,
                include_term_vectors: true,
                include_in_all: true,
              },
              description: {
                name: "description",
                type: "text",
                analyzer: "en",
                index: true,
                store: true,
                include_term_vectors: true,
              },
              city: {
                name: "city",
                type: "text",
                analyzer: "keyword",
                index: true,
                store: true,
              },
              country: {
                name: "country",
                type: "text",
                analyzer: "keyword",
                index: true,
              },
              reviews: {
                name: "reviews",
                type: "text",
                analyzer: "en",
                index: true,
              },
              geo: {
                name: "geo",
                type: "geopoint",
                index: true,
              },
              price: {
                name: "price",
                type: "number",
                index: true,
                docvalues: true,
              },
              avg_rating: {
                name: "avg_rating",
                type: "number",
                index: true,
                docvalues: true,
              },
              free_parking: {
                name: "free_parking",
                type: "boolean",
                index: true,
              },
            },
          },
          "inventory.airline": {
            enabled: true,
            dynamic: false,
            properties: {
              name: {
                name: "name",
                type: "text",
                analyzer: "standard",
                index: true,
                store: true,
              },
              callsign: {
                name: "callsign",
                type: "text",
                analyzer: "keyword",
                index: true,
              },
              country: {
                name: "country",
                type: "text",
                analyzer: "keyword",
                index: true,
              },
              iata: {
                name: "iata",
                type: "text",
                analyzer: "keyword",
                index: true,
              },
              icao: {
                name: "icao",
                type: "text",
                analyzer: "keyword",
                index: true,
              },
            },
          },
        },
      },
      store: {
        indexType: "scorch",
        segmentVersion: 15,
      },
    },
    uuid: "7b3f2a1c9d4e5f6a",
  },
  "vector-search-index": {
    name: "vector-search-index",
    type: "fulltext-index",
    sourceName: "travel-sample",
    sourceType: "couchbase",
    planParams: {
      maxPartitionsPerPIndex: 1024,
      numReplicas: 0,
    },
    params: {
      doc_config: {
        docid_prefix_delim: "",
        docid_regexp: "",
        mode: "scope.collection.type_field",
        type_field: "type",
      },
      mapping: {
        analysis: {},
        default_analyzer: "standard",
        default_datetime_parser: "dateTimeOptional",
        default_field: "_all",
        default_mapping: {
          enabled: false,
          dynamic: false,
        },
        default_type: "_default",
        docvalues_dynamic: false,
        index_dynamic: false,
        store_dynamic: false,
        type_field: "_type",
        types: {
          "embeddings.products": {
            enabled: true,
            dynamic: false,
            properties: {
              title: {
                name: "title",
                type: "text",
                analyzer: "en",
                index: true,
                store: true,
              },
              description: {
                name: "description",
                type: "text",
                analyzer: "en",
                index: true,
                store: true,
              },
              category: {
                name: "category",
                type: "text",
                analyzer: "keyword",
                index: true,
              },
              embedding: {
                name: "embedding",
                type: "vector",
                dims: 1536,
                index: true,
              },
              image_embedding: {
                name: "image_embedding",
                type: "vector",
                dims: 512,
                index: true,
              },
            },
          },
        },
      },
      store: {
        indexType: "scorch",
        segmentVersion: 15,
      },
    },
    uuid: "a1b2c3d4e5f6g7h8",
  },
};

/**
 * Fetch index definition (simulated)
 */
export async function fetchIndexDefinition(
  bucketName: string,
  indexName: string
): Promise<IndexDefinition | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return mock definition if available
  if (mockIndexDefinitions[indexName]) {
    return mockIndexDefinitions[indexName];
  }

  // Return a generic definition for unknown indexes
  return {
    name: indexName,
    type: "fulltext-index",
    sourceName: bucketName,
    sourceType: "couchbase",
    planParams: {
      maxPartitionsPerPIndex: 1024,
      numReplicas: 0,
    },
    params: {
      doc_config: {
        docid_prefix_delim: "",
        docid_regexp: "",
        mode: "type_field",
        type_field: "type",
      },
      mapping: {
        analysis: {},
        default_analyzer: "standard",
        default_datetime_parser: "dateTimeOptional",
        default_field: "_all",
        default_mapping: {
          enabled: true,
          dynamic: true,
        },
        default_type: "_default",
        docvalues_dynamic: false,
        index_dynamic: true,
        store_dynamic: false,
        type_field: "_type",
        types: {},
      },
      store: {
        indexType: "scorch",
        segmentVersion: 15,
      },
    },
  };
}

/**
 * Get list of available indexes for a bucket
 */
export async function fetchAvailableIndexes(
  bucketName: string
): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  // Return mock list based on bucket
  if (bucketName === "travel-sample") {
    return ["travel-sample-index", "vector-search-index"];
  }
  
  return [`${bucketName}-default-index`];
}
