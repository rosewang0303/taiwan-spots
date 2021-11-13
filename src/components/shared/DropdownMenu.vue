<template>
    <div class="dropdown-menu">
        <div class="dropdown-menu__selected" @click="menuOpenClick()">
            <div class="dropdown-menu__selected-title">{{selectedTitle}}</div>
            <img :class="{'open': menuOpen}" src="@/assets/icon/dropdown_arrow.svg"/>
            <select class="dropdown-menu__mb-menu" v-model="syncValue" @change="selectChangeHandler($event)">
                <option :value="item.value" v-for="(item, index) in list" :key="index">{{item.title}}</option>
            </select>
        </div>
        <div class="dropdown-menu__menu" :class="{'dropdown-menu__menu--open': menuOpen}">
            <ul>
                <li v-for="(item, index) in list" :key="index" @click="menuSelect(index)">{{item.title}}</li>
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
            list: [],
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
        defaultTitle: {
            type: String,
            default: null,
        },
    },
    beforeDestroy() {
        window.removeEventListener('click', this.clickHandler);
    },
    mounted() {
        // 監聽click事件
        window.addEventListener('click', this.clickHandler);
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
        menuList: {
            handler: function(val) {
                if(val) {
                    this.list = val;
                }
            },
            immediate: true,
        },
    },
    methods: {
        // 點擊選單外:選單關閉
        clickHandler(event) {
            if(!this.$el.contains(event.target)){
                this.menuOpen = false;
            }
        },
        // 選擇
        menuOpenClick() {
            if(this.menuList.length > 0 && !this.isMobile()) {
                this.menuOpen = !this.menuOpen;
            }
        },
        // 選擇處理
        menuSelect(index) {
            if(index) {
                // 電腦版
                this.menuOpen = false;
                this.selectedIndex = index;
                this.syncValue = this.menuList[this.selectedIndex].value
            }
        },
        // 行動版選單 select change
        selectChangeHandler(event) {
            let selectedVal = event.target.value;
            
            for(var i=0; i<this.list.length; i++) {
                let item = this.list[i];
                
                if(item.value == selectedVal) {
                    this.selectedIndex = i;
                    return;
                }
            }
        },
        // 城市列表
        callApiGetCityList() {
            apiGetCityList()
            .then(res=> {
                this.list.push({
                    title: "全部縣市",
                    value: "",
                });
                res.map( item => {
                    this.list.push({
                        title: item.CityName,
                        value: item.City,
                    });
                });
                if(this.defaultTitle && this.list) {
                    for(var i=0; i<this.list.length; i++) {
                        let item = this.list[i];
                        if(this.defaultTitle == item.title) {
                            this.selectedIndex = i;
                            this.syncValue = this.list[this.selectedIndex].value;
                            return
                        }
                    }
                }
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
        selectedTitle() {
            return this.list[this.selectedIndex]?this.list[this.selectedIndex].title:"無"
        },
    },
}
</script>
<style lang="scss" scoped>
.dropdown-menu {
    &__mb-menu {
        display: none;
    }
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
@media screen and (max-width: 768px){
    .dropdown-menu {
        &__mb-menu {
            display: block;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            height: 50px;
            opacity: 0;
        }
    }
}
</style>