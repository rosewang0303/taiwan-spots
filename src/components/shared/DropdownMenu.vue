<template>
    <div class="dropdown-menu">
        <div class="dropdown-menu__selected" @click="menuOpen = !menuOpen">
            <div class="dropdown-menu__selected-title">{{menuList[syncValue].title}}</div>
            <img :class="{'open': menuOpen}" src="@/assets/icon/dropdown_arrow.svg"/>
        </div>
        <div class="dropdown-menu__menu" :class="{'dropdown-menu__menu--open': menuOpen}">
            <ul>
                <li v-for="(item, index) in menuList" :key="index" @click="menuSelect(index)">{{item.title}}</li>
            </ul>
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
        menuList: {
            type: Array,
            default: () => { return [] },
        },
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
.dropdown-menu {
    &__selected {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid $gray-100;
        border-radius: 5px;
        padding: 11px 20px 11px 30px;
        img {
            transition: 0.5s all ease;
            &.open {
                transform: rotate(180deg);
                transform-origin: 0,0;
            }
        }
    }
    &__selected-title {
        color: $primary;
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
    ul {
        
    }
    li {
        cursor: pointer;
        padding: 11px 30px;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        border-bottom: 1px solid $gray;
        background-color: $white;
        transition: 0.5s all ease;
        &:nth-last-child(1) {
            border: none;
        }
        &:hover {
            background-color: $primary-20;
        }
    }
}
</style>