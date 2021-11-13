<template>
    <div class="spot-detail">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <CarouselBanner class="spot-detail__banner" :imageList="imageList"/>
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
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="spot-detail__info-wrap">
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">開放時間：</div>
                            <div class="spot-detail__info-value">{{spotDetail.OpenTime?spotDetail.OpenTime:'無'}}</div>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">服務電話：</div>
                            <div class="spot-detail__info-value">{{spotDetail.Phone?spotDetail.Phone:'無'}}</div>
                        </div>
                        <div class="spot-detail__info" v-if="spotDetail.Address">
                            <div class="spot-detail__info-title">景點地址：</div>
                            <a :href="'https://www.google.com.tw/maps/place/' + spotDetail.Address" target="_blank" class="spot-detail__info-value link">{{spotDetail.Address}}</a>
                        </div>
                        <div class="spot-detail__info" v-if="spotDetail.WebsiteUrl">
                            <div class="spot-detail__info-title">官方網站：</div>
                            <a class="spot-detail__info-value link" :href="spotDetail.WebsiteUrl" target="_blank">{{spotDetail.WebsiteUrl}}</a>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">票價資訊：</div>
                            <div class="spot-detail__info-value">{{spotDetail.TicketInfo?spotDetail.TicketInfo:'無'}}</div>
                        </div>
                        <div class="spot-detail__info">
                            <div class="spot-detail__info-title">注意事項：</div>
                            <div class="spot-detail__info-value">{{spotDetail.Remarks?spotDetail.Remarks:'無'}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="spot-detail__map-wrap">
                        <gmap-map class="spot-detail__map"
                            :zoom="14"    
                            :center="center">
                            <gmap-marker :position="center"></gmap-marker>
                        </gmap-map>
                    </div>
                    <div class="spot-detail__nearby-wrap">
                        <NearbyInfo :item="spotDetail"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '@/components/shared/Breadcrumb'
import CarouselBanner from '@/components/shared/CarouselBanner'
import NearbyInfo from '@/components/shared/NearbyInfo'
import { apiGetSpotList } from "@/api/api"; 

export default {
    data () {
        return {
            spotDetail: {},
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
        $route: {
            handler: function(val) {
                if(val.params) {
                    this.callApiGetSpotList();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        callApiGetSpotList() {
            let param = "$filter=ID eq '" + this.$route.params.id + "'";
            apiGetSpotList(param)
            .then(res=> {
                this.spotDetail = res[0];
                let city = this.formatCity(this.spotDetail);
                let name = this.spotDetail.Name;
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
                            'keyword': city
                        },
                    },
                    {
                        title: name,
                    },
                ];
                // 圖片處理
                this.imageList = this.formatImageList(this.spotDetail.Picture);
                // 處理google map
                if(this.spotDetail.Position.PositionLat && this.spotDetail.Position.PositionLon) {
                    this.center = {
                        lat: this.spotDetail.Position.PositionLat,
                        lng: this.spotDetail.Position.PositionLon,
                    }
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
        NearbyInfo,
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
        margin-right: 8px;
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
}
@media screen and (max-width: 768px){
    .spot-detail {
        margin-top: 18px;
        margin-bottom: 0;
        &__banner {
            margin: 16px 0;
        }
        &__name{
            font-size: 24px;
            line-height: 35px;
            margin-bottom: 8px;
        }
        &__class {
            font-size: 14px;
            line-height: 20px;
            padding: 2px 18px;
        }
        &__description-title {
            margin-top: 16px;
            font-weight: 500;
            font-size: 18px;
            line-height: 26px;
        }
        &__description {
            font-size: 16px;
            margin-top: 8px;
            margin-bottom: 30px;
        }
        &__info {
            margin-bottom: 8px;
        }
        &__info-wrap {
            margin: 0 -15px;
            border-radius: 0;
            padding: 30px 15px;
        }
        &__info-title {
            font-size: 18px;
            line-height: 30px;
        }
        &__info-value {
            font-size: 16px;
        }
        &__map-wrap {
            background: $gray-200;
            height: 185px;
            margin: 0 -15px;
            padding: 0 15px;
            width: unset;
        }
        &__map {
            height: 185px;
            border-radius: 12px;
            overflow: hidden;
        }
        &__nearby-wrap {
            background: $gray-200;
            margin: 0 -15px;
            margin-top: 0px;
            padding: 20px 15px 30px 15px;
        }
    }
    
}
@media screen and (max-width: 576px){
    .spot-detail {
        
    }
}
</style>