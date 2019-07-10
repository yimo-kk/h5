<template>
    <div class="agent-home">
        <div class="header-wrapper">
            <gHeader :visibleMore="false" :showArrow="true" @toBack="jumpHome" :title="title" @toList="jumpList"></gHeader>
        </div>
        <div class="agent-body">
            <div class="banner-wrapper">
                <img class="banner-pic" src alt>
            </div>
            <section class="summary">
                <h2 class="title">JMTD 合作商简介</h2>
                <span class="title-en">Enterprise introduction</span>
                <p class="summary-text">
                    JMTD致力于打造一站式美业B端移动互联网平台，未来将全面覆盖全国34个省级地，
                    及约650个所属市，引领全国美业细分领域，贯通全国美业B端店家、厂家、经销商、
                    教育机构环形生态链。只要您对美业市场有信心，有足够的美业资源，项目合作回报价值将不可估量。
                    您只需要轻松推荐身边美业资源加入聚美通道平台，让我们互惠共赢，携手引领美业转型升级，
                    共同成为B端美业平台的创造者和领航者吧!
                </p>
            </section>
            <ul class="card-ul">
                <li class="card-item">
                    <h3 class="item-title">生态化</h3>
                    <span class="text">
                        JMTD平台凝聚美业
                        各领域资源和力量，
                        满足客户多样性需求
                    </span>
                </li>
                <li class="card-item">
                    <h3 class="item-title">规模化</h3>
                    <span class="text">
                        JMTD平台目前已全
                        面升级，蓝图覆盖全
                        国各级省市，深度精
                        准地服务美业领域
                        人群
                    </span>
                </li>
                <li class="card-item">
                    <h3 class="item-title">智能化</h3>
                    <span class="text">
                        JMTD平台是服务于
                        美业人士的一站式智
                        能APP,全面升级的
                        V2.0系统，全方位解
                        决行业各环节问题
                    </span>
                </li>
            </ul>
            <div class="btn-group">
                <span class="btn-item red" @click="jumpIntro('person')">成为个人代理商</span>
                <span class="btn-item yellow" @click="jumpIntro('business')">成为服务代理商</span>
            </div>
        </div>
    </div>
</template>
<script>
import gHeader from "@/components/header";

export default {
    components: {
        gHeader
    },
    data() {
        return {
            title: "成为代理商"
        };
    },
    created () {
        console.log(this.$route,'909');
    },
    methods: {
        jumpIntro(type){
            this.$router.push({
                path: 'agentIntro',
                query: {
                    type: type
                }
            });
        },
        jumpList() {},
        jumpHome() {}
    }
};
</script>
<style lang="scss" scoped>
.agent-home {
    .banner-wrapper {
        width: 100%;
        height: 120px;
        overflow: hidden;
        .banner-pic {
            width: 100%;
            height: 120px;
            display: block;
            background-color: #ccc;
        }
    }
    .agent-body{
        margin-top: 48px;
    }
    .summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px;
        .title {
            margin: 3px 0;
            font-size: 18px;
            color: #323333;
            letter-spacing: 1px;
        }
        .title-en {
            font-size: 10px;
            color: #999899;
        }
        .summary-text {
            margin-top: 7px;
            line-height: 20px;
            font-size: 12px;
            color: #666;
            text-indent: 2em;
        }
    }
    .card-ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 15px;
        padding-top: 0;
        li {
            width: 31%;
            height: 122px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid rgba(224, 224, 224, 1);
            border-radius: 20px;
            margin-bottom: 10px;
            .item-title {
                position: relative;
                margin-top: 8px;
                margin-bottom: 5px;
                font-size: 14px;
                color: #333;
                &:after {
                    content: "";
                    width: 100%;
                    height: 1px;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background-color: #999;
                }
            }
            .text {
                padding: 0 9px;
                font-size: 10px;
                color: #666;
            }
        }
    }
    .btn-group{
        padding: 0 21px;
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        .btn-item{
            width: 156px;
            height: 45px;
            display: inline-block;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 18px;
            border-radius:45px;
        }
        .red{
            background-color: #E44F8A;
        }
        .yellow{
            background-color: #F9962F;
        }
    }
}
</style>
