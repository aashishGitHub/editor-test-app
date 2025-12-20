import { registerLanguage } from './language';
import { LanguageRegistrar } from '../../types';

export const registerN1QL: LanguageRegistrar = {
  language: registerLanguage,
  schema: async () => {
    // Placeholder for schema registration
    return () => {};
  },
};

