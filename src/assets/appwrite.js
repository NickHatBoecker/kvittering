import { assoc, map, pick, pipe } from 'ramda'
import { ID, Account, Databases, Client, Query, Storage, Role, Permission } from 'appwrite'

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
const account = new Account(client)

export default {
    client,
    account,

    getPublishedDocuments: async () => {
        const { documents } = await databases.listDocuments(DB_NAME, DOCUMENT_COLLECTION, [Query.equal('status', DOCUMENT_STATUS_PUBLISHED)])

        return map(doc => pipe(
            pick(['title', 'status', 'date', 'fileId']),
            assoc('id', doc.$id),
            assoc('tags', doc.tags ? doc.tags.split(',') : []),
        )(doc))(documents)
    },

    getTrashedDocuments: async () => {
        const { documents } = await databases.listDocuments(DB_NAME, DOCUMENT_COLLECTION, [Query.equal('status', DOCUMENT_STATUS_TRASHED)])

        return map(doc => pipe(
            pick(['title', 'status', 'date', 'fileId']),
            assoc('id', doc.$id),
        )(doc))(documents)
    },

    addDocument: async (title, fileId, date, tags) => {
        const id = ID.unique()
        const status = DOCUMENT_STATUS_PUBLISHED

        const { $id: userId } = await account.get()
        const permittedUser = Role.user(userId)

        const permissions = [
            Permission.read(permittedUser),
            Permission.update(permittedUser),
            Permission.delete(permittedUser),
        ]

        await databases.createDocument(DB_NAME, DOCUMENT_COLLECTION, id, {
            title,
            fileId,
            date,
            tags: tags.join(','),
            status, updated: new Date(),
        }, permissions)
    },

    updateDocument: async (id, title, date, tags) => {
        await databases.updateDocument(DB_NAME, DOCUMENT_COLLECTION, id, {
            title,
            date,
            tags: tags.join(','),
            updated: new Date(),
        })
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

    getFileThumb: async (id) => {
        const { href } = await storage.getFilePreview(
            BUCKET_ID,
            id,
            300,
            366,
            'top',
            100,
            0,
            'ffffff',
            0,
            1,
            0,
            'ffffff',
            'jpg',
        )

        return href
    },

    uploadFile: async (file) => {
        const { $id: userId } = await account.get()
        const permittedUser = Role.user(userId)

        const permissions = [
            Permission.read(permittedUser),
            Permission.delete(permittedUser),
        ]

        const { $id } = await storage.createFile(BUCKET_ID, ID.unique(), file, permissions)

        return $id
    },

    deleteFile: async (id) => {
        await storage.deleteFile(BUCKET_ID, id)
    },
}
