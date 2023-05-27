<template>
    <div class="trash container mt-4">
        <div class="u-flex u-flex--vertical-end">
            <h1 class="mb-0 mr-12">
                <b-icon icon="trash" aria-hidden="true" />
                Trash <small class="text-muted">({{ numDocuments }})</small>
            </h1>
        </div>

        <div class="u-flex u-flex-wrap mt-5">
            <div
                v-for="document in documents"
                :key="document.id"
                class="col-12 col-md-3 mb-4"
            >
                <document-thumb
                    v-bind="document" :actions="['delete', 'untrash']"
                    @untrash="onUntrash"
                    @delete="onDelete"
                />
            </div>
        </div>
    </div>
</template>

<script>
import DocumentThumb from '@/components/DocumentThumb.vue'

export default {
    name: 'Trash',

    components: { DocumentThumb },

    data () {
        return {
            documents: [],
            showDeleteConfirmModal: false,
        }
    },

    computed: {
        numDocuments () {
            return this.documents.length
        },
    },

    mounted () {
        this.loadDocuments()
    },

    methods: {
        async loadDocuments () {
            this.isLoading = true

            try {
                this.documents = await this.$appwrite.getTrashedDocuments()
            } catch (e) {
                console.log(e)
                this.$toast.open({ type: 'error', message: e.message })
            } finally {
                this.isLoading = false
            }
        },

        async onUntrash (id) {
            await this.$appwrite.untrashDocument(id)
            await this.loadDocuments()
        },

        async onDelete (documentId, fileId) {
            await this.$appwrite.deleteDocument(documentId)
            await this.$appwrite.deleteFile(fileId)
            await this.loadDocuments()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
