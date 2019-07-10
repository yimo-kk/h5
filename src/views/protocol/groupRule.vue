<template>
    <div>
        <div class="header-wrapper">
            <gHeader @toBack="jumpBack" :title="title" :arrowWhite="true" :isShowBg="true">团购规则</gHeader>
        </div>
        <br>
        <br>
        <div class="loveYou">
            <h4>开团</h4>
            <h5>团长发起拼团，购买商品完成支付后，拼团即开始；</h5>
            <h4>如何邀请好友邀请参团</h4>
            <h5>团长开团后可以将邀请链接分享给好友，好友购买商品即为参团。参团的团员也可以分享邀请链接邀请更多好友参加；</h5>
            <h4>拼团成功</h4>
            <h5>团长开团并在成团有效期内大概规定的成团人数，即为拼团成功；拼团成功后，商家未发货订单若有人取消订单则对应订单同时取消。商家已发货订单若产生退款则对应拼团订单不受影响。</h5>
            <h4>拼团失败</h4>
            <h5>拼团有效期内未达到规定的成团人数，即拼团失败，系统自动将订单金额退款返还至支付账户。</h5>
            <h4>优惠券使用</h4>
            <h5>拼团商品不支持使用优惠券。</h5>
            <h4>参团用户</h4>
            <h5>非商家设定的入驻认证用户无法参与团购，如需参团可按引导提交入驻认证资料，客服审核通过即可参与拼团。</h5>
            <h4>活动声明</h4>
            <h5>
                1.在法律允许范围内，聚美有权对本活动规则进行变更或调整，相关变动将会公布在活动页面上。
                <br>2.本活动最终解释权归聚美通道所有。
            </h5>
        </div>
    </div>
</template>
 
<script>
import gHeader from "@/components/header";
export default {
    components: {
        gHeader
    },
    methods: {
        jumpBack() {
            window.location.href = "appandjs://shop?&type=1"; //返回
        }
    }
};
</script>

<style>
div {
    line-height: 20px;
}
.loveYou {
    padding-left: 20px;
    padding-right: 20px;
}
h5 {
    color: #666;
    font-size: 12px;
}
h4 {
    font-size: 15px;
}
.header-wrapper {
    font-size: 18px;
    color: #fff;
}
</style>
