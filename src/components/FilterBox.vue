<!-- 筛选盒子 -->
<template>
    <div class="filter-box">
        <div class="filter-bar">
            <span></span>
            <div class="bar-list">
                <span class="bar-item">默认</span>
                <div class="bar-item" @click="handlePriceSort">
                    <span>价格</span>
                    <img class="price-icon" :src="togglePriceIcon ? filterUpIcon : priceDownIcon" alt="">
                </div>
                <div class="bar-item" @click="handleShowFilterBox">
                    <span>筛选</span>
                    <img class="down-icon" :src="filterDownIcon" alt="">
                </div>
            </div>
        </div>
        <div class="filter-content" v-show="isShowFilterBox">
            <div class="content-list">
                <div class="close">
                    <span></span>
                    <img class="down-icon" :src="closeIcon" @click="closeFilterBox" alt="">
                </div>
                <div class="list-item">
                    <span class="left">地区</span>
                    <div class="area">
                        <!-- <span class="area-text">深圳-福田</span> -->
                        <div class="area-group">
                            <van-field  readonly placeholder="选择省" v-model="province" :right-icon="rightIcon" @click-right-icon="getProvince"/>
                            <div class="area-item" v-show="isShowProvinceList" @click="selectProvince">
                                <span v-for="item in provinceList" :key="item.areaCode" :areaCode="item.areaCode" class="province-item">{{item.name}}</span>
                            </div>
                            <van-field  readonly placeholder="选择市"  v-model="city" :right-icon="rightIcon" @click-right-icon="getCityList"/>
                            <div class="area-item city-item" v-show="isShowCityList"  @click="selectCity">
                                <span v-for="item in cityList" :key="item.areaCode" :areaCode="item.areaCode" class="province-item">{{item.name}}</span>
                            </div>
                            <van-field  readonly placeholder="选择区"  v-model="district" :right-icon="rightIcon" @click-right-icon="getDistrictList"/>
                            <div class="area-item dictrict-item" v-show="isShowDistrictList"  @click="selectDistrict">
                                <span v-for="item in districtList" :key="item.areaCode" :areaCode="item.areaCode" class="province-item">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-item price-item">
                    <span class="left">价格区间</span>
                    <div class="price-group">
                        <van-field v-model="nimPrice" placeholder="最低价"/>
                        <span class="line"></span>
                        <van-field v-model="maxPrice" placeholder="最高价"/>
                    </div>
                </div>
                <div class="list-item">
                    <span class="left">分类</span>
                    <div class="price-group">
                        <van-tag v-for="item in categoryList" @click="selectCategory(item.id)" :key="item.id" :color="categoryId == item.id ? '#E84F80' : '#999'" plain>{{item.name}}</van-tag>
                    </div>
                </div>
                <div class="list-item">
                    <span class="left">面积区间</span>
                    <div class="price-group">
                        <van-field v-model="smallArea"> 
                            <span slot="button">㎡</span>
                        </van-field>
                        <span class="line"></span>
                        <van-field v-model="bigArea"> 
                            <span slot="button">㎡</span>
                        </van-field>
                    </div>
                </div>
                <div class="submit-wrapper">
                    <span></span>
                    <span class="submit-btn" @click="submit">确认</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchArea } from '@/api/shop'
export default {
    components: {},

    data() {
        return {
            priceDownIcon: require('../assets/img/price-down-icon.png'),
            filterUpIcon: require('../assets/img/price-up-icon.png'),
            filterDownIcon: require('../assets/img/filter-down-icon.png'),
            closeIcon: require('../assets/img/close-icon.png'),
            rightIcon: require('../assets/img/drag-down-icon.png'),
            togglePriceIcon: false, //切换价格排序图标
            //省市区
            isShowFilterBox: false,
            isShowProvinceList: false,
            isShowCityList: false,
            isShowDistrictList: false,
            provinceList: [],
            cityList: [],
            districtList: [],
            province: '',
            provinceCode: '',
            city: '',
            cityCode: '',
            district: '',
            districtCode: '',
            //分类
            categoryList: [
                {id: 1,name: '美容'},
                {id: 2,name: '美发'},
                {id: 3,name: '美甲'},
                {id: 4,name: '美体'},
                {id: 5,name: '医美'},
            ],
            categoryId: 1,
            //价格区间
            nimPrice: '',
            maxPrice: '',
            //面积区间
            smallArea: '',
            bigArea: ''
        };
    },

    created() {},

    mounted() {},

    methods: {
        submit(){
            let postData = {
                provinceCode: this.provinceCode,
                cityCode: this.cityCode,
                districtCode: this.districtCode,
                nimPrice: this.nimPrice,
                maxPrice: this.maxPrice,
                smallArea: this.smallArea,
                bigArea: this.bigArea,
                categoryId: this.categoryId,
            }
            this.$emit('submit', postData);
            this.isShowFilterBox = false;
        },
        handleShowFilterBox(){
            this.isShowFilterBox = !this.isShowFilterBox;
        },
        async getProvince(){
            this.isShowProvinceList = !this.isShowProvinceList;
            if(this.provinceList.length === 0){
                const res = await fetchArea('root', 1);
                if(res.data.result === "SUCCESS"){
                    this.provinceList = [];
                    res.data.data.forEach(item => {
                        this.provinceList.push({
                            areaCode: item.areaCode,
                            name: item.name
                        });
                    });
                }
            }
            this.isShowCityList = false; //关闭城市列表
            this.isShowDistrictList = false; //关闭区列表
        },
        selectProvince(e){
            this.provinceCode = e.target.attributes['areacode'].value;
            this.province = e.target.innerHTML;
            
            this.isShowProvinceList = false; //关闭城市列表
            this.city = ""; //清空城市
            this.district = ""; //清空区/县
            
            this.cityCode = ""; //清空城市码
            this.districtCode = ""; //清空区码
        },
        async getCityList(){
            if(!this.province){
                this.$toast('请先选择省份');
                return;
            }
            this.isShowCityList = !this.isShowCityList;
            const res = await fetchArea(this.provinceCode, 2);
            if(res.data.result === "SUCCESS"){
                this.cityList = [];
                res.data.data.forEach(item => {
                    this.cityList.push({
                        areaCode: item.areaCode,
                        name: item.name
                    });
                });
            }

            this.isShowProvinceList = false; //关闭省份列表
            this.isShowDistrictList = false; //关闭区列表
            
        },
        selectCity(e){
            this.cityCode = e.target.attributes['areacode'].value;
            this.city = e.target.innerHTML;

            this.isShowCityList = false;
            this.district = ""; //清空区/县
            this.districtCode = ""; //清空区码

        },
        async getDistrictList(){
            if(this.province && this.city){
                this.isShowDistrictList = !this.isShowDistrictList;
                const res = await fetchArea(this.cityCode, 3);
                if(res.data.result === "SUCCESS"){
                    this.districtList = [];
                    res.data.data.forEach(item => {
                        this.districtList.push({
                            areaCode: item.areaCode,
                            name: item.name
                        });
                    });
                }
            }else {
                this.$toast('请先选择省份或城市');
            }
            this.isShowProvinceList = false; //关闭省份列表
            this.isShowCityList = false; //关闭城市列表
        },
        selectDistrict(e){
            this.districtCode = e.target.attributes['areacode'].value;
            this.district = e.target.innerHTML;
            this.isShowDistrictList = false;
        },
        closeFilterBox(){
            this.isShowFilterBox = false;
        },
        handlePriceSort(){
            this.togglePriceIcon = !this.togglePriceIcon;
        },
        selectCategory(id){
            this.categoryId = id;
        }
    }
};
</script>
<style lang='scss'>
    .filter-box{
        position: relative;
        background-color: #fff;
        .filter-bar{
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            .bar-list{
                display: flex;
                align-items: center;
                .bar-item{
                    display: flex;
                    align-items: center;
                    margin: 0 22px;
                    font-size: 14px;
                    color: #999;
                    .price-icon{
                        width: 8px;
                        height: 11px;
                        margin-left: 4px;
                    }
                    .down-icon{
                        width: 8px;
                        height: 5px;
                        margin-left: 4px;
                    }
                }
            }
        }
        .filter-content{
            width: 355px;
            height: auto;
            position: absolute;
            left: 0;
            top: 35px;
            z-index: 1;
            margin: 0 10px;
            border:1px solid rgba(221,221,221,1);
            box-shadow:0px 10px 15px 0px rgba(0, 0, 0, 0.05);
            border-radius:0px 0px 30px 30px;
            background-color: #fff;
            .content-list{
                padding: 10px;
                .list-item{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 10px 0;
                    .left{
                        width: 70px;
                        font-size: 14px;
                        color: #333;
                    }
                    .area{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .area-text{
                            font-size: 13px;
                            color: #666;
                            margin-right: 8px;
                        }
                        .van-cell{
                            padding: 0;
                            width: 60px;
                            line-height: 18px;
                            border:1px solid rgba(221,221,221,1);
                            margin-right: 4px;
                        }
                        .van-field__clear, .van-field__right-icon{
                            padding: 0;
                            margin-right: 0;
                        }
                        .van-field__right-icon .van-icon{
                            margin-right: 2px;
                            font-size: 12px;
                        }
                        .van-field__control{
                            font-size: 12px;
                            text-align: center;
                        }
                        .area-group{
                            display: flex;
                            position: relative;
                            .area-item{   
                                width: 100px;
                                height: 150px;
                                position: absolute;
                                left: 4px;
                                top: 19px;
                                z-index: 2;
                                display: flex;
                                flex-direction: column;
                                overflow-y: scroll;
                                border:1px solid rgba(221,221,221,1);
                                background-color: #fff;
                                .province-item{
                                    padding: 5px 4px;
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                            .city-item{
                                left: 68px;
                            }
                            .dictrict-item{
                                left: 90px;
                            }
                        }
                    }
                    .price-group{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .van-cell{
                            width: 60px;
                            line-height: 18px;
                            padding: 0;
                            border:1px solid rgba(221,221,221,1);
                            .van-field__control{
                                font-size: 12px;
                                text-align: center;
                            }
                        }
                        .van-tag{
                            margin-right: 10px;
                        }
                        .line{
                            width: 10px;
                            height: 1px;
                            background-color: #999;
                        }
                        .van-field__button{
                            padding-left: 2px;
                            span{
                                font-size: 12px;
                                color: #999;
                                margin-right: 2px;
                            }
                        }
                    }
                }
                .close{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    .down-icon{
                        width: 16px;
                        height: 16px;
                    }
                }
                .submit-wrapper{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    .submit-btn{
                        width: 120px;
                        height: 25px;
                        line-height: 25px;
                        margin-bottom: 25px;
                        background: #E84F80;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 1px;
                        text-align: center;
                        &:active{
                            background-color: #e06f93;
                        }
                    }
                }
            }
        }
    }
</style>