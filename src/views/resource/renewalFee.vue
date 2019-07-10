<template>
    <div class="renewal-fee">
        <div class="header-wrapper">
            <gHeader @toBack="jumpBack" :title="title" :arrowWhite="true" :isShowBg="true"></gHeader>
        </div>
        <div class="fee">
            <!-- <span class="dealine">资源功能到期时间：2018-10-10 10:00:20</span> -->
            <van-tabs color="#E45089" :swipe-threshold="5" :title-active-color="'#E45089'">
                <van-tab v-for="item in categoryList" :title="item.name" :key="item.id">
                    <van-radio-group v-model="radio" style="margin-top: -1px;" @change="handleRadio">
                        <van-cell-group >
                            <van-cell v-for="(item, index) in payList" :title="item.howLong" :key="index" clickable>
                                <van-radio label-position="left" checked-color="#E45089" :name="item.serviceId">￥{{item.money}}</van-radio>
                            </van-cell>
                            <!-- <van-cell title="6个月" clickable @click="radio = '2'">
                                <van-radio label-position="left" checked-color="#E45089" name=2>￥388</van-radio>
                            </van-cell>
                                <van-cell title="12个月" clickable @click="radio = '3'">
                                <van-radio label-position="left" checked-color="#E45089" name=3>￥688</van-radio>
                            </van-cell> -->
                        </van-cell-group>
                    </van-radio-group>
                    <!-- <div class="buy-list">
                        <div class="buy-item van-hairline--bottom">
                            <span class="month">3个月</span>
                            <div class="price">
                                <span class="rmb">￥198</span>
                            </div>
                        </div>
                        <div class="buy-item van-hairline--bottom">
                            <span class="month">3个月</span>
                            <div class="price">
                                <span class="rmb">￥198</span>
                            </div>
                        </div>
                        <div class="buy-item">
                            <span class="month">3个月</span>
                            <div class="price">
                                <span class="rmb">￥198</span>
                            </div>
                        </div>
                    </div>-->
                </van-tab>
            </van-tabs>
            <div class="summary">
                <h3 class="summary-title">
                    板块介绍：
                </h3>
                <ul class="summary-list">
                    <li class="summary-item">美业专业平台精准资源合作共享，高效寻求行业潜在合作；</li>
                    <li class="summary-item">发布拓客、渠道、资源、项目合作介绍信息；</li>
                    <li class="summary-item">享受热线拨打、在线咨询功能；</li>
                    <li class="summary-item">根据购买时长享受店铺名片介绍位置排名优先级不同；</li>
                </ul>
                <div class="buy-btn-wrapper">
                    <span class="buy-btn" @click="jumpPay">支付</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import gHeader from "@/components/header";
import { fetchServiceOrder } from '@/api/resource'

export default {
    components: {
        gHeader
    },
    data() {
        return {
            title: "资源功能续费",
            isLoading: false,
            categoryList: [
                {id: 1,name: '美容'},
                {id: 2,name: '美发'},
                {id: 3,name: '美甲'},
                {id: 4,name: '美体'},
                {id: 5,name: '医美'},
            ],
            payList: [
                {serviceId: 31, money: 198, howLong: '3个月'},
                {serviceId: 32, money: 388, howLong: '6个月'},
                {serviceId: 33, money: 688, howLong: '12个月'},
            ],
            radio: 31,
            serviceId: 31,
            token: ''
        };
    },
    created() {
        console.log(this.$route.query,'支付页面 query');        
        console.log(this.$route.query.token,'支付页面 token');        
    },
    methods: {
        handleRadio(id){
            this.serviceId = id;
        },
        jumpPay(){
            this.getOrderId();
        },
        async getOrderId(){
            if(process.env.NODE_ENV === 'development'){
                this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTg4OTM2MDkxMSIsImV4cCI6MTU1NTU5MTQ0NCwianRpIjoiMTg0MDEifQ.ml6BbCKeWbY3Z6M_kOjVUO9c8lm4f2Xvcb1EzMUSPzGRY-6Ly4jorD7Wd551w1FV-A8eQOnDH-Mm08-P4gkP_w'
            }else {
                this.token = this.$route.query.token;
            }
            const toast = this.$toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: false, // 禁用背景点击
                loadingType: 'spinner',
            });
            let postData = {
                isDeposit: false,
                serviceId: this.serviceId
            }
            const res = await fetchServiceOrder(postData, this.token);
            this.$toast.clear();
            if(res.data.result == "SUCCESS"){
                let data = res.data.data;
                let orderId = data.orderPayMainId;
                let money = data.payTotalAmount;
                let params = {
                    orderId: orderId,
                    money: money
                }
                if(process.env.NODE_ENV !== 'development'){ //生产环境
                    window.location.href = "appAndJs://shop?&type=3&params=" + JSON.stringify(params); //跳转支付
                }
            }else {
                this.$toast.fail(res.data.message);
            }
        },
        jumpBack() {
            this.$router.go(-1);
        }
    },
    destroyed() {
        this.$toast.clear();
    },
};
</script>
<style lang="scss">

.renewal-fee {
    width: 100%;
    overflow: hidden;
    background-color: #f4f4f4;
    .fee {
        margin-top: 48px;
        .dealine {
            width: 100%;
            height: 50px;
            line-height: 50px;
            display: inline-block;
            background-color: #fff;
            font-size: 14px;
            color: #333;
            padding-left: 14px;
            margin-bottom: 10px;
        }
        .buy-list {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            padding: 0 15px;
            .buy-item {
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .month {
                    font-size: 14px;
                    color: #333;
                }
                .price {
                    .rmb {
                        font-size: 16px;
                        color: #e45089;
                    }
                }
            }
        }
        .van-cell{
            display: flex;
            align-items: center;
            .van-cell__value{
                text-align: left;
                .van-radio{
                    .van-radio__icon{
                        float: right;
                        .van-icon{
                            width: 18Px;
                            height: 18Px;
                        }
                    }
                    .van-radio__label--left{
                        float: right;
                        font-size: 16px;
                        color: #E45089;
                    }
                }
            }
        }
        .summary{
            padding: 10px 15px;
            .summary-title{
                font-size: 14px;
                color: #888;
                font-weight: normal;
                margin: 0;
            }
            .summary-list{
                .summary-item{
                    line-height: 24px;
                    font-size: 12px;
                    color: #999;
                    list-style: inside;
                }
            }
        }
        .buy-btn-wrapper{
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 100px;
            .buy-btn{
                width:210px;
                height:34px;
                line-height: 34px;
                display: inline-block;
                text-align: center;
                background:linear-gradient(90deg,rgba(237,80,128,1),rgba(194,75,155,1));
                border-radius:33px;
                font-size: 18px;
                color: #fff;
            }
        }
    }
}
</style>
