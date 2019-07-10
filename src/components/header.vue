<template>
    <div class="header-wrapper">
        <div :class="['top', isShowBg ? 'top-bg' : '']"></div>
        <div :class="['header', isShowBg ? 'header-sel' : '']">
            <span :class="['name', arrowWhite || whiteTitle ? 'white-name' : '']">{{title}}</span>
            <div class="search-wrapper" v-if="isShowSearchBox">
                <van-search
                    placeholder="请输入搜索关键词"
                    background="rgba(255,255,255,.4)"
                    shape="round"
                    v-model="keyWord"
                ></van-search>
            </div>
            <img
                class="left"
                v-if="showArrow"
                @click="jumpBack"
                src="../assets/img/right-arrow-icon.png"
                alt
            >
            <img
                class="left"
                v-if="arrowWhite"
                @click="jumpBack"
                src="../assets/img/white-right-arrow-icon.png"
                alt
            >
            <div class="right">
                <img
                    class="more-icon"
                    v-if="visibleMore"
                    @click="jumpList"
                    src="../assets/img/more-icon.png"
                    alt
                >
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        visibleMore: false, //显示查看更多图标
        title: String, //头部标题
        arrowWhite: false, //是否使用白色图标 Boolean值 默认false;
        isShowBg: false, //是否展示头部背景 Boolean值 默认false;
        isShowSearchBox: false, //是否显示搜索框 Boolean值 默认false,
        showArrow: false,
        whiteTitle: false
    },
    data() {
        return {
            keyWord: ""
        };
    },
    methods: {
        jumpList() {
            this.$emit("toList");
        },
        jumpBack() {
            this.$emit("toBack");
        },
        onSearch() {}
    }
};
</script>
<style lang="scss" scoped>
.header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    display: block;
    box-sizing: border-box;
    /* 因为header导航栏是基于屏幕进行定位，所以要做单独的padding挤压处理 */
    // padding-top: constant(safe-area-inset-top);
    // padding-bottom: constant(safe-area-inset-bottom);
    // padding-top: env(safe-area-inset-top);
    // padding-bottom: env(safe-area-inset-bottom);
}
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
.top-bg {
    background: linear-gradient(
        90deg,
        rgba(237, 80, 128, 1),
        rgba(194, 75, 155, 1),
        rgba(79, 37, 102, 1)
    );
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
.header-sel {
    background: linear-gradient(
        90deg,
        rgba(237, 80, 128, 1),
        rgba(194, 75, 155, 1),
        rgba(79, 37, 102, 1)
    ) !important;
}
.header {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    background: #fff;
    .name {
        font-size: 18px;
        color: #333;
    }
    .white-name {
        color: #fff;
    }
    .left,
    .right {
        display: flex;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .left {
        width: 10px;
        height: 17px;
        left: 10px;
        padding: 10px;
        // margin-top: -8px;
    }
    .right {
        right: 20px;
        .more-icon {
            width: 22px;
            height: 16px;
        }
    }
    .search-wrapper {
        width: 280px;
        position: absolute;
        left: 55px;
        top: 50%;
        transform: translateY(-50%);
        .van-search {
            background: none !important;
            padding-left: 0;
            padding-right: 0;
            .van-search__content {
                height: 200px;
            }
        }
    }
}
</style>
