<template>
    <tr v-if="isOpen" :id="domId">
        <td class="module__column--editor -active" colspan="4">
            <div class="module__column--editor__close">
                <a
                    href="#"
                    @click.prevent="close"
                    class="module__column__icon"
                >
                    <i class="fa fa-close"></i>
                </a>
            </div>
            <h3>{{ name }}</h3>
            <editor
                :block="block"
                :data="data"
            ></editor>
        </td>
    </tr>
    <tr v-else :class="{ '-is-disabled': isMarkedForRemoval }" :id="domId">
        <td class="module__column--drag">
            <i
                v-if="! isOpen && ! isMarkedForRemoval"
                class="js-handle fa fa-arrows-v module__column--drag__icon"
            ></i>
        </td>
        <td class="module__column -stretch" @click="open">
            <a
                v-if="! isMarkedForRemoval"
                href="#"
                @click.prevent="open"
                class="js-open-content-block"
            >{{ name }}</a>
            <span v-else>
                {{ name }}
            </span>
        </td>
        <td class="module__column -no-wrap">{{ type }}</td>
        <td  class="module__column--actions">
            <span v-if="! isOpen">
                <a
                    v-if="isMarkedForRemoval"
                    href="#"
                    @click.prevent="restore"
                    class="module__column__icon -restore"
                >
                    <i class="fa fa-undo"></i>
                </a>
                <a
                    v-else
                    href="#"
                    @click.prevent="markForRemoval"
                    class="module__column__icon -delete"
                >
                    <i class="fa fa-trash"></i>
                </a>
            </span>
        </td>
    </tr>
</template>

<script>
import { forEach, keys, pick } from 'lodash';
import Editor from './Editor';
import Vue from 'vue';

export default {

    props: {
        block: {
            required: true,
            type: Object,
        },
        data: {
            required: true,
            type: Object,
        },
        isOpen: {
            required: true,
            type: Boolean,
        },
    },

    components: {
        Editor,
    },

    created() {
        if (! this.editor.types) {
            throw new Error('Please provide a default set of types for the ' +
                'content blocks editor instance.');
        }

        if (! this.editor.translatableAttributes) {
            throw new Error('Please provide a set of translatable attributes ' +
                'for the content blocks editor instance.');
        }

        if (! this.editor.mediaLibraryCollections) {
            throw new Error('Please provide a set of medialibrary collections ' +
                'for the content blocks editor instance.');
        }

        this.ensureBlockHasValidType();
    },

    computed: {
        name() {
            return this.block.name[this.data.contentLocale] || '[untitled]';
        },

        type() {
            return this.types[this.block.type];
        },

        locales() {
            return this.data.locales;
        },

        isMarkedForRemoval() {
            return this.block.markedForRemoval;
        },

        editor() {
            return Editor;
        },

        types() {
            return this.data.types || this.editor.types;
        },

        domId() {
            return 'content-blocks-' + this.block.collection + '-' + this.block.id;
        },
    },

    methods: {
        open() {
            this.$emit('open', { id: this.block.id });
        },

        close() {
            this.$emit('close', { id: this.block.id });
        },

        markForRemoval() {
            Vue.set(this.block, 'markedForRemoval', true);
            this.close();
        },

        restore() {
            Vue.set(this.block, 'markedForRemoval', false);
        },

        ensureBlockHasValidType() {
            for (let type in this.types) {
                if (this.block.type === type) {
                    return;
                }
            }

            this.block.type = Object.keys(this.types)[0];
        },
    },
};
</script>
