<template>
	<view class="vueBox shenHeVue">
		<!-- header-start -->
		<view style="width: 100%;">
			<cu-custom bgColor="myThemeBg" :isBack="false">
			　　<block slot="backText" >返回</block>
			　　<block slot="content">我的</block>
			</cu-custom>
		</view>
		<!-- header-end -->
		
		<view></view>
		
		<k-public></k-public>
		<d-empty top="100"></d-empty>
	</view>
</template>

<script>
	export default {
		computed:{
			userFind(){
				return this.$store.state.userFind
			}
		},
		data() {
			return {
				CustomBar:this.CustomBar,
				list_rows:10,
				page:1,
			};
		},
		
		//	页面加载
		onLoad(options) {
			console.log('___________onLoad__________start')
			console.log(options)
		},
		//	页面显示
		onShow() {
			this._init_api()
		},
		//	页面隐藏
		onHide() {
			
		},
		//	页面卸载
		onUnload() {
			
		},
		//	页面下拉刷新
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
			
		},
		//	点击分享
		onShareAppMessage() {
			
		},
		//	监听页面滚动	页面在垂直方向已滚动的距离（单位px）
		onPageScroll() {
			
		},
		//	监听页面返回
		onBackPress(options) {
			
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			console.log('上拉加载')
			if(this.loading === 'noMore') return
			// this.page++

		},
		methods: {
			_init_api() {
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f2f2;
	}
</style>
<style lang="scss" scoped>
	
	
</style>
