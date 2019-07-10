<template>
    <div class="shop">
        <div class="shop-left">
            <img :src="item.merchantLogo" alt>
        </div>
        <div class="shop-right">
            <h3 class="title">{{item.businessName}}</h3>
            <slot></slot>
            <div class="rate-btn-group">
                <span class="rate">店铺评分：{{item.avgRating}}分</span>
                <div class="btn-group">
                    <span class="btn-item">收藏店铺</span>
                    <span class="btn-item btn-item02">进入店铺</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
.shop {
    display: flex;
    justify-content: flex-start;
    padding: 20px 15px;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
    .shop-left {
        font-size: 0;
        img {
            width: 50px;
            height: 50px;
            display: inline-block;
            background-color: #ccc;
            border-radius: 4px;
        }
    }
    .shop-right {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 12px;
        .title {
            margin: 0;
            font-size: 16px;
            color: #333;
        }
        .rate-btn-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .rate {
                font-size: 12px;
                color: #999;
            }
            .btn-group {
                display: flex;
                .btn-item {
                    position: relative;
                    padding: 2px 5px;
                    padding-left: 17px;
                    margin: 0 5px;
                    font-size: 12px;
                    color: #333;
                    border: 1px solid rgba(51, 51, 51, 1);
                    border-radius: 5px;
                    &:before {
                        content: "";
                        width: 12px;
                        height: 12px;
                        position: absolute;
                        left: 3px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: url("../../assets/img/shop-collection.png")
                            no-repeat;
                        background-size: 100%;
                    }
                    &:active {
                        background-color: #ccc;
                    }
                }
                .btn-item02 {
                    &:before {
                        background: url("../../assets/img/shop-icon02.png")
                            no-repeat;
                        background-size: 100%;
                    }
                }
            }
        }
    }
}
</style>

