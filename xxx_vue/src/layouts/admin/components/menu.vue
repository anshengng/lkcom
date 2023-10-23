<script setup lang="ts">
import menuStore from '@/store/menuStore';
import router from '@/router';
import { IMenu, Menu } from 'types/menu';

const menus = menuStore() //store-pinia 筛选后的所有路由
menus.init()

const resetActive = () => {
    //重置其他标签的active
    menus.menus.forEach(item => {
        item.active = false
        item.children?.forEach(child => {
            child.active = false
        })
    })
}

const clickHandler = (pmenu: IMenu) => {
    if(pmenu.active===true){
        pmenu.active = false  //如果目前是展开，就让他折叠
        return;
    }
    resetActive()
    menus.close = false
    pmenu.active = true
}

const clickChildMenu = (pmenu: IMenu, cmenu: Menu) => {
    resetActive()
    pmenu.active = true

    // TODO: '这里需要优化，如果点击的是压缩菜单的子菜单时不应该将菜单打开即close应该仍为true。' 
    const closeState: boolean = menus.close
    menus.close = closeState ? false : true

    //重置所有child的active
    pmenu.children?.forEach(child => {
        child.active = false
    })
    router.push({ path: `${pmenu.route}/${cmenu.route!}` }) // 菜单点击跳转
    cmenu.active = true
}

</script>


<template>
    <div :class="{ 'close': menus.close }" class="h-[1000px] cursor-pointer" @click="menus.toggleState">
        <div class="mt-6 menu ">
            <dl class="mt-1 " v-for="menu in   menus.menus  ">
                <dt @click.stop="clickHandler(menu)">
                    <i :class="menu.icon ? menu.icon : 'fab fa-cloudversify'" class="text-2xl"></i>
                    <span>{{ menu.title }}</span>
                    <i class="fas fa-angle-down  mr-6 arrow" :class="{ 'rotate-180': !menus.close && menu.active }" @click.stop="clickHandler(menu)"></i>
                </dt>
                <dd v-show=" !menus.close && menu.active ">
                    <div :class=" { active: childMenu.active } " @click="clickChildMenu(menu, childMenu)"
                        v-for="(  childMenu, index  ) in   menu.children " :key=" index ">
                        {{ childMenu.title }}</div>
                </dd>
            </dl>
        </div>
    </div>
</template>


<style lang="scss" scoped>
div {
    .menu {
        dl {
            @apply grid items-center;

            dt {
                @apply flex w-full justify-between pl-2 items-center bg-slate-600 h-12 rounded-md text-white cursor-pointer
            }

            dd {
                div {
                    @apply flex w-full justify-between pl-2 items-center bg-zinc-400 mt-1 h-12 rounded-md text-white cursor-pointer
                }
            }

            & .active {
                @apply bg-slate-700
            }
        }
    }

    .close {
        @apply flex justify-between ml-1 mt-3;

        .menu {
            @apply w-14 m-0 p-0;

            dl {
                @apply relative;

                dt {
                    @apply flex justify-center p-0;

                    span {
                        @apply hidden
                    }

                    .arrow {
                        @apply hidden;
                    }

                }

                &:hover {
                    dd {
                        display: block !important;
                        @apply absolute left-full top-0 w-[200px] h-[200px] z-50;
                    }
                }

            }



        }
    }
}



@media screen and (min-width: 768px) {
    .menu {
        @apply z-50
    }
}
</style>