<template>
    <div class="list-home">
        <div class="wrapper-header">
            <gHeader :visibleMore="false" :showArrow="true" @toBack="jumpHome" :title="title" @toList="jumpList"></gHeader>
        </div>
        <div class="list-body">
            <filterBar class="van-hairline--top" @filter="handleFilter"></filterBar>
            <div class="shop-list">
                <div class="shop-item" v-for="(item, index) in shopList" :key="index">
                    <shopItem :item="item" @onJump="jumpDetail"></shopItem>
                </div>
            </div>
        </div>
        <side-sheet :isShow="isShowFilter" @closeSheet="closeSheet" :isCategory="false"></side-sheet>
    </div>
</template>
<script>
import gHeader from '@/components/header'
import filterBar from '@/components/resource/FilterBar'
import shopItem from '@/components/resource/ShopItem'
import SideSheet from '@/components/sideSheet'
import { fetchResourceCategorySearch, fetchResourceDetail } from '@/api/resource'

export default {
    components: {
        gHeader,
        filterBar,
        shopItem,
        SideSheet
    },
    data() {
        return {
            title: '',
            isLoading: false,
            isShowFilter: false, //是否显示侧边筛选菜单
            shopList: [],
            token: ''
        }
    },
    created () {
        let query = this.$route.query;
        this.title = query.title + "资源";
        this.categoryId = query.id;
        let postData = {
            category: this.categoryId,
            isCooperate: true,
            isExpandCustomer: true,
            isShareChannel: true,
            isShareProject: true
            // position: 0,
        }
        this.getList(postData);
    },
    methods: {
        async getList(postData){
            const res = await fetchResourceCategorySearch(postData);
            if(res.data.result === "SUCCESS"){
                this.shopList = res.data.data;
            }
        },
        jumpDetail(id){
            if(process.env.NODE_ENV === 'development'){
                this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTg4OTM2MDkxMSIsImV4cCI6MTU1NTU5MTQ0NCwianRpIjoiMTg0MDEifQ.ml6BbCKeWbY3Z6M_kOjVUO9c8lm4f2Xvcb1EzMUSPzGRY-6Ly4jorD7Wd551w1FV-A8eQOnDH-Mm08-P4gkP_w'
            }else {
                this.token = this.$route.query.token;
            }
            this.getDetail(id, this.token);
            
        },
        async getDetail(id, token){
            const res = await fetchResourceDetail(id, token);
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
                if(state == 0){
                    this.$router.push({
                        path: 'resourceDetail',
                        query: res.data.data,
                        token: token
                    })
                }
            }
        },
        handleFilter(){
            this.isShowFilter = !this.isShowFilter;
        },
        closeSheet(params){
            this.isShowFilter = false;
            let postData = {
                category: this.categoryId,
                isCooperate: params.cooperationObj.isCooperate,
                isExpandCustomer: params.cooperationObj.isExpandCustomer,
                isShareChannel: params.cooperationObj.isShareChannel,
                isShareProject: params.cooperationObj.isShareProject
            }
            this.getList(postData);
        },
        jumpHome(){
            this.$router.go(-1);
        },
        jumpList(){

        }
    }
}
</script>
<style scoped lang="scss">
    .list-home{
        width: 100%;
        overflow: hidden;
        background-color: #f4f4f4;
        .list-body{
            margin-top: 48px;
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