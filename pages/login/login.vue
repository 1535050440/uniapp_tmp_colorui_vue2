<template>
	<view>
		<cu-custom bgColor="my-theme-bg" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				登录
			</block>
		</cu-custom>

		<view class="login-warpper">
			<view class="login-top">
				<!-- <image src="/static/tabbar/logo.png" mode="aspectFill" class="" style="border-radius: 40rpx;"></image> -->
			</view>



			<!-- #ifdef MP-WEIXIN -->
			<view class="login-footer " style="margin-top: 10rpx;" v-if="!is_login">
				<button class="mobileBtn my-theme-bg" open-type="getPhoneNumber"
					@getphonenumber="on_login_api_mobile">手机号直接登陆</button>
			</view>

			<!-- #endif -->



			<!-- #ifdef MP-ALIPAY -->
			<view class="login-footer" style="margin-top: 10rpx;" v-if="!is_login">
				<button class="login" :class="bgColorFind" type="default" open-type="getAuthorize"
					@getAuthorize="onGetAuthorize" @error="onAuthError" scope='phoneNumber'>授权手机号一键登录</button>
			</view>
			<!-- #endif -->



			<!-- #ifdef MP-ALIPAY -->
			<view class="login-footer" style="margin-top: 10rpx;" v-else>
				<button type="primary" size="default" open-type="getAuthorize" scope="userInfo"
					@getAuthorize="onClickGetuserinfo" @error="onAuthError">
					支付宝更新头像昵称
				</button>
			</view>
			<!-- #endif -->



			<view class="login-footer" style="margin-top: 100rpx;">
				<button class="mobileBtn my-text" @tap="onClickBack" style="border: 1rpx solid #ccc;color: #878787;">
					暂不登录 </button>
			</view>

		</view>

		<view style="width: 100%;height: 200rpx;"></view>

		<view class="fixedVueBox" :class="bgColorFind">
			<button open-type="contact" class="fixedVueBoxBtn" :class="bgColorFind">客 服</button>
		</view>

		<k-public></k-public>
	</view>
</template>

<script>
	export default {
		computed: {
			userFind() {
				return this.$store.state.userFind
			}
		},
		data() {
			return {
				wx_code: '', //	微信code
				mobile_code: '',
				city_is_login_must: 0,
				bgColorFind: '',
				username: '',
				password: '',
				wxcode: '',
				user_avatar: '',
				is_login: false,
				auth_code: '',
			}
		},
		onLoad: function(option) {
			this.bgColorFind = this.$bgColorFind
		},
		onShareAppMessage(res) {
			return this._Common._onShareAppMessageApi(res)

		},
		onShow() {
			var that = this
			//	1.更新微信wx_code
			this._wx_code_api()

			if (true) {
				setTimeout(function() {
					var getTokenStoreApi = that._Common.getTokenStoreApi()

					if (getTokenStoreApi) {
						uni.showToast({
							title: '登录成功'
						})

						uni.switchTab({
							url: '/pages/index/index'
						})
					}

				}, 2200)
			}

		},

		methods: {
			async get_login_config() {
				//	是否开启强制登录
				let params = {

				}
				var resData = await this._Api(this._Router.get_login_config, params)
				this.city_is_login_must = resData.data.city_is_login_must

			},

			//	通过code静默授权登录
			async _loginAutoCodeApi() {
				// return
				await uni.login({
					async success(res) {

						var auth_code = res.code

						const params = {
							wx_code: auth_code,
							login_type: 2
						}

						var resultData = await Vue.prototype._Api(Vue.prototype._Router._loginApi, params,
							'POST')
						if (resultData.data.access_token) {
							Vue.prototype._Common.setTokenStoreApi(resultData.data.access_token)

							Vue.prototype._Common.getUserFindApi()
						}

						return true

					}
				})
			},

			//	更新微信wx_code
			async _wx_code_api() {
				var that = this
				uni.login({
					provider: "weixin",
					success: function(loginRes) {
						console.log(loginRes)
						if (loginRes.errMsg == "login:ok") {
							that.wx_code = loginRes.code
							console.log('当前wx_code 为：' + that.wx_code)
						}
					}
				});
			},

			async on_login_api_mobile(e) {
				// console.log('_____________________________使用微信手机号授权登录________________________start')
				// console.log('_____________________________使用微信手机号授权登录________________________start')
				var that = this

				uni.showLoading({
					title: '加载中'
				})

				setTimeout(function() {
					uni.hideLoading()
				}, 2000)

				var res = e.detail

				if (!res.encryptedData) {
					uni.showToast({
						title: '请重新授权手机号',
						icon: 'none'
					})
					return
				}

				var encrypted_data = (res.encryptedData)
				var iv = (res.iv)
				// var iv = encodeURIComponent(res.iv)
				that.mobile_code = res.code

				var dev_dev = {
					encrypted_data: encrypted_data,
					iv: iv,
					e: e,
					res: res
				}

				that._api_login(encrypted_data, iv)

			},

			async _api_login(encrypted_data, iv, code_mobile = '') {

				var that = this
				console.log('____________login___start___开始登录')

				var user_info = {}
				var store_avatar = '';
				var store_nick_name = '';

				if (uni.getStorageSync('store_avatar')) {
					store_avatar = uni.getStorageSync('store_avatar');
				}
				if (uni.getStorageSync('store_nick_name')) {
					store_nick_name = uni.getStorageSync('store_nick_name');
				}

				user_info = {
					nickName: store_nick_name,
					avatarUrl: store_avatar,
				}
				console.log(user_info)

				var params = {
					wx_code: that.wx_code,
					mobile_code: that.mobile_code,
					encrypted_data: encrypted_data,
					iv: iv + '',
					nick_name: store_nick_name,
					avatar: store_avatar,
				}

				setTimeout(function() {
					console.log('刷新code')
					that._wx_code_api()
				}, 3000)

				var result = await that._Api(that._Router._loginApi, params, 'POST',true)
				uni.hideLoading()

				that._Common.setTokenStoreApi(result.data.access_token)

				that._Common.getUserFindApi()
				uni.showModal({
					title: '提示',
					content: '登录成功',
					showCancel: false,
					success() {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})

			},

			async api_auth_login() {

			},

			async _api_login_two() {

			},

			onJumpUserLogin() {
				console.log('账号密码登录')
				uni.redirectTo({
					url: '../../pagesa/user/user_login'
				})
			},
			zhifubao: async function(encry) {
				// console.log('=============支付宝start========获取解密的数据')
				// console.log(encry)
				// console.log(this.auth_code)

				var share_id_store = this.$myApi.getStoreApi('share_id')

				const params = {
					share_id: share_id_store,
					encry: encry,
					auth_code: this.auth_code,

				}

				var resData = await this.$myRequest.myNeed(this.$myRouteApi._loginApi, params, 'POST')

				this.$store.commit('login', resData.data)
				uni.removeStorageSync('share_id');
				if (!resData.data.avatarUrl) {
					this.is_login = true
					return
				}

				uni.navigateBack({
					delta: 1
				})

			},
			onAuthError: async function(encry) {
				uni.showModal({
					title: '取消授权，将导致部分功能无法使用',
					cancelText: '我知道了',
					confirmText: '从新授权',
					success() {

					}
				})
			},

			onGetAuthorize: async function(encry) {
				console.log('============================点击支付宝授权手机号 ')
				console.log(encry)
				console.log('code=' + this.auth_code)

				my.getPhoneNumber({
					scopes: "auth_user",
					success: res => {
						var response = JSON.parse(res.response);
						let encry = response.response; //获取 encry  微信小程序叫这个名字
						this.zhifubao(encry); // 调取这个自定义方法 

						console.log('-----------------------支付解析success')
						console.log(res)
						console.log('-----------------------支付解析success')
						// resolve(res);
					},
					fail: res => {
						console.log('-----------------------支付解析失败')
						console.log(res)
						console.log('-----------------------支付解析失败')

						// reject(res);
					}
				});

			},


			onGetAuthorizeTwo: async function(encry) {
				console.log('============================点击支付宝授权手机号 ')
				my.getOpenUserInfo({
					fail: res => {
						console.log(res);
					},
					success: res => {
						const userInfo = JSON.parse(res.response).response; // 以下方的报文格式解析两层 response

						console.log(userInfo)
					},
				});
			},
			onClickBack() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
				
			},
			async getUserProfile() {
				// console.log(e)
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '登录',
					success: (res) => {
						console.log('=================')
						debugger
						console.log(res);
					},
					fail: (res) => {
						debugger
						console.log(res)
					}
				});
				
			},
			

			async onClickGetuserinfo(e) {
				var that = this
				// #ifdef MP-WEIXIN
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '登录',
					success: async (res) => {
						var userInfo = res.userInfo

						const params = {
							nickName: userInfo.nickName,
							avatarUrl: userInfo.avatarUrl,
							sex: userInfo.gender,
						}

						var resData = await this.$myRequest.myNeed(this.$myRouteApi._user_update_info,
							params, 'POST')

						console.log(resData)
						uni.navigateBack({
							delta: 1
						})
					},
					fail: (res) => {
						// debugger
						console.log(res)
					}
				});
				//	#endif


				// #ifdef MP-ALIPAY

				console.log('支付宝')
				my.getOpenUserInfo({
					fail: (res) => {
						console.log(res)
					},
					success: async (res) => {
						let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response

					 var sex = 0

						if (userInfo.gender == 'm') {
							sex = 1
						}
						const params = {
							nickName: userInfo.nickName,
							avatarUrl: userInfo.avatar,
							sex: sex
						}
						console.log(params)
						var resData = await this.$myRequest.myNeed(this.$myRouteApi._user_update_info,
							params, 'POST')

						console.log(resData)
						uni.navigateBack({
							delta: 1
						})
					}
				});

				//	#endif




			},
			_onLoad() {
				//	获取挂载的背景颜色

			},

			// 点击登陆
			async onClickLogin() {
				console.log(this.username, this.password)
				console.log('点击登陆按钮')
				const params = {
					username: this.username,
					password: this.password,
					wxcode: this.wxcode
				}
				this._wxCodeApi()

				var resData = await this.$myRequest.myNeed(this.$myRouteApi._loginApi, params, 'POST')

				console.log(resData)
				this.$store.commit('login', resData.data)

				uni.navigateBack({
					delta: 1
				})
			},
			
		}
	}
</script>

<style>
	page {
		/* background-color: #0F2A5E; */
		background-color: #FFC0CB;
		background-color: #FFF;
		color: #fff;
	}
</style>

<style scoped lang="scss">
	.loginWrapperFooter {
		width: 100%;
		height: 150rpx;
		// background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;

		button::after {
			border: none;
		}

		.loginWrapperFooterBox {
			width: 300rpx;
			height: 150rpx;
			// background-color: #fff;
			border: 0rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.loginWrapperFooterBoxImg {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}


	.login-warpper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		// background-color: #fff;
	}

	.login-top {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 400upx;
	}

	.login-top image {
		width: 200upx;
		height: 200upx;
		/* border: 1upx solid #FF5B55; */
	}

	.login-center {
		width: 80%;
		/* height: 500upx; */
		/* background-color: #9bf; */
	}

	.login-center-top {
		display: flex;
		align-items: center;
		height: 100upx;
		/* background-color: #ccc; */
	}

	.login-center-center {
		/* background-color: #cfc; */
	}

	/* 登陆 */
	.login-footer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		/* margin-top: 40rpx; */
		margin-bottom: 20rpx;
		height: 100rpx;
		// background-color: #fff;
	}

	.login-footer button {
		width: 80%;
		border-radius: 50upx;
	}

	.login-wrapper-footer {
		display: flex;
		width: 90%;
		justify-content: center;
	}

	.login-wrapper-footer-text {
		width: 400upx;
		height: 50upx;
		/* background-color: #ccc; */
		/* text-decoration: underline; */
		/* border-bottom: 1upx solid #ccc; */
	}

	.footer-text-left {
		text-align: left;
		/* background-color: #9bf; */
	}

	.footer-text-right {
		text-align: right;
		/* background-color: yellow; */
	}


	.mobileBtn {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 35rpx;

		// background-color: r;
	}

	.fixedVueBox {
		position: fixed;
		width: 110rpx;
		height: 110rpx;
		bottom: 180rpx;
		right: 50rpx;
		background-color: red;
		border-radius: 50%;
		overflow: hidden;
		z-index: 99999;
		display: flex;
		align-items: center;
		color: #fff;
		justify-content: center;
		font-size: 25rpx;
		border: 10rpx solid #ffd594;

		.fixedVueBoxBtn {
			width: 110rpx;
			height: 110rpx;
			font-size: 25rpx;
			white-space: nowrap;
			display: flex;
			align-items: center;
			color: #fff;
			justify-content: center;
		}
	}
</style>
