<template>
    <div class="notice">
        <img class="icon" src="../assets/img/notice-icon.png" alt="">
        <div class="notice-content">
            <marquee :interval="interval" :duration="duration" :direction="direction" :itemHeight="itemHeight">
                <marquee-item v-for="(item, index) in list" :key="index">
                    <span class="notice-text">{{item}}</span>
                </marquee-item>
            </marquee>
        </div>
    </div>
</template>
<script>
    import Marquee from '@/components/marquee/marquee'
    import MarqueeItem from '@/components/marquee/marquee-item'
    export default {
        components: {
            Marquee,
            MarqueeItem
        },
        props: {
            interval: Number,
            duration: Number,
            direction: String,
            itemHeight: Number,
            list: Array
        },
        data() {
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .notice{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background-color: #fff;
        .icon{
            width: 13px;
            height: 13px;
        }
        .notice-content{
            width: 100%;
            margin-left: 6px;
            .notice-text{
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #333;
            }
        }
    }
</style>
