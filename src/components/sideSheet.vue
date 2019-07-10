<template>
    <transition name="fade">
        <div class="side-sheet" v-if="isShow" @click="closeSheet">
            <div ref="mark" class="mark"></div>
            <transition name="move">
                <div ref="sheetContent" v-if="isShow" class="sheet-content">
                    <div class="top-adaptation"></div>
                    <div class="sheet-item" v-if="isCategory">
                        <h2 class="category-title">分类</h2>
                        <div class="tag-wrapper" @click.stop="selectTag">
                            <span :class="['tag', item.id == categoryId ? 'tag-sel' : '']" v-for="item in categoryList" :data-id="item.id" :key="item.id">{{item.title}}</span>
                        </div>
                    </div>
                    <div class="sheet-item">
                        <h2 class="category-title">合作类型</h2>
                        <div class="tag-wrapper" @click.stop="selectBigTag">
                            <span :class="['tag', 'big-tag', item.isChecked ? 'tag-sel' : '']" v-for="item in cooperationList" :data-id="item.id" :key="item.id">{{item.title}}</span>
                        </div>
                    </div>
                    <div class="btn-group">
                        <span class="btn-item" @click.stop="handleReset">重置</span>
                        <span class="btn-item btn-item-bg" @click.stop="handleSubmit">确定</span>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        isShow: false,
        isCategory: true
    },
    data() {
        return {
            categoryList: [
                {id:1, title: '美容'},
                {id:2, title: '美发'},
                {id:3, title: '美甲'},
                {id:4, title: '美体'},
                {id:5, title: '医美'},
            ],
            categoryId: '',
            cooperationList: [
                {id: 1, isChecked: false, name:'isExpandCustomer', title: '拓客合作'},
                {id: 2, isChecked: false, name:'isShareChannel', title: '渠道合作'},
                {id: 3, isChecked: false, name:"isCooperate", title: '资源合作'},
                {id: 4, isChecked: false, name:"isShareProject", title: '项目合作'}
            ],
            cooperationObj: {}
        };
    },
    created() {},
    mounted() {},
    methods: {
        closeSheet() { //关闭时请求
            this.cooperationList.forEach(item => {
                this.cooperationObj[item.name] =  item.isChecked;
            });
            this.$emit('closeSheet', {categoryId: this.categoryId, cooperationObj: this.cooperationObj});
        },
        selectTag(e){
            let id = e.target.attributes['data-id'].value;
            this.categoryId = id ? id : ''; 
        },
        selectBigTag(e){
            let id = e.target.attributes['data-id'].value;
            this.cooperationList.some(item => {
                if(item.id == id){
                    item.isChecked = !item.isChecked;
                    return true;
                }
            })
        },
        handleReset() { //重置筛选项
            this.cooperationList.forEach(item => {
                item.isChecked = false;
            });
            this.categoryId = "";
        },
        handleSubmit() {
            this.closeSheet();
        }
    }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.move-enter,
.move-leave-active {
    transform: translate3d(-100%, 0, 0);
}
.move-enter-active,
.move-leave-active {
    transition: all 0.3s ease-in-out;
}
.side-sheet {
    position: relative;
    z-index: 999;
    position: fixed;
    width: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;
    transition: all 0.3s;
    .mark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        transition: all 0.3s;
        // visibility: hidden;
        // z-index: -1;
    }
    .sheet-content {
        width: 70%;
        height: 100%;
        z-index: 999;
        position: absolute;
        left: 30%;
        top: 0;
        background-color: #fff;
        // transform: translate3d(100%, 0, 0);
    }
    .top-adaptation{
        width: 100%;
        height: constant(safe-area-inset-top);
        height: env(safe-area-inset-top);
        background-color: #fff;
    }
    .sheet-item{
        .category-title{
            font-size: 16px;
            color: #999;
            font-weight: normal;
            padding-left: 10px;
            margin-bottom: 5px;
        }
        .tag-wrapper{
            display: flex;
            padding: 2%;
            flex-wrap: wrap;
            .tag{
                width: 31%;
                margin: 0 1%;
                height: 35Px;
                line-height: 35Px;
                background-color: #f6f4f5;
                display: inline-block;
                box-sizing: border-box;
                color: #999;
                font-size: 14px;
                text-align: center;
                margin-bottom: 8px;
                border-radius: 5px;
            }
            .big-tag{
                width: 48%;
            }
            .tag-sel{
                background-color: #fdedf2;
                color: #E44F8A;
                border: 1px solid #E44F8A; 
            }
        }
    }
    .btn-group{
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        margin-top: 50px;
        .btn-item{
            width: 48%;
            height: 35Px;
            line-height: 35Px;
            text-align: center;
            border:1px solid rgba(224,224,224,1);
            border-radius:35px;
            font-size: 16px;
            color: #999;
            box-sizing: border-box;
            &:active{
                background-color: #e6e6e6;
            }
        }
        .btn-item-bg{
            background:linear-gradient(90deg,rgba(237,80,128,1),rgba(194,75,155,1));
            border: none;
            color: #fff;
            &:active{
                background:linear-gradient(90deg,rgba(194,75,155,1),rgba(237,80,128,1));
            }
        }
    }
}
</style>