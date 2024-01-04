<template>
	<view class="container">
		<view>
			<view @click="selectRangTime">选择时间区域</view>
			<u-calendar ref="calendar" :show="showCalendar" :mode="mode"  :formatter="formatter" @confirm="calendarConfirm" @close="calendarClose"></u-calendar>
		</view>
	</view>
</template>

<script>
	
	import moment from 'moment';
	export default {
		data() {
			return {
				mode: 'range',
				showCalendar: false,
			}
		},
		onReady() {
			// 如果需要兼容微信小程序的话，需要用此写法
			this.$refs.calendar.setFormatter(this.formatter)
		},
		methods: {
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				
				// 对day.date格式化成 "YYYY-MM-DD HH:mm:ss"
				day.date = moment(day.date).format("YYYY-MM-DD HH:mm:ss")
				
				if(day.month == month && day.day == date + 3){
					day.bottomInfo = '有优惠'
					day.dot = true
				}
				return day
			},
			calendarConfirm(e) {
				console.log(e);
				this.calendarClose();
			},
			selectRangTime() {
				this.showCalendar = true;
			},
			calendarClose() {
				this.showCalendar = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 10rpx;
	}
</style>
