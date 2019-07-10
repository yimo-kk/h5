<template>
    <div class="product-detail-page">
        <div class="header-wrapper">
            <gHeader :title="title" :whiteTitle="true" :arrowWhite="false" :isShowBg="true"></gHeader>
        </div>
        <div class="page-body">
            <div class="video-pic">
                <van-swipe :autoplay="autoplay" :indicator-color="'#E45089'">
                    <van-swipe-item v-for="(item, index) in goodInfo.pictures" :key="index">
                        <img v-lazy="item" width="100%" @click="swipeImgClick(goodInfo.pictures)">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="good-info">
                <div class="info-left">
                    <span class="info-title">施华蔻柔顺洗发水</span>
                    <span class="info-summary">版本升级，新包装洗发水和护发素均为1000ml</span>
                </div>
                <div class="info-right">
                    <img class="share-icon" :src="shareIcon" alt>
                    <span class="share-text">分享</span>
                </div>
            </div>
            <div class="price-list">
                <div class="price-item">
                    <span class="price">￥10</span>
                    <span class="text">零售价</span>
                    <span class="number">1-50件</span>
                </div>
                <div class="price-item">
                    <span class="price">￥10</span>
                    <span class="text">批发价</span>
                    <span class="number">1-50件</span>
                </div>
                <div class="price-item">
                    <span class="price">￥10</span>
                    <span class="text">批量价</span>
                    <span class="number">1-50件</span>
                </div>
            </div>
            <div class="freight">
                <span class="freight-item">快递：{{freight}}元</span>
                <span class="freight-item">已成交：{{goodInfo.salesCount ? goodInfo.salesCount : 0}}</span>
                <span class="freight-item">广东 深圳</span>
            </div>
            <div class="promise-list">
                <span class="promise-item item01">正品保障</span>
                <span class="promise-item item02">积分可兑换</span>
                <span class="promise-item item03">交期保障</span>
            </div>
            <comment></comment>
            <shop></shop>
        </div>
        <van-goods-action class="van-hairline--top">
            <van-goods-action-mini-btn
                :icon="isCollected ? collectionSelIcon : collectionIcon"
                :text="isCollected ? '取消收藏':'收藏'"
            />
            <van-goods-action-mini-btn icon="chat-o" text="咨询"/>
            <van-goods-action-big-btn text="加入购物车"/>
        </van-goods-action>
    </div>
</template>
<script>
import gHeader from "@/components/header";
import shop from "@/components/share/shop";
import comment from "@/components/share/comment";
import { getProductDetail } from "@/api/share";
export default {
    components: {
        gHeader,
        shop,
        comment
    },
    data() {
        return {
            title: "产品详情",
            token: "",
            areaCode: "",
            id: "",
            goodInfo: {},
            shareIcon: require("@/assets/img/share-icon.png"),
            freight: "",
            autoplay: 5000,
            isCollected: false,
            collectionIcon: require("../../assets/img/collection-icon.png"),
            collectionSelIcon: require("../../assets/img/collection-sel-icon.png")
        };
    },
    created() {
        if (process.env.NODE_ENV === "production") {
            this.token = this.$route.query.token;
            this.areaCode = this.$route.query.areaCode;
            this.id = this.$route.query.id;
        } else {
            this.token =
                "eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxODY4MjIzMzE4OSIsImV4cCI6MTU1NjE4NjUyOSwianRpIjoiMTg5MTgifQ.hnoGoef5RJDWRwGma4a2qoXPdg8W1GKFJBHtaNKyiLfzbaDHMCFfpHHvr7pM_a163xub8NFjOETiIHqqwKZl_Q";
            this.areaCode = "root-20-3";
            this.id = 197;
        }
        this.getGoodInfo();
    },
    methods: {
        async getGoodInfo() {
            let postData = {
                id: this.id,
                areaCode: this.areaCode,
                token: this.token
            };
            const res = await getProductDetail(postData);
            if (res.data.result === "SUCCESS") {
                this.goodInfo = res.data.data.storeGoods;
                this.freight = res.data.data.freight;
                this.isCollected = res.data.data.isCollected;
            }
        },
        swipeImgClick(bannerList) {
            let list = [];
            bannerList.forEach(item => {
                list.push(item);
            });
            ImagePreview({
                images: list
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.product-detail-page {
    .page-body {
        margin-top: 48px;
        margin-bottom: 70px;
        background-color: #f4f4f4;
        .good-info {
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            .info-left {
                display: flex;
                flex-direction: column;
                .info-title {
                    font-size: 16px;
                    color: #333;
                }
                .info-summary {
                    margin-top: 4px;
                    font-size: 14px;
                    color: #666;
                }
            }
            .info-right {
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .share-icon {
                    width: 16px;
                    height: 16px;
                }
                .share-text {
                    font-size: 12px;
                    color: #999;
                    margin-top: 10px;
                }
            }
        }
        .price-list {
            display: flex;
            justify-content: space-between;
            padding: 5px 30px;
            background-color: #fff;
            .price-item {
                display: flex;
                flex-direction: column;
                .price {
                    font-size: 14px;
                    color: #e45089;
                }
                .text {
                    font-size: 14px;
                    color: #333;
                }
                .number {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        .freight {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            background-color: #fff;
            padding: 0 20px;
            .freight-item {
                font-size: 14px;
                color: #666;
            }
        }
        .promise-list {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40px;
            .promise-item {
                position: relative;
                font-size: 14px;
                color: #666;
                padding-left: 24px;
                &:before {
                    content: "";
                    width: 21px;
                    height: 24px;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    background: url("../../assets/img/promise-icon01.png")
                        no-repeat;
                    background-size: 65%;
                    background-position: 50%;
                }
            }
            .item02 {
                &:before {
                    content: "";
                    width: 20px;
                    height: 18px;
                    background: url("../../assets/img/promise-icon02.png")
                        no-repeat;
                    background-size: 65%;
                    background-position: 50%;
                }
            }
            .item03 {
                &:before {
                    content: "";
                    width: 24px;
                    height: 18px;
                    background: url("../../assets/img/promise-icon03.png")
                        no-repeat;
                    background-size: 65%;
                    background-position: 50%;
                }
            }
        }
    }
    .van-goods-action-mini-btn {
        flex: 1;
    }
    .van-goods-action-big-btn{
        flex: 2;
    }
    .van-button--warning {
        background-color: #e45089;
        border: 1px solid #e45089;
    }
}
</style>

