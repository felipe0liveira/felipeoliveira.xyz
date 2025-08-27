import { firestore } from './index';

// ASCII collection reference
const asciiCollection = firestore.collection('ascii');
const terminalCommandsCollection = firestore.collection('terminal-commands');

export {
  asciiCollection,
  terminalCommandsCollection
};
