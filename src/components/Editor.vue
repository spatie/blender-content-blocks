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
                        v-model="block[field][locale]"
                    ></div>
                </div>
            </locale>
            <div
                v-for="(type, collection) in mediaLibraryCollections"
                class="form__group"
            >
                <label>{{ labels[collection] }}</label>
                <media
                    :type="type"
                    :collection="collection"
                    :uploadUrl="data.mediaUploadUrl"
                    :model="{ name: data.mediaModel, id: block.id }"
                    v-model="block[collection]"
                ></media>
            </div>
        </div>
    </div>
</template>

<script>
import editor from '../mixins/editor';

export default {

    mixins: [editor],

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

    created() {
        this.ensureTranslatableAttributesExist();
        this.ensureMediaLibraryCollectionsExist();
    },

    methods: {
        ensureTranslatableAttributesExist() {
            for (let attribute in this.translatableAttributes) {
                if (! this.block.hasOwnProperty(attribute)) {
                    this.block[attribute] = this.createTranslatableBlueprint();
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
        }
    },
};
</script>
