<template>
    <div class="food">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Breadcrumb class="food__breadcrumb" :list="breadcrumbList"/>
                </div>
                <div class="col-12">
                    <div class="food__form">
                        <DropdownMenu class="food__form-dropdown-menu" :defaultTitle="defaultCityTitle" type="city" v-model="param.city"/>
                        <InputText class="food__form-input" v-model="param.keyword" placeholder="你想吃什麼？請輸入關鍵字"/>
                        <button class="btn food__form-btn" @click="search()">
                            <img src="@/assets/icon/search_30.svg"/>
                            <span>搜尋</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row food__block" v-if="classBlockShow">
                <div class="food__block-title col-12">熱門分類</div>
                <ClassImgCard v-for="(item, index) in typeList" :key="index" type="food" :className="item.title" :img="item.img"/>
            </div>
            <SearchResultList v-else class="food__search-result" :list="searchList" routeName="FoodDetail"/>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DropdownMenu from '@/components/shared/DropdownMenu'
import InputText from '@/components/shared/InputText'
import ClassImgCard from '@/components/card/ClassImgCard'
import SearchResultList from '@/components/shared/SearchResultList'
import { apiGetFoodCityList } from "@/api/api"; 

export default {
    data () {
        return {
            breadcrumbList: [
                {
                    title: "品嚐美食",
                    routeName: "Food",
                },
            ],
            typeList: [
                {
                    title: "地方特產",
                    img: require('@/assets/img/food_type_1.png'),
                },
                {
                    title: "中式美食",
                    img: require('@/assets/img/food_type_2.png'),
                },
                {
                    title: "甜點冰品",
                    img: require('@/assets/img/food_type_3.png'),
                },
                {
                    title: "異國料理",
                    img: require('@/assets/img/food_type_4.png'),
                },
                {
                    title: "伴手禮",
                    img: require('@/assets/img/food_type_5.png'),
                },
                {
                    title: "素食",
                    img: require('@/assets/img/food_type_6.png'),
                },
            ],
            param: {
                city: null,
                keyword: null,
            },
            defaultCityTitle: null,
            searchList: [],
            classBlockShow: true,
        }
    },
    components: {
        Breadcrumb,
        DropdownMenu,
        InputText,
        ClassImgCard,
        SearchResultList,
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
                            this.callApiGetFoodCityList()
                        }, 100);
                    }
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
    },
    methods: {
        // 搜尋
        search() {
            this.callApiGetFoodCityList()
            // 處理url
            let keyword = this.param.keyword;
            let newQuery = JSON.parse(JSON.stringify(this.$route.query));
            newQuery["keyword"] = keyword 
            this.$router.replace({query: newQuery});
        },
        // 餐廳塞選
        callApiGetFoodCityList() {
            this.classBlockShow = false;
            let param = "";
            let city = "";
            if(this.param.keyword) {
                let keyword = this.param.keyword
                param = `$filter=contains(Name, '${keyword}') or contains(Address,'${keyword}') or contains(Description, '${keyword}') and Picture/PictureUrl1 ne null`;
            } 
            if(this.param.city) {
                 city = this.param.city;
            }
            apiGetFoodCityList(city, param)
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
.food {
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
    &__form-input {
        width: 54.1%;
    }
    &__form-btn {
        width: 18.9%;
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
    .food {
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
    .food {
        &__item-title {
            font-size: 16px;
            line-height: 23px;
        }
    }
}
</style>