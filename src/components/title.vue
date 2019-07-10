<template>
    <div class="g-title">
        <img class="icon" :src="icon" alt="">
        <span class="name">{{title}}</span>
    </div>
</template>
<script>
export default {
    props: {
        icon: String,
        title: String
    },
    data() {
        return {

        }
    },
    methods: {
        
    },
}
</script>
<style scoped lang="scss">
    .g-title{
        display: flex;
        align-items: center;
        padding: 0 10px;
        line-height: 47px;
        background-color: #fff;
        .icon{
            width: 16px;
            height: 15.5px;
            margin-right: 6px;
        }
        .name{
            font-size: 14px;
            color: #333;
        }
    }
</style>