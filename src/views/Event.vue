<template>
    <div class="event">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb class="event__breadcrumb" :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <div class="event__form">
                        <DropdownMenu class="event__form-city" type="city" v-model="param.city"/>
                        <DatePicker class="event__form-date-picker" v-model="param.date"/>
                        <DropdownMenu class="event__form-class" :menuList="menuTypeList" v-model="param.class"/>
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
                <ClassImgCard v-for="(item, index) in typeList" :key="index" type="food" :className="item.title" :img="item.img" @searchClass="searchClass"/>
            </div>
            <div v-else class="event__search-wrap">
                <div v-if="loading" class="event__loading">資料載入中...</div>
                <SearchResultList v-else class="event__search-result" :list="searchList" routeName="EventDetail"/>
            </div>
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
                    value: "節慶活動",
                    img: require('@/assets/img/event_type_1.png'),
                },
                {
                    title: "自行車活動",
                    value: "自行車活動",
                    img: require('@/assets/img/event_type_2.png'),
                },
                {
                    title: "遊憩活動",
                    value: "遊憩活動",
                    img: require('@/assets/img/event_type_3.png'),
                },
                {
                    title: "產業文化活動",
                    value: "產業文化活動",
                    img: require('@/assets/img/event_type_4.png'),
                },
                {
                    title: "年度活動",
                    value: "年度活動",
                    img: require('@/assets/img/event_type_5.png'),
                },
                {
                    title: "四季活動",
                    value: "四季活動",
                    img: require('@/assets/img/event_type_6.png'),
                },
            ],
            param: {
                city: "",
                date: null,
                keyword: null,
                class: "",
            },
            searchList: [],
            classBlockShow: true,
            menuTypeList: [],
            loading: false,
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
        let defaultVal = {
            title: "全部主題",
            value: "",
        }
        let defaultList = JSON.parse(JSON.stringify(this.typeList));
        defaultList.splice(0, 0, defaultVal);
        this.menuTypeList = defaultList;
    },
    methods: {
        // 搜尋
        search() {
            this.callApiGetEventCityList()
            // 處理url
            let keyword = this.param.keyword;
            let newQuery = JSON.parse(JSON.stringify(this.$route.query));
            if(keyword) {
                newQuery["keyword"] = keyword
                this.$router.replace({query: newQuery});
            }else {
                if(this.$route.query.keyword) {
                    delete newQuery["keyword"];
                    this.$router.replace({query: newQuery});
                }
            }
        },
        // 選擇主題
        searchClass(className) {
            this.param.class = className;
            this.callApiGetEventCityList();
        },
        // 餐廳塞選
        callApiGetEventCityList() {
            this.loading = true;

            this.classBlockShow = false;
            let param = "";
            let city = "";
            if(this.param.keyword && this.param.date && this.param.class) {
                let keyword = this.param.keyword
                let date = this.param.date
                let className = this.param.class
                param = `$filter=(contains(Name, '${keyword}') or contains(Address,'${keyword}') or contains(Description, '${keyword}') or contains(Description, '${date}') or contains(Description,'${date}') or contains(Class1, '${className}') or contains(Class2, '${className}')) and Picture/PictureUrl1 ne null`;
            } else if(!this.param.keyword && !this.param.date && !this.param.class){
                param = `$filter=Picture/PictureUrl1 ne null`;
            }else {
                let paramCount = 0;
                param = `$filter=`;
                if(this.param.keyword) {
                    let keyword = this.param.keyword
                    if(paramCount > 0) {
                        param += "or "
                    }
                    param += `(contains(Name, '${keyword}') or contains(Address,'${keyword}') or contains(Description, '${keyword}'))`;
                    paramCount++;
                } 
                if(this.param.date) {
                    let date = this.param.date
                    if(paramCount > 0) {
                        param += "or "
                    }
                    param += `(contains(Description, '${date}') or contains(Description,'${date}'))`;
                    paramCount++;
                } 
                if(this.param.class) {
                    let className = this.param.class
                    if(paramCount > 0) {
                        param += "or "
                    }
                    param += `(contains(Class1, '${className}') or contains(Class2, '${className}'))`;
                    paramCount++;
                }
                param += ` and Picture/PictureUrl1 ne null`;
            }

            if(this.param.city) {
                city = this.param.city;
            }
            apiGetEventCityList(city, param)
            .then(res=> {
                this.searchList = res;
                this.loading = false;
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
    &__form-city {
        width: 17.2%;
    }
    &__form-date-picker {
        width: 17.2%;
    }
    &__form-class {
        width: 17.2%;
    }
    &__form-input {
        width: 23.3%;
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
    &__search-wrap {
        width: 100%;
    }
    &__search-result {
        margin-top: 60px;
    }
    &__loading {
        margin-top: 60px;
        text-align: center;
        font-weight: bold;
        color: $primary;
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
        &__form-city {
            width: 100%;
            margin-bottom: 7px;
        }
        &__form-class {
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
        &__search-result {
            margin-top: 24px;
        }
        &__loading {
            margin-top: 24px;
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