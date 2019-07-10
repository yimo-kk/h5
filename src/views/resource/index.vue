<template>
    <div class="resource-home">
        <div class="header-wrapper">
            <gHeader :showArrow="false" :visibleMore="false" @toBack="jumpHome" :title="title" @toList="jumpList"></gHeader>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="resource-body">
                <van-swipe :autoplay="autoplay" :indicator-color="'#E45089'">
                    <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                        <img v-lazy="item.path" width="100%"  @click="swipeImgClick(bannerList)"/>
                    </van-swipe-item>
                </van-swipe>
                <tabBar @onJump="jumpCategory"></tabBar>
                <filterBar @filter="handleFilter"></filterBar>
                <div class="shop-list">
                    <div class="shop-item" v-for="(item, index) in shopList" :key="index">
                        <shopItem :item="item" @onJump="jumpDetail"></shopItem>
                    </div>
                </div>
            </div>
        </van-pull-refresh>   
        <side-sheet :isShow="isShowFilter" :isCategory="true" @closeSheet="closeSheet"></side-sheet>
    </div>
</template>
<script>
import { ImagePreview } from "vant";
import gHeader from '@/components/header'
import tabBar from '@/components/resource/TabBar'
import shopItem from '@/components/resource/ShopItem'
import filterBar from '@/components/resource/FilterBar'
import SideSheet from '@/components/sideSheet'
import { fetchResourceHome, fetchResourceDetail } from '@/api/resource'
export default {
    components: {
        gHeader,
        tabBar,
        shopItem,
        filterBar,
        SideSheet
    },
    data() {
        return {
            title: '资源',
            bannerList: [],
            isLoading: false,
            autoplay: 5000,
            isShowFilter: false, //是否显示侧边筛选菜单
            shopList: [],
            token: ''
        }
    },
    created () {
        this.getReouceInfo({});
    },
    methods: {
        async getReouceInfo(postData){
            const res = await fetchResourceHome(postData);
            console.log(res, '资源首页');
            this.isLoading = false;
            if(res.data.result === "SUCCESS"){
                this.bannerList = res.data.data.bannerVOList;
                this.shopList = res.data.data.resourcesItemVOList
            }
        },        
        onRefresh(){
            this.getReouceInfo({});
        },
        handleFilter(){
            this.isShowFilter = !this.isShowFilter;
        },
        jumpCategory(params){
            this.$router.push({
                path: '/resourceList',
                query: params
            });
        },
        closeSheet(params) {
            this.isShowFilter = false;
            let postData = {
                category: params.categoryId,
                isCooperate: params.cooperationObj.isCooperate,
                isExpandCustomer: params.cooperationObj.isExpandCustomer,
                isShareChannel: params.cooperationObj.isShareChannel,
                isShareProject: params.cooperationObj.isShareProject
                // position: 0
            }
            this.getReouceInfo(postData);
        },
        jumpDetail(id){
            if(process.env.NODE_ENV === 'development'){
                this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTg4OTM2MDkxMSIsImV4cCI6MTU1NTU5MTQ0NCwianRpIjoiMTg0MDEifQ.ml6BbCKeWbY3Z6M_kOjVUO9c8lm4f2Xvcb1EzMUSPzGRY-6Ly4jorD7Wd551w1FV-A8eQOnDH-Mm08-P4gkP_w'
            }else {
                this.token = this.$route.query.token;
            }
            console.log(id, this.token, '首页参数。。');
            this.getDetail(id, this.token);
        },
        async getDetail(id, token){
            const res = await fetchResourceDetail(id, token);
            console.log(res,'资源详情');
            if(res.data.result === "SUCCESS"){
                let state = res.data.data.authorityStatus;
                let message = res.data.data.authorityMessage;
                if(state == 2){
                    this.$router.push({
                        path: 'resourceInstroduct',
                        query: {
                            state: state,
                            message: message,
                            token: token
                        }
                    })
                }
                if(state == 1){
                    this.$router.push({
                        path: 'resourceInstroduct',
                        query: {
                            state: state,
                            message: message,
                            token: token
                        }
                    })
                }
                if(state == 0){
                    this.$router.push({
                        path: 'resourceDetail',
                        query: {
                            data: res.data.data,
                            token: token
                        },
                    })
                }
            }
        },
        swipeImgClick(bannerList) {
            let list = [];
            bannerList.forEach(item => {
                list.push(item.path);
            });
            ImagePreview({
                images: list
            });
        },
        jumpList(){},
        jumpHome(){
            window.location.href = "appAndJs://shop?&type=1"; //返回
        },
    }
}
</script>
<style scoped lang="scss">
    .resource-home{
        background-color: #F4F4F4;
        .resource-body{
            margin-top: 48px;
            .van-swipe {
                height: 165px;
            }
            .shop-list{
                padding: 10px 15px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                background: #F4F4F4;
                .shop-item{
                    width: 49%;
                    margin-bottom: 8px;
                    border-radius: 4px;
                    overflow: hidden;
                }
            }
        }
    }
</style>