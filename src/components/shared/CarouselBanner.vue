<template>
    <div class="carousel-banner">
        <div class="carousel-banner__arrow-wrap" v-if="countList.length > 1">
            <div class="carousel-banner__arrow carousel-banner__arrow--left" :class="{'disabled': bannerIndex == 0 || countList.length <= 1}" @click="bannerPrevious()"></div>
            <div class="carousel-banner__arrow carousel-banner__arrow--right" :class="{'disabled': bannerIndex == countList.length-1 || countList.length <= 1}" @click="bannerNext()"></div>
        </div>
        <div v-if="list.length > 0" class="carousel-banner__banner-wrap">
            <div class="carousel-banner__banner-list" :style="'transform:translateX('+ translateWidth +'px);'">
                <div v-for="(item, index) in list" :key="index">
                    <router-link :to="{name: routeName, query: routeQuery(item), params: routeParams(item)}">
                        <div class="carousel-banner__banner-img-wrap" :style="'width:'+ bannerWidth +'px;'">
                            <div class="carousel-banner__banner-title">{{ formatCity(item) + " | " + item.Name }}</div>
                            <img class="carousel-banner__img" :src="imageList[index].img" :alt="imageList[index].alt"/>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else class="carousel-banner__banner-wrap">
            <div class="carousel-banner__banner-list" :style="'transform:translateX('+ translateWidth +'px);'">
                <div v-for="(item, index) in imageList" :key="index">
                    <div class="carousel-banner__banner-img-wrap" :style="'width:'+ bannerWidth +'px;'">
                        <img class="carousel-banner__img" :src="item.img" :alt="item.alt"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-banner__dots-wrap" v-if="countList.length > 1">
            <div class="carousel-banner__dots" :class="{'carousel-banner__dots--active': bannerIndex == index}" 
                v-for="(item, index) in countList" :key="index" @click="bannerIndex = index"></div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            bannerIndex: 0,
            bannerWidth: 0,
            translateWidth: 0,
        }
    },
    props: {
        list: {
            type: Array,
            default: () => { return []}
        },
        imageList: {
            type: Array,
            default: () => { return []}
        },
        routeName: {
            type: String,
            default: null
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
    },
    mounted() {
        // 初始計算撐滿畫面的banner寬度
        this.bannerWidth = document.getElementsByClassName('carousel-banner__banner-wrap')[0].offsetWidth;
        // 監聽resize事件
        window.addEventListener('resize', this.resizeHandler);
    },
    watch: {
        bannerIndex: {
            handler: function(val) {
                // 輪播字跟著圖切換
                let width = this.bannerWidth * val;
                if(width == 0) {
                    this.translateWidth = width;
                }else {
                    this.translateWidth = -width;
                }
            },
        },
        list: {
            handler: function(val) {
                // 處理圖片
                if(val.length > 0) {
                    for(var i=0; i<val.length; i++) {
                        let picture = val[i].Picture;
                        let pictrueList = this.formatImageList(picture);
                        pictrueList.map( item => {
                            this.imageList.push(item)
                        });
                    }
                }
            },
            immediate: true,
        },
    },
    methods: {
        routeQuery(item) {
            let query = null;
            if(this.routeName  == "SpotDetail") {
                query = null
            }else {
                console.log(item)
            }
            return query;
        },
        routeParams(item) {
            let params = null;
            if(this.routeName  == "SpotDetail") {
                params = {
                    id: item.ID
                }
            }else {
                console.log(item)
            }
            return params;
        },
        // 前一個
        bannerPrevious() {
            if(this.bannerIndex != 0) {
                this.bannerIndex--;
            }
        },
        // 後一個
        bannerNext() {
            if(this.bannerIndex != this.list.length-1) {
                this.bannerIndex++;
            }
        },
        // 監聽resize
        resizeHandler() {
           this.bannerWidth = document.getElementsByClassName('carousel-banner__banner-wrap')[0].offsetWidth;
        },
    },
    computed: {
        countList() {
            if(this.list.length > 0) {
                return this.list
            }else {
                return this.imageList
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.carousel-banner {
    &__banner-wrap {
        width: 100%;
        height: 400px;
        overflow: hidden;
        border-radius: 24px;
        background-image: url('~@/assets/img/banner_default_pc.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    &__banner-list {
        display: inline-flex;
        align-items: center;
        transition: 0.5s all ease;
    }
    &__banner-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 28px;
        line-height: 41px;
        color: $white;
        z-index: $zindex-carousel-title;
        white-space: nowrap;
    }
    &__banner-img-wrap {
        width: 100%;
        height: 400px;
        overflow: hidden;
    }
    &__img {
        display: block;
        background-color: $gray-500;
        width: 100%;
        transform: scale(1.1);
        // overflow: hidden;

        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
    }
    &__arrow-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        z-index: $zindex-carousel-arrow;
        width: 100%;
        padding: 0 30px;
    }
    &__arrow {
        width: 40px;
        height: 40px;
        cursor: pointer;
        &--left {
            background-image: url('../../assets/icon/carousel_arrow_left.svg');
            &:hover {
                background-image: url('../../assets/icon/carousel_arrow_left_hover.svg');
            }
            &.disabled {
                cursor: not-allowed;
                background-image: url('../../assets/icon/carousel_arrow_left_disabled.svg');
            }
        }
        &--right {
            background-image: url('../../assets/icon/carousel_arrow_right.svg');
            &:hover {
                background-image: url('../../assets/icon/carousel_arrow_right_hover.svg');
            }
            &.disabled {
                cursor: not-allowed;
                background-image: url('../../assets/icon/carousel_arrow_right_disabled.svg');
            }
        }
    }
    &__dots-wrap {
        display: flex;
        align-items: center;
        position: absolute;
        right: 42px;
        bottom: 27px;
    }
    &__dots {
        cursor: pointer;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $gray-300;
        margin-left: 14px;
        &--active {
            width: 20px;
            height: 20px;
            background-color: $white;
        }
    }
}
@media screen and (max-width: 768px){
    .carousel-banner {
        &__banner-wrap {
            height: 300px;
            border-radius: 16px;
        }
        &__dots-wrap {
            right: 21px;
            bottom: 11px;
        }
        &__dots {
            width: 8px;
            height: 8px;
            &--active {
                width: 10px;
                height: 10px;
            }
        }
        &__banner-img-wrap {
            height: 300px;
            border-radius: 16px;
        }
        &__banner-title {
            font-size: 16px;
            line-height: 23px;
        }
    }
}
@media screen and (max-width: 576px){
    .carousel-banner {
        &__arrow-wrap {
            display: none;
        }
        &__banner-wrap {
            height: 183px;
        }
        &__banner-img-wrap {
            height: 183px;
        }
    }
}
</style>