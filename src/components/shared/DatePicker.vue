<template>
    <div class="date-picker">
        <div class="date-picker__selected" @click="menuOpen = !menuOpen">
            <div class="date-picker__selected-title">{{syncValue?syncValue:"選擇日期"}}</div>
            <img src="@/assets/icon/datepicker.svg"/>
        </div>
        <div class="date-picker__menu-wrap" :class="{'date-picker__menu-wrap--open': menuOpen}">
            <div class="date-picker__menu">
                <div class="date-picker__month">十一月</div>
                <div class="date-picker__day">
                    <div class="date-picker__day-item">SUN</div>
                    <div class="date-picker__day-item">MON</div>
                    <div class="date-picker__day-item">TUE</div>
                    <div class="date-picker__day-item">WEN</div>
                    <div class="date-picker__day-item">THU</div>
                    <div class="date-picker__day-item">FRI</div>
                    <div class="date-picker__day-item">SAT</div>
                </div>
                <div class="date-picker__week" v-for="(weeks, index) in dateArr" :key="'week_'+index">
                    <div class="date-picker__date" v-for="(dates, index) in weeks" :key="'date_'+index"
                        :class="{'date-picker__date--active': dates.date == selected.date && dates.date != undefined, 
                            'date-picker__date--empty': dates.date == undefined, 'date-picker__date--today': dates.date == new Date().getDate()}"
                        @click="menuSelect(dates)">{{dates.date}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            menuOpen: false,
            // 選中的日期
            selected: {
                year: null,
                month: null,
                // day: null,
                // week: null,
                date: null,
            },
            // 初始
            defaultDate: {
                year: null,
                month: null,
                // day: null,
                // week: null,
                date: null,
            },
            dateInMonth: [],
            dates: 0,
            firstDay: 0,
            dateArr: [],
        }
    },
    props: {
        value: null, // 綁定的值:menuList的index
        selectedTody: {
            type: Boolean,
            default: false,
        },
        dataSlash: {
            type: String,
            default: "-"
        }
    },
    watch: {
        value: {
            handler: function(val) {
                if(val) {
                    let rawData = new Date(val)
                    this.selected.year = rawData.getFullYear();
                    this.selected.month = rawData.getMonth()+1;
                    // this.selected.week = rawData.getMonth();
                    this.selected.day = rawData.getDay();
                    this.selected.date = rawData.getDate();
                    // 塞入值
                    this.syncValue = rawData.getFullYear() + this.dataSlash + (rawData.getMonth()+1) + this.dataSlash + rawData.getDate();
                }
            },
            immediate: true,
        },
    },
    mounted() {
        // 今天
        let today = new Date();

        // 初始 顯示月份
        if(this.value) {
            this.defaultDate = JSON.parse(JSON.stringify(this.selected));
        }else {
            this.defaultDate.year = today.getFullYear();
            this.defaultDate.month = today.getMonth()+1;
            // this.defaultDate.week = today.getMonth();
            this.defaultDate.day = today.getDay();
            this.defaultDate.date = today.getDate();
        }

        // 預設選取今天
        if(this.selectedTody) {
            this.selected.year = today.getFullYear();
            this.selected.month = today.getMonth()+1;
            // this.selected.week = today.getMonth();
            this.selected.day = today.getDay();
            this.selected.date = today.getDate();

            this.syncValue = this.selected.year + this.dataSlash + this.selected.month + this.dataSlash + this.selected.date;
        }

        // 此月有幾天
        this.dates  = new Date(this.defaultDate.year,this.defaultDate.month, 0).getDate();
        // 此月第一天星期幾
        this.firstDay = new Date(this.defaultDate.year,this.defaultDate.month-1, 1).getDay();

        // 此月的所有天數
        if(this.firstDay != 7) {
            for(var i=0; i<this.firstDay; i++) {
                this.dateInMonth.push({});
            }
        }
        for(var j=0; j<this.dates; j++) {
            this.dateInMonth.push({
                year: this.defaultDate.year,
                month: this.defaultDate.month,
                date: (j+1)
            });
        }
        let week = [];
        for(var k=0; k<this.dateInMonth.length; k++) {
            week.push(this.dateInMonth[k])
            if(week.length ==  7) {
                this.dateArr.push(week)
                week = [];
            }
            if(this.dateInMonth.length == k+1) {
                this.dateArr.push(week)
            }
        }
    },
    methods: {
        // 選擇處理
        menuSelect(date) {
            this.menuOpen = false;
            // this.syncValue = index;
            this.selected = date;
            this.syncValue = date.year + this.dataSlash + date.month + this.dataSlash + date.date;
        }
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
.date-picker {
    &__selected {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid $gray-100;
        border-radius: 5px;
        padding: 11px 20px 11px 30px;
    }
    &__selected-title {
        color: $primary-500;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
    }
    &__menu-wrap {
        background-color: $white;
        overflow: hidden;
        border: 1px solid $gray;
        border-radius: 6px;
        position: absolute;
        z-index: $zindex-dropdown;
        top: 57px;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        &--open {
            display: block;
        }
    }
    &__menu {
        padding: 8px;
    }
    &__month {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        margin-bottom: 8px;
    }
    &__day {
        display:flex;
        align-items: center;
    }
    &__day-item {
        font-size: 12px;
        line-height: 14px;
        width: 30px;
        margin-right: 8px;
        color: $gray-700;
        text-align: center;
        &:nth-last-child(1) {
            margin-right: 0;
        }
    }
    &__week {
        display:flex;
        align-items: center;
        margin-top: 8px;
    }
    &__date {
        width: 30px;
        height: 30px;
        font-size: 14px;
        line-height: 16px;
        display:flex;
        align-items: center;
        justify-content: center;
        background-color: $white;
        color: $black;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 8px;
        transition: 0.2s all ease;
        &:nth-last-child(1) {
            margin-right: 0px;
        }
        &:hover {
            background-color: $gray-300;
            color: $white;
        }
        &--empty {
            cursor: unset;
            &:hover {
                background-color: $white;
            }
        }
        &--today {
            background-color: $red;
            color: $white;
            &:hover {
                background-color: $red;
                color: $white;
            }
        }
        &--active {
            background-color: $primary-800;
            color: $white;
            &:hover {
                background-color: $primary-800;
                color: $white;
            }
        }
        &--disabled {
            color: $gray-800;
        }
    }
}
</style>