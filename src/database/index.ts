import { Firestore } from '@google-cloud/firestore';

// Initialize Firestore with the default database
const firestore = new Firestore({
  projectId: 'felipeoliveira-xyz',
  databaseId: '(default)',
});

// Export firestore instance
export { firestore };

// Export collections
export * from './collections';

// Export types
export * from './types';

// Export utilities
export * from './utils';
