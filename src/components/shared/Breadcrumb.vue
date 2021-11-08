<template>
    <div class="breadcrumb">
        <div class="breadcrumb__wrap">
            <div class="breadcrumb__item">
                <a href="index">首頁</a>
            </div>
            <div class="breadcrumb__item" :class="{'breadcrumb__item--active': index == list.length-1}"
                v-for="(item, index) in list" :key="index">
                <div class="breadcrumb__slash">/</div>
                <a :href="item.url">{{item.title}}</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    props: {
        list: {
            type: Array,
            default: () => { return [] }
        },
    },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    &__wrap {
        display: flex;
        align-items: center;
    }
    &__item {
        font-size: 16px;
        line-height: 175%;
        display: flex;
        align-items: center;
        a {
            color: $primary-500;
        }
        &--active {
            a {
                color: $gray-800;
            }
        }
    }
    &__slash {
        margin: 0 8px;
        font-size: 16px;
        line-height: 175%;
        color: $gray-800;
    }
}
</style>