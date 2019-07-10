<template>
    <div class="attendanceRecord">
        <div class="header-calendar">
            <!-- <div class="header" :style="{backgroundImage: 'url('+headerBg+')'}">
                <div class="header-name">
                    <span>{{title}}</span>
                </div>
            </div>-->
            <AppHeader :title="title"></AppHeader>
            <div class="calendar-wrapper">
                <Calendar :markDateMore="markDateArr"  @choseDay="dayClick" @changeMonth="monthClick" :textTop="weeks"></Calendar>
            </div>
        </div>
        <div class="records">
            <ul class="records-list" v-if="dayInfo.onTimeCard">
                <li class="list-item van-hairline--bottom">
                    <span :class="['am', dayInfo.onTimeCard.type == 1 ? 'normal' : 'forget']">上班时间：{{dayInfo.workTime}}</span>
                    <span class="pm">{{dayInfo.onTimeCard.type == 1 ? '正常打卡：' : '迟到：'}}{{dayInfo.onTimeCard.clockTimeStr}}</span>
                </li>
                <li class="list-item van-hairline--bottom">
                    <span :class="['am', dayInfo.offTimeCard.type == 2 ? 'normal' : 'forget']">下班时间：{{dayInfo.offDutyTime}}</span>
                    <span class="pm">{{dayInfo.offTimeCard.type == 2 ? '正常打卡：' : '早退：'}}{{dayInfo.offTimeCard.clockTimeStr}}</span>
                </li>
            </ul>
            <div class="tip" v-else>暂无打卡记录~</div>
        </div>
    </div>
</template>
<script>
    import Calendar from 'vue-calendar-component';
    import AppHeader from '@/components/AppHeader'
    import { fetchClockTimeCard } from '@/api/clock'
    import { getQueryString } from '@/utils/util'
    // type:1.上班打卡 2.下班打卡 3.迟到 4.早退
    export default {
        components: {
            Calendar,
            AppHeader
        },
        data(){
            return {
                title: '考勤记录',
                markDateArr: [],
                dayInfo: {},
                weeks: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
                token: ''
            }
        },
        created() {
            this.token = getQueryString('token');
            let month = getQueryString('month');
            // this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTAxMzM2NjkxMyIsImV4cCI6MTU1NDEyMDI3MCwianRpIjoiMTg4OTIifQ.NU-nG14_t5aYVk9N7Uni_bk6-EtE9OYvxwcBvbcaRzFR8geF1edw1I3hsZ-aIHNQzrphX-sOKaJ6aJqmlnRNwg';
            this.getClockTimeCard(month, this.token);
        },
        methods: {
            async getClockTimeCard(month, token){
                let postData = {
                    month: month,
                }
                const toast = this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '加载中...'
                });
                const res = await fetchClockTimeCard(postData, token);
                this.$toast.clear();
                if(res.data.result === 'SUCCESS'){
                    let tempArr = res.data.data.clockDayVOList;
                    if(tempArr){
                        tempArr.forEach(item => {
                            item.date = item.day;
                            switch (item.attendStatus){
                                case 1:
                                    item.className = 'done'
                                    break;
                                case 2:
                                    item.className = 'delay'
                                    break;
                                case 3:
                                    item.className = 'undone'
                                    break;
                            }
                        });
                        this.markDateArr = tempArr;
                    }
                }
            },
            dayClick(date) {
                let isShow = false;
                this.markDateArr.some(item => {
                    isShow = false;
                    if(item.date == date){
                        this.dayInfo = item;
                        isShow = true;
                        return true;
                    }
                });
                if(!isShow){
                    this.dayInfo = {}
                }
            },
            monthClick(date){
                let month = this.moment(date).format('YYYY-MM')
                this.getClockTimeCard(month, this.token);
            }
        },
    }
</script>
<style lang="scss">
.attendanceRecord {
    background-color: #fff;
    .header-calendar {
        padding-bottom: 10px;
        background-color: #f4f4f4;
    }
    .header {
        width: 100%;
        height: 48px;
        .header-name {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-size: 17px;
                color: #fff;
            }
        }
    }
    .calendar-wrapper {
        padding-top: 10px;
        background-color: #fff;
        margin-top: 48px;
        .wh_content_all {
            background-color: #fff !important;
        }
        .wh_content {
            .wh_content_item {
                display: flex;
                align-content: center;
                justify-content: center;
                height: 40px;
                // padding: 5px 0;
                .wh_top_tag {
                    font-size: 12px !important;
                    color: #656d78;
                }
                .wh_item_date {
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    text-align: center;
                    color: #656d78;
                }
                .wh_other_dayhide {
                    color: #ccd0d9;
                }
                .wh_chose_day{
                    background-color: #fff;
                    color: #EB5081;
                    border: 1px solid #EB5081;
                }
                .wh_isToday{
                    position: relative; 
                    box-sizing: border-box;
                    background-color: #EB5081!important;
                    color: #fff!important;
                    &:before{
                        content: '今天';
                        position: absolute;
                        width: 100%;
                        color: #EB5081;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: -23px;
                        font-size: 10px;
                    }
                }
            }
        }
        .wh_top_changge {
            li {
                color: #3c434c !important;
            }
            .wh_jiantou1,
            .wh_jiantou2 {
                width: 8px;
                height: 8px;
                border-top: 2px solid #999 !important;
            }
            .wh_jiantou1 {
                border-left: 2px solid #999 !important;
            }
            .wh_jiantou2 {
                border-right: 2px solid #999 !important;
            }
        }
        .done,
        .undone,
        .delay {
            border-radius: 50%;
            color: #fff !important;
        }
        .done {
            background: linear-gradient(
                25deg,
                rgba(55, 118, 249, 1),
                rgba(90, 194, 249, 1)
            )!important;
        }
        .undone {
            background: linear-gradient(
                25deg,
                rgba(254, 99, 54, 1),
                rgba(255, 167, 140, 1)
            )!important;
        }
        .delay {
            background: linear-gradient(
                25deg,
                rgba(153, 153, 153, 1),
                rgba(221, 221, 221, 1)
            )!important;
        }
    }
    .records {
        background-color: #fff;
        padding: 0 30px;
        .records-list {
            .list-item {
                display: flex;
                flex-direction: column;
                padding-top: 9px;
                .am {
                    padding: 9px 0 9px 20px;
                    font-size: 14px;
                    color: #666;
                }
                .pm {
                    padding: 0px 0 15px;
                    padding-left: 20px;
                    font-size: 16px;
                    color: #333;
                }
                .normal,
                .forget {
                    position: relative;
                    display: flex;
                    &:before {
                        content: "";
                        width: 12Px;
                        height: 12Px;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        background:linear-gradient(0deg,rgba(90,194,249,1),rgba(55,118,249,1));
                        border-radius: 50%;
                    }
                    &:after {
                        content: "";
                        width: 8Px;
                        height: 8Px;
                        position: absolute;
                        left: 2Px;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: #fff;
                        border-radius: 50%;
                    }
                }
                .forget {
                    &:before {
                        background: linear-gradient(
                            25deg,
                            rgba(254, 99, 54, 1),
                            rgba(255, 167, 140, 1)
                        );
                    }
                }
            }
        }
        .tip{
            font-size: 14px;
            color: #999;
            padding: 20px;
            text-align: center;
        }
    }
}
</style>