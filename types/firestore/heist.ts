import { DocumentData, FieldValue, QueryDocumentSnapshot } from 'firebase/firestore'

// Document — what you read from Firestore (after conversion)
export interface Heist {
  id: string
  title: string
  description: string
  createdBy: string // uid
  createdByCodename: string
  assignedTo: string // uid
  assignedToCodeName: string
  deadline: Date // 48 hours from creation
  finalStatus: 'success' | 'failure' | null
  createdAt: Date
}

// Create Input — what you pass to addDoc
export interface CreateHeistInput {
  title: string
  description: string
  createdBy: string
  createdByCodename: string
  assignedTo: string
  assignedToCodeName: string
  deadline: Date // 48 hours from creation
  finalStatus: null
  createdAt: FieldValue // serverTimestamp()
}

// Update Input — partial fields for updateDoc (excludes createdAt)
export interface UpdateHeistInput {
  title?: string
  description?: string
  assignedTo?: string
  assignedToCodeName?: string
  deadline?: Date
  finalStatus?: 'success' | 'failure' | null
}

// Converter for type-safe Firestore operations
export const heistConverter = {
  toFirestore: (data: Partial<Heist>): DocumentData => data,

  fromFirestore: (snapshot: QueryDocumentSnapshot): Heist => ({
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: snapshot.data().createdAt?.toDate(),
    deadline: snapshot.data().deadline?.toDate(),
  } as Heist),
}
