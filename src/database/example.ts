// Example usage of Firestore database configuration

import { asciiUtils, AsciiDocument } from '../database';

// Example: How to use the ASCII collection utilities

export async function exampleUsage() {
  try {
    // Get all ASCII documents
    const allAscii: AsciiDocument[] = await asciiUtils.getAll();
    console.log('All ASCII documents:', allAscii);

    // Get specific ASCII document by ID
    const specificAscii = await asciiUtils.getById('document-id');
    console.log('Specific ASCII document:', specificAscii);

    // Create new ASCII document
    const newDocumentId = await asciiUtils.create({
      content: 'ASCII art content here',
      name: 'My ASCII Art'
    });
    console.log('Created document with ID:', newDocumentId);

    // Update ASCII document
    await asciiUtils.update(newDocumentId, {
      content: 'Updated ASCII art content'
    });
    console.log('Document updated successfully');

    // Delete ASCII document
    await asciiUtils.delete(newDocumentId);
    console.log('Document deleted successfully');

  } catch (error) {
    console.error('Error in example usage:', error);
  }
}
