<template>
    <div class="tab-wrapper">
        <van-tabs :swipe-threshold="5" @click="getCategoryId" :title-active-color="'#7d7e80'">
            <van-tab v-for="item in categoryList" :key="item.id">
                <div class="icon-wrapper" slot="title">
                    <van-icon :name="item.icon" size="29px"/>
                    <span>{{item.title}}</span>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            categoryList: [
                {id: 1, title: '美容', icon:require("../../assets/img/resource/tab-icon01.png")},
                {id: 2, title: '美发', icon:require("../../assets/img/resource/tab-icon02.png")},
                {id: 3, title: '美甲', icon:require("../../assets/img/resource/tab-icon03.png")},
                {id: 4, title: '美体', icon:require("../../assets/img/resource/tab-icon04.png")},
                {id: 5, title: '医美', icon:require("../../assets/img/resource/tab-icon05.png")},
            ]
        };
    },
    methods: {
        getCategoryId(index){
            this.$emit('onJump', {id: this.categoryList[index].id, title: this.categoryList[index].title});
        }
    },
};
</script>
<style lang="scss">
.tab-wrapper {
    padding: 0 10px;
    background-color: #fff;
    .icon-wrapper {
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .van-tabs__line{
        display: none;
        padding-top: 0;
    }
    .van-tabs--line{
        padding-top: 0;
    }
    .van-tabs--line, .van-tabs--line .van-tabs__wrap{
        height: 90px;
    }
    .van-tab span{
        line-height: 28px;
    }
}
</style>