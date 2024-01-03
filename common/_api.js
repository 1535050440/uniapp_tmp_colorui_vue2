import Vue from 'vue'

const request = {}
let clearTime;

Vue.prototype._Api = ( url, params = [], method = 'GET' ,loading_status = false) => {
	return new Promise((resolve, reject) => {
		
		//	全局提示加载中
		if (loading_status) {
			
			clearTime && clearTimeout(clearTime);
			
			Vue.prototype._Common.update_loading(true)
			clearTime = setTimeout(function() {
				Vue.prototype._Common.update_loading(false)
			},350)
		}
		
		
		//	服务商模式时：通过此代码获取传递的参数__________________________start
		//	服务商模式时：通过此代码获取传递的参数__________________________start
		// #ifdef MP-WEIXIN
		// ===========================================wechat soft run
		const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
		// if (extConfig) {
		// 	if (extConfig.door_id) {
		// 		shop_door_id = extConfig.door_id
		// 	}
		// }
		// #endif
		
		// #ifdef MP-ALIPAY
		// ===========================================ali soft run
		var soft_type = 'ali';
		// var getExtConfitData = my.getExtConfigSync();
		// if (getExtConfitData) {
		// 	if (getExtConfitData.door_id) {
		// 		shop_door_id = getExtConfitData.door_id
		// 	}
		// }
		// #endif 
		//	服务商模式时：通过此代码获取传递的参数__________________________end
		//	服务商模式时：通过此代码获取传递的参数__________________________end
		

		//	获取缓存中的token
		var tokenStorage = url == Vue.prototype._Router._refreshToken?uni.getStorageSync('refresh_token'):Vue.prototype._Common.getTokenStoreApi();
		if (tokenStorage) {
			//	存在时2021
			tokenStorage = 'Bearer '+tokenStorage
		}
		var soft_type = 'wx';
		// #ifdef MP-ALIPAY
		var soft_type = 'ali';
		// #endif 
		
		var door_no = ''
		
		var headerObj = {
			'authorization': tokenStorage,
			'Content-Type': 'application/x-www-form-urlencoded',
			'soft-type':soft_type,
			'door-no':door_no,
		}
		
		if (tokenStorage == undefined|| tokenStorage === '') {
			delete headerObj.token
		}
		
		params.time_stamp = parseInt(new Date().getTime() / 1000) // 时间戳
		
		
		uni.request({
			url: Vue.prototype._Config.apiUrlPath + url,
			method: method,
			data: params,
			dataType: 'json',
			header: headerObj,
			success: async(res) => {
				if (res.data.code == 4000) {
					// console.log('参数错误，需要直接抛出异常内容')
					uni.hideLoading();
					uni.showModal({
					    title: '提示',
					    content: res.data.message,
						showCancel: false,
					    success: function (res) {
					    }
					});
					
					return
				}
				
				if (res.data.code == 444) {
					uni.showModal({
					    title: '提示',
					    content: res.data.msg,
						showCancel: false,
					    success: function (res) {
					    }
					});
					uni.removeStorageSync('token');
					uni.redirectTo({
						url: '/pages/login/login'
					})
					return
				}
				
				if (res.data.code > 5000 && res.data.code < 5999) {
					return resolve(res.data)
				}
								
				if (res.data.code == 10050) {
					var params = {
						
					}
					var resData = await Vue.prototype._Api(Vue.prototype._Router._refreshToken,params,'POST')
					
					if (resData.code == 200 || resData.code == 1) {
						var access_token = resData.data.access_token
						Vue.prototype._Common.setTokenStoreApi(access_token)
						uni.switchTab({
							url:'/pages/home/my'
						})
						return
					} else {
						Vue.prototype._Common.jumpLoginApi()
					}
					return
				}
				
				if (res.data.code == 401) {
					Vue.prototype._Common.jumpLoginApi()
					return
				}
				//============================================
				
				if (res.data.code == 4002) {
					uni.removeStorageSync(Vue.prototype._Config.webKeyToken);
					uni.removeStorageSync(Vue.prototype._Config.webKeyTokenTwo);
					
					api.jumpLoginApi()
					
					return
				}
				//============================================
				
				if (res.data.code != 200) {
					uni.hideLoading();
					uni.showModal({
					    title: '提示',
					    content: res.data.message,
						showCancel: false,
					    success: function (res) {
					    }
					});
					
					return
				}
				
				resolve(res.data)
			},
			fail: () => {
				uni.showToast({
					icon: 'none',
					title: '网有点慢呦~',
					duration: 2000
				})
			},
			complete: finsh => {
				setTimeout(() => {
					uni.hideLoading();
				}, 3000) 
				
			}
		})
	})
}
