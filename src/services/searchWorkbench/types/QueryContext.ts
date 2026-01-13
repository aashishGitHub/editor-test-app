export interface ISearchQueryContext {
  bucketName: string;
  indexName: string;
}

export interface SearchQueryResult {
  hits: any[];
  status: {
    successful: number;
  };
  total_hits: number;
  took: number;
}

export interface QueryStatusProps {
  queryStatus: 'success' | 'fatal' | 'running';
  rtt: string;
  elapsed: string;
  numDocs: string;
  size: string;
}

