<!-- 个人代理商 -->
<template>
    <div>
        <div v-if="type === 'person'" class="person-agent-intro">
            <img class="to-back" :src="whiteLeftIcon" @click="toBack" alt="">
            <img class="intro-pic" :src="personPic" alt="">
            <div class="btn-wrapper">
                <span class="yellow-gradient-btn" @click="jumpApplyAgent('person')">立即申请</span>
            </div>
        </div>
        <div v-if="type === 'business'" class="person-agent-intro business-agent-intro">
            <img class="to-back" :src="whiteLeftIcon" @click="toBack" alt="">
            <img class="intro-pic" :src="agentPic01" alt="">
            <img class="intro-pic" :src="agentPic02" alt="">
            <img class="intro-pic" :src="agentPic03" alt="">
            <div class="btn-wrapper">
                <span class="yellow-gradient-btn" @click="jumpApplyAgent('business')">立即申请</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},

    data() {
        return {
            whiteLeftIcon: require('@/assets/img/white-right-arrow-icon.png'),
            personPic: require('@/assets/img/agent/person-pic.png'),
            agentPic01: require('@/assets/img/agent/agent-pic01.png'),
            agentPic02: require('@/assets/img/agent/agent-pic02.png'),
            agentPic03: require('@/assets/img/agent/agent-pic03.png'),
            type: ""
        };
    },

    created() {
        this.type = this.$route.query.type;
    },

    mounted() {},

    methods: {
        toBack(){
            this.$router.go(-1);
        },
        jumpApplyAgent(type){
            this.$router.push({
                path: 'agentApply',
                query: {
                    type: type
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
    .person-agent-intro{
        width: 100%;
        position: relative;
        font-size: 0;
        .intro-pic{
            width: 100%;
        }
        .btn-wrapper{
            position: absolute;
            left: 50%;
            bottom: 38px;
            transform: translateX(-50%);
            text-align: center;
        }
    }
    .business-agent-intro{
        .btn-wrapper{
            bottom: 26px;
        }
    }
</style>