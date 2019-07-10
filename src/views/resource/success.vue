<!-- 支付成功页面 -->
<template>
    <div class="pay-success">
        <div class="header-wrapper">
            <gHeader @toBack="jumpBack" :title="title" :arrowWhite="true" :isShowBg="true"></gHeader>
        </div>
        <div class="success-info">
            <img class="icon" :src="successIcon" alt="">
            <span class="result">付款成功</span>
            <span class="tip">请到商家后台中填写店铺资源信息</span>
            <span class="toHome" @click="jumpBack">返回首页</span>
        </div>
    </div>
</template>

<script>
import gHeader from "@/components/header";

export default {
    components: {
        gHeader
    },

    data() {
        return {
            title: '支付结果',
            successIcon: require('../../assets/img/pay-success-icon.png'),
            token: ''
        };
    },

    created() {
        if(process.env.NODE_ENV === 'development'){
            this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTg4OTM2MDkxMSIsImV4cCI6MTU1NTU5MTQ0NCwianRpIjoiMTg0MDEifQ.ml6BbCKeWbY3Z6M_kOjVUO9c8lm4f2Xvcb1EzMUSPzGRY-6Ly4jorD7Wd551w1FV-A8eQOnDH-Mm08-P4gkP_w'
        }else {
            this.token = this.$route.query.token;
        }
    },

    mounted() {},

    methods: {
        jumpBack(){
            this.$router.push({
                path: 'resourceHome',
                query: {
                    token: this.token
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
    .pay-success{
        .success-info{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 48px;
        }
        .icon{
            width: 50px;
            height: 50px;
            margin: 30px 0 12px 0;
        }
        .result{
            font-size: 16px;
            color: #444;
        }
        .tip{
            font-size: 12px;
            color: #999;
            margin: 20px 0;
        }
        .toHome{
            width:80px;
            height:26Px;
            line-height: 26Px;
            text-align: center;
            border:1px solid rgba(153,153,153,1);
            border-radius:2px;
            font-size: 14px;
            color:rgba(51,51,51,1);
            &:active{
                background-color: #f3f3f3;
            }
        }
    }
</style>