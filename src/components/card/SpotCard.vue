<template>
    <div class="spot-card col-lg-3 col-md-6 col-8">
        <router-link :to="{name: 'SpotDetail', params:{'id': item.ID} }">
            <div class="spot-card__wrap">
                <div class="spot-card__img-wrap">
                    <img :src="item.Picture.PictureUrl1"/>
                </div>
                <div class="spot-card__info-wrap">
                    <div class="spot-card__title">{{item.Name}}</div>
                    <div class="spot-card__city">
                        <img src="@/assets/icon/landmark_16_gray.svg"/>
                        {{item.City?item.City:item.Address.substr(0, 3)}}
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    props: {
        item: {
            type: Object,
            default: () => { return {} }
        }
    },
    watch: {
    },
    components: {
    },
    methods: {
    },
}
</script>
<style lang="scss" scoped>
.spot-card {
    width: 100%;
    &__wrap {
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        &:hover {
            .spot-card__img-wrap img {
                transition: 0.5s all ease;
                transform: translate(-50%, -50%) scale(1.2);
                transform-origin: 0,0;
            }
        }
    }
    &__img-wrap {
        width: 100%;
        height: 200px;
        position:relative;
        border-radius: 20px;
        overflow:hidden;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            min-width: 100%;
            min-height: 100%;
            transform: translate(-50%,-50%);
            background-image: url('~@/assets/img/spot_default_pc.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
    }
    &__info-wrap {
        margin-top: 10px;
    }
    &__title {
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        letter-spacing: 0.03em;
        margin-bottom: 6px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    &__city {
        font-size: 16px;
        line-height: 23px;
        color: $gray-800;
        display: flex;
        align-items: center;
        img {
            margin-right: 3px;
        }
    }
}
@media screen and (max-width: 768px){
    .spot-card {
        &__img-wrap {
            height: 160px;
        }
        &__info-wrap {
            margin-top: 6px;
        }
        &__title {
            font-size: 18px;
            line-height: 26px;
            margin-bottom: 4px;
        }
    }
}
</style>