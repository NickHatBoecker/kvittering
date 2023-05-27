<template>
    <div>
        <div v-if="value">
            <small>Ausgewählte Datei: {{ value.name }}</small>
            <button
                class="drop-file__icon u-reset-button text-danger"
                title="Datei entfernen"
                @click="$emit('input', null)"
            >
                <b-icon icon="x" aria-hidden="true" class="h5" />
            </button>
        </div>

        <div
            v-else
            ref="dropFile"
            class="drop-file u-flex u-flex--center p-24 u-text-center"
            @drop="handleFileDrop"
            @click="triggerClick"
        >
            <span class="text-mute">
                <template v-if="dragAndDropEnabled">Datei hier ablegen oder klicken</template>
                <template v-else>Drag and Drop wird nicht unterstützt</template>
            </span>
            <input
                ref="file"
                type="file"
                class="u-display-none"
                :accept="allowedTypes.join(',')"
                @change="onBrowseFile"
            />
        </div>

        <p v-if="error" class="text-error">{{ error }}</p>
    </div>
</template>

<script>
import { BIcon } from 'bootstrap-vue'

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg']

export default {
    name: 'DropFile',

    components: { BIcon },

    props: {
        value: { type: File, default: null },
        allowedTypes: { type: Array, default: () => ALLOWED_TYPES },
    },

    data: () => ({
        dragAndDropEnabled: false,
        error: '',
        browsedFile: null,
    }),

    watch: {
        async value (value) {
            if (!value && this.dragAndDropEnabled) {
                await this.$nextTick()
                this.bindEvents()
            }
        },
    },

    mounted () {
        // If drag and drop is capable, then we continue to bind events to our elements.
        this.dragAndDropEnabled = this.isDragAndDropCapable()
        if (this.dragAndDropEnabled) {
            this.bindEvents()
        }
    },

    methods: {
        bindEvents () {
            // Listen to all drag events and bind an event listener to each for the drop zone.
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
                /*
                    For each event add an event listener that prevents the default action
                    (opening the file in the browser) and stop the propagation of the event (so
                    no other elements open the file in the browser)
                */
                this.$refs?.dropFile.addEventListener(event, function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                }.bind(this), false)
            }.bind(this))
        },

        triggerClick () {
            this.$refs.file.click()
        },

        isDragAndDropCapable () {
            /**
             * Create a test element to see if certain events
             * are present that let us do drag and drop.
             */
            const div = document.createElement('div')

            /**
             * Check to see if the `draggable` event is in the element
             * or the `ondragstart` and `ondrop` events are in the element.
             * If they are, then we have what we need for dragging and dropping files.
             *
             * We also check to see if the window has `FormData` and `FileReader` objects present,
             * so we can do our AJAX uploading
             */
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
                && 'FormData' in window
                && 'FileReader' in window
        },

        handleFileDrop (event) {
            this.error = '' // Reset
            const file = event.dataTransfer.files[0]

            if (!this.allowedTypes.includes(file?.type)) {
                this.error = `Der Dateityp ${file.type} ist nicht erlaubt.`
                return
            }

            this.$emit('input', file)
        },

        onBrowseFile (event) {
            this.error = '' // Reset
            const file = event?.target?.files[0]

            if (!this.allowedTypes.includes(file?.type)) {
                this.error = `Der Dateityp ${file.type} ist nicht erlaubt.`
                return
            }

            this.$emit('input', file)
        },
    },
}
</script>

<style lang="scss" scoped>
.drop-file {
    height: 150px;
    width: 100%;
    background: $tertiary-color;
    cursor: pointer;

    &__icon {
        vertical-align: text-top;
    }
}
</style>
