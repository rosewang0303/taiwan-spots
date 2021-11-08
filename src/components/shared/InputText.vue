<template>
    <div class="input-text">
        <input type="text" v-model="syncValue" :placeholder="placeholder" :disabled="disabled"/>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    props: {
        value: null, // 綁定的值:menuList的index
        placeholder: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    mounted: {

    },
    methods: {
    },
    computed: {
        syncValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.input-text {
    input {
        width: 100%;
        background: $gray-200;
        border: 1px solid $gray-100;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 11px 30px;
        font-size: 16px;
        line-height: 28px;
        color: $black;
        &:hover {
            border: 1px solid $gray-600;
        }
        &:focus {
            border: 1px solid $black;
        }
        &::placeholder {
            color: $gray-600;
        }
    }
}
</style>