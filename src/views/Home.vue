<template>
    <div class="home container mt-4">
        <div class="u-flex-wrap mx-12 u-flex u-flex--space-between u-flex--vertical-align">
            <div class="col-12 col-md-6 px-0 u-flex u-flex--vertical-end mb-24">
                <h1 class="mb-0 mr-12 h2">
                    <b-icon icon="files" aria-hidden="true" />
                    Documents <small class="text-muted">({{ numDocuments }})</small>
                </h1>
                <b-button variant="secondary" title="Add document" squared @click="showAddModal = true">
                    <b-icon icon="plus" aria-hidden="true" />
                </b-button>
            </div>

            <div v-if="documents.length" class="col-12 col-md-3 px-0 row u-flex--vertical-align">
                <div class="col-12 col-sm-5 u-text-right@desktop">
                    <label for="sortby"><small class="font-weight-bold">Sort by</small></label>
                </div>
                <div class="col-12 col-sm-7">
                    <select v-model="sortBy" class="form-control d-inline" id="sortby">
                        <option value="updated_desc">Changed</option>
                        <option value="date">Date ASC</option>
                        <option value="date_desc">Date DESC</option>
                        <option value="title">Title A-Z</option>
                        <option value="title_desc">Title Z-A</option>
                    </select>
                </div>
            </div>
        </div>

        <template v-if="documents.length">
            <div class="search__wrapper form-group mt-24 px-12">
                <input v-model="search" type="text" placeholder="Search for document..." class="form-control" />
                <button class="u-reset-button search__clear p-0" title="Clear" @click="search = ''">
                    <b-icon icon="x" class="text-dark" />
                </button>
            </div>

            <div v-if="sortedFilteredDocuments.length" class="u-flex u-flex-wrap mt-5">
                <div
                    v-for="document in sortedFilteredDocuments"
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
            <div v-else class="u-flex u-flex--center mt-5 h3 text-muted u-text-center px-12">No documents found with your criteria.</div>
        </template>
        <div v-else class="u-flex u-flex--center mt-5 h3 text-muted u-text-center px-12">You have not uploaded any documents yet.</div>

        <add-document-modal
            v-if="showAddModal"
            @close="showAddModal = false"
            @add="loadDocuments"
        />
        <edit-document-modal
            v-if="selectedDocumentToEdit && showEditModal"
            :document="selectedDocumentToEdit"
            @close="showEditModal = false"
            @edit="loadDocuments"
        />
    </div>
</template>

<script>
import { parseISO } from 'date-fns'
import { BButton, BIcon } from 'bootstrap-vue'
import { sortItems } from '@/assets/documents'
import DocumentThumb from '@/components/DocumentThumb.vue'
import AddDocumentModal from '@/components/ui/AddDocumentModal.vue'
import EditDocumentModal from '@/components/ui/EditDocumentModal.vue'

export default {
    name: 'Home',

    components: { AddDocumentModal, EditDocumentModal, BButton, BIcon, DocumentThumb },

    data () {
        return {
            isLoading: false,
            search: '',
            sortBy: 'updated_desc',
            documents: [],
            showAddModal: false,
            showEditModal: false,

            selectedDocumentToEdit: null,
        }
    },

    computed: {
        numDocuments () {
            return this.documents.length
        },

        sortedFilteredDocuments () {
            return sortItems(this.filteredDocuments, this.sortBy)
        },

        filteredDocuments () {
            const search = this.search

            return this.documents.filter(doc => {
                if (search) {
                    const loweredSearch = search.toLowerCase()
                    const docNameSatisfies = doc.title.toLowerCase().includes(loweredSearch)
                    const dateSatisfies = this.$date(parseISO(doc.date), 'dd/MM/yyyy').includes(loweredSearch)
                    const tagsSatisfy = doc.tags.join(',').toLowerCase().includes(loweredSearch)

                    if (!docNameSatisfies && !dateSatisfies && !tagsSatisfy) return false
                }

                return true
            })
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
            const document = this.documents.find(x => x.id === id) ?? null
            if (!document) {
                this.$toast.open({ type: 'error', message: 'An error occured. Please try again later.' })
                return
            }

            this.selectedDocumentToEdit = document
            this.showEditModal = true
        },

        async onTrash (id) {
            await this.$appwrite.trashDocument(id)
            await this.loadDocuments()
        },
    },
}
</script>

<style lang="scss" scoped>
.search {
    &__wrapper {
        position: relative;
    }

    &__clear {
        position: absolute;
        top: 0;
        bottom: 0;
        right: $spacing-unit-24;
        margin: auto;
        font-size: 1.5em;
    }
}
</style>
