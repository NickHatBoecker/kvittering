<template>
    <b-modal ref="modal" hide-footer centered @hide="$emit('close')">
        <template #modal-title>
            Add document
        </template>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="title">Title <sup title="Mandatory">*</sup></label>
                <input v-model="form.title" class="form-control" type="text" id="title" required />
            </div>

            <div class="form-group">
                <label for="date">Date</label>
                <input v-model="form.date" class="form-control" type="date" id="date" />
            </div>

            <div class="form-group">
                <label for="file">File <sup title="Mandatory">*</sup></label>
                <drop-file v-model="form.file" />
            </div>

            <div class="form-group">
                <label for="tags">Tags</label>
                <b-form-tags input-id="tags" v-model="form.tags" />
                <small class="m-0 text-muted">Press ENTER to add tag</small>
            </div>

            <b-button type="submit" variant="secondary" block>
                <b-spinner v-if="isLoading" small />
                <template v-else>Submit</template>
            </b-button>
            <b-button type="button" variant="dark" block @click="$emit('close')">Cancel</b-button>
        </form>
    </b-modal>
</template>

<script>
import { BModal, BButton, BSpinner, BFormTags } from 'bootstrap-vue'
import DropFile from '@/components/form/DropFile.vue'

export default {
    name: 'AddDocumentModal',

    components: { BModal, BButton, BSpinner, BFormTags, DropFile },

    data () {
        return {
            isLoading: false,
            form: {
                title: '',
                date: '',
                file: null,
                tags: [],
            },
        }
    },

    mounted () {
        this.$refs.modal.show()
    },

    methods: {
        async onSubmit () {
            this.isLoading = true

            try {
                let date = new Date()
                if (this.form.date) {
                    date = new Date(this.form.date)
                }

                const fileId = await this.$appwrite.uploadFile(this.form.file)
                await this.$appwrite.addDocument(this.form.title, fileId, date, this.form.tags)

                this.$emit('add')
                this.$emit('close')
            } catch (e) {
                console.log(e)
                this.$toast.open({ type: 'error', message: e.message })
            } finally {
                this.isLoading = false
            }
        },
    },
}
</script>
