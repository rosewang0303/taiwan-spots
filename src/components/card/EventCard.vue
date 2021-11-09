<template>
    <div class="event-card col-lg-6 col-md-12 col-12">
        <router-link :to="{name: 'Event'}">
            <div class="event-card__wrap">
                <div class="event-card__img-wrap">
                    <img :src="item.Picture.PictureUrl1"/>
                </div>
                <div class="event-card__info-wrap">
                    <div class="event-card__date">{{ eventDate(item) }}</div>
                    <div class="event-card__title">{{item.Name}}</div>
                    <div class="event-card__bottom-wrap">
                        <div class="event-card__city">
                            <img src="@/assets/icon/landmark_16_gray.svg"/>
                            {{item.City?item.City:item.Address.substr(0, 3)}}
                        </div>
                        <div class="event-card__more">
                            詳細介紹
                            <img src="@/assets/icon/arrow_right_16_green.svg"/>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import { formatDate } from '@/function';

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
        eventDate(item) {
            return formatDate(item.StartTime) + " - " + formatDate(item.EndTime)
        }
    },
}
</script>
<style lang="scss" scoped>
.event-card {
    width: 100%;
    &__wrap {
        cursor: pointer;
        background-color: $gray-200;
        border: 1px solid $gray;
        border-radius: 24px;
        width: 100%;
        display: flex;
        overflow: hidden;
        &:hover {
            .event-card__img-wrap img {
                transition: 0.5s all ease;
                transform: translate(-50%, -50%) scale(1.2);
                transform-origin: 0,0;
            }
        }
    }
    &__img-wrap {
        width: 160px;
        height: 160px;
        position: relative;
        overflow: hidden;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            min-width: 100%;
            min-height: 100%;
            transform: translate(-50%, -50%);
        }
    }
    &__info-wrap {
        padding: 16px 30px 18px;
        width: calc(100% - 160px);
    }
    &__date {
        font-size: 16px;
        line-height: 23px;
        color: $gray-800;
        margin-bottom: 3px;
    }
    &__title {
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        letter-spacing: 0.03em;
        margin-bottom: 17px;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 60px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    &__bottom-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
    &__more {
        cursor: pointer;
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        display: flex;
        align-items: center;
        color: $primary;
    }
}
@media screen and (max-width: 768px){
    .event-card {
    }
}
@media screen and (max-width: 576px){
    .event-card {
        &__wrap {
            background-color: unset;
            border: none;
            border-radius: unset;
        }
        &__img-wrap {
            width: 90px;
            height: 62px;
            border-radius: 10px;
            border: 1px solid $gray;
        }
        &__info-wrap {
            padding: 0 0 0 16px;
            width: calc(100% - 90px);
        }
        &__date {
            font-size: 12px;
            line-height: 17px;
            margin-bottom: 3px;
        }
        &__title {
            font-size: 15px;
            line-height: 22px;
            margin-bottom: 1px;
            height: unset;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        &__city {
            font-size: 11px;
            line-height: 16px;
            img {
                display: none;
            }
        }
        &__more {
            display: none;
        }
    }
}
</style>