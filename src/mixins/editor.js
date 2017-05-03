import Media from '@spatie/blender-media';
import { Locale, PlainText, Redactor, Type } from '../components/forms';
import Vue from 'vue';

export default {

    props: ['block', 'data'],

    components: {
        Media,
        Locale,
        Redactor,
        PlainText,
        Type,
    },

    computed: {
        types() {
            if (this.data.types !== undefined) {
                return this.data.types;
            }

            return this.$options.types;
        },

        translatableAttributes() {
            if (this.data.translatableAttributes !== undefined) {
                return this.data.translatableAttributes;
            }

            return this.$options.translatableAttributes;
        },

        mediaLibraryCollections() {
            if (this.data.mediaLibraryCollections !== undefined) {
                return this.data.mediaLibraryCollections;
            }

            return this.$options.mediaLibraryCollections;
        },

        locales() {
            return this.data.locales;
        },
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
            Vue.set(this.block[key], locale, value);
        },
    },
};
