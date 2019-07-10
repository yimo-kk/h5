<template>
    <div class="product-item" @click="jumpDetail">
        <div class="wrapper-pic">
            <img class="pic" v-lazy="item.firstPicture" alt="">
        </div>
        <div class="item-content">
            <h2 class="shop-name van-ellipsis">{{item.title}}</h2>
            <div class="shop-address">
                <span>{{limitShowNum(item.advantage, 4)}}  {{item.area}}㎡</span>
                <span>{{limitShowNum(item.city, 4)}} - {{limitShowNum(item.district, 4)}}</span>
            </div>
            <span class="shop-money">￥{{item.transferFee}}</span>
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

        }
    },
    methods: {
        limitShowNum(txt, num){
            let str = txt;
            if(str && num < str.length){
                str = str.substr(0,num)+'...';
                return str;
            }else {
                return str;
            }
        },
        jumpDetail() {
            this.$emit('toDetail', this.item.releaseId);
        }
    }
}
</script>
<style scoped lang="scss">
    .product-item{
        width: 100%;
        background:rgba(244,244,244,1);
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        .wrapper-pic{
            width: 100%;
            height: 90px;
            overflow: hidden;
            .pic{
                width: 100%;
                border-radius: 5px 5px 0px 0px;
            }
        }
        .item-content{
            display: flex;
            flex-direction: column;
            padding: 0 5px;
            padding-bottom: 7px;
            .shop-name{
                font-size: 14px;
                font-weight: normal;
                color: #333;
                margin-top: 6px;
                margin-bottom: 0;
            }
            .shop-address{
                display: flex;
                justify-content: space-between;
                span{
                    font-size: 12px;
                    color: #999;
                }
            }
            .shop-money{
                font-size: 14px;
                color: #E45089;
            }
        }
    }
</style>