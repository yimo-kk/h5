<template>  
    <div>
        <div class="like-bar">
            <div class="left">
                <!--<div class="collection" @click="handelCollection">
                    <img :src="isShowCollection ? collectionSelIcon : collectionIcon" alt="">
                    <span>{{isShowCollection ? '取消收藏' : '收藏'}}</span>
                </div> -->
                <div class="share" @click="handleShare" v-if="false">
                    <img :src="shareIcon" alt="">
                    <span>分享</span>
                </div>
            </div>
            <div :class="['right', isLike ? 'right-sel' : '']" @click="handleLike">
                <img :src="liekIcon" alt="">
                <span>{{isLike ? '取消点赞' : '点赞'}}</span>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
</template>
<script>
export default {
    props: {
        isCollection: Boolean
    },
    data() {
        return {
            collectionIcon: require('../../assets/img/find/collection-icon.png'),
            collectionSelIcon: require('../../assets/img/find/collection-sel-icon.png'),
            shareIcon: require('../../assets/img/find/share-icon.png'),
            liekIcon: require('../../assets/img/find/like-icon.png'),
            isShowCollection: this.isCollection,
            isLike: false
        }
    },
    created () {

    },
    watch: {
        'isCollection': function(newVal, oldVal){
            console.log(newVal,'newVal');
            this.isShowCollection = newVal;
        }
    },
    methods: {
        handelCollection(){
            this.$emit('collection', {isCollection: this.isShowCollection});
        },
        handleShare() {
            this.$emit('onShare')
        },
        handleLike(){
            this.isLike = !this.isLike;
        }
    }
}
</script>
<style lang="scss" scoped>
         /* 竖屏底下的查询 */
    @media screen and (orientation: portrait) {
        .bottom {
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            /* 防止页面被刘海遮住 */
            height: constant(safe-area-inset-bottom);
            /*IOS 11.2版本版本支持*/
            height: env(safe-area-inset-bottom);
            background: #fff;
        }
    }
    // /* 横屏底下的查询 */
    // @media screen and (orientation: landscape) {
    //     .bottom {
    //         width: 100%;
    //         position: fixed;
    //         left: 0;
    //         bottom: 0;
    //         /* IOS 11支持*/
    //         padding-right: constant(safe-area-inset-right);
    //         padding-left: constant(safe-area-inset-left);
    //         /*IOS 11.2版本版本支持*/
    //         padding-right: env(safe-area-inset-right);
    //         padding-left: env(safe-area-inset-left);
    //     }
    // }
    .like-bar{
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0;
        bottom: 0;
        // border-top:1px solid rgba(221,221,221,1);
        box-shadow:0px -10px 15px 0px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        /* 防止页面被刘海遮住 */
        margin-bottom: constant(safe-area-inset-bottom);
        /*IOS 11.2版本版本支持*/
        margin-bottom: env(safe-area-inset-bottom);
        background-color: #fff;
        .left{
            display: flex;
            align-items: center;
            margin-left: 15px;
            .collection, .share{
                width: 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 10px;
                img{
                    width: 25px;
                    height: 25px;
                }
                span{
                    font-size: 11px;
                    color: #999;
                    margin-top: 2px;
                }
            }
        }
        .right{
            width: 110px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #999;
             img{
                width: 25px;
                height: 25px;
            }
            span{
                font-size: 11px;
                color: #fff;
                margin-top: 2px;
            }
        }
        .right-sel{
            background-color: #E84F80;
        }
    }
</style>

