import { LanguageRegistrar } from '../../types';

export const registerCustomJava: LanguageRegistrar = {
  language: async () => {
    // CustomJava uses the built-in java language, no need to register
    return () => {};
  },
  schema: async () => {
    // Placeholder for schema registration
    return () => {};
  },
};

