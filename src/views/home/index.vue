<template>
    <div class="home">
        <div class="wrapper-header">
            <gHeader :visibleMore="false" :showArrow="true" @toBack="jumpHome" :title="title" @toList="jumpList"></gHeader>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="home-body">
                <van-swipe :autoplay="autoplay" :indicator-color="'#E45089'">
                    <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                        <img v-lazy="item.path" width="100%" @click="swipeImgClick(bannerList)">
                    </van-swipe-item>
                </van-swipe>
                <WnoticeBar :interval="interval" :list="noticeList"></WnoticeBar>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    :offset="10"
                    @load="onLoad"
                >
                    <div class="content-wrapper">
                        <Title :icon="shopTitle.icon" :title="shopTitle.title"></Title>
                        <div class="filter-wrapper">
                            <FilterBox @submit="handleFilter"></FilterBox>
                        </div>
                        <div class="content">
                            <div class="list-item" v-for="(item, index) in shopList" :key="index">
                                <ProductItem :item="item" @toDetail="jumDetail"></ProductItem>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script>
import { ImagePreview } from "vant";
import Title from "@/components/title";
import ProductItem from "@/components/productItem";
import gHeader from "@/components/header";
import WnoticeBar from "@/components/NoticeBar";
import FilterBox from "@/components/FilterBox";
import common from "@/mixins/common";
import { fetchStoreHome, shopSearch } from "@/api/shop.js";
import { getQueryString } from "@/utils/util";
import { mapGetters, mapMutations } from "vuex";

export default {
    mixins: [common()],
    components: {
        Title,
        ProductItem,
        gHeader,
        WnoticeBar,
        FilterBox
    },
    data() {
        return {
            bannerList: [],
            shopList: [],
            shopTitle: {
                icon: require("../../assets/img/shop-icon.png"),
                title: "转店推荐"
            },
            title: "转店",
            interval: 5000,
            autoplay: 5000,
            isLoading: false,
            noticeList: [],
            token: "",
            areaCode: "",
            loading: false,
            finished: false,
            searchParams: {
                areaCode: "",
                category: 0,
                lowestArea: 0,
                highestArea: 0,
                lowestRent: 0,
                highestRent: 0,
                keyword: "",
                page: 0,
                size: 8,
                userBusinessId: 0
            },
            total: null,
            error: false,
        };
    },
    created() {
        if(process.env.NODE_ENV === 'production'){
            this.token = this.$route.query.token;
            this.areaCode = this.$route.query.areaCode;
        }else {
            this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxODY4MjIzMzE4OSIsImV4cCI6MTU1NjMzMDUyNiwianRpIjoiMTg5MTQifQ.SxWZWw-8REc1DzKseF0CbxcwQacTuinBs4jXIMVqGBP0Wv2Qx9Yi27z0sCq4OPsIP9G1Pbs58vUGSypjrOKH7A';
            this.areaCode = 'root-20-3'
        }
        this.getShopHOmeInfo(this.areaCode);
    },
    computed: {
        // ...mapGetters('appId',{
        // })
    },
    methods: {
        ...mapMutations({
            setToken: "setToken"
        }),
        async getShopHOmeInfo(areaCode) {
            let postData = {
                areaCode: areaCode
            };
            // this.setToken('i am token');
            const res = await fetchStoreHome(postData);
            if (res.data.result === "SUCCESS") {
                this.bannerList = res.data.data.bannerList;
                // this.shopList = res.data.data.subletReleaseList;
                this.noticeList = res.data.data.broadcast;
            } else {
                Notify({
                    message: res.data.message,
                    duration: 3000,
                    background: "#E45089"
                });
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
        async onRefresh() {
            await this.getShopHOmeInfo(this.areaCode);
            this.isLoading = false;

            // this.finished = false; //开启上拉加载
            this.formSet(); //格式化参数
            this.shopList = []; //清空列表

            this.search();
        },
        jumpList() {
            this.$router.push("shopList");
        },
        jumDetail(releaseId) {
            // window.location.href = window.location.href + "shopDetail?releaseId=" +releaseId +"&token=" +this.token;
            this.$router.push({
                path: 'shopDetail',
                query: {
                    id: releaseId,
                    token: this.token,
                    inside: true
                }
            });
        },
        jumpHome() {
            window.location.href = "appAndJs://shop?&type=1";
        },
        handleFilter(params) {
            let postData = {
                //选择地区级别最小的区域码
                areaCode: params.districtCode
                    ? params.districtCode
                    : params.cityCode
                    ? params.cityCode
                    : params.provinceCode
                    ? params.provinceCode
                    : "",
                category: params.categoryId,
                lowestArea: params.smallArea ? params.smallArea : 0,
                highestArea: params.bigArea ? params.bigArea : 0,
                lowestRent: params.nimPrice ? params.nimPrice : 0,
                highestRent: params.maxPrice ? params.maxPrice : 0,
                keyword: "",
                page: 0,
                size: 8,
                userBusinessId: 0
            };
            this.searchParams = postData;
            this.shopList = []; //清空列表
            this.search();
        },
        async search() {
            const res = await shopSearch(this.searchParams);
            this.searchParams.page += 1;
            if (res.data.result === "SUCCESS") {
                this.loading = false;
                if(res.data.data.pageFinder){
                    this.shopList.push(...res.data.data.pageFinder.data);
                    this.total = res.data.data.pageFinder.rowCount;
                      // 数据全部加载完成
                    if ( this.shopList.length >= this.total) {
                        this.finished = true;
                    }else {
                        this.finished = false;
                    }
                }else {
                    this.finished = true;
                }
            }else {
                this.error = true; //错误提醒
                this.loading = false;
            }
        },
        onLoad() {
            this.search();
        },
        formSet(){
            this.searchParams = {
                areaCode: "",
                category: 0,
                lowestArea: 0,
                highestArea: 0,
                lowestRent: 0,
                highestRent: 0,
                keyword: "",
                page: 0,
                size: 8,
                userBusinessId: 0
            }
        }
    }
};
</script>
<style scoped lang="scss">
.home {
    width: 100%;
    overflow: hidden;
    background-color: #f4f4f4;
    .home-body {
        margin-top: 48px;
        .van-swipe {
            height: 165px;
        }
        .content-wrapper {
            margin-top: 10px;
            padding-bottom: 20px;
            background-color: #fff;
            .filter-wrapper {
                margin-top: -15px;
                margin-bottom: 10px;
            }
            .content {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 10px;
                background-color: #fff;
                .list-item {
                    width: 49%;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>