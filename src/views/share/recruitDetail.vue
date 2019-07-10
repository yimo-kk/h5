<template>
    <div class="recruit-detail-page">
        <gHeader :title="title" :whiteTitle="true" :arrowWhite="false" :isShowBg="true"></gHeader>
        <div class="page-body">
            <div class="recuit-info">
                <div class="title-share">
                    <span class="title">{{detail.releaseTitle}}</span>
                    <img class="share-icon" :src="shareIcon" alt="">
                </div>
                <div class="price-date">
                    <span class="price">{{detail.lowPay}}-{{detail.highPay}}元</span>
                    <span class="date">{{detail.createTime | moment("YYYY-MM-DD")}}</span>
                </div>
                <div class="welfare">
                    <span class="welfare-item" v-if="detail.number"><img :src="welfareIcon" class="welfare-icon" alt=""> 招{{detail.number}}人</span>
                    <span class="welfare-item" v-if="detail.position"><img :src="welfareIcon" class="welfare-icon" alt="">{{detail.position}}</span>
                    <span class="welfare-item" v-if="detail.degree"><img :src="welfareIcon" class="welfare-icon" alt="">{{detail.degree | filterDegree}}</span>
                    <span class="welfare-item" v-if="detail.year"><img :src="welfareIcon" class="welfare-icon" alt="">{{detail.year | filterYear}}</span>
                </div>
                <div class="tags-wrapper">
                    <van-tag v-for="(item, index) in detail.welfareList" :key="index">{{item}}</van-tag>
                </div>
            </div>
            <div class="recruit-detail">
                <h3 class="description-title">职位描述：</h3>
                <div class="description-content">
                    <span class="title">岗位描述：</span>
                    <div class="content">
                        {{detail.recruitDescribe}}
                    </div>
                </div>
            </div>
            <div class="address-info">
                <img class="map-url" :src="detail.mapUrl" alt="">
                <div class="info-item">
                    <span class="item-left">招聘地址：</span>
                    <span class="item-right">{{detail.detailedAddress}}</span>
                </div>
                <div class="info-item info-item02">
                    <span class="item-left">公司名称：</span>
                    <span class="item-right">{{detail.companyName}}</span>
                </div>
                <div class="info-item info-item03">
                    <span class="item-left">公司简介：</span>
                    <span class="item-right">{{detail.companyIntroduce}}</span>
                </div>
            </div>
            <van-goods-action class="van-hairline--top">
                <van-goods-action-mini-btn
                    :icon="isCollected ? collectionSelIcon : collectionIcon"
                    :text="isCollected ? '取消收藏':'收藏'"
                />
                <van-goods-action-mini-btn icon="chat-o" text="咨询"/>
                <van-goods-action-big-btn text="投递简历"/>
            </van-goods-action>
        </div>
    </div>
</template>
<script>
import gHeader from "@/components/header";
import { getRecruitDetail } from '@/api/share'
export default {
    components: {
        gHeader
    },
    data() {
        return {
            title: "职位详情",
            shareIcon: require("@/assets/img/share-icon.png"),
            welfareIcon: require("@/assets/img/welfare-icon.png"),
            isCollected: false,
            collectionIcon: require("../../assets/img/collection-icon.png"),
            collectionSelIcon: require("../../assets/img/collection-sel-icon.png"),
            detail: {}
        }
    },
    created() {
        if(process.env.NODE_ENV === 'production'){
            this.token = this.$route.query.token;
            this.id = this.$route.query.id;
        }else {
            this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxODY4MjIzMzE4OSIsImV4cCI6MTU1NjMzMDUyNiwianRpIjoiMTg5MTQifQ.SxWZWw-8REc1DzKseF0CbxcwQacTuinBs4jXIMVqGBP0Wv2Qx9Yi27z0sCq4OPsIP9G1Pbs58vUGSypjrOKH7A';
            this.id = 295;
        }
        this.getDetail({id: this.id, token: this.token});
    },
    methods: {
        async getDetail(obj){
            const res = await getRecruitDetail(obj);
            if(res.data.result === "SUCCESS"){
                this.detail = res.data.data;
            }
        }
    },
    filters: {
        filterDegree(val){
            let mapStatus = {
                1: '不限',
                2: '高中',
                3: '技校',
                4: '中专',
                5: '大专',
                6: '本科',
                7: '硕士',
                8: '博士'
            }
            return mapStatus[val];
        },
        filterYear(val){
            let mapStatus = {
                1: '不限',
                2: '应届',
                3: '1-3年',
                4: '3-5年',
                5: '5-8年',
                6: '8-10年',
                7: '10以上'
            }
            return mapStatus[val];
        }
    }
}
</script>
<style lang="scss" scoped>
    .recruit-detail-page{
        .page-body {
            margin-top: 48px;
            margin-bottom: 70px;
            background-color: #f4f4f4;
            .recuit-info{
                display: flex;
                flex-direction: column;
                padding: 15px 20px;
                background-color: #fff;
                .title-share, .price-date{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title{
                        font-size: 16px;
                        color: #333;
                    }
                    .share-icon{
                        width: 16px;
                        height: 16px;
                    }
                }
                .price-date{
                    margin-top: 8px;
                    .price{
                        font-size: 16px;
                        color: #F67132;
                    }
                    .date{
                        font-size: 12px;
                        color: #999;
                    }
                }   
                .welfare{
                    display: flex;
                    justify-content: flex-start;
                    margin-top: 10px;
                    .welfare-item{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-right: 22px;
                        font-size: 12px;
                        color: #666;
                        .welfare-icon{
                            width: 12Px;
                            height: 12Px;
                            margin-right: 4px;
                        }
                    }
                }
                .tags-wrapper{
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 15px;
                    .van-tag{
                        margin-right: 10px;
                        margin-bottom: 5px;
                    }
                }
            }
            .recruit-detail,.address-info{
                padding: 16px 20px;
                margin-top: 10px;
                background: #fff;
                .description-title{
                    margin: 0;
                    font-size: 14px;
                    color: '#333';
                }
                .description-content{
                    display: flex;
                    flex-direction: column;
                    .title{
                        margin-top: 6px;
                        margin-bottom: 4px;
                        font-size: 12px;
                        color: #666;
                    }
                    .content{
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }
        .address-info{
            .map-url{
                max-width: 100%;
                display: block;
                margin-bottom: 10px;
            }  
            .info-item{
                margin-bottom: 15px;
                line-height: 10px;
                .item-left{
                    font-size: 14px;
                    color: #333;
                }
                .item-right{
                    font-size: 12px;
                    color: #666;
                }
            }
            .info-item02,.info-item03{
                line-height: 18px;
                display: flex;
                flex-wrap: wrap;
                .item-left{
                    flex-shrink: 0;
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
