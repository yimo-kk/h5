<template>
    <div class="detail">
        <div class="header-wrapper">
            <gHeader :visibleMore="false" :showArrow="true" @toBack="toBack" :title="title" @toList="jumpList"></gHeader>
        </div>
        <div class="detail-body">
            <div class="img-wrapper">
                <!-- <img ref="firstImg" :src="detailInfo.firstPicture" alt> -->
                <van-swipe :autoplay="autoplay" :indicator-color="'#E45089'">
                    <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                        <img v-lazy="item" width="100%" @click="swipeImgClick(bannerList)">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="shop-info">
                <h2 class="title">{{detailInfo.storeName}}</h2>
                <p class="summary">{{detailInfo.summary}}</p>
                <div>
                    <van-tag color="#E45089" v-if="detailInfo.isCooperate" plain>资源合作</van-tag>
                    <van-tag color="#E45089" v-if="detailInfo.isExpandCustomer" plain>拓客合作</van-tag>
                    <van-tag color="#E45089" v-if="detailInfo.isShareChannel" plain>渠道合作</van-tag>
                    <van-tag color="#E45089" v-if="detailInfo.isShareProject" plain>项目合作</van-tag>
                </div>
            </div>
            <van-tabs color="#e44f8a" @disabled="onClickDisabled">
                <van-tab
                    v-for="item in teamworkList"
                    :title="item.title"
                    :disabled="!item.disabled"
                    :key="item.id"
                >
                    <div class="teamwork-content">
                        <div class="content-item" v-if="item.id == 1">
                            <img class="pic" v-for="(item, index) in channelShareUrl" :key="index" :src="item" alt>
                            <span class="text" v-html="detailInfo.channelShare"></span>
                        </div>
                        <div class="content-item" v-if="item.id == 2">
                            <img class="pic" v-for="(item, index) in cooperationUrl" :key="index" :src="item" alt>
                            <span class="text" v-html="detailInfo.cooperation"></span>
                        </div>
                        <div class="content-item" v-if="item.id == 3">
                            <img class="pic" v-for="(item, index) in projectShareUrl" :key="index" :src="item" alt>
                            <span class="text" v-html="detailInfo.projectShare"></span>
                        </div>
                        <div class="content-item" v-if="item.id == 4">
                            <img class="pic" v-for="(item, index) in expandCustomerUrl" :key="index" :src="item" alt>
                            <span class="text" v-html="detailInfo.expandCustomer"></span>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="group-btn">
            <div class="btn-item" @click="onCallPhone(detailInfo.contactPhone)">
                <img :src="concactIcon" alt>
                <span>拨打电话</span>
            </div>
            <div class="btn-item btn-service" @click="onService">
                <img :src="serviceIcon" alt>
                <span>在线客服</span>
            </div>
        </div>
    </div>
</template>
<script>
import gHeader from "@/components/header";
import { fetchResourceDetail } from '@/api/resource'
export default {
    components: {
        gHeader
    },
    data() {
        return {
            title: "店铺详情",
            teamworkList: [
                {
                    id: 1,
                    title: "渠道合作"
                },
                {
                    id: 2,
                    title: "资源合作"
                },
                {
                    id: 3,
                    title: "项目合作"
                },
                {
                    id: 4,
                    title: "拓客合作"
                }
            ],
            concactIcon: require("@/assets/img/resource/concact-icon.png"),
            serviceIcon: require("@/assets/img/resource/service-icon.png"),
            errorImg: require("@/assets/img/error-pic.png"),
            detailInfo: {},
            width: "",
            height: "",
            bannerList: [],
            channelShareUrl: [],
            cooperationUrl: [],
            projectShareUrl: [],
            expandCustomerUrl: [],
        };
    },
    created() {
        if(this.$route.query.id){ //app跳转过来
            let id = this.$route.query.id;
            let token = this.$route.query.token;
            this.getDetail(id, token);
        }else {   //列表跳转过来
            this.detailInfo = this.$route.query.data;
            this.channelShareUrl = this.detailInfo.channelShareUrl.split(',');
            this.cooperationUrl = this.detailInfo.cooperationUrl.split(',');
            this.projectShareUrl = this.detailInfo.projectShareUrl.split(',');
            this.expandCustomerUrl = this.detailInfo.expandCustomerUrl.split(',');
            this.bannerList = this.detailInfo.pictures.split(',');
            this.formatTeamworkList(this.detailInfo);
        }
    },
    mounted() {
        // this.$refs.firstImg.addEventListener("error", this.imgError);
    },
    methods: {
        async getDetail(id, token){
            token = token
            const res = await fetchResourceDetail(id, token);
            if(res.data.result === "SUCCESS"){
                let state = res.data.data.authorityStatus;
                let message = res.data.data.authorityMessage;
                if(state == 2){
                    this.$router.push({
                        path: 'resourceInstroduct',
                        query: {
                            state: state,
                            message: message
                        }
                    })
                }
                if(state == 0){
                    this.detailInfo = res.data.data;
                    this.bannerList = this.detailInfo.pictures.split(',');
                    this.channelShareUrl = this.detailInfo.channelShareUrl.split(',');
                    this.cooperationUrl = this.detailInfo.cooperationUrl.split(',');
                    this.projectShareUrl = this.detailInfo.projectShareUrl.split(',');
                    this.expandCustomerUrl = this.detailInfo.expandCustomerUrl.split(',');
                    this.formatTeamworkList(this.detailInfo);
                    // this.$router.push({
                    //     path: 'resourceDetail',
                    //     query: res.data.data
                    // })
                }
            }
        },
        formatTeamworkList(detailInfo) { //格式化部分详情数据
            this.teamworkList[0].disabled = detailInfo.isShareChannel
                ? true
                : false;
            this.teamworkList[1].disabled = detailInfo.isCooperate
                ? true
                : false;
            this.teamworkList[2].disabled = detailInfo.isShareProject
                ? true
                : false;
            this.teamworkList[3].disabled = detailInfo.isExpandCustomer
                ? true
                : false;
        },
        imgError() {
            let imgDom = this.$refs.firstImg;
            imgDom.src = this.errorImg;
            imgDom.style.cssText =
                "width: 95px; height: 58px;margin: 50px auto;";
        },
        onClickDisabled(index, title) {
            this.$toast(title + "暂无数据");
        },
        toBack() {
            this.$router.go(-1);
        },
        jumpList() {},
        swipeImgClick(bannerList) { //查看轮播图
            let list = [];
            bannerList.forEach(item => {
                list.push(item);
            });
            ImagePreview({
                images: list
            });
        },
        onCallPhone(phone){
            window.location.href = 'tel://' + phone
        },
        onService(){
            if(this.detailInfo.rongUserId){
                    window.location.href = 'appAndJs://shop?rongUserId=' + this.detailInfo.rongUserId+'&type=2';
            }else {
                this.$notify({
                    message: '页面加载未完成，请稍等！',
                    duration: 3000,
                    background: '#E45089'
                });
            }
        }
    }
};
</script>
<style scoped lang="scss">
.detail {
    width: 100%;
    overflow: hidden;
    background-color: #f4f4f4;
    .header-wrapper {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .detail-body {
        margin-top: 48px;
        .img-wrapper {
            width: 100%;
            height: auto;
            overflow: hidden;
            img {
                width: 100%;
                height: auto;
                display: block;
            }
            .van-swipe {
                height: 210px;
            }
        }
        .shop-info {
            display: flex;
            flex-direction: column;
            padding: 15px;
            background-color: #fff;
            .title {
                font-size: 16px;
                color: #333;
                margin: 0;
            }
            .summary {
                font-size: 14px;
                color: #999;
                line-height: 22px;
            }
        }
    }
    .teamwork-content {
        margin: 0 15px 30px 15px;
        .content-item{
            display: flex;
            flex-direction: column;
            .pic {
                width: 100%;
                margin-top: 15px;
            }
            .text {
                margin-top: 10px;
                font-size: 14px;
                color: #999;
            }
        }
    }
    .group-btn {
        width: 100%;
        height: 63px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 100px;
        .btn-item {
            width: 156px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 10px;
            border-radius: 24px;
            background: rgba(228, 79, 138, 1);
            img {
                width: 18px;
                height: 18px;
                margin-right: 10px;
            }
            span {
                font-size: 18px;
                color: #fff;
            }
        }
        .btn-service {
            background-color: #f9962f;
        }
    }
}
</style>