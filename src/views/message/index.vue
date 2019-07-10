<template>
    <div class="message">
        <AppHeader :title="title" :isShowToBack="isShowToBack" @toBack="jumpBack"></AppHeader>
        <div class="mess-content">
            <h2 class="title">{{message.title}}</h2>
            <span class="time">发布时间: {{message.createTime | moment("YYYY-MM-DD hh:mm:ss")}}</span>
            <div class="article" v-html="message.content"></div>
        </div>
    </div>
</template>
<script>
    import AppHeader from '@/components/AppHeader'
    import { fetchMessageNotice } from '@/api/message'
    export default {
        name: 'message',
        components: {
            AppHeader
        },
        data() {
            return {
                title: '消息通知',
                isShowToBack: true,
                message: {}
            }
        },
        created() {
            this.getMessage(2);
        },
        methods: {
            async getMessage(id){
                const res = await fetchMessageNotice(id);
                if(res.data.result === 'SUCCESS'){
                    this.message = res.data.data;
                }
            },
            jumpBack(){
                console.log('返回');
            }
        },
    };
</script>
<style lang="scss" scoped>
    .message{
        .mess-content{
            display: flex;
            flex-direction: column;
            padding: 0 14px 20px;
            margin-top: 48px;
            .title{
                margin: 16px 0 5px;
                font-size: 16px;
                color: #333;
            }
            .time{
                font-size: 12px;
                color: #999;
            }
            .article{
                text-indent: 2em;
                font-size: 14px;
                line-height: 22px;
                color: #666;
                margin-top: 10px;
            }
        }
    }
</style>
