<template>
    <div class="event">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb class="event__breadcrumb" :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <div class="event__form">
                        <DropdownMenu class="event__form-dropdown-menu" :defaultTitle="defaultCityTitle" type="city" v-model="param.city"/>
                        <DatePicker class="event__form-date-picker" v-model="param.date"/>
                        <InputText class="event__form-input" v-model="param.keyword" placeholder="想找有趣的？請輸入關鍵字"/>
                        <button class="btn event__form-btn" @click="search()">
                            <img src="@/assets/icon/search_30.svg"/>
                            <span>搜尋</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row event__block" v-if="classBlockShow">
                <div class="event__block-title col-12">熱門主題</div>
                <ClassImgCard v-for="(item, index) in typeList" :key="index" type="food" :className="item.title" :img="item.img"/>
            </div>
            <SearchResultList v-else class="event__search-result" :list="searchList" routeName="EventDetail"/>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DropdownMenu from '@/components/shared/DropdownMenu'
import DatePicker from '@/components/shared/DatePicker'
import InputText from '@/components/shared/InputText'
import ClassImgCard from '@/components/card/ClassImgCard'
import SearchResultList from '@/components/shared/SearchResultList'
import { apiGetEventCityList } from "@/api/api"; 

export default {
    data () {
        return {
            breadcrumbList: [
                {
                    title: "節慶活動",
                    routeName: "Event",
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
            param: {
                city: null,
                date: null,
                keyword: null,
            },
            defaultCityTitle: null,
            searchList: [],
            classBlockShow: true,
        }
    },
    watch: {
        $route: {
            handler: function(val) {
                    let checkSearch = 0;
                    // keyword 帶入
                    if(val.query.keyword) {
                        this.param.keyword = val.query.keyword;
                        checkSearch++;
                    }
                    // city 帶入
                    if(val.query.city) {
                        this.defaultCityTitle = val.query.city
                        checkSearch++;
                    }
                    // 搜尋
                    if(checkSearch > 0) {
                        setTimeout(()=> {
                            this.callApiGetEventCityList()
                        }, 100);
                    }
            },
            immediate: true,
            deep: true,
        },
    },
    components: {
        Breadcrumb,
        DropdownMenu,
        InputText,
        DatePicker,
        ClassImgCard,
        SearchResultList,
    },
    mounted() {
    },
    methods: {
        // 搜尋
        search() {
            this.callApiGetEventCityList()
            // 處理url
            let keyword = this.param.keyword;
            let newQuery = JSON.parse(JSON.stringify(this.$route.query));
            newQuery["keyword"] = keyword 
            this.$router.replace({query: newQuery});
        },
        // 餐廳塞選
        callApiGetEventCityList() {
            this.classBlockShow = false;
            let param = "";
            let city = "";
            let keyword = this.param.keyword
            let date = this.param.date

            if(this.param.keyword && this.param.date) {
                param = `$filter=contains(Name, '${keyword}') or contains(Address,'${keyword}') or contains(Description, '${keyword}') or contains(Description, '${date}') or contains(Description,'${date}') and Picture/PictureUrl1 ne null`;
            }else {
                if(keyword) {
                    param = `$filter=contains(Name, '${keyword}') or contains(Address,'${keyword}') or contains(Description, '${keyword}') and Picture/PictureUrl1 ne null`;
                } 
                if(date) {
                    param = `$filter=contains(Description, '${date}') or contains(Description,'${date}') and Picture/PictureUrl1 ne null`;
                } 
            }
            if(this.param.city) {
                city = this.param.city;
            }
            apiGetEventCityList(city, param)
            .then(res=> {
                this.searchList = res;
            })
            .catch(err=> {
                // 發生錯誤
                console.error(err)
            })
        },
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
    &__search-result {
        margin-top: 60px;
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