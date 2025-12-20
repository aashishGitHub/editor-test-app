import { registerLanguage } from './language';
import { LanguageRegistrar } from '../../types';

export const registerSqlPlusPlus: LanguageRegistrar = {
  language: registerLanguage,
  schema: async () => {
    // Placeholder for schema registration
    return () => {};
  },
};

