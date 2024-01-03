<template>
	<view class="vueBox">
		<!-- header-start -->
		<view style="width: 100%;">
			<cu-custom bgColor="myThemeBg" :isBack="false">
			　　<block slot="backText" >返回</block>
			　　<block slot="content">首页</block>
			</cu-custom>
		</view>
		<!-- header-end -->
		
		<view style="width: 100%;height: 300rpx;background-color: red;">
			
		</view>
		
		
		
		
		
		
		<view style="display: flex;flex-direction: column;align-items: center;margin-top: 100rpx;width: 100%;" @click="_Copy('https://ext.dcloud.net.cn/publisher?id=117346')">
			<view style="font-size: 40rpx;color: red;" class="myflex" >
				查看作者全部插件：【点击复制链接】
			</view>
			<view style="font-size: 40rpx;color: red;margin-top: 100rpx;width: 100%;" class="myflex" >
				https://ext.dcloud.net.cn/publisher?id=117346
			</view>
		</view>
		
		<view style="font-size: 40rpx;color: red;margin-top: 100rpx;" class="myflex" @click="_JumpVue('/pages/login/login')">
			跳转到登录页面
		</view>
		
		<view style="font-size: 40rpx;color: red;margin-top: 100rpx;" class="myflex" @click="openTan">
			打开弹框
		</view>
		
		<view style="font-size: 40rpx;color: red;margin-top: 100rpx;" class="myflex" @click="openTest(1)">
			打开测试
		</view>
		
		
		
		
		<!-- 弹框用法 -->
		<d-tan v-model="is_tan">
			<view style="width: 100%;min-height: 300rpx;background-color: #fff;border-radius: 30rpx 30rpx 0 0;display: flex;
			flex-direction: column;align-items: center;overflow: hidden;">
				
				<view style="width: 100%;height: 100rpx;display: flex;align-items: center;justify-content: space-between;">
					<view style="margin-left: 30rpx;display: flex;">
						<view>选择会员</view>
						<!-- <view style="color: red;margin-left: 20rpx;" @click="_JumpVue('/pagesa/door/goods/list')">（商品管理）</view> -->
					</view>
					<view style="width: 150rpx;text-align: right;display: flex;align-items: center;;padding-right: 30rpx;
					justify-content: flex-end;height: 100rpx; " @click="is_show=false">关闭</view>
				</view>
				
				<view style="width: 90%;height: 1px;background-color: #f2f2f2;"></view>
				
				
				<view style="width: 100%;height: 450rpx;background-color: pink;">
					
					
					
				</view>
				
				
				<!-- <view style="width: 90%;height: 30rpx;"></view> -->
				
			</view>
		</d-tan>
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		<d-empty></d-empty>
		<k-public></k-public>
		
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
				is_tan:false,
			};
		},
		
		//	页面显示
		created() {
			this._init_api()
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
				this.demo()
			},
			async demo() {
				let params = {}
				var resData = await this._Api(this._Router.getUserFind, params,'GET',true)
				
			},
			openTan() {
				this.is_tan = true
			},
			openTest(type) {
				
				if (type == 1) {
					uni.navigateTo({
						url:'/pages/dev/test1'
					})
				}
			}
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
