<template>
    <div class="find-detail">
        <div class="header-wrapper">
            <gHeader @toBack="jumpBack" :title="detailInfo.isVideo ? vtitle : atitle" :arrowWhite="true" :isShowBg="true"></gHeader>
        </div>
        <div class="article-detail" v-if="!detailInfo.isVideo">
            <h2 class="title">
                {{detailInfo.title}}
            </h2>
            <span class="time">发布时间：{{detailInfo.createTime | moment('YYYY-MM-DD HH:mm')}}</span>
            <div class="content">
                <img class="firstPic" :src="detailInfo.firstPicture" alt="">
                <span v-html="detailInfo.richText"></span>
            </div>
        </div>
        <div v-else class="video-detail">
            <DetailVideo :videoInfo="detailInfo"></DetailVideo>
            <div class="title-time">
                <h2 class='title'>{{detailInfo.title}}</h2>
                <span class="time">发布时间：{{detailInfo.createTime | moment('YYYY-MM-DD HH:mm')}}</span>
            </div>
        </div>
        <like-bar class="van-hairline--top" :isCollection="isCollected" @onShare="handleShare" @collection="handleCollection"></like-bar>
    </div>
</template>
<script>
import gHeader from "@/components/header";
import LikeBar from "@/components/find/LikeBar";
import DetailVideo from "@/components/find/DetailVideo";
import { getFindDetail, fetchCollection, fetchCancleCollection } from '@/api/find'
import { getQueryString } from '@/utils/util'

export default {
    components: {
        gHeader,
        LikeBar,
        DetailVideo
    },
    data() {
        return {
            atitle: "文章详情",
            vtitle: '视频详情',
            detailInfo: {},
            id: '',
            token: '',
            isCollected: false
        }
    },
    created() {
        //development修改为了production
        if(process.env.NODE_ENV === 'development'){
            this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTAxOTIzMDMwOSIsImV4cCI6MTU2MzE1NDc2MywianRpIjoiMTg5MjAifQ.nDnkUR1hBnLhV9K7fkYvp3cOIyUa-iNUnzjFewG7o7BLckzWpEl0Dor0sl_7dyDSdY5w1TjpngHr5RahCfxNXQ';
            this.id = 135;
        }else {
            this.token = this.$route.query.token;
            this.id = this.$route.query.id;
        }
        this.getDetail(this.id, this.token);
    },
    methods: {
        async getDetail(id, token){
            const res = await getFindDetail(id, token);
            if(res.data.result === "SUCCESS"){
                this.detailInfo = res.data.data;
                this.isCollected = res.data.data.isCollected;
            }
        },
        jumpBack() {
            window.location.href = "appAndJs://shop?&type=1"; //返回
        },
        handleShare() {

        },
        async handleCollection({isCollection}){
            let postData = {
                markId: this.id,
                type: 6 //发现
            }
            if(isCollection){ //取消收藏
                const res = await fetchCancleCollection(this.id, 6, this.token);
                if(res.data.result === "SUCCESS"){
                    this.isCollected = !this.isCollected;
                    this.$toast.success({
                        message: '取消成功',
                        duration: 1500
                    });
                }else {
                    this.$toast.fail({
                        message: '取消失败',
                        duration: 1500
                    });
                }
            }else { //添加收藏
                const res = await fetchCollection(postData, this.token);
                if(res.data.result === "SUCCESS"){
                    this.isCollected = !this.isCollected;
                    this.$toast.success({
                        message: '收藏成功',
                        duration: 1500
                    });
                }else {
                    this.$toast(res.data.message);
                    this.$toast.fail({
                        message: '收藏失败',
                        duration: 1500
                    });
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .find-detail{
        overflow: hidden;
        min-width: 100%;
        .article-detail{
            display: flex;
            flex-direction: column;
            padding: 10px 15px;
            margin-top: 48px;
            margin-bottom: 55px;
            background-color: #fff;
            .title{
                margin: 0;
                font-size: 16px;
                color: #333;
            }
            .time{
                margin: 8px 0 5px 0;
                font-size: 12px;
                color: #999;
                text-align: right;
            }
            .content{
                margin-top: 10px;
                font-size: 14px;
                color: #666;
                text-align: justify;
                .firstPic{
                    width: 100%;
                }
            }
        }
        .video-detail{
            margin-top: 48px;
            background-color: #fff;
            .title-time{
                display: flex;
                flex-direction: column;
                padding: 10px 12px;
                .title{
                    font-size: 15px;
                    color: #333;
                    margin: 0;
                }
                .time{
                    margin-top: 6px;
                    margin-right: 10px;
                    font-size: 12px;
                    color: #999;
                    text-align: right;
                }
            }
        }
    }
</style>

