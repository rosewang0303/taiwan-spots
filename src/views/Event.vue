<template>
    <div class="event">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb class="event__breadcrumb" :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <div class="event__form">
                        <DropdownMenu class="event__form-dropdown-menu" :menuList="menuList" v-model="form.city"/>
                        <DatePicker class="event__form-date-picker" v-model="param.date"/>
                        <InputText class="event__form-input" v-model="param.search" placeholder="想找有趣的？請輸入關鍵字"/>
                        <button class="btn event__form-btn" @click="search()">
                            <img src="@/assets/icon/search_30.svg"/>
                            <span>搜尋</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row event__block">
                <div class="event__block-title col-12">熱門主題</div>
                <div class="event__item-wrap col-lg-3 col-md-4 col-6" v-for="(item, index) in typeList" :key="index">
                    <div class="event__img-wrap">
                        <img :src="item.img"/>
                    </div>
                    <div class="event__item-title">{{item.title}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DropdownMenu from '@/components/shared/DropdownMenu'
import DatePicker from '@/components/shared/DatePicker'
import InputText from '@/components/shared/InputText'

export default {
    data () {
        return {
            breadcrumbList: [
                {
                    title: "節慶活動",
                    routeName: "Event",
                },
            ],
            menuList: [
                {
                    title: "全部縣市",
                    value: "",
                },
                {
                    title: "台北市",
                    value: "台北市",
                },
                {
                    title: "新北市",
                    value: "新北市",
                },
            ],
            typeList: [
                {
                    title: "節慶活動",
                    img: require('@/assets/img/event_type_1.png'),
                },
                {
                    title: "自行車活動",
                    img: require('@/assets/img/event_type_2.png'),
                },
                {
                    title: "遊憩活動",
                    img: require('@/assets/img/event_type_3.png'),
                },
                {
                    title: "產業文化活動",
                    img: require('@/assets/img/event_type_4.png'),
                },
                {
                    title: "年度活動",
                    img: require('@/assets/img/event_type_5.png'),
                },
                {
                    title: "四季活動",
                    img: require('@/assets/img/event_type_6.png'),
                },
            ],
            form: {
                city: 0,
            },
            param: {
                city: null,
                date: null,
            },
        }
    },
    components: {
        Breadcrumb,
        DropdownMenu,
        InputText,
        DatePicker,
    },
    methods: {
    },
}
</script>
<style lang="scss" scoped>
.event {
    &__breadcrumb {
        padding: 0 0 0 5px;
    }
    &__form {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 15px;
        margin-top: 40px;
    }
    &__form-dropdown-menu {
        width: 21.6%;
    }
    &__form-date-picker {
        width: 21.6%;
    }
    &__form-input {
        width: 33.3%;
    }
    &__form-btn {
        width: 15.8%;
    }
    &__block {
        margin-top: 60px;
    }
    &__block-title {
        font-weight: 300;
        font-size: 36px;
        line-height: 52px;
        letter-spacing: 0.03em;
        color: $gray-900;
    }
    &__item-wrap {
        cursor: pointer;
        margin-top: 12px;
        position: relative;
        overflow: hidden;
        &:hover {
            .event__img-wrap img {
                transition: 0.5s all ease;
                transform: scale(1.5);
            }
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
    .event {
        &__breadcrumb {
            margin-top: 18px;
        }
        &__form {
            padding: 0;
            margin-top: 16px;
            margin-bottom: 24px;
        }
        &__form-dropdown-menu {
            width: 100%;
            margin-bottom: 7px;
        }
        &__form-date-picker {
            width: 100%;
            margin-bottom: 7px;
        }
        &__form-input {
            width: 100%;
            margin-bottom: 7px;
        }
        &__form-btn {
            width: 100%;
        }
        &__block {
            margin-top: 0px;
        }
        &__block-title {
            font-size: 24px;
            line-height: 35px;
        }
        &__img-wrap {
            border-radius: 16px;
        }
    }
}
@media screen and (max-width: 576px){
    .event {
        &__item-title {
            font-size: 16px;
            line-height: 23px;
        }
    }
}
</style>