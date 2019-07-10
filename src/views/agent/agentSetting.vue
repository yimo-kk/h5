<!-- 合作商设置 -->
<template>
    <div class="agent-setting">
        <div class="header-wrapper">
            <gHeader :title="title" :arrowWhite="true" :isShowBg="true"></gHeader>
        </div>
        <van-cell-group class="input-group">
            <van-field
                v-model="higtPice"
                center
                type="number"
                label="区代折扣"
                placeholder="请输入价格"
            >
                <span slot="button" class="advice">建议价格小于70%</span>
            </van-field>
            <van-field
                v-model="higtPice"
                center
                type="number"
                label="县代折扣"
                placeholder="请输入价格"
            >
                <span slot="button" class="advice">建议价格小于80%</span>
            </van-field>
        </van-cell-group>
        <WuBtn class="wu-btn" :label="btnLable" :loading="btnLoading" @submit="handleSubmit"></WuBtn>
    </div>
</template>

<script>
import gHeader from "@/components/header";
import WuBtn from "@/components/WuBtn";
import { setTimeout } from 'timers';

export default {
    components: {
        gHeader,
        WuBtn
    },
    data() {
        return {
            title: '合作商设置',
            higtPice: '',
            lowPrice: '',
            btnLable: '保存/修改',
            btnLoading: false,
        };
    },

    computed: {},

    mounted(){},

    methods: {
        handleSubmit(){
            this.btnLoading = true;
            setTimeout(() => {
                this.btnLoading = false;
            },1000);
        }
    }
};
</script>
<style lang='scss'>
    .agent-setting{
        min-height: 100%;
        background-color: #F4F4F4;
        .advice{
            font-size: 12px;
            color: #999;
        }
        .input-group{
            margin-top: 48px;
            .van-field__body{
                position: relative;
                &:before{
                    content: '￥';
                    position: absolute;
                    left: 2Px;
                    color: #666;
                }
            }
            .van-field__label{
                max-width: 80px;
            }
            .van-field__control{
                height: 30px;
                position: relative;
                border:1px solid rgba(153,153,153,1);
                padding-left: 15px;
                border-radius:6px;
                &:after{
                    content: '￥';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .van-field__clear{
                display: none;
            }
        }
        .wu-btn{
            margin-top: 15px;
            padding-bottom: 20px;
            text-align: center;
        }
    }
</style>