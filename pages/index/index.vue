<template>
	<view>
		<k-loading></k-loading>
		<!--  -->
		<view id="dGoodsHomeId" style="width: 100%;" v-if="myTab=='tabactivity'" >
			<view style="width: 100%;height: 400rpx;">
				<image src="/static/icon_img/xigua.jpg" style="width: 100%;height: 400rpx;"></image>
			</view>
			
			<view style="width: 100%;background-color: #fff;display: flex;align-items: center;justify-content: center;padding: 20rpx 0;">
				<view style="width: 92%;height: 70rpx;background-color: #f2f2f2;display: flex;align-items: center;border-radius: 35rpx;">
					<image src="../../uni_modules/d-swiper-type/components/d-swiper-type/pages/static/icon_img/search.png" 
					style="width: 35rpx;height: 35rpx;"></image>
					<input style="width: 400rpx;height: 80rpx;margin-left: 10rpx;" placeholder="请输入搜索的内容" />
					<image src="../../uni_modules/d-swiper-type/components/d-swiper-type/pages/static/icon_img/search.png" 
					style="width: 35rpx;height: 35rpx;"></image>
				</view>
			</view>
		</view>
		
		<view v-if="true">
			<tabhome v-if="myTab=='tabhome'" :page_num_id="page_num_id"></tabhome>
			<tabactivity v-if="myTab=='tabactivity'" ></tabactivity>
			<tabshow v-if="myTab=='tabshow'" :page_num_id="page_num_id"></tabshow>
			<tabmy v-if="myTab=='tabmy'" :scrollTopNum="scrollTopNum"></tabmy>
			
			
			<view style="width: 100%;height: 130rpx;" ></view>
			
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="tabhome">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/hhome' + [myTab=='tabhome'?'cur':''] + '.png'"></image>
					</view>
					<view :class="myTab=='tabhome'?'myColor':'text-gray'">首页</view>
				</view>
			
				<view class="action" @click="NavChange" data-cur="tabshow">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/user' + [myTab == 'tabshow'?'cur':''] + '.png'"></image>
					</view>
					<view :class="myTab=='tabshow'?'myColor':'text-gray'">用户列表</view>
				</view>
			
				<view class="action" @click="NavChange" data-cur="tabactivity">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/case' + [myTab == 'tabactivity'?'cur':''] + '.png'"></image>
					</view>
					<view :class="myTab=='tabactivity'?'myColor':'text-gray'">活动</view>
				</view>
			
				<view class="action" @click="NavChange" data-cur="tabmy">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/my' + [myTab == 'tabmy'?'cur':''] + '.png'"></image>
					</view>
					<view :class="myTab=='tabmy'?'myColor':'text-gray'">我的</view>
				</view>
			</view>
		</view>
		
		
		<!--  -->







		<!--  -->
	</view>
</template>













<script>
	export default {
		computed:{
			shopFind(){
				return this.$store.state.shopFind
			},
			userFind(){
				return this.$store.state.userFind
			}
		},
		components: {

		},
		data() {
		    return {
				scrollTopNum:0,
				myTab: 'tabhome',
				// myTab: 'tabactivity',
				// myTab: 'tabshow',
				goods_type_id:0,
				page_num_id:1,
				update_cart:1,
				sao_id:0,
			}
		},
		onShow() {
			console.log('show')

			if (this.myTab == 'goods') {
				this.update_cart++
			}

		},
		onLoad(options ) {
			console.log('==================================================index-----start')
			console.log(options)
			console.log('==================================================index-----start')
			if (options.path) {
				this.myTab = options.path
			}

			if (options.q) {
				this._on_jump_goods_sao_qr_code(options.q)
			}

			if (options.goods_type_id) {
				console.log(options.goods_type_id)

				this._on_jump_goods(options.goods_type_id)
			}

			if (options.scene) {
				var valueStr = decodeURIComponent(options.scene)
				var valueStrArray = valueStr.split('=')
				console.log(valueStrArray)

				if (valueStrArray[0] == 'share_id') {
					this._Common.setStoreApi('share_id',valueStrArray[1])
				}

			}
			if (options.share_id) {

				//	说明有推广人
				this._Common.setStoreApi('share_id',options.share_id)
				var url_path = ''
				if (options.v_id == 1) {
					//	说明有推广人
					if (options.goods_id) {
						url_path = '/pages/other/goods?goods_id='+options.goods_id
						this._Common._api_navigate_to(url_path)
						return
					}

				} else if (options.v_id == 2) {
					console.log('支付页面')
					//	说明有推广人
					url_path = '/pagesa/other/pay_buy'
					this._Common._api_navigate_to(url_path)
					return
				}
			}
			// console.log('==================================================home-----end')
		},
		onPageScroll(res){
			this.scrollTopNum = res.scrollTop

		},

		/**
		 * 上拉加载
		 */
		async onReachBottom() {
			var that = this

			that.page_num_id++
	
		},
		onShareAppMessage(res) {
			return this._Common._onShareAppMessageApi(res)
		},
		onShareTimeline(res) {
		},
		methods:{

			_on_jump_goods_sao_qr_code(sao_id = 0) {
				this.myTab = 'goods'

				var that = this

				setTimeout(()=>{
					that.sao_id = sao_id
				},1000)

				setTimeout(()=>{
					that.sao_id = sao_id
				},3000)

			},
			//	跳转到商品分类页面
			_on_jump_goods(goods_type_id = 0) {
				this.myTab = 'goods'

				var that = this

				setTimeout(()=>{
					that.goods_type_id = goods_type_id
				},1000)

				setTimeout(()=>{
					that.goods_type_id = goods_type_id
				},3000)

			},
			//	切换顶部tabbar
			NavChange: function(e) {
				this.myTab = e.currentTarget.dataset.cur

				var that = this
				setTimeout(()=>{
					that.statusLoading = false
				},2000)
			},

			c_id_api(goods_type_id = 0) {
				this.myTab = 'goods'
				var that = this
				setTimeout(()=>{
					that.goods_type_id = goods_type_id
				},1000)

			},
		},

	}
</script>


<style lang="scss" scoped>
	page {
		background-color: #fff;
	}
</style>
