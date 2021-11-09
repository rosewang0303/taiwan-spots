<template>
    <div class="data-card col-lg-3 col-md-6 col-12">
        <div class="data-card__wrap">
            <div class="data-card__img-wrap">
                <img src="@/assets/img/spot_default_pc.png"/>
            </div>
            <div class="data-card__info-wrap">
                <div class="data-card__title">高美濕地(高物園濕地(美野生動物園濕地(高美野生</div>
                <div class="data-card__city">
                    <img src="@/assets/icon/landmark_16_gray.svg"/>
                    南投縣
                </div>
            </div>
        </div>
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
.data-card {
    width: 100%;
    &__wrap {
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        &:hover {
            .data-card__img-wrap img {
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
            transform:translate(-50%,-50%);
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
    .data-card {
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