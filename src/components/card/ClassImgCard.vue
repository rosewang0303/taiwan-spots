<template>
    <div class="class-img-card col-lg-3 col-md-4 col-6">
        <div class="class-img-card__img-wrap">
            <img :src="img"/>
        </div>
        <div class="class-img-card__item-title">{{className}}</div>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    props: {
        type: {
            type: String,
            default: null
        },
        className: {
            type: String,
            default: null
        },
        img: {
            type: String,
            default: null
        }
    }
}
</script>
<style lang="scss" scoped>
.class-img-card {
    cursor: pointer;
    margin-top: 12px;
    position: relative;
    overflow: hidden;
    &:hover {
        .class-img-card__img-wrap img {
            transition: 0.5s all ease;
            transform: scale(1.5);
            transform-origin: 0,0;
        }
    }
    &__item-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $white;
        font-size: 24px;
        line-height: 35px;
        letter-spacing: 0.03em;
        white-space: nowrap;
    }
    &__img-wrap {
        width: 100%;
        position:relative;
        overflow: hidden;
        border-radius: 24px;
        img {
            width: 100%;
            transform: scale(1.1);
        }
    }
}
@media screen and (max-width: 768px){
    .class-img-card {
        &__img-wrap {
            border-radius: 16px;
        }
    }
}
@media screen and (max-width: 576px){
    .class-img-card {
        &__item-title {
            font-size: 16px;
            line-height: 23px;
        }
    }
}
</style>