<template>
    <b-modal ref="modal" hide-footer centered @hide="$emit('close')">
        <template #modal-title>
            Edit document
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
                <label for="tags">Tags</label>
                <b-form-tags
                    v-model="form.tags"
                    input-id="tags"
                    separator=","
                    tag-variant="dark"
                    remove-on-delete
                />
                <small class="m-0 text-muted">Press ENTER or , to add tag</small>
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
import { parseISO } from 'date-fns'
import { BModal, BButton, BSpinner, BFormTags } from 'bootstrap-vue'

export default {
    name: 'EditDocumentModal',

    components: { BModal, BButton, BSpinner, BFormTags },

    props: {
        document: { type: Object, required: true },
    },

    data () {
        return {
            isLoading: false,
            form: {
                title: this.document.title,
                date: this.document.date ? this.$date(parseISO(this.document.date), 'yyyy-MM-dd') : '',
                tags: this.document.tags ?? [],
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

                await this.$appwrite.updateDocument(this.document.id, this.form.title, date, this.form.tags)

                this.$emit('edit')
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
