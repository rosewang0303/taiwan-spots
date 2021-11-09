<template>
    <div class="date-picker">
        <div class="date-picker__selected" @click="menuOpen = !menuOpen">
            <div class="date-picker__selected-title">{{syncValue?syncValue:"選擇日期"}}</div>
            <img src="@/assets/icon/datepicker.svg"/>
        </div>
        <div class="date-picker__menu" :class="{'date-picker__menu--open': menuOpen}">
            menu
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            menuOpen: false,
        }
    },
    props: {
        value: null, // 綁定的值:menuList的index
    },
    methods: {
        // 選擇處理
        menuSelect(index) {
            this.menuOpen = false;
            this.syncValue = index;
        }
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
.date-picker {
    &__selected {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid $gray-100;
        border-radius: 5px;
        padding: 11px 20px 11px 30px;
    }
    &__selected-title {
        color: $primary-500;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
    }
    &__menu {
        background-color: $white;
        overflow: hidden;
        border: 1px solid $gray;
        border-radius: 6px;
        position: absolute;
        z-index: $zindex-dropdown;
        top: 57px;
        left: 0;
        width: 100%;
        display: none;
        max-height: 350px;
        overflow: scroll;
        &--open {
            display: block;
        }
    }
}
</style>