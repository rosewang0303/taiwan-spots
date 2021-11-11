<template>
    <div class="event-detail">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <CarouselBanner class="event-detail__banner" :imageList="imageList"/>
                </div>
                <div class="col-12">
                    <div class="event-detail__name">{{eventDetail.Name}}</div>
                </div>
                <div class="col-12" v-if="eventDetail.Class1">
                    <div v-if="eventDetail.Class1" class="event-detail__class"># {{eventDetail.Class1}}</div>
                    <div v-if="eventDetail.Class2" class="event-detail__class"># {{eventDetail.Class2}}</div>
                    <div v-if="eventDetail.Class3" class="event-detail__class"># {{eventDetail.Class3}}</div>
                </div>
                <div class="col-12">
                    <div class="event-detail__description-title">活動介紹：</div>
                    <div class="event-detail__description">{{eventDetail.Description}}</div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="event-detail__info-wrap">
                        <div class="event-detail__info">
                            <div class="event-detail__info-title">活動時間：</div>
                            <div class="event-detail__info-value">{{ formatDate(eventDetail.StartTime) + " - " + formatDate(eventDetail.EndTime) }}</div>
                        </div>
                        <div class="event-detail__info">
                            <div class="event-detail__info-title">聯絡電話：</div>
                            <div class="event-detail__info-value">{{eventDetail.Phone?eventDetail.Phone:'無'}}</div>
                        </div>
                        <div class="event-detail__info">
                            <div class="event-detail__info-title">主辦單位：</div>
                            <div class="event-detail__info-value">{{eventDetail.Organizer?eventDetail.Organizer:'無'}}</div>
                        </div>
                        <div class="event-detail__info" v-if="eventDetail.Location">
                            <div class="event-detail__info-title">活動地點：</div>
                            <a :href="'https://www.google.com.tw/maps/place/' + eventDetail.Location" target="_blank" class="event-detail__info-value link">{{eventDetail.Location}}</a>
                        </div>
                        <div class="event-detail__info" v-if="eventDetail.WebsiteUrl">
                            <div class="event-detail__info-title">官方網站：</div>
                            <a class="event-detail__info-value link" :href="eventDetail.WebsiteUrl" target="_blank">{{eventDetail.WebsiteUrl}}</a>
                        </div>
                        <div class="event-detail__info">
                            <div class="event-detail__info-title">活動費用：</div>
                            <div class="event-detail__info-value">{{eventDetail.Charge?eventDetail.Charge:'無'}}</div>
                        </div>
                        <div class="event-detail__info">
                            <div class="event-detail__info-title">注意事項：</div>
                            <div class="event-detail__info-value">{{eventDetail.Remarks?eventDetail.Remarks:'無'}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="event-detail__map-wrap">
                        <!-- <gmap-map class="event-detail__map"
                            :zoom="14"    
                            :center="center">
                            <gmap-marker :position="center"></gmap-marker>
                        </gmap-map> -->
                    </div>
                    <div class="event-detail__nearby-wrap">
                        <NearbyInfo :item="eventDetail"/>
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
import { apiGetEventList } from "@/api/api"; 

export default {
    data () {
        return {
            eventDetail: {},
            breadcrumbList: [],
            imageList: [],
            // google map
            center: { 
                lat: 23.973875,
                lng: 120.982024,
            },
        }
    },
    watch: {
        $route: {
            handler: function(val) {
                if(val.params) {
                    this.callApiGetEventList();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        // 取得活動資訊
        this.callApiGetEventList();
    },
    methods: {
        callApiGetEventList() {
            let param = "$filter=ID eq '" + this.$route.params.id + "'";
            apiGetEventList(param)
            .then(res=> {
                this.eventDetail = res[0];
                let city = this.formatCity(this.eventDetail);
                let name = this.eventDetail.Name;
                // 麵包屑
                this.breadcrumbList = [
                    {
                        title: "節慶活動",
                        routeName: "Event",
                    },
                    {
                        title: city,
                        routeName: "Event",
                        query: {
                            'keyword': city
                        },
                    },
                    {
                        title: name,
                    },
                ];
                // 圖片處理
                this.imageList = this.formatImageList(this.eventDetail.Picture);
                // 處理google map
                this.center = {
                    lat: this.eventDetail.Position.PositionLat,
                    lng: this.eventDetail.Position.PositionLon,
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
.event-detail {
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
    .event-detail {
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
            border-radius: 12px;
            margin: 0 -15px;
            width: unset;
        }
        &__map {
            height: 185px;
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
    .event-detail {
        
    }
}
</style>