<template>
    <div class="home container mt-4">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <div class="ml-12 u-flex u-flex--vertical-end">
            <h1 class="mb-0 mr-12">
                <b-icon icon="files" aria-hidden="true" />
                Documents <small class="text-muted">({{ numDocuments }})</small>
            </h1>
            <b-button variant="secondary" title="Add document" squared @click="showAddModal = true">
                <b-icon icon="plus" aria-hidden="true" />
            </b-button>
        </div>

        <div v-if="documents.length" class="u-flex u-flex-wrap mt-5">
            <div
                v-for="document in documents"
                :key="document.id"
                class="col-12 col-md-3 mb-4"
            >
                <document-thumb
                    v-bind="document"
                    @edit="onEdit"
                    @trash="onTrash"
                />
            </div>
        </div>
        <div v-else class="u-flex u-flex--center mt-5 h3 text-muted">You have not uploaded any documents yet.</div>

        <add-document-modal
            v-if="showAddModal"
            @close="showAddModal = false"
            @add="loadDocuments"
        />
    </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import DocumentThumb from '@/components/DocumentThumb.vue'
import AddDocumentModal from '@/components/ui/AddDocumentModal.vue'

export default {
    name: 'Home',

    components: { AddDocumentModal, BButton, DocumentThumb },

    data () {
        return {
            isLoading: false,
            documents: [],
            showAddModal: false,
            showEditModal: false,
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
                this.documents = await this.$appwrite.getPublishedDocuments()
            } catch (e) {
                console.log(e)
                this.$toast.open({ type: 'error', message: e.message })
            } finally {
                this.isLoading = false
            }
        },

        async onEdit (id) {
            await this.$appwrite.updateDocument(id, 'Test document (updated)', '2018-01-01')
            await this.loadDocuments()
        },

        async onTrash (id) {
            await this.$appwrite.trashDocument(id)
            await this.loadDocuments()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
