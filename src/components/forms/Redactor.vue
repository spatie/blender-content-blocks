<template>
    <div class="form__group">
        <label>
            {{ label }}
        </label>
        <textarea
            :value="value"
            ref="textarea"
        ></textarea>
    </div>
</template>

<script>
export default {

    props: {
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        settings: {
            type: Object,
            default: () => ({}),
        },
    },

    mounted() {
        const settings = { ...this.settings };

        const $textarea = $(this.$refs.textarea);
        const emitInput = () => this.$emit('input', $textarea.val());

        $textarea.redactor(settings);

        $textarea.on('change.callback.redactor', () => {
            emitInput();
        });
    },
};
</script>
