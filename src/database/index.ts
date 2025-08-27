import { Firestore } from '@google-cloud/firestore'
import path from 'path'

const isProduction = process.env.NODE_ENV == 'production'
const keyFilePath = isProduction
	? null
	: path.join(process.cwd(), 'felipeoliveira-xyz-credentials.json')

// Initialize Firestore with the default database
const firestore = new Firestore({
	projectId: 'felipeoliveira-xyz',
	databaseId: '(default)',
	...(isProduction ? {} : { keyFilename: keyFilePath! }),
})

// Export firestore instance
export { firestore }

// Export collections
export * from './collections'

// Export types
export * from './types'

// Export utilities
export * from './utils'
