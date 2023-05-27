import { assoc, map, pick, pipe } from 'ramda'
import { ID, Account, Databases, Client, Query, Storage } from 'appwrite'

const DB_NAME = process.env.VUE_APP_DB_ID
const DOCUMENT_COLLECTION = process.env.VUE_APP_DOCUMENT_COLLECTION
const BUCKET_ID = process.env.VUE_APP_BUCKET

export const DOCUMENT_STATUS_PUBLISHED = 'published'
export const DOCUMENT_STATUS_TRASHED = 'trashed'

const client = (new Client())
    .setEndpoint(process.env.VUE_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.VUE_APP_APPWRITE_PROJECT_ID)

const databases = new Databases(client)
const storage = new Storage(client)

export default {
    client,
    account: new Account(client),

    getPublishedDocuments: async () => {
        const { documents } = await databases.listDocuments(DB_NAME, DOCUMENT_COLLECTION, [Query.equal('status', DOCUMENT_STATUS_PUBLISHED)])

        return map(doc => pipe(
            pick(['title', 'status', 'date', 'url']),
            assoc('id', doc.$id),
        )(doc))(documents)
    },

    getTrashedDocuments: async () => {
        const { documents } = await databases.listDocuments(DB_NAME, DOCUMENT_COLLECTION, [Query.equal('status', DOCUMENT_STATUS_TRASHED)])

        return map(doc => pipe(
            pick(['title', 'status', 'date', 'url']),
            assoc('id', doc.$id),
        )(doc))(documents)
    },

    addDocument: async (title, url, date) => {
        const id = ID.unique()
        const status = DOCUMENT_STATUS_PUBLISHED

        await databases.createDocument(DB_NAME, DOCUMENT_COLLECTION, id, { title, url, date, status, updated: new Date() })
    },

    updateDocument: async (id, title, date) => {
        await databases.updateDocument(DB_NAME, DOCUMENT_COLLECTION, id, { title, date, updated: new Date() })
    },

    trashDocument: async (id) => {
        await databases.updateDocument(DB_NAME, DOCUMENT_COLLECTION, id, { status: DOCUMENT_STATUS_TRASHED })
    },

    untrashDocument: async (id) => {
        await databases.updateDocument(DB_NAME, DOCUMENT_COLLECTION, id, { status: DOCUMENT_STATUS_PUBLISHED })
    },

    deleteDocument: async (id) => {
        await databases.deleteDocument(DB_NAME, DOCUMENT_COLLECTION, id)
    },

    getFileUrl: async (id) => {
        return await storage.getFileView(BUCKET_ID, id)
    },

    getFileThumb: async () => {
        // return await storage.getFilePreview(BUCKET_ID, id)
        return 'https://placekitten.com/g/300/450' // @TODO
    },

    uploadFile: async (file) => {
        const permissions = [] // @TODO

        const response = await storage.createFile(BUCKET_ID, ID.unique(), file, permissions)
        console.log(response)

        return 'file_id'
    },

    deleteFile: async (id) => {
        await storage.deleteFile(BUCKET_ID, id)
    },
}
