<template>
    <div class="apply-agent">
        <div class="header-wrapper">
            <gHeader @toBack="jumpBack" :title="type == 'person' ? personTitle : businessTitle" :arrowWhite="true" :isShowBg="true"></gHeader>
        </div>
        <van-cell-group class="form-wrapper">
            <van-field  label="真实姓名" input-align="right" placeholder="请输入真实姓名"/>
            <van-field  label="手机号码" type="number" input-align="right" placeholder="请输入手机号码" />
            <van-field  label="职位" input-align="right" placeholder="请输入职位"/>
            <van-cell v-if="type == 'person'">
                <template slot="title">
                    <div class="agent-select">
                        <span class="custom-text">代理级别</span>
                        <span @click="handleAgentLevel" class="select-text">{{level}}</span>
                    </div>
                </template>
            </van-cell>
            <!-- <van-field  label="代理级别" input-align="right" readonly @click="handleAgentLevel" @click-right-icon="handleAgentLevel" :right-icon="arrowRightIcon"/> -->
            <van-field  label="身份证号" input-align="right" placeholder="请输入身份证号"/>
            <!-- <van-field  label="行业" input-align="right" readonly @click-right-icon="handleIndustry" :right-icon="arrowRightIcon"/> -->
            <van-cell title="行业" :is-link="!instrudy ? true : false" @click="handleIndustry" :value="instrudy"/>

            <van-field  label="地区" v-model="area" input-align="right" readonly @click-right-icon="handleArea" :right-icon="arrowRightIcon"/>
            <van-field v-if="type == 'business'" label="代理推荐邀请码" input-align="right" placeholder="选填"/>
            <van-cell v-if="type == 'person'">
                <template slot="title">
                    <div class="agent-select">
                        <span class="custom-text">市级代理</span>
                        <span @click="handleAgentLevel" class="select-text">{{level}}</span>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <div class="submit-group">
            <div class="agree">
                <span @click="handleAgree" :class="['agree-btn', isAgree ? 'agree-btn-sel' : '']"></span>
                <span class="text">同意《成为合作伙伴协议》</span>
            </div>
            <WuBtn :label="btnLable" :loading="btnLoading" @submit="handleSubmit"></WuBtn>
        </div>
        <van-actionsheet style="height: 270px;" @select="onSelectInstrudy" v-model="showActionSheet" :actions="actions" >
        </van-actionsheet>
        <van-popup v-model="showPopUp" position="bottom">
            <van-area :area-list="areaList" @cancel="cancelSelectArea" @confirm="confirmSelectArea" value="110101" />
        </van-popup>
        <van-actionsheet style="height: 270px;" @select="onSelectAgentLevel" v-model="agentLevel" :actions="levelActions" >
        </van-actionsheet>
    </div>
</template>
<script>
import gHeader from "@/components/header";
import WuBtn from "@/components/WuBtn";
import { setTimeout } from 'timers';
// import BScroll from 'better-scroll'
export default {
    components: {
        gHeader,
        WuBtn
    },
    data() {
        return {
            personTitle: "申请成为合作伙伴",
            businessTitle: "申请成为服务商代理",
            btnLable: '确认提交',
            type: '',
            isAgree: false,
            btnLoading: false,
            arrowRightIcon: require('@/assets/img/right-icon.png'),
            showActionSheet: false,
            // downIcon: require('@/assets/img/filter-down-icon.png'),
            actions: [
                {name: '互联网',id: 1},
                {name: '互联网11',id: 1},
                {name: '互联网22',id: 1},
                {name: '互联网33',id: 1},
                {name: '互联网44',id: 1},
                {name: '互联网55',id: 1},
                {name: '互联网66',id: 1},
            ],
            instrudy: '',
            levelActions: [
                {name: '省级代理',id: 1},
                {name: '市级代理',id: 2},
                {name: '区级代理',id: 3},
            ],
            level: '请选择',
            areaList: {
                province_list: {
                    110000: '北京市',
                    120000: '天津市'
                },
                city_list: {
                    110100: '北京市',
                    110200: '县',
                    120100: '天津市',
                    120200: '县'
                },
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    110105: '朝阳区',
                    110106: '丰台区',
                    120101: '和平区',
                    120102: '河东区',
                    120103: '河西区',
                    120104: '南开区',
                    120105: '河北区',
                }
            },
            area: '',
            showPopUp: false,
            agentLevel: false
        };
    },
    created () {
        this.type = this.$route.query.type; 
    },
    mounted () {
        // let wrapper = document.querySelector('.wrap-sheet')
        // let scroll = new window.BScroll(wrapper)
       
    },
    methods: {
        jumpBack() {
            this.$router.go(-1);
        },
        onRefresh() {},
        handleAgree() {
            this.isAgree = !this.isAgree;
        },
        handleSubmit(){
            if(!this.isAgree){
                this.$toast('请选择同意《成为合作伙伴协议》')
            }else {
                this.btnLoading = true;
                setTimeout(() => {
                    this.btnLoading = false;
                }, 2000);
            }
        },
        handleIndustry(){
            this.showActionSheet = true;
        },
        handleAgentLevel(){
            this.agentLevel = true;
        },
        onSelectInstrudy(item, index){
            this.instrudy = item.name;
            this.showActionSheet = false;
        },
        onSelectAgentLevel(item, index){
            this.level = item.name;
            this.agentLevel = false;
        },  
        handleArea(){
            this.showPopUp = true;
        },
        cancelSelectArea(){
            this.showPopUp = false;
        },
        confirmSelectArea(arr) {
            console.log(arr,'9090');
            this.area = "";
            arr.forEach(item => {
                this.area+=item.name;
            });
            this.showPopUp = false;
        }
    }
};
</script>
<style lang="scss">
.apply-agent {
    background-color: #f4f4f4;
    .form-wrapper{
        margin-top: 48px;
    }
    .submit-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 0;
        .agree{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            .agree-btn{
                width: 10Px;
                height: 10Px;
                position: relative;
                border: 2Px solid #999;
                border-radius: 50%;
                &:after{
                    content: '';
                    width: 6Px;
                    height: 6Px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    background-color: #999;
                }
            }
            .text{
                margin-left: 10Px;
                font-size: 13Px;
                color: #999;
            }
            .agree-btn-sel{
                border: 2Px solid #E44F8A;
                &:after{
                    background-color: #E44F8A;
                }
            }
        }
    }
    .agent-select{
        height: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .select-text{
            position: relative;
            font-size: 12px;
            color: #999;
            border:1px solid rgba(153,153,153,1);
            padding: 0 35px 0 8px;
            border-radius:2px;
            &:after{
                content: '';
                width:0;
                height:0;
                position: absolute;
                top: 50%;
                right: 8px;
                transform: translateY(-50%);
                border-right:7px solid transparent;
                border-left:7px solid transparent;
                border-top:7px solid #999;
            }
        }
    }
    .van-field__label{
        max-width: 120px;
    }
}
</style>

