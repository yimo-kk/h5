<template>
    <div class="item" @click="jumpDetail">
        <div class="shop-pic-wrapper">
            <img class="shop-pic" :src="item.firstPicture" alt>
        </div>
        <h2 class="title">{{item.storeName}}</h2>
        <div class="tags van-ellipsis">
            <van-tag v-if="item.isShareChannel" color="#EB5081">渠道</van-tag>
            <van-tag v-if="item.isCooperate" color="#EB5081">资源</van-tag>
            <van-tag v-if="item.isShareProject" color="#EB5081">项目</van-tag>
            <van-tag v-if="item.isExpandCustomer" color="#EB5081">拓客</van-tag>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    data() {
        return {
            pic: require("../../assets/img/resource/2.png")
        };
    },
    methods: {
        jumpDetail(){
            this.$emit('onJump', this.item.resourcesId);
        }
    }
};
</script>
<style scoped lang="scss">
    .item{
        display: flex;
        height: 185px;
        position: relative;
        flex-direction: column;
        background-color: #fff;
        padding-bottom: 10px;
        overflow: hidden;
        .shop-pic-wrapper{
            width: 100%;
            height: 112px;
            overflow: hidden;
            .shop-pic{
                max-width: 100%;
                display: block;
            }
        }
        .title{
            font-size: 12px;
            color: #333;
            padding: 8px 10px;
            margin: 0;
        }
        .tags{
            display: flex;
            padding: 1px 10px;
            position: absolute;
            left: 0;
            bottom: 10px;
            .van-tag{
                margin-right: 5px;
            }
        }
        .van-tag{
            font-size: 9px;
        }
    }
</style>