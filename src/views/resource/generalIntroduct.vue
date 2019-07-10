<template>
    <div>
        999
        <!-- <div class="introduct-page" v-if="state == 2">
            <img class="pic" :src="pic01" alt="">
            <img class="pic" :src="pic02" alt="">
            <div class="bottom">
                <img class="pic" :src="pic03" alt="">
                <span class="jump-pay" @click="jumpResourceRenewalFee">立即开通</span>
            </div>
            <img :src="leftArrow" class="to-back" @click="toBack" alt=""> 
        </div>
        <div class="introduct-page" v-if="state == 1">
            <img class="pic" :src="introductPic" alt="">
            <img :src="leftArrow" class="to-back" @click="toBack" alt=""> 
            <span class="to-home" @click="toHome">返回首页</span>
        </div> -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            pic01: require('../../assets/img/resource/intro-pic01.png'),
            pic02: require('../../assets/img/resource/intro-pic02.png'),
            pic03: require('../../assets/img/resource/intro-pic03.png'),
            introductPic: require('../../assets/img/resource/introduct-pic.png'),
            leftArrow: require('../../assets/img/white-right-arrow-icon.png'),
            state: null
        }
    },
    created () {
        // this.state = this.$route.query.state;
        // let message = this.$route.query.message
        // this.$notify({
        //     message: message,
        //     duration: 3000,
        //     background: '#E45089'
        // });
    },    
    methods: {
        toBack(){
            this.$router.go(-1);
        },
        jumpResourceRenewalFee(){
            this.$router.push({
                path: '/resourceRenewalFee'
            });
        },
        toHome(){
            this.$router.push('resourceHome')
        }
    }
}
</script>
<style lang="scss" scoped>
    .introduct-page{
        display: flex;
        flex-direction: column;
        position: relative;
        padding-bottom: 50px;
        background-color: #738ae8;
        // margin-top: 48px;
        .pic{
            width: 100%;
        }
        .bottom{
            position: relative;
        }
        .jump-pay, .to-home{
            width: 226px;
            height: 45Px;
            line-height: 45Px;
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            font-size: 18px;
            color: #fff;
            border-radius: 22px;
            background:linear-gradient(90deg,rgba(255,155,73,1),rgba(255,196,76,1));
            &:active{
                background:linear-gradient(90deg,rgba(255,196,76,1),rgba(255,155,73,1));                    
            }
        }
        .to-home{
            bottom: 150px;
        }
        .to-back{
            width: 10px;
            height: 17px;
            position: absolute;
            top: 15px;
            left: 15px;
        }
    }
</style>
