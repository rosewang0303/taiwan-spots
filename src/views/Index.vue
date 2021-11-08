<template>
<div class="index">
    <div class="container">
        <div class="row index__top-wrap">
            <div class="col-md-6 col-12">
                <div class="index__title">
                    <h1>探索<span class="mark">台灣之美</span><br/>讓我們更親近這片土地</h1>
                    <h2>
                        <img src="@/assets/icon/landmark_24_yellow.svg"/>
                        <div class="index__subtitle--tw">台灣旅遊景點導覽</div>
                        <div class="index__subtitle--en">Taiwan Travel Guide</div>
                    </h2>
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div class="index__form">
                    <DropdownMenu class="index__form-dropdown-menu" :menuList="menuList" v-model="form.type"/>
                    <InputText class="index__form-input" v-model="param.search" placeholder="你想去哪裡？請輸入關鍵字"/>
                    <button class="btn" @click="search()">
                        <img src="@/assets/icon/search_30.svg"/>
                        <span>搜尋</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="index__banner-wrap">
                    <CarouselBanner/>
                </div>
            </div>
        </div>
        <!-- 近期活動 -->
        <div class="row">
            <div class="col-12">
                <div class="index__block">
                    <div class="index__block-title">近期活動</div>
                    <router-link :to="{name: 'Event'}">
                        <div class="index__block-more">
                            查看更多活動<img src="@/assets/icon/arrow_right_16_red.svg"/>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="index__block-data-list">
            <div class="row">
                <EventCard class="index__event-card"/>
                <EventCard class="index__event-card"/>
                <EventCard class="index__event-card"/>
                <EventCard class="index__event-card"/>
            </div>
        </div>
        <!-- 熱門打卡景點 -->
        <div class="row">
            <div class="col-12">
                <div class="index__block">
                    <div class="index__block-title">熱門打卡景點</div>
                    <router-link :to="{name: 'Spot'}">
                        <div class="index__block-more">
                            查看更多景點<img src="@/assets/icon/arrow_right_16_red.svg"/>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="index__block-data-list index__block-data-list--nowrap">
            <div class="row">
                <SpotCard class="index__spot-card"/>
                <SpotCard class="index__spot-card"/>
                <SpotCard class="index__spot-card"/>
                <SpotCard class="index__spot-card"/>
            </div>
        </div>
        <!-- 一再回訪美食 -->
        <div class="row">
            <div class="col-12">
                <div class="index__block">
                    <div class="index__block-title">一再回訪美食</div>
                    <router-link :to="{name: 'Food'}">
                        <div class="index__block-more">
                            查看更多美食<img src="@/assets/icon/arrow_right_16_red.svg"/>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="index__block-data-list index__block-data-list--nowrap">
            <div class="row">
                <FoodCard class="index__food-card"/>
                <FoodCard class="index__food-card"/>
                <FoodCard class="index__food-card"/>
                <FoodCard class="index__food-card"/>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CarouselBanner from '@/components/index/CarouselBanner'
import DropdownMenu from '@/components/shared/DropdownMenu'
import InputText from '@/components/shared/InputText'
import EventCard from '@/components/card/EventCard'
import SpotCard from '@/components/card/SpotCard'
import FoodCard from '@/components/card/FoodCard'

export default {
    data () {
        return {
            menuList: [
                {
                    title: "探索景點",
                    value: "spot",
                },
                {
                    title: "節慶活動",
                    value: "event",
                },
                {
                    title: "品嚐美食",
                    value: "food",
                },
            ],
            // api
            form: {
                type: 0,
            },
            param: {
                type: null,
                search: null,
            },
        }
    },
    watch: {
        'form.type': {
            handler: function(val) {
                this.param.type = this.menuList[val].value;
            },
            deep: true,
            immediate: true,
        }
    },
    components: {
        CarouselBanner,
        DropdownMenu,
        InputText,
        EventCard,
        SpotCard,
        FoodCard,
    },
    methods: {
        // 搜尋
        search() {
            // TODO
        },
    },
}
</script>
<style lang="scss">
// app css
.index {
    &__title {
        margin: 0 auto;
    }
    &__top-wrap {
        align-items: center;
        margin-top: 22px;
        margin-bottom: 60px;
    }
    h1 {
        font-weight: 300;
        font-size: 48px;
        line-height: 70px;
        margin: 0;
        letter-spacing: 0.03em;
    }
    h2 {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        font-weight: normal;
        font-size: 20px;
        color: $gray-800;
        line-height: 29px;
        margin-top: 17px;
        letter-spacing: 0.03em;
    }
    &__subtitle {
        &--tw {
            margin: 0 8px 0 6px;
        }
        &--en {
            font-family: 'Playfair Display', sans-serif;
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
        }
    }
    &__banner-wrap {
        
    }
    &__form {
        width: 350px;
        margin: 0 auto;
    }
    &__form-dropdown-menu {
        margin-bottom: 7px;
    }
    &__form-input {
        margin-bottom: 7px;
    }
    &__block {
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        margin-top: 36px;
    }
    &__block-title {
        font-weight: 300;
        font-size: 36px;
        line-height: 52px;
        letter-spacing: 0.03em;
        color: $gray-900;
    }
    &__block-more {
        cursor: pointer;
        display:flex;
        align-items: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        color: $red;
        img {
            margin-left: 3px;
        }
    }
    &__block-data-list {
        margin-top: 12px;
    }
    &__event-card {
        margin-bottom: 12px;
    }
    &__spot-card {
        margin-bottom: 12px;
    }
    &__food-card {
        margin-bottom: 12px;
    }
}
@media screen and (max-width: 768px){
    .index {
        h1 {
            font-size: 28px;
            line-height: 41px;
            text-align: center;
        }
        h2 {
            justify-content: center;
            font-size: 14px;
            line-height: 20px;
            margin-top: 14px;
        }
        &__subtitle {
            &--tw {
                margin: 0 5px 0 4px;
            }
            &--en {
                font-size: 12px;
                line-height: 16px;
            }
        }
        &__form {
            width: 100%;
            margin-top: 35px;
        }
        &__top-wrap {
            margin-top: 0;
            margin-bottom: 38px;
        }
        &__block {
            padding: 0 0 0 3px;
        }
        &__block-title {
            font-size: 24px;
            line-height: 35px;
        }
        &__block-data-list { 
            &--nowrap {
                .row {
                    flex-wrap: nowrap;
                    overflow: scroll;
                }
            }
        }
    }
}
@media screen and (max-width: 576px){
    .index {
        &__event-card {
            margin-bottom: 16px;
        }
    }
}
</style>

