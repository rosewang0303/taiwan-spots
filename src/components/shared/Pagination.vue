<template>
    <div class="pagination">
        <div class="pagination__wrap">
            <div class="pagination__left" :class="{'pagination__left--disabled': leftDisabled}" @click="pagePrevious()"></div>
            <div class="pagination__page" v-for="(item, index) in total" :key="index"
                :class="{'pagination__page--active': syncValue == (index+1)}" @click="changePage(index+1)">{{index+1}}</div>
            <div class="pagination__right" :class="{'pagination__right--disabled': rightDisabled}" @click="pageNext()"></div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            leftDisabled: true,
            rightDisabled: false,
        }
    },
    props: {
        value: null,
        total: {
            type: Number,
            default: 0,
        },
    },
    watch: {
        value: {
            handler: function(val) {
                if(val == 1) {
                    this.leftDisabled = true;
                }else {
                    this.leftDisabled = false;
                }
                if(val == this.total || this.total == 0) {
                    this.rightDisabled = true;
                }else {
                    this.rightDisabled = false;
                }
            },
            immediate: true,
        },
    },
    mounted() {
    },
    methods: {
        // 換頁
        changePage(page) {
            this.syncValue = page;
        },
        pagePrevious() {
            if(this.syncValue != 1) {
                this.syncValue--;
            }
        },
        pageNext() {
            if(this.syncValue != this.total) {
                this.syncValue++;
            }
        },
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
.pagination {
    &__wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    &__left {
        cursor: pointer;
        width: 32px;
        height: 32px;
        background-image: url('~@/assets/icon/page_left_green.svg');
        background-repeat: no-repeat;
        background-position: center;
        margin-right: 8px;
        border: 1px solid $gray;
        border-radius: 4px;
        margin-bottom: 8px;
        &:hover {
            border: 1px solid $gray-600;
        }
        &--disabled {
            cursor: not-allowed;
            opacity: 0.5;
            background-color: $gray;
            &:hover {
                border: 1px solid $gray;
            }
        }
    }
    &__page {
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid $gray;
        border-radius: 4px;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        color: $gray-800;
        margin-right: 8px;
        margin-bottom: 8px;
        &:hover {
            border: 1px solid $gray-600;
        }
        &--active {
            border: 1px solid $primary-800;
            color: $primary-800;
        }
    }
    &__right {
        cursor: pointer;
        width: 32px;
        height: 32px;
        background-image: url('~@/assets/icon/page_right_green.svg');
        background-repeat: no-repeat;
        background-position: center;
        border: 1px solid $gray;
        border-radius: 4px;
        margin-bottom: 8px;
        &:hover {
            border: 1px solid $gray-600;
        }
        &--disabled {
            cursor: not-allowed;
            opacity: 0.5;
            background-color: $gray;
            &:hover {
                border: 1px solid $gray;
            }
        }
    }
}
@media screen and (max-width: 768px){
    .pagination {
    }
}
@media screen and (max-width: 576px){
    .pagination {
    }
}
</style>