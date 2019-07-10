<template>
    <!-- <span @click="submit" class="btn">
        {{label}}
    </span> -->
    <div class="wu-btn">
        <van-button round loading-text="提交中..." :loading="loading" @click="submit">{{label}}</van-button>
    </div>
</template>
<script>
export default {
    props: {
        label: String,
        loading: false,
        loadingText: "提交中..."
    },
    data() {
        return {}
    },
    methods: {
        submit(){
            this.$emit('submit');
        }
    }
}
</script>
<style lang="scss">
    .wu-btn{
        .van-button--round{
            width:210px;
            height:36px;
            line-height: 36px;
            background:linear-gradient(90deg,rgba(237,80,128,1),rgba(194,75,155,1));
            border-radius:32px;
            font-size: 16px;
            text-align: center;
            color: #fff;
        }
    }
</style>
