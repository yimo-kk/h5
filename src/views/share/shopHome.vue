<template>
    <div class="shop-home-page">
        <gHeader :title="title" :whiteTitle="true" :arrowWhite="false" :isShowBg="true"></gHeader>
        <div class="page-body">
            <div class="shop-info">
                <div class="info-left">
                    <img class="shop-logo" src="" alt="">
                </div>
                <div class="info-right">
                    <h2 class="shop-title">{{shopInfo.companyName}}</h2>
                    <div class="info-detail">
                        <!-- <span class="level">黄金店铺</span> -->
                        <span class="rate">店铺评分：{{shopInfo.avgRating}}</span>
                        <div class="collection-share">
                            <div class="collection">
                                <img class="icon" :src="shopCollection" alt="">
                                <span class="text">收藏店铺</span>
                            </div>
                            <div class="share">
                                <img class="icon" :src="shareIcon" alt="">
                                <span class="text">分享</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="category-wrapper">
                <van-tabs v-model="active" animated :title-active-color="'#E84F80'" :color="'#E84F80'" :swipeable="true">
                    <van-tab  title="招聘信息">
                        <recruitDetail></recruitDetail>
                    </van-tab>
                    <van-tab  title="转店信息">
                        <div class="shop-list">
                            <div class="list-item" v-for="(item, index) in shopList" :key="index">
                                <ProductItem :item="item" @toDetail="jumDetail"></ProductItem>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab  title="公司信息">
                        <div class="company-info">
                            <h3 class="name">{{shopInfo.companyName}}</h3>
                            <div class="summary">
                                <span class="title">公司简介</span>
                                <div class="text">{{shopInfo.introduction}}</div>
                            </div>
                            <div class="address">
                                <span class="title">地址</span>
                                <div class="text">{{shopInfo.address}}</div>
                                <img class="map" :src="shopInfo.mapUrl" alt="">
                            </div>
                        </div>  
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import gHeader from "@/components/header";
import recruitDetail from '@/components/share/recruitItem'
import ProductItem from '@/components/productItem'
import { getShopHomeInfo } from '@/api/share'

export default {
    components: {
        gHeader,
        recruitDetail,
        ProductItem
    },
    data() {
        return {
            title: "店铺首页",
            shareIcon: require("@/assets/img/share-icon.png"),
            shopCollection: require("@/assets/img/shop-collection.png"),
            categoryList: [
                {label: '招聘信息', value: 1},
                {label: '转店信息', value: 2},
                {label: '公司信息', value: 3},
            ],
            active: 2,
            shopInfo: {},
            shopList: [
                {
                    firstPicture: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1181654304,3519409368&fm=173&app=49&f=JPEG?w=218&h=146&s=57358F641E8973473CA51DC00300E0BA',
                    title: '非凡美发店转让',
                    advantage: '黄金地段',
                    area: '200',
                    city: '深圳',
                    district: '南山',
                    transferFee: 200
                },
                {
                    firstPicture: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1181654304,3519409368&fm=173&app=49&f=JPEG?w=218&h=146&s=57358F641E8973473CA51DC00300E0BA',
                    title: '非凡美发店转让',
                    advantage: '黄金地段',
                    area: '200',
                    city: '深圳',
                    district: '南山',
                    transferFee: 200
                }
            ],
            token: '',
            id: undefined
        }
    },
    created() {
        if(process.env.NODE_ENV === 'production'){
            this.token = this.$route.query.token;
            this.id = this.$route.query.id;
        }else {
            this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxODY4MjIzMzE4OSIsImV4cCI6MTU1NjMzMDUyNiwianRpIjoiMTg5MTQifQ.SxWZWw-8REc1DzKseF0CbxcwQacTuinBs4jXIMVqGBP0Wv2Qx9Yi27z0sCq4OPsIP9G1Pbs58vUGSypjrOKH7A';
            this.id = 15360;
        }
        this.getShopHomeInfo({id: this.id, token: this.token});
    },
    methods: {
        async getShopHomeInfo(obj){
            const res = await getShopHomeInfo(obj);
            if(res.data.result === "SUCCESS"){
                this.shopInfo = res.data.data;
            }
        },
        jumDetail(){

        }
    },
}
</script>
<style lang="scss" scoped>
    .shop-home-page{
        .page-body {
            margin-top: 48px;
            margin-bottom: 70px;
            .shop-info{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background-color: #fff;
                .info-left{
                    font-size: 0;
                    .shop-logo{
                        display: inline-block;
                        width: 50px;
                        height: 50px;
                        background: #ccc;
                    }
                }
                .info-right{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 12px;
                    .shop-title{
                        margin: 0;
                        font-size: 16px;
                        color: #333;
                    }
                    .info-detail{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        // margin-top: 12px;
                        .level, .rate{
                            font-size: 12px;
                            color: #333;
                        }
                        .collection-share{
                            display: flex;
                            .collection, .share{
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                .icon{
                                    width: 18px;
                                    height: 18px;
                                }
                                .text{
                                    font-size: 12px;
                                    color: #999;
                                }   
                            }
                            .share{
                                margin-left: 14px;
                            }
                        }
                    }
                }
            }
            .category-wrapper{
                position: relative;
                padding-top: 10px;
                &:before{
                    content: '';
                    width: 100%;
                    height: 10px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: #f4f4f4;
                }
                .shop-list{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    background-color: #fff;
                    margin-top: 5px;
                    padding: 0 15px;
                    .list-item{
                        width: 48.5%;
                        padding-top: 10px;
                    }
                }
            }
            .company-info{
                background-color: #fff;
                padding: 20px;
                display: flex;
                flex-direction: column;
                .name{
                    margin: 0;
                    font-size: 14px;
                    color: #333;
                }
                .summary, .address{
                    display: flex;
                    flex-direction: column;
                    margin-top: 12px;
                    .title{
                        font-size: 14px;
                        color: #666;
                    }
                    .text{
                        margin-top: 4px;
                        font-size: 12px;
                        color: #666;
                    }
                    .map{
                        width: 100%;
                    }
                }
            }
        }    
    }
</style>


