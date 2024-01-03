
##### bug1:
VM39:9 at http://127.0.0.1:11272/appservice/common/vendor.js:3976:3026
new Date("2024-03-15T00:00:00.000Z") 在部分 iOS 下无法正常使用，iOS 只支持
 "yyyy/MM/dd"、"yyyy/MM/dd HH:mm:ss"、"yyyy-MM-dd"、"yyyy-MM-ddTHH:mm:ss"、
 "yyyy-MM-ddTHH:mm:ss+HH:mm" 的格式 


在uniapp中使用日期格式时，确实需要注意iOS对日期格式的支持情况。根据你的描述，你可能需要调整日期格式，以便在iOS上正常使用。

你可以尝试使用moment.js库来处理日期格式，该库提供了丰富的日期处理功能，并且可以很好地兼容不同平台的日期格式要求。

首先，安装moment.js库：


````
然后在需要处理日期格式的地方引入moment.js，并使用其提供的方法来处理日期：

npm install moment


import moment from 'moment';

// 将日期格式转换为指定格式
let date = moment('2022-01-01', 'YYYY-MM-DD').format('YYYY/MM/DD');

// 获取当前日期
let currentDate = moment().format('YYYY/MM/DD');

// 计算日期差
let diff = moment('2022-01-01', 'YYYY-MM-DD').diff(moment('2021-01-01', 'YYYY-MM-DD'), 'days');

// 更多日期处理方法请参考moment.js官方文档



通过使用moment.js库，你可以方便地处理日期格式，并且确保在iOS上也能正常显示。希望对你有帮助！

````


````

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

		
````