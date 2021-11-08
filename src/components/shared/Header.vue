<template>
    <header class="header">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="header__wrap">
                        <div class="header__space">&nbsp;</div>
                        <router-link :to="{name: 'Index'}">
                            <img class="header__logo--pc" src="@/assets/img/logo_pc.svg"/>
                            <img class="header__logo--mb" src="@/assets/img/logo_mb.svg"/>
                        </router-link>
                        <div class="header__menu-control header__menu-control--menu" @click="menuOpen = true">
                            <img src="@/assets/icon/menu.svg"/>
                        </div>
                        <!-- 手機版-選單 -->
                        <div class="header__overlay" v-if="menuOpen"></div>
                        <div class="header__menu" :class="{'header__menu--open': menuOpen}">
                            <div class="header__menu-control--close">
                                <router-link :to="{name: 'Index'}">
                                    <img class="header__logo" src="@/assets/img/logo_mb.svg"/>
                                </router-link>
                                <div class="header__menu-control" @click="menuOpen = false">
                                    <img src="@/assets/icon/close.svg"/>
                                </div>
                            </div>
                            <ul @click="menuOpen = false">
                                <router-link :to="{name: 'Spot'}">
                                    <li>探索景點</li>
                                </router-link>
                                <router-link :to="{name: 'Event'}">
                                    <li>節慶活動</li>
                                </router-link>
                                <router-link :to="{name: 'Food'}">
                                    <li>品嚐美食</li>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data () {
        return {
            menuOpen: false,
        }
    },
}
</script>
<style lang="scss" scoped>
.header {
    border-bottom: solid 1px $gray;
    &__wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 0;
    }
    &__logo {
        &--pc {
            display: block;
        }
        &--mb {
            display: none;
        }
    }
    ul {
        display: flex;
        align-items: center;
    }
    li {
        margin-left: 20px;
        cursor: pointer;
        padding: 0 0 5px;
        border-bottom: 2px solid $white;
        font-size: 18px;
        line-height: 26px;
        color: $gray-900;
        transition: 0.5s all ease;
        &:hover {
            color: $primary;
            border-bottom: 2px solid $yellow;
        }
    }
    &__space {
        display: none;
    }
    &__menu-control {
        display: none;
    }
    &__logo {
        display: none;
    }
}
@media screen and (max-width: 768px){
    .header {
        &__logo {
            &--pc {
                display: none;
            }
            &--mb {
                display: block;
            }
        }
    }
}
@media screen and (max-width: 576px){
    .header {
        &__wrap {
            padding: 8px 0  6px;
        }
        &__space {
            display: block;
            width: 50px;
        }
        &__menu-control {
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background-color: $primary-light;
            display: flex;
            align-items: center;
            justify-content: center;
            &--menu {
                display: flex;
            }
            &--close {
                display: none;
            }
        }
        ul {
            display: block;
            padding: 0 8px;
        }
        li {
            display: none;
            border: none;
            width: 100%;
            margin: 0;
            padding: 24px 0;
            text-align: center;
            border-bottom: solid 1px $gray;
            &:hover {
                border-bottom: solid 1px $gray;
            }
            &:nth-last-child(1) {
                border: none;
            }
        }
        &__menu {
            display: none;
            &--open {
                animation: menuToggle 0.5s ease both;
                padding-bottom: 32px;
                border: 1px solid rgba(229, 229, 229, 1);
                border-bottom-left-radius: 50px;
                width: 276px;
                display: block;
                position: fixed;
                z-index: $zindex-header-menu;
                right: 0;
                top: 0;
                background-color: $white;
                .header__logo {
                    display: block;
                }
                li {
                    display: block;
                }
                .header__menu-control {
                    &--close {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin: 8px 8px 9px 30px;
                    }
                }
            } 
        }
        &__overlay {
            position: fixed;
            z-index: $zindex-header-overlay;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(4px);
        }
    }
    @keyframes menuToggle {
        from {
            opacity: 0;
            transform: translateX(1000px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
}
</style>