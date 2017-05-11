<template>
    <div class="module__editor>">
        <div class="module__editor__column -stacked">
            <label>Type</label>
            <type
                v-model="block.type"
                :options="types"
            ></type>
            <locale
                v-for="locale in locales"
                :locale="locale"
            >
                <div v-for="(type, field) in translatableAttributes">
                    <div
                        :is="getFieldType(type)"
                        :label="labels[field]"
                        :value="getTranslation(field, locale)"
                        @input="setTranslation(field, locale, $event)"
                    ></div>
                </div>
            </locale>
            <div
                v-for="(type, collection) in mediaLibraryCollections"
                class="form__group"
            >
                <label>{{ labels[collection] }}</label>
                <blender-media
                    :type="type"
                    :collection="collection"
                    :uploadUrl="data.mediaUploadUrl"
                    :model="{ name: data.mediaModel, id: block.id }"
                    :value="block[collection]"
                    @input="block[collection] = $event"
                ></blender-media>
            </div>
        </div>
    </div>
</template>

<script>
import { Locale, PlainText, BlenderMedia, Redactor, Type } from './forms';

export default {

    props: ['block', 'data'],

    components: {
        BlenderMedia,
        Locale,
        PlainText,
        Redactor,
        Type,
    },

    types: {
        imageLeft: 'Afbeelding links',
        imageRight: 'Afbeelding rechts',
    },

    translatableAttributes: {
        name: 'text',
        text: 'redactor',
    },

    mediaLibraryCollections: {
        image: 'image',
    },

    labels: {
        name: 'Titel',
        text: 'Tekst',
        image: 'Afbeelding',
    },

    computed: {
        types() {
            return this.data.types || this.$options.types;
        },

        translatableAttributes() {
            return this.data.translatableAttributes || this.$options.translatableAttributes;
        },

        mediaLibraryCollections() {
            return this.data.mediaLibraryCollections || this.$options.mediaLibraryCollections;
        },

        labels() {
            return { ...this.$options.labels, ...(this.data.labels || {}) };
        },

        locales() {
            return this.data.locales;
        },
    },

    created() {
        this.ensureTranslatableAttributesExist();
        this.ensureMediaLibraryCollectionsExist();
    },

    methods: {
        getFieldType(type) {
            switch (type) {
                case 'redactor':
                    return 'redactor';
                case 'text':
                default:
                    return 'plain-text';
            }
        },

        getTranslation(key, locale) {
            return this.block[key][locale];
        },

        setTranslation(key, locale, value) {
            this.$set(this.block[key], locale, value);
        },

        ensureTranslatableAttributesExist() {
            for (let attribute in this.translatableAttributes) {
                if (! this.block.hasOwnProperty(attribute)) {
                    this.$set(this.block, attribute, this.createTranslatableBlueprint());
                }
            }
        },

        ensureMediaLibraryCollectionsExist() {
            for (let collection in this.mediaLibraryCollections) {
                if (! this.block.hasOwnProperty(collection)) {
                    this.block[collection] = [];
                }
            }
        },

        createTranslatableBlueprint() {
            return this.locales.reduce(
                (acc, locale) => (acc[locale] = '', acc), {}
            );
        },
    },
};
</script>
