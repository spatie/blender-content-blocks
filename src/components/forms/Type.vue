<template>
    <div>
        <select
            :value="value" 
            @change="$emit('input', $event.target.value)"
        >
            <option
                v-for="(label, value) in options"
                :value="value"
            >
                {{ label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {

    props: ['value', 'options'],
};
</script>