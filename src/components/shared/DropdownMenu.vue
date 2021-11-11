<template>
    <div class="dropdown-menu">
        <div class="dropdown-menu__selected" @click="menuOpenClick()">
            <div class="dropdown-menu__selected-title">{{menuList[selectedIndex]?menuList[selectedIndex].title:"沒有選項"}}</div>
            <img :class="{'open': menuOpen}" src="@/assets/icon/dropdown_arrow.svg"/>
        </div>
        <div class="dropdown-menu__menu" :class="{'dropdown-menu__menu--open': menuOpen}">
            <ul>
                <li v-for="(item, index) in menuList" :key="index" @click="menuSelect(index)">{{item.title}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import { apiGetCityList } from "@/api/api"; 

export default {
    data () {
        return {
            menuOpen: false,
            selectedIndex: 0,
        }
    },
    props: {
        value: null, // 綁定的值:menuList的index
        menuList: {
            type: Array,
            default: () => { return [] },
        },
        type: {
            type: String,
            default: null,
        },
    },
    watch: {
        type: {
            handler: function(val) {
                if(val) {
                    if(val == "city") {
                        // 取得城市選單
                        this.callApiGetCityList();
                    }
                }
            },
            immediate: true,
        },
    },
    methods: {
        // 選擇
        menuOpenClick() {
            if(this.menuList.length > 0) {
                this.menuOpen = !this.menuOpen;
            }
        },
        // 選擇處理
        menuSelect(index) {
            this.menuOpen = false;
            this.selectedIndex = index;
            this.syncValue = this.menuList[this.selectedIndex].value
        },
        // 城市列表
        callApiGetCityList() {
            apiGetCityList()
            .then(res=> {
                this.menuList = [];
                this.menuList.push({
                    title: "全部縣市",
                    value: "",
                });
                res.map( item => {
                    this.menuList.push({
                        title: item.CityName,
                        value: item.City,
                    });
                });
            })
            .catch(err=> {
                // 發生錯誤
                console.error(err)
            })
        },
    },
    computed: {
        syncValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.dropdown-menu {
    &__selected {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid $gray-100;
        border-radius: 5px;
        padding: 11px 20px 11px 30px;
        img {
            transition: 0.5s all ease;
            &.open {
                transform: rotate(180deg);
                transform-origin: 0,0;
            }
        }
    }
    &__selected-title {
        color: $primary-500;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
    }
    &__menu {
        background-color: $white;
        overflow: hidden;
        border: 1px solid $gray;
        border-radius: 6px;
        position: absolute;
        z-index: $zindex-dropdown;
        top: 57px;
        left: 0;
        width: 100%;
        display: none;
        max-height: 350px;
        overflow: scroll;
        &--open {
            display: block;
        }
    }
    ul {
        
    }
    li {
        cursor: pointer;
        padding: 11px 30px;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        border-bottom: 1px solid $gray;
        background-color: $white;
        transition: 0.5s all ease;
        &:nth-last-child(1) {
            border: none;
        }
        &:hover {
            background-color: $primary-20;
        }
    }
}
</style>