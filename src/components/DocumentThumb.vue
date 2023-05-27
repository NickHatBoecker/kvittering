<template>
    <b-card
        class="document-thumb"
        :title="title"
        :img-src="thumb"
        img-top
        @mouseenter="showViewOverlay = true"
        @mouseleave="showViewOverlay = false"
    >
        <template #default>
            <button
                class="view-overlay u-reset-button"
                :class="{ 'view-overlay--show': showViewOverlay }"
                title="Open document"
                @click="openDocument"
            >
                <b-icon icon="eye-fill" aria-hidden="true" class="view-overlay__icon" />
            </button>
            <b-button
                v-if="actions.includes('edit')"
                squared
                variant="outline-secondary"
                size="sm"
                class="mr-2"
                title="Edit document"
                @click="$emit('edit', id)"
            >
                <b-icon icon="pencil-fill" aria-hidden="true" /> Edit
            </b-button>
            <b-button
                v-if="actions.includes('trash')"
                squared
                variant="outline-danger"
                size="sm"
                title="Move to trash"
                @click="$emit('trash', id)"
            >
                <b-icon icon="trash-fill" aria-hidden="true" /> Trash
            </b-button>
            <b-button
                v-if="actions.includes('untrash')"
                squared
                variant="outline-secondary"
                size="sm"
                class="mr-2"
                title="Move back to documents"
                @click="$emit('untrash', id)">
                <b-icon icon="arrow-left" aria-hidden="true" /> Untrash
            </b-button>
            <b-button
                v-if="actions.includes('delete')"
                squared
                variant="outline-danger"
                size="sm"
                title="Delete document permanently"
                @click="$emit('delete', id, url)"
            >
                <b-icon icon="trash-fill" aria-hidden="true" /> Delete
            </b-button>
        </template>
        <template #footer>
            <small class="text-muted">{{ $date(new Date(date), 'dd.MM.yyyy') }}</small>
        </template>
    </b-card>
</template>

<script>
import { BButton, BCard } from 'bootstrap-vue'

export default {
    name: 'DocumentThumb',

    components: { BButton, BCard },

    props: {
        id: { type: String, required: true },
        title: { type: String, required: true },
        date: { type: String, required: true },
        url: { type: String, required: true },

        // AVAILABLE_ACTIONS = ['edit', 'trash', 'delete', 'untrash']
        actions: { type: Array, default: () => ['edit', 'trash'] },
    },

    data: () => ({ thumb: '', showViewOverlay: false }),

    async mounted () {
        this.thumb = await this.$appwrite.getFileThumb(this.url)
    },

    methods: {
        async openDocument () {
            const { href } = await this.$appwrite.getFileUrl(this.url)

            setTimeout(() => {
                // Timeout is needed for iOS
                // @see https://stackoverflow.com/a/70463940/3356082
                window.open(href, '_blank', 'noreferrer')
            })
        },
    },
}
</script>

<style lang="scss" scoped>
$image-height: 427px;

.document-thumb {
    height: 100%;

    .card-img-top {
        position: relative;
    }

    .view-overlay {
        display: none;
        justify-content: center;
        align-items: center;
        background: rgba($secondary-color, 0.5);
        position: absolute;
        height: $image-height;
        top: 0;
        left: 0;
        right: 0;
        cursor: pointer;

        &--show {
            display: flex;
        }

        &__icon {
            font-size: 4rem;
            color: $white;
        }
    }

    .card-title {
        font-size: $font-size-base;
    }
}
</style>
