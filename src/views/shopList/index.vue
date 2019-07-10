<template>
    <div class="shop-list">
        <div class="fixed-content">
            <gHeader @toBack="jumpBack" :arrowWhite="true" :isShowBg="true" :isShowSearchBox="true"></gHeader>
            <div class="tabs-wrapper">
                <van-tabs @click="getNemu" :title-inactive-color="'#333'" :title-active-color="'#E45089'" :color="'#E45089'" :swipe-threshold="5">
                    <van-tab v-for="item in menus" :title="item.name" :key="item.id">
                    </van-tab>
                </van-tabs>
            </div>
         </div>
        <div class="list-content">
            <div class="tip">
                <span class="text">默认</span>
            </div>
            <div class="list">
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
                <div class="list-item">
                    <ProductItem @toDetail="jumDetail"></ProductItem>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import gHeader from '@/components/header'
    import ProductItem from '@/components/productItem'
    import common from '@/mixins/common'

    export default {
        mixins: [common()],
        components: {
            gHeader,
            ProductItem
        },
        data() {
            return {
                menus: [
                    {id: 1, name: '美容'},
                    {id: 2, name: '美发'},
                    {id: 3, name: '美甲'},
                    {id: 4, name: '美体'},
                    {id: 5, name: '医美'}
                ]
            }
        },
        methods: {
            getNemu(index, title){
               
            },
            jumDetail() {
                this.$router.push({
                    path: 'shopDetail',
                    query: {
                        id: '666'
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .shop-list{
        background-color: #f4f4f4;
        padding-top: 100px;
        .fixed-content{
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            .tabs-wrapper{
                margin-top: 48px;
            }
        }
        .list-content{
            padding: 0 10px;
            margin-bottom: 23px;
            background-color: #fff;
            .tip{
                display: flex;
                justify-content: space-between;
                line-height: 42px;
                border-bottom: 1px solid #ddd;
                .text{
                    font-size: 13px;
                    color: #333;
                    margin-left: 16px;                    
                }
            }
            .list{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                background-color: #fff;
                margin-top: 5px;
                .list-item{
                    padding-top: 10px;
                }
            }
        }
    }
</style>
