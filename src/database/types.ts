// Firestore document types

export interface AsciiDocument {
  id?: string;
  content: string;
  name?: string;
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}

// Generic Firestore document interface
export interface FirestoreDocument {
  id?: string;
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}
