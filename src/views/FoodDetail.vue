<template>
    <div class="food-detail">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <CarouselBanner class="food-detail__banner" :imageList="imageList"/>
                </div>
                <div class="col-12">
                    <div class="food-detail__name">{{foodDetail.Name}}</div>
                </div>
                <div class="col-12" v-if="foodDetail.Class">
                    <div v-if="foodDetail.Class" class="food-detail__class"># {{foodDetail.Class}}</div>
                </div>
                <div class="col-12">
                    <div class="food-detail__description-title">餐廳介紹：</div>
                    <div class="food-detail__description">{{foodDetail.Description}}</div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="food-detail__info-wrap">
                        <div class="food-detail__info">
                            <div class="food-detail__info-title">營業時間：</div>
                            <div class="food-detail__info-value">{{foodDetail.OpenTime?foodDetail.OpenTime:'無'}}</div>
                        </div>
                        <div class="food-detail__info">
                            <div class="food-detail__info-title">聯絡電話：</div>
                            <div class="food-detail__info-value">{{foodDetail.Phone?foodDetail.Phone:'無'}}</div>
                        </div>
                        <div class="food-detail__info" v-if="foodDetail.Address">
                            <div class="food-detail__info-title">餐廳地址：</div>
                            <a :href="'https://www.google.com.tw/maps/place/' + foodDetail.Address" target="_blank" class="food-detail__info-value link">{{foodDetail.Address}}</a>
                        </div>
                        <div class="food-detail__info" v-if="foodDetail.WebsiteUrl">
                            <div class="food-detail__info-title">官方網站：</div>
                            <a class="food-detail__info-value link" :href="foodDetail.WebsiteUrl" target="_blank">{{foodDetail.WebsiteUrl}}</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="food-detail__map-wrap">
                        <gmap-map class="food-detail__map"
                            :zoom="14"    
                            :center="center">
                            <gmap-marker :position="center"></gmap-marker>
                        </gmap-map>
                    </div>
                    <div class="food-detail__nearby-wrap">
                        <NearbyInfo :item="foodDetail"/>
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
import { apiGetFoodList } from "@/api/api"; 

export default {
    data () {
        return {
            foodDetail: {},
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
        this.callApiGetFoodList();
    },
    watch: {
        $route: {
            handler: function(val) {
                if(val.params) {
                    this.callApiGetFoodList();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        callApiGetFoodList() {
            let param = "$filter=ID eq '" + this.$route.params.id + "'";
            apiGetFoodList(param)
            .then(res=> {
                this.foodDetail = res[0];
                let city = this.formatCity(this.foodDetail);
                let name = this.foodDetail.Name;
                // 麵包屑
                this.breadcrumbList = [
                    {
                        title: "在地美食",
                        routeName: "Food",
                    },
                    {
                        title: city,
                        routeName: "Food",
                        query: {
                            'keyword': city
                        },
                    },
                    {
                        title: name,
                    },
                ];
                // 圖片處理
                this.imageList = this.formatImageList(this.foodDetail.Picture);
                // 處理google map
                if(this.foodDetail.Position.PositionLat && this.foodDetail.Position.PositionLon) {
                    this.center = {
                        lat: this.foodDetail.Position.PositionLat,
                        lng: this.foodDetail.Position.PositionLon,
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
.food-detail {
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
    .food-detail {
        margin-top: 18px;
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
    .food-detail {
        
    }
}
</style>