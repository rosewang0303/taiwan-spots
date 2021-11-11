<template>
    <div class="nearby-info">
        <div class="nearby-info__nearby-title">周邊資訊：</div>
        <div class="nearby-info__nearby-item-wrap">
            <router-link v-if="spotDetail.ID && (item.ID != spotDetail.ID)" class="nearby-info__nearby-item" :to="{name: 'SpotDetail', params:{'id': spotDetail.ID} }">
                <img src="@/assets/icon/nearby_spot.svg"/>
                <div>附近景點</div>
            </router-link>
            <div v-else class="nearby-info__nearby-item">
                <img src="@/assets/icon/nearby_spot.svg"/>
                <div>附近景點:無</div>
            </div>
            <router-link v-if="eventDetail.ID && (item.ID != eventDetail.ID)" class="nearby-info__nearby-item" :to="{name: 'EventDetail', params:{'id': eventDetail.ID} }">
                <img src="@/assets/icon/nearby_event.svg"/>
                <div>附近活動</div>
            </router-link>
            <div v-else class="nearby-info__nearby-item">
                <img src="@/assets/icon/nearby_event.svg"/>
                <div>附近活動:無</div>
            </div>
            <router-link v-if="foodDetail.ID && (item.ID != foodDetail.ID)" class="nearby-info__nearby-item" :to="{name: 'FoodDetail', params:{'id': foodDetail.ID} }">
                <img src="@/assets/icon/nearby_food.svg"/>
                <div>附近美食</div>
            </router-link>
            <div v-else class="nearby-info__nearby-item">
                <img src="@/assets/icon/nearby_food.svg"/>
                <div>附近美食:無</div>
            </div>
        </div>
    </div>
</template>
<script>
import { apiGetEventList, apiGetSpotList, apiGetFoodList } from "@/api/api"; 

export default {
    data () {
        return {
            foodDetail: {},
            eventDetail: {},
            spotDetail: {},
        }
    },
    props: {
        item: {
            type: Object,
            default: () => { return {} }
        }
    },
    mounted() {
    },
    watch: {
        item: {
            handler: function(val) {
                if(val) {
                    if(val.Position) {
                        this.callApiGetEventList();
                        this.callApiGetSpotList();
                        this.callApiGetFoodList();
                    }
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        // 活動塞選
        callApiGetEventList() {
            let param = `$spatialFilter=nearby(Position, ${this.item.Position.PositionLat}, ${this.item.Position.PositionLon}, 3000)`;

            apiGetEventList(param)
            .then(res=> {
                this.eventDetail = res[res.length-1];
            })
            .catch(err=> {
                // 發生錯誤
                console.error(err)
            })
        },
        // 美食塞選
        callApiGetFoodList() {
            let param = `$spatialFilter=nearby(Position, ${this.item.Position.PositionLat}, ${this.item.Position.PositionLon}, 3000)`;

            apiGetFoodList(param)
            .then(res=> {
                this.foodDetail = res[res.length-1];
            })
            .catch(err=> {
                // 發生錯誤
                console.error(err)
            })
        },
        // 景點塞選
        callApiGetSpotList() {
            let param = `$spatialFilter=nearby(Position, ${this.item.Position.PositionLat}, ${this.item.Position.PositionLon}, 3000)`;

            apiGetSpotList(param)
            .then(res=> {
                this.spotDetail = res[res.length-1];
            })
            .catch(err=> {
                // 發生錯誤
                console.error(err)
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.nearby-info {
    width: 100%;
    &__nearby-title {
        font-weight: bold;
        font-size: 20px;
        line-height: 29px;
        margin-bottom: 20px;
    }
    &__nearby-item-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__nearby-item {
        cursor: pointer;
        width: 29.6%;
        border: 1.33px solid $gray;
        background-color: $white;
        border-radius: 6px;
        text-align: center;
        padding: 25px 0;
        font-weight: bold;
        font-size: 16px;
        line-height: 28px;
        color: $primary;
        img {
            margin-bottom: 2px;
        }
    }
    a {
        color: $primary;
        &:hover {
            color: $primary;
        }
        &:visited {
            color: $primary;
        }
    }
}
@media screen and (max-width: 768px){
    .nearby-info {
        &__nearby-title {
            font-size: 18px;
            line-height: 26px;
            margin-bottom: 20px;
        }
        &__nearby-item-wrap {
            flex-wrap: wrap;
        }
        &__nearby-item {
            width: 100%;
            margin-bottom: 9px;
        }
    }
}
@media screen and (max-width: 576){
    .nearby-info {

    }
}
</style>