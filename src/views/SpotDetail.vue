<template>
    <div class="spot-detail">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <CarouselBanner class="spot-detail__banner" :list="imageList" :titleShow="false"/>
                </div>
                <div class="col-12">
                    <div class="spot-detail__name">{{spotDetail.Name}}</div>
                </div>
                <div class="col-12" v-if="spotDetail.Class1">
                    <div v-if="spotDetail.Class1" class="spot-detail__class"># {{spotDetail.Class1}}</div>
                    <div v-if="spotDetail.Class2" class="spot-detail__class"># {{spotDetail.Class2}}</div>
                    <div v-if="spotDetail.Class3" class="spot-detail__class"># {{spotDetail.Class3}}</div>
                </div>
                <div class="col-12">
                    <div class="spot-detail__description-title">景點介紹：</div>
                    <div class="spot-detail__description">{{spotDetail.DescriptionDetail}}</div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="spot-detail__info-wrap">
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">開放時間：</div>
                            <div class="spot-detail__info-value">{{spotDetail.OpenTime}}</div>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">服務電話：</div>
                            <div class="spot-detail__info-value">{{spotDetail.Phone}}</div>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">景點地址：</div>
                            <div class="spot-detail__info-value link">{{spotDetail.Address}}</div>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">官方網站：</div>
                            <div class="spot-detail__info-value link">{{spotDetail.WebsiteUrl?spotDetail.WebsiteUrl:'無'}}</div>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">票價資訊：</div>
                            <div class="spot-detail__info-value">{{spotDetail.TicketInfo?spotDetail.TicketInfo:'無'}}</div>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">注意事項：</div>
                            <div class="spot-detail__info-value">{{spotDetail.Remarks?potDetail.Remarks:'無'}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="spot-detail__map-wrap">
                        <!-- <gmap-map class="spot-detail__map"
                            :zoom="14"    
                            :center="center">
                            <gmap-marker :position="center"></gmap-marker>
                        </gmap-map> -->
                    </div>
                    <div class="spot-detail__nearby-wrap">
                        <div class="spot-detail__nearby-title">周邊資訊：</div>
                        <div class="spot-detail__nearby-item-wrap">
                            <div class="spot-detail__nearby-item">
                                <img src="@/assets/icon/nearby_spot.svg"/>
                                <div>附近景點</div>
                            </div>
                            <div class="spot-detail__nearby-item">
                                <img src="@/assets/icon/nearby_event.svg"/>
                                <div>附近活動</div>
                            </div>
                            <div class="spot-detail__nearby-item">
                                <img src="@/assets/icon/nearby_food.svg"/>
                                <div>附近美食</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '@/components/shared/Breadcrumb'
import CarouselBanner from '@/components/shared/CarouselBanner'
import { apiGetSpotList } from "@/api/api"; 

export default {
    data () {
        return {
            spotDetail: null,
            breadcrumbList: [],
            imageList: [],
            // google map
            center: { 
                lat: 23.973875,
                lng: 120.982024,
            },
        }
    },
    mounted() {
        // 取得景點資訊
        this.callApiGetSpotList();
    },
    watch: {
        '': {
            handler: function() {
            },
            immediate: true,
        }
    },
    methods: {
        callApiGetSpotList() {
            let param = "$filter=ID eq '" + this.$route.params.id + "'";
            apiGetSpotList(param)
            .then(res=> {
                this.spotDetail = res[0];
                let city = this.formatCity(this.spotDetail);
                let name = this.spotDetail.Name;
                let id = this.spotDetail.ID;
                // 麵包屑
                this.breadcrumbList = [
                    {
                        title: "探索景點",
                        routeName: "Spot",
                    },
                    {
                        title: city,
                        routeName: "Spot",
                        query: {
                            'city': city
                        },
                    },
                    {
                        title: name,
                        routeName: "SpotDetail",
                        params: {
                            'id': id
                        },
                    },
                ];
                // 圖片
                for (const key in this.spotDetail.Picture) {
                    if(key != "PictureDescription1") {
                        this.imageList.push(this.spotDetail.Picture[key])
                    }
                }
                // 處理google map
                this.center = {
                    lat: this.spotDetail.Position.PositionLat,
                    lng: this.spotDetail.Position.PositionLon,
                }
            })
            .catch(err=> {
                // 發生錯誤
                console.error(err)
            })
        },
    },
    components: {
        Breadcrumb,
        CarouselBanner,
    }
}
</script>
<style lang="scss" scoped>
.spot-detail {
    &__banner {
        margin: 30px 0;
    }
    &__name {
        font-weight: 300;
        font-size: 36px;
        line-height: 52px;
        letter-spacing: 0.03em;
        margin-bottom: 12px;
        color: $gray-900;
    }
    &__class {
        border: 1px solid $brown;
        border-radius: 20px;
        padding: 3px 18px;
        color: $brown;
        font-size: 20px;
        line-height: 29px;
        display: inline-block;
    }
    &__description-title {
        margin-top: 30px;
        font-weight: bold;
        font-size: 20px;
        line-height: 29px; 
    }
    &__description {
        font-weight: 300;
        font-size: 18px;
        line-height: 31px;
        margin-top: 10px;
        margin-bottom: 60px;
    }
    &__info-wrap {
        background: $gray-200;
        border-radius: 12px;
        padding: 30px 42px 60px 30px;
    }
    &__info {
        display: flex;
        margin-bottom: 12px;
    }
    &__info-title {
        font-weight: bold;
        font-size: 20px;
        line-height: 29px;
        max-width: 100px;
    }
    &__info-value {
        font-size: 18px;
        line-height: 30px;
        word-wrap: break-word;
        width: calc(100% - 100px);
        &.link {
            color: $primary-500;
        }
    }
    &__map-wrap {
        width: 100%;
        height: 250px;
        border-radius: 12px;
        overflow: hidden;
    }
    &__map {
        width: 100%;
        height: 250px;
    }
    &__nearby-wrap {
        margin-top: 32px;
    }
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
}
</style>