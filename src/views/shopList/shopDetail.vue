<template>
    <div class="shop-detail">
        <div class="wrapper-header">
            <gHeader :title="title" :showArrow="true" @toBack="jumpBack"></gHeader>
        </div>
        <div class="banner-wrapper">
            <van-swipe :autoplay="3000" :indicator-color="'#E45089'">
                <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                    <img v-lazy="item" width="100%"  @click="swipeImgClick(bannerList)"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="shop-info-wrapper">
            <div class="shop-info">
                <div class="info-name-icon">
                    <h2 class="name">{{shopInfo.title}}</h2>
                    <!-- <i class="icon" :style="{backgroundImage: 'url('+shareIcon+')'}"></i> -->
                </div>
                <div class="info-district-location">
                    <div class="district-location">
                        <span class="district">{{shopInfo.area}}㎡</span>
                        <span class="location">{{shopInfo.province}}&nbsp;&nbsp;{{shopInfo.city}}</span>
                    </div>
                    <span class="time">{{shopInfo.createTime | moment("YYYY年MM月DD日 hh:mm:ss")}}</span>
                </div>
                <div class="info-money-time">
                    <span class="money">
                        <img :src="moneyIcon" alt="">
                        <strong>{{shopInfo.rent}}/月</strong>
                        <span class="text">月租金</span>
                    </span>
                    <span class="money">
                        <img :src="moneyIcon" alt="">
                        <strong>{{shopInfo.transferFee2}}</strong>
                        <span class="text">转让费</span>
                    </span>
                </div>
                <div class="info-address">
                    <img :src="addressIcon" class="address-icon" alt="">
                    <span class="address">
                        {{shopInfo.address}}
                    </span>
                </div>
            </div>
            <div class="shop-discription">
                <span class="text">店铺描述：</span>
                <span class="detial">{{shopInfo.describe}}</span>
            </div>
        </div>
        <!-- <div class="recommend">
            <div class="title-box">
                <span class="line"></span>
                <span class="title">推荐商铺</span>
                <span class="line"></span>
            </div>
            <div class="content-wrapper">
                <div class="content">
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
        </div> -->
        <div>

        </div>
        <van-goods-action class="van-hairline--top vant-btn-group">
            <van-goods-action-mini-btn
                :icon="shopIcom"
                text="店铺"
                @click="jumpShopHome(shopInfo.userBusinessId)"
            />
            <van-goods-action-mini-btn
                :icon="shopInfo.isCollected ? collectionSelIcon : collectionIcon"
                :text="shopInfo.isCollected ? '取消收藏':'收藏'"
                @click="onCollection"
            />
            <van-goods-action-mini-btn
                :icon="messIcon"
                text="咨询"
                @click="onContact"
            />
            <van-goods-action-big-btn
                primary
                text="联系TA"
                @click="onCallPhone(shopInfo.phone)"
            />
        </van-goods-action>
        <div class="bottom"></div>
    </div>
</template>
<script>
    import { ImagePreview } from 'vant';
    import gHeader from '@/components/header'
    import ProductItem from '@/components/productItem'
    import common from '@/mixins/common'
    import { fetchStoreDetail } from '@/api/shop.js'
    import {fetchCollection, fetchCancleCollection} from '@/api/find.js'
    import { callPhone, limitShowNum } from '@/utils/util'
    export default {
        mixins: [common()],
        components: {
            gHeader,
            ProductItem
        },
        data() {
            return {
                shareIcon: require('@/assets/img/share-icon.png'),
                shopIcom:  require('../../assets/img/shop-line-icon.png'),
                collectionIcon: require('../../assets/img/collection-icon.png'),
                collectionSelIcon: require('../../assets/img/collection-sel-icon.png'),
                messIcon: require('../../assets/img/mess-icon.png'),
                moneyIcon: require('../../assets/img/rmb-icon.png'),
                addressIcon: require('../../assets/img/address-icon.png'),
                title: '转店详情',
                shopInfo: {},
                bannerList: [],
                inside: false,
                id: '',
                token: '',
                // isCollected: false
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.token = this.$route.query.token;
            this.inside = this.$route.query.inside ? true : false;
            // let token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTAxMzM2NjkxMyIsImV4cCI6MTU1NTU1NDYxNCwianRpIjoiMTg4OTIifQ.4UXUq6FtUymL1_H0iRmSsVHlUGtA2bnzgNO10WQqPcXFZcGaDd8zx3rh5aTdnt5z19zUMviluqhMc6mHm8bDyA';
            let postData = {
                id: this.id,
                token: this.token
            }
            this.getShopDetail(postData);
        },
        methods: {
            async getShopDetail(postData){
                const res = await fetchStoreDetail(postData);
                if(res.data.result === 'SUCCESS'){
                    this.shopInfo = Object.assign({}, res.data.data);
                    let pictures = res.data.data.pictures;
                    // this.isCollected = res.data.data.isCollected;
                    if(pictures){
                        this.bannerList = pictures.split(',');
                    }
                }else {
                    this.$notify({
                        message: res.data.message,
                        duration: 3000,
                        background: '#E45089'
                    });
                }
            },
            swipeImgClick(bannerList){
                ImagePreview({
                    images: bannerList
                })
            },
            onCallPhone(phone){
                window.location.href = 'tel://' + phone
            },
            limitNum(str, num){
                if(str){
                    return limitShowNum(str, num);
                }
            },
            async onCollection(){
                console.log(this.id,'this.id');
                console.log(this.token,'this.token');
                if(this.shopInfo.isCollected){
                    //取消收藏
                    const res = await fetchCancleCollection(this.id,5, this.token);
                    if(res.data.result === 'SUCCESS'){
                        this.shopInfo.isCollected = false;
                    }
                    this.$toast({
                        type: res.data.result === 'SUCCESS' ? 'success' : 'error',
                        message: res.data.message,
                        duration: 1500
                    });
                }else {
                    //收藏
                    let postData = {
                        markId: this.id,
                        type: 5 //转店
                    }
                    const res = await fetchCollection(postData, this.token);
                    if(res.data.result === 'SUCCESS'){
                        this.shopInfo.isCollected = true;
                    }
                    this.$toast({
                        type: res.data.result === 'SUCCESS' ? 'success' : 'error',
                        message: res.data.message,
                        duration: 1500
                    });
                }
            },
            onContact(){
                if(this.shopInfo.rongUserId){
                    window.location.href = 'appAndJs://shop?rongUserId=' + this.shopInfo.rongUserId+'&type=2';

                }else {
                    this.$notify({
                        message: '页面加载未完成，请稍等！',
                        duration: 3000,
                        background: '#E45089'
                    });
                }
            },
            jumpBack() {
                if(this.inside){
                    this.$router.go(-1);
                }else {
                    window.location.href = 'appAndJs://shop?&type=1';
                }
            },
            jumpShopHome(id) {
                window.location.href = 'appAndJs://shop?id='+id+'&type=4';
            }
        },   
    }
</script>
<style lang="scss" scoped>
    .van-swipe {
        // height: 210px;
    }
    .shop-detail {
        background-color: #f4f4f4;
        .banner-wrapper{
            margin-top: 48px;
            width: 100%;
            height: 210px;
            overflow: hidden;
            .van-swipe {
                height: 210px;
            }
        }
        .shop-info-wrapper{
            background-color: #fff;
            padding-bottom: 80px;
            .shop-info{
                padding: 12px 20px;
                display: flex;
                flex-direction: column;
                .info-name-icon{
                    display: flex;
                    justify-content: space-between;
                    align-items: top;
                    .name{
                        margin: 0;
                        font-size: 18px;
                        color: #333;
                        font-weight: normal;
                    }
                    .icon{
                        width: 17px;
                        height: 16px;
                        background-size: 17px 16px;
                        background-repeat: no-repeat;
                        padding-right: 2px;
                        margin-top: 5px;
                        margin-left: 10px;
                    }
                }
                .info-district-location{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 8px;
                    .district-location{
                        display: flex;
                        align-items: center;
                        .district, .location{
                            font-size: 12px;
                            color: #999;
                            margin-right: 20px;
                        }
                    }
                    .time{
                        color: #999;
                        font-size: 12px;
                    }
                }
                .info-money-time{
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;
                    .money{
                        font-size: 12px;
                        color:#EB88AB;
                        img{
                            width: 11px;
                            height: 14px;
                        }
                        strong{
                            font-size: 20px;
                            color: #E45089;
                        }
                        .text{
                            display: block;
                            font-size: 12px;
                            color: #999;
                            text-align: center;
                        }
                    }
                    .time{
                        color: #999;
                        font-size: 11px;
                    }
                }
                .info-address{
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    margin-top: 20px;
                    padding: 18px 0;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    .address-icon{
                        display: flex;
                        flex-shrink: 0;
                        width: 13px;
                        height: 16px;
                        margin-right: 10px;
                    }
                    .address{
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
            .shop-discription{
                margin: 0 20px;
                display: flex;
                flex-direction: column;
                .text{
                    font-size: 14px;
                    color: #333;
                    margin-top: 10px;
                }
                .detial{
                    margin-top: 5px;
                    font-size: 14px;
                    line-height: 21px;
                    color: #999;
                }
            }
        }
        .recommend{
            margin-top: 10px;
            padding-top: 18px;
            background-color: #fff;
            .title-box{
                display: flex;
                align-items: center;
                padding: 0 20px;
                margin-bottom: 15px;
                .line{
                    width: 100%;
                    height: 1px;
                    background-color: #ddd;
                }
                .title{
                    display: flex;
                    flex-shrink: 0;
                    font-size: 14px;
                    color: #333;
                    margin: 0 10px;
                }
            }
            .content-wrapper{
                margin-top: 10px;
                margin-bottom: 70px;
                .content{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    padding: 0 10px;
                    background-color: #fff;
                    .content-item{
                        padding-top: 10px;
                    }
                }
            }
        }
    }
    .van-button--danger{
        background-color: #E45089;
        border: 1px solid #E45089;
    }
    .vant-btn-group{
        margin-bottom: constant(safe-area-inset-bottom);
        margin-bottom: env(safe-area-inset-bottom);
    }
           /* 竖屏底下的查询 */
    @media screen and (orientation: portrait) {
        .bottom {
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            /* 防止页面被刘海遮住 */
            height: constant(safe-area-inset-bottom);
            /*IOS 11.2版本版本支持*/
            height: env(safe-area-inset-bottom);
            background: #fff;
        }
    }
</style>
