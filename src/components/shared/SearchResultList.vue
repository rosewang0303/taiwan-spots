<template>
    <div ref="list" class="search-result-list">
        <div class="row">
            <div class="col-12">
                <div class="search-result-list__block-wrap">
                    <span class="search-result-list__title">搜尋結果</span>
                    <span>共有 <span class="search-result-list__count">{{list.length}}</span> 筆</span>
                </div>
            </div>
        </div>
        <div class="row" v-if="list.length == 0">
            <div class="col-12">
                <div class="search-result-list__not-found-wrap">
                    <div class="search-result-list__not-found">
                        <img src="@/assets/icon/not_found.svg"/>
                        <div>目前查無資料</div>
                        <div>請重新搜尋</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row search-result-list__item-wrap">
            <SearchCard class="search-result-list__item" v-for="(item, index) in showList" :key="index" :item="item" :routeName="routeName"/>
        </div>
        <div class="row">
            <Pagination class="col-12 search-result-list__pagination" :total="pageTotal" v-model="nowPage"/>
        </div>
    </div>
</template>
<script>
import SearchCard from '@/components/card/SearchCard'
import Pagination from '@/components/shared/Pagination'

export default {
    data () {
        return {
            pageTotal: 0,
            nowPage: 1,
            showList: [],
            dataSize: 20,
        }
    },
    props: {
        list: {
            type: Array,
            default: () => { return [] }
        },
        routeName: {
            type: String,
            default: null,
        },
    },
    watch: {
        list: {
            handler: function(val) {
                let total = 0;
                if(val.length > 0) {
                    let totalRaw = (val.length / this.dataSize).toString().split(".");
                    total = parseInt(totalRaw[0]);
                    if(totalRaw[1] && totalRaw[1] > 0) {
                        total++;
                    }
                }
                this.pageTotal = total;

                // 預設顯示list
                this.showList = JSON.parse(JSON.stringify(val)).splice(this.dataSize*(this.nowPage-1), this.dataSize)
            },
            immediate: true,
        },
        nowPage: {
            handler: function(val) {
                this.showList = JSON.parse(JSON.stringify(this.list)).splice(this.dataSize*(val-1), this.dataSize);
                window.scrollTo(0, this.$refs.list.offsetParent.offsetTop-60);
            },
        },
    },
    components: {
        SearchCard,
        Pagination,
    },
}
</script>
<style lang="scss" scoped>
.search-result-list {
    width: 100%;
    &__block-wrap {
        display: flex;
        align-items: flex-end;
        font-size: 18px;
        line-height: 26px;
        letter-spacing: 0.03em;
        color: $gray-800;
    }
    &__title {
        font-weight: 300;
        font-size: 36px;
        line-height: 42px;
        letter-spacing: 0.03em;
        color: $gray-900;
        margin-right: 7px;
    }
    &__count {
        color: $brown;
    }
    &__not-found-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80px;
    }
    &__not-found {
        font-weight: bold;
        font-size: 20px;
        line-height: 34px;
        color: $primary;
        text-align: center;
        img {
            margin-bottom: 11px;
        }
    }
    &__item-wrap {
        margin-top: 12px;
    }
    &__item {
        margin-bottom: 36px;
    }
    &__pagination {
        margin-top: 100px;
    }
}
@media screen and (max-width: 768px){
    .search-result-list {
        &__item {
            margin-bottom: 21px;
        }
        &__pagination {
            margin-top: 89px;
        }
    }
}
@media screen and (max-width: 576px){
    .search-result-list {

    }
}
</style>