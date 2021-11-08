<template>
    <div class="carousel-banner">
        <div class="carousel-banner__arrow-wrap">
            <div class="carousel-banner__arrow carousel-banner__arrow--left" :class="{'disabled': bannerIndex == 0}" @click="bannerPrevious()"></div>
            <div class="carousel-banner__arrow carousel-banner__arrow--right" :class="{'disabled': bannerIndex == bannerList.length-1}" @click="bannerNext()"></div>
        </div>
        <div class="carousel-banner__banner-title">{{bannerTitle}}</div>
        <div class="carousel-banner__banner-wrap">
            <div class="carousel-banner__banner-list" :style="'transform:translateX('+ translateWidth +'px);'">
                <img class="carousel-banner__banner" :style="'width:'+ bannerWidth +'px;'" 
                    src="@/assets/img/banner_default.svg"
                    v-for="(item, index) in bannerList" :key="index"/>
            </div>
        </div>
        <div class="carousel-banner__dots-wrap">
            <div class="carousel-banner__dots" :class="{'carousel-banner__dots--active': bannerIndex == index}" 
                v-for="(item, index) in bannerList" :key="index" @click="bannerIndex = index"></div>
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
            bannerTitle: "",
            bannerList: [],
        }
    },
    mounted() {
        // 初始計算撐滿畫面的banner寬度
        this.bannerWidth = document.getElementsByClassName('index__banner-wrap')[0].offsetWidth;

        // 取得banner
        this.bannerList = [
            {
                img: require('@/assets/img/banner_default.svg'),
                title: "新北市 | 不厭亭",
            },
            {
                img: require('@/assets/img/banner_default.svg'),
                title: "新北市 | 不厭亭2",
            },
            {
                img: require('@/assets/img/banner_default.svg'),
                title: "新北市 | 不厭亭3",
            },
        ];
        // 初始title
        this.bannerTitle = this.bannerList[this.bannerIndex].title;
    },
    watch: {
        bannerIndex: {
            handler: function(val) {
                // 輪播字跟著圖切換
                this.bannerTitle = this.bannerList[val].title;
            },
            immediate: true,
        }
    },
    methods: {
        // 前一個
        bannerPrevious() {
            if(this.bannerIndex != 0) {
                this.bannerIndex--;
                this.translateWidth += this.bannerWidth;
            }
        },
        // 後一個
        bannerNext() {
            if(this.bannerIndex != this.bannerList.length-1) {
                this.bannerIndex++;
                this.translateWidth -= this.bannerWidth;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.carousel-banner {
    &__banner-wrap {
        width: 100%;
        height: 400px;
        overflow: hidden;
        border-radius: 24px;
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
        z-index: 1;
    }
    &__banner {
        display: block;
        // background-color: $primary-40;
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
        z-index: 1;
        width: 100%;
        padding: 0 30px;
    }
    &__arrow {
        width: 40px;
        height: 40px;
        cursor: pointer;
        &--left {
            background-image: url('../assets/icon/carousel_arrow_left.svg');
            &:hover {
                background-image: url('../assets/icon/carousel_arrow_left_hover.svg');
            }
            &.disabled {
                cursor: not-allowed;
                background-image: url('../assets/icon/carousel_arrow_left_disabled.svg');
            }
        }
        &--right {
            background-image: url('../assets/icon/carousel_arrow_right.svg');
            &:hover {
                background-image: url('../assets/icon/carousel_arrow_right_hover.svg');
            }
            &.disabled {
                cursor: not-allowed;
                background-image: url('../assets/icon/carousel_arrow_right_disabled.svg');
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
        background-color: $gray-200;
        margin-left: 14px;
        &--active {
            width: 20px;
            height: 20px;
            background-color: $white;
        }
    }
}
</style>