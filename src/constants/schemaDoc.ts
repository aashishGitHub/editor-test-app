import type { SchemaDoc } from '../components/editor/languages/types';

export const SAMPLE_SCHEMA_DOC: SchemaDoc = {
  jsonSchema: [
    'travel-sample',
    'travel-sample.inventory.',
    'travel-sample.inventory.airline',
    'travel-sample.inventory.hotel',
    'travel-sample.inventory.route',
    'name',
    'callsign',
    'country',
    'city',
    'rating',
  ],
  indexes: [
    'def_inventory_airline_primary',
    'def_inventory_hotel_primary',
    'idx_hotel_city',
  ],
};

