import { DocumentData, QuerySnapshot, DocumentSnapshot } from '@google-cloud/firestore';
import { asciiCollection } from './collections';
import { AsciiDocument } from './types';

// ASCII collection utilities
export const asciiUtils = {
  // Get all documents from ascii collection
  async getAll(): Promise<AsciiDocument[]> {
    try {
      const snapshot: QuerySnapshot<DocumentData> = await asciiCollection.get();
      const documents: AsciiDocument[] = [];
      
      snapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        } as AsciiDocument);
      });
      
      return documents;
    } catch (error) {
      console.error('Error getting ascii documents:', error);
      throw error;
    }
  },

  // Get document by ID
  async getById(id: string): Promise<AsciiDocument | null> {
    try {
      const doc: DocumentSnapshot<DocumentData> = await asciiCollection.doc(id).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return {
        id: doc.id,
        ...doc.data()
      } as AsciiDocument;
    } catch (error) {
      console.error('Error getting ascii document by ID:', error);
      throw error;
    }
  },

  // Create new document
  async create(data: Omit<AsciiDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const timestamp = new Date();
      const docRef = await asciiCollection.add({
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating ascii document:', error);
      throw error;
    }
  },

  // Update document
  async update(id: string, data: Partial<Omit<AsciiDocument, 'id' | 'createdAt'>>): Promise<void> {
    try {
      await asciiCollection.doc(id).update({
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating ascii document:', error);
      throw error;
    }
  },

  // Delete document
  async delete(id: string): Promise<void> {
    try {
      await asciiCollection.doc(id).delete();
    } catch (error) {
      console.error('Error deleting ascii document:', error);
      throw error;
    }
  }
};
