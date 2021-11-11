<template>
    <div class="breadcrumb">
        <div class="breadcrumb__wrap">
            <div class="breadcrumb__item">
                <router-link :to="{name: 'Index'}">首頁</router-link>
            </div>
            <div class="breadcrumb__item" :class="{'breadcrumb__item--active': index == list.length-1}"
                v-for="(item, index) in list" :key="index">
                <div class="breadcrumb__slash">/</div>
                <router-link :to="{name: item.routeName, query: item.query, params: item.params}">{{item.title}}</router-link>
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
        flex-wrap: wrap;
        white-space: nowrap;
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