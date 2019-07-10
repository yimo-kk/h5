<template>
    <div class="reruit-item">
        <div class="title-company">
            <span class="title">资深高级烫染总监 </span>
            <span class="company">梦美怡国际连锁美容公司</span>
        </div>
        <div class="price-area">
            <span class="price">10k-20k元/月</span>
            <span class="area">深圳市-福田区</span>
        </div>
        <div class="welfare-btn">
            <div class="tags-wrapper">
                <van-tag>五险</van-tag>
                <van-tag>奖金</van-tag>
                <van-tag>年终奖</van-tag>
                <van-tag>绩效分红</van-tag>
            </div>
            <span class="btn">立即申请</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
    .reruit-item{
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        background-color: #fff; 
        .title-company, .price-area, .welfare-btn{
            display: flex;
            justify-content: space-between;
            .title{
                font-size: 14px;
                color: #333;
            }
            .company{
                font-size: 12px;
                color: #666;
            }
        }
        .price-area{
            margin-top: 6px;
            .price{
                font-size: 14px;
                color: #F67132;
            }
            .area{
                font-size: 12px;
                color: #999;
            }
        }
        .welfare-btn{
            align-items: center;
            margin-top: 8px;
            .tags-wrapper{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .van-tag{
                    margin-right: 4px;
                    margin-bottom: 4px;
                }
            }
            .btn{
                width:90px;
                height:22Px;
                line-height: 22Px;
                background:linear-gradient(90deg,rgba(237,80,128,1),rgba(194,75,155,1));
                border-radius:11px;
                font-size: 12px;
                color: #fff;
                text-align: center;
                &:active{
                    background:linear-gradient(90deg,rgba(194,75,155,1), rgba(237,80,128,1));
                }
            }
        }
    }
</style>

