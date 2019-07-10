<template>
    <div class="course-detail-page">
        <gHeader :title="title" :whiteTitle="true" :arrowWhite="false" :isShowBg="true"></gHeader>
        <div class="page-body">
            <div class="video-wrapper">
                <DetailVideo :videoInfo="videoInfo"></DetailVideo>
            </div>
            <div class="course-info">
                <div class="title">
                    <h3>{{detail.name}}</h3>
                    <img :src="shareIcon" alt>
                </div>
                <span class="course-summary">{{detail.introduction}}</span>
                <div class="others">
                    <span class="price">￥{{detail.price}}</span>
                    <span class="play-num">播放量：{{detail.courseTotalStatisticVO.playCount}}次</span>
                    <span class="buy-num">{{detail.courseTotalStatisticVO.payCount ? detail.courseTotalStatisticVO.payCount : '暂无'}}人购买</span>
                    <span class="area">{{detail.userBusinessVO.province}} {{detail.userBusinessVO.city}}</span>
                </div>
                <!-- <div class="course-list">
                    <span class="text">查看子课程</span>
                    <img :src="rightIcon" alt>
                </div> -->
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="查看子课程" name="2">
                        <van-cell title="单元格" v-for="item in detail.videoList" :key="item.courseVideoId">
                            <template slot="title">
                                <span class="custom-text van-ellipsis">{{item.videoName}}</span>
                            </template>
                            <van-icon slot="right-icon" :name="playerIcon" class="custom-icon" />
                        </van-cell>
                    </van-collapse-item>
                </van-collapse>
            </div>
            <div class="comment-wrapper">
                <comment></comment>
            </div>
            <div class="shop-wrapper">
                <shop :item="detail.userBusinessVO"></shop>
            </div>
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
import { getCourseDetail } from '@/api/share';
import DetailVideo from "@/components/find/DetailVideo";

export default {
    components: {
        gHeader,
        shop,
        comment,
        DetailVideo
    },
    data() {
        return {
            title: "课程详情",
            shareIcon: require("@/assets/img/share-icon.png"),
            isCollected: false,
            collectionIcon: require("../../assets/img/collection-icon.png"),
            collectionSelIcon: require("../../assets/img/collection-sel-icon.png"),
            rightIcon: require("../../assets/img/right-icon.png"),
            playerIcon: require("../../assets/img/player-icon.png"),
            activeNames: ['1'],
            detail: {},
            videoInfo: {}
        };
    },
    created () {
        if(process.env.NODE_ENV === 'production'){
            this.token = this.$route.query.token;
            this.id = this.$route.query.id;
        }else {
            this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxODY4MjIzMzE4OSIsImV4cCI6MTU1NjMzMDUyNiwianRpIjoiMTg5MTQifQ.SxWZWw-8REc1DzKseF0CbxcwQacTuinBs4jXIMVqGBP0Wv2Qx9Yi27z0sCq4OPsIP9G1Pbs58vUGSypjrOKH7A';
            this.id = 261;
        }
        this.getDetail({id: this.id, token: this.token});
    },
    methods: {
        async getDetail(obj){
            const res = await getCourseDetail(obj);
            if(res.data.result === "SUCCESS"){
                this.detail = res.data.data;
                this.videoInfo = {
                    videoPath: res.data.data.defaultVideo,
                    firstPicture: res.data.data.firstPicture
                }
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.course-detail-page {
    .page-body {
        margin-top: 48px;
        margin-bottom: 70px;
        background-color: #f4f4f4;
        .video-wrapper {
            width: 100%;
        }
        .course-info {
            display: flex;
            flex-direction: column;
            padding: 14px 15px;
            padding-bottom: 0;
            background-color: #fff;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                h3 {
                    margin: 0;
                    font-size: 16px;
                    color: #333;
                }
                img {
                    width: 16px;
                    height: 16px;
                }
            }
            .course-summary {
                margin-top: 5px;
                font-size: 12px;
                color: #666;
            }
            .others {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                margin-bottom: 15px;
                .price {
                    font-size: 14px;
                    font-weight: bold;
                    color: #e45089;
                }
                .play-num,
                .buy-num,
                .area {
                    font-size: 12px;
                    color: #999;
                }
            }
            .course-list {
                height: 45px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
                border-top: 1px solid #f4f4f4;
                .text {
                    font-size: 14px;
                    color: #333;
                }
                img {
                    width: 8px;
                    height: 14px;
                }
            }
            .custom-text{
                width: 90%;
                display: inline-block;
            }
        }
        .comment-wrapper {
            margin-top: 10px;
        }
        .shop-wrapper {
            margin-top: 10px;
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
    .van-cell{
        align-items: center;
    }
}
</style>

