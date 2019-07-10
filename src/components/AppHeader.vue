<template>
    <div class="header-wrapper">
        <div class="top"></div>
        <div class="header" :style="{backgroundImage: 'url('+headerBg+')'}">
            <img v-if="isShowToBack" :src="arrowRight" @click="toBack" class="arrow-right" alt="">
            <div class="header-name">
                <span>{{title}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isShowToBack: false, //是否显示返回图标
        title: String
    },
    data() {
        return {
            headerBg: require('../assets/img/search-bg.png'),
            arrowRight: require('../assets/img/white-right-arrow-icon.png')
        };
    },
    methods: {
        toBack(){
            this.$emit('toBack');
        }
    },
};
</script>
<style lang="scss" scoped>
        /* 竖屏底下的查询 */
@media screen and (orientation: portrait) {
    .top {
        /* 防止页面被刘海遮住 */
        padding-top: constant(safe-area-inset-top);
        /*IOS 11.2版本版本支持*/
        padding-top: env(safe-area-inset-top);
        background: #fff;
    }
}
/* 横屏底下的查询 */
@media screen and (orientation: landscape) {
    .top {
        /* IOS 11支持*/
        padding-right: constant(safe-area-inset-right);
        padding-left: constant(safe-area-inset-left);
        /*IOS 11.2版本版本支持*/
        padding-right: env(safe-area-inset-right);
        padding-left: env(safe-area-inset-left);
    }
}
.header-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    display: block;
    box-sizing: border-box;
    .header {
        width: 100%;
        height: 48px;
        position: relative;

        .header-name {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-size: 17px;
                color: #fff;
            }
        }
        .arrow-right{
            width: 10px;
            height: 16px;
            position: absolute;
            left: 10px;
            top: 50%;
            padding: 10px;
            transform: translateY(-50%);
        }
    }
}
</style>

