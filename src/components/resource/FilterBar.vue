<template>
    <div class="filter">
        <div class="filter-item filter-active">
            <span >综合</span>
        </div>
        <div class="filter-item drop-down" @click="handleFilter">
            <span>筛选</span>
            <img class="filter-icon" :src="filterIcon" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filterIcon: require('@/assets/img/filter-down-icon.png')
        }
    },
    created () {
        console.log('pp');  
    },
    methods: {
        handleFilter(){
            console.log('55');
            this.$emit('filter');
        }
    }
}
</script>
<style scoped lang="scss">
    .filter{
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        .filter-item{
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #666;
            .filter-icon{
                width: 8px;
                height: 5px;
                margin-left: 5px;
            }
        }
        .filter-active{
            color: #E45089;
        }
    }
</style>
