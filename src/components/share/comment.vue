<template>
    <div class="comment-list">
        <div class="top">
            <span class="top-left">卖家评价</span>
            <div class="top-right">
                <span class="text">商品满意度：</span>
                <div class="van-rate-wrapper">
                    <van-rate void-icon="star" :size="14" void-color="#eee"/>
                </div>
            </div>
        </div>
        <ul class="comment-ul">
            <li class="comment-item">
                <div class="item-left">
                    <img src alt>
                </div>
                <div class="item-right">
                    <span class="name">COCO</span>
                    <span class="comment van-ellipsis">价格实惠，查了是正品！用完之后头发超级柔顺的，非常..</span>
                </div>
            </li>
        </ul>
        <div class="more-wrapper">
            <span class="more">查看更多评论</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
.comment-list {
    background-color: #fff;
    padding: 15px;
    padding-bottom: 30px;
    margin-bottom: 10px;
    .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-left {
            font-size: 14px;
            color: #333;
        }
        .top-right {
            display: flex;
            align-items: center;
            .text {
                font-size: 12px;
                color: #666;
            }
            .van-rate-wrapper {
                .van-rate {
                    display: flex;
                }
            }
        }
    }
    .comment-ul {
        overflow: hidden;
        .comment-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            .item-left {
                display: flex;
                align-items: center;
                flex-shrink: 0;
                img {
                    width: 40px;
                    height: 40px;
                    display: inline-block;
                    border-radius: 50%;
                    background: #ccc;
                }
            }
            .item-right {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 8px;
                .name {
                    font-size: 12px;
                    color: #333;
                }
                .comment {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
    .more-wrapper {
        text-align: center;
        .more {
            position: relative;
            padding: 4px 8px;
            font-size: 12px;
            color: #999;
            border: 1px solid rgba(153, 153, 153, 1);
            border-radius: 5px;
            &:active {
                background-color: #e6e6e6;
            }
            &:after {
                content: "";
                width: 16px;
                height: 16px;
                position: absolute;
                left: 50%;
                bottom: -22px;
                transform: translateX(-50%);
                background: url("../../assets/img/comment-more.png") no-repeat;
                background-size: 100%;
            }
        }
    }
}
</style>

