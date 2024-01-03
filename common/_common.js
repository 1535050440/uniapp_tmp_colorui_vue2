import Vue from 'vue'
import md5 from '@/common/_md5.js';

var api = {}

//	-----------------------------------------------------------------user
//	加载中
api.update_loading = async (status = true) => {

	Vue.prototype.$store.commit('is_loading', status)
}
//	获取用户信息
api.getUserFindApi = async (status = true) => {
	var statusLogin = api.getLoginStatusApi(status)
	if (!statusLogin) {
		return false
	}

	var resultData = await Vue.prototype._Api(Vue.prototype._Router.getUserFind)

	Vue.prototype.$store.commit('refreshUserFind', resultData.data)

	return true;
}

//	更新用户信息
api.updateUserFindApi = async (params) => {
	var statusLogin = api.getLoginStatusApi(true)
	if (!statusLogin) return

	var resultData = await Vue.prototype._Api(Vue.prototype._Router.updateUserFind, params, 'POST')

	uni.showToast({
		title: '修改成功',
		icon: 'none',
		duration: 1500
	})

	Vue.prototype.$store.commit('refreshUserFind', resultData.data.user_find)
}



//	通过code静默授权登录
api._loginAutoCodeApi = async () => {
	// return
	await uni.login({
		async success(res) {

			var auth_code = res.code

			const params = {
				wx_code: auth_code,
				is_default: 1,
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
}

//	获取门店详情
api.getDoorFindApi = async () => {

	var resultData = await Vue.prototype._Api(Vue.prototype._Router.getDoorFind)

	Vue.prototype.$store.commit('refreshDoorFind', resultData.data)

	return true;
}

//	更新门店信息
api.updateDoorFindApi = async (params) => {
	var statusLogin = api.getLoginStatusApi(true)
	if (!statusLogin) return

	var resultData = await Vue.prototype._Api(Vue.prototype._Router.updateDoorFind, params, 'POST')

	uni.showToast({
		title: '修改成功',
		icon: 'none',
		duration: 1500
	})

	Vue.prototype.$store.commit('refreshUserFind', resultData.data.user_find)
}

//	返回是否登陆的状态
api.getLoginStatusApi = (status = false) => {
	const tokenStorage = api.getTokenStoreApi();

	if (tokenStorage) {
		//	缓存存在时
		return true
	} else {
		//	缓存不存在时
		if (status == true) {
			api.jumpLoginApi()
		}

		return false
	}
}

//	跳转到登录页面
api.jumpLoginApi = () => {

	//	缓存不存在的话
	uni.navigateTo({
		url: '/pages/login/login'
	})

}

//	退出登录
api._LoginOut = () => {

	uni.showModal({
		title: '提示',
		content: '确定退出登录',
		success(e) {
			console.log(e.confirm)
			if (e.confirm) {
				uni.removeStorageSync('token');

				uni.redirectTo({
					url: '/pages/login/login?type=1'
				})
			}
		}
	})

}

//	-----------------------------------------------------------------
//	获取缓存的token-已封装
api.getTokenStoreApi = () => {
	return Vue.prototype._Common.getStoreApi(Vue.prototype._Config.webKeyToken)
}
api.getTokenTwoStoreApi = () => {
	return getStoreApi(config.webKeyTokenTwo)
}

//	设置缓存的token-已封装
api.setTokenStoreApi = (token_data) => {
	return Vue.prototype._Common.setStoreApi(Vue.prototype._Config.webKeyToken, token_data)
}

//	设置缓存的token-已封装
api.setTokenTwoStoreApi = (token_data) => {
	return setStoreApi(Vue.prototype._Config.webKeyTokenTwo, token_data)
}

//	获取stroe		--  通用
api.getStoreApi = (key) => {
	return uni.getStorageSync(key);
}

//	获取stroe		--  通用
api.setStoreApi = (key, value) => {
	return uni.setStorageSync(key, value);
}

api.clearStorApi = (key) => {
	return uni.removeStorageSync(key);
}


//	-----------------------------------------------------------------
//	img
//	打开图片
api.getOpenImg = (imgArray = [], index = 0) => {
	uni.previewImage({
		current: imgArray[index], //  传 Number H5端出现不兼容 
		urls: imgArray
	});

}

//	[已封装]：传入图片地址，直接展示图片
api.getOpenImgOne = (img_path = '') => {

	var img_path_array = []

	img_path_array.push(img_path)

	Vue.prototype._Common.getOpenImg(img_path_array)
}

//
//	=================================================================================
//	阿里云上传图片oss
//	=================================================================================
api._imgUp = (count = 8, type = 'ali') => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], //从相册选择
			//从相册选择
			success: resImg => {
				api._imgUpApi(resImg.tempFilePaths).then(img_list => {
					resolve(img_list);
				})

			}
		})
	})
}

//	上传图片oss
api._imgUpApi = (tempList = []) => {
	return new Promise((resolve, reject) => {
		let self = this;
		let i = 0;
		let img_length = tempList.length;
		let params = {
			token: uni.getStorageSync('token'),
			app_id: 10001
		};
		uni.showLoading({
			title: '上传中'
		})
		tempList.forEach(function(filePath, fileKey) {

			var url = Vue.prototype._Config.apiUrlPath + Vue.prototype._Router.image_up

			var imageList = []

			Vue.prototype._img_list = []

			uni.uploadFile({
				url: url,
				filePath: filePath,
				name: 'iFile',
				formData: params,
				success: function(res) {
					let result = typeof res.data === 'object' ? res.data : JSON.parse(
						res.data);

					if (result.code === 1) {
						imageList.push(result.data);
						Vue.prototype._img_list.push(result.data)
					}
				},
				fail(err) {
					console.log(err, '上传失败')
				},
				complete: function() {
					i++;
					if (img_length === i) {
						uni.hideLoading()
						// 所有文件上传完成

						resolve(Vue.prototype._img_list);
					}
				}
			});
		});


	})
}

//	-----------------------------------------------------------------
//	-----------------------------------------------------------------
//	-----------------------------------------------------------------

//	返回上一页，没有时直接返回首页
api._jumpBack = () => {
	if (getCurrentPages().length < 2) {

		return uni.switchTab({
			url: '/pages/index/index'
		})

	}
	uni.navigateBack({
		delta: 1
	});
}


//	保存相册到本地
api._ImgDown = (img_path = '') => {
	if (!img_path) {
		return ''
	}
	// console.log("下载的图片:"+img_path)
	uni.downloadFile({
		url: img_path, //仅为示例，并非真实的资源
		success: (res) => {
			if (res.statusCode === 200) {
				// console.log('下载成功res.tempFilePath：'+res.tempFilePath);
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: function() {
						// console.log('save success');
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: '保存到相册成功',
							success: function(res) {
								if (res.confirm) {
									// console.log('用户点击确定');
								} else if (res.cancel) {
									// console.log('用户点击取消');
								}
							}
						});
					},
					fail(res) {
						console.log(res)
						if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
							console.log("打开设置窗口01");
							uni.openSetting({
								success(res) {
									console.log("打开设置窗口xx");
									console.log(res);
									console.log(res.authSetting)
								}
							});
						}
					}
				});
			}
		}
	});
}









//	-----------------------------------------------------------------
//	提示消息
api._alert = (content = '', show_close = true) => {
	uni.showModal({
		title: '提示',
		content: '修改成功',
		showCancel: show_close,
		success(e) {
			return e
		}
	})
}



//	加密方式
api._api_en_json_mi = (valueObj) => {
	//	JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
	var json_str = JSON.stringify(valueObj)

	json_str = encodeURIComponent(json_str)

	return json_str;
}

//	解密方式
api._api_de_json_mi = (valueStr) => {
	// var 
	valueStr = decodeURIComponent(valueStr)

	var json_obj = JSON.parse(valueStr)

	return json_obj;
}
//	-----------------------------------------------------------------
//	检查是否当前为最新版本
api._updateSoft = () => {
	// console.log('版面更新')
	// #ifdef MP-WEIXIN
	// 检测更新
	const updateManager = uni.getUpdateManager()
	// console.log(updateManager)
	updateManager.onCheckForUpdate(function(res) {
		// 请求完新版本信息的回调
		if (res.hasUpdate) {
			updateManager.onUpdateReady(function(res2) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，立即体验',
					cancelColor: '#eeeeee',
					confirmColor: '#FF0000',
					success(res2) {
						if (res2.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate()
						}
					}
			 })
			})
		}
	})
	updateManager.onUpdateFailed(function(res) {
		// 新的版本下载失败
		uni.showModal({
			title: '提示',
			content: '检查到有新版本，但下载失败，请重试',
			success(res) {
				if (res.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate()
				}
			}
		})
	})

	// #endif
	//	=====================================
	// #ifdef MP-ALIPAY
	console.log('======update_ali_start')
	const updateManager = my.getUpdateManager()
	updateManager.onCheckForUpdate(function(res) {
		// 请求完新版本信息的回调  
		// console.log(res.hasUpdate)
	})
	updateManager.onUpdateReady(function() {
		my.confirm({
			title: '更新提示',
			content: '新版本已经准备好，是否重启应用？',
			success: function(res) {
				if (res.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate()
				}
			}
		})
	})
	updateManager.onUpdateFailed(function() {
		// 新版本下载失败
	})
	// #endif 
}










//	=================================================================================
//	阿里云上传图片oss
//	=================================================================================
api.upImgApiSync = (count = 1, type = 'ali') => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			//从相册选择
			success: resImg => {
				var tempFiles = resImg.tempFiles

				tempFiles.forEach((tempFilesOne, index) => { //js遍历数组
					let filePath = tempFilesOne.path.toString(); //为需要上传的文件
					let filePathSize = tempFilesOne.size; //为需要上传的文件
					// console.log('filePathSize文件上传为：', filePath)
					// console.log('filePathSize文件上传的大小为：', filePathSize)

					if (filePathSize > 6291456) {
						uni.showToast({
							title: "上传图片大小不能超过6MB",
							icon: 'error'
						});
						return
					}

					uni.showLoading({
						title: "上传中",
					});

					setTimeout(function() {
						uni.hideLoading()
					}, 2000)
					api.aliOssApiSyncPHP(filePath).then(res => {
						let fileName = res
						resolve(fileName);
					})

				});

				return

			}
		})
	})
}

// api.upImgApiSync_del = (count = 1, type = 'ali') => {
// 	return new Promise((resolve, reject) => {
// 		uni.chooseImage({
// 			count: count,
// 			//从相册选择
// 			success: resImg => {
// 				console.log('_________________resImg______________________start')
// 				console.log(resImg)
// 				console.log('_________________resImg______________________end')
// 				var tempFilesOne = resImg.tempFiles[0]
// 				console.log(tempFilesOne)
// 				console.log('___________________')
// 				let filePath = tempFilesOne.path.toString(); //为需要上传的文件
// 				let filePathSize = tempFilesOne.size; //为需要上传的文件
// 				console.log('filePathSize文件上传为：', filePath)
// 				console.log('filePathSize文件上传的大小为：', filePathSize)

// 				if (filePathSize > 6291456) {
// 					uni.showToast({
// 						title: "上传图片大小不能超过6MB",
// 						icon: 'error'
// 					});
// 					return
// 				}

// 				uni.showLoading({
// 					title: "上传中",

// 				});

// 				setTimeout(function() {
// 					uni.hideLoading()
// 				}, 2000)

// 				if (true) {
// 					api.aliOssApiSyncPHP(filePath).then(res => {
// 						let fileName = res

// 						resolve(fileName);
// 					})
// 					return
// 				}



// 				if (type == 'ali') {
// 					//	阿里云上传

// 					api.aliOssApiSync(filePath).then(res => {
// 						let fileName = res

// 						resolve(fileName);
// 					})
// 				} else {
// 					//	七牛云
// 					api.qiniuApiSync(filePath).then(res => {
// 						let fileName = res

// 						resolve(fileName);
// 					})
// 				}


// 			}
// 		})
// 	})
// }
//    阿里云
api.aliOssApiSyncPHP = (filePath) => {
	return new Promise((resolve, reject) => {
		var oss_img = Vue.prototype._Config.apiUrlPath + Vue.prototype._Router.file_get_token
		//	------------------------------------------------------------------------------------------
		//	获取缓存中的token
		var tokenStorage = ''

		var tokenStorageValue = Vue.prototype._Common.getTokenStoreApi()
		if (tokenStorageValue) {
			//	存在时
			tokenStorage = 'Bearer ' + tokenStorageValue
		}
		var headerObj = {
			'authorization': tokenStorage,
			'Content-Type': 'application/x-www-form-urlencoded'
		}


		let uploadTask = uni.uploadFile({
			header: headerObj,
			url: oss_img, //	如：https://testbucketname.oss-cn-huhehaote.aliyuncs.com
			filePath: filePath, //choostimage 返回的临时图片路径
			fileType: 'image',
			name: 'file',
			formData: { //下面的属性名称 大小写无所谓 都能通过
				// 'Key': file_url_path, //OSS存储路径/图片名称 => 如：task/test.jpg 别写成 /test.jpg 会有问题
				// 'Policy': resData.policy, //后端Base64编码格式的授权策略 用于签名
				// 'OSSAccessKeyId': resData.accessid,	//OSS控制台获取
				// 'Success_Action_Status': '200', //让服务端返回200,不然，成功上传图片后阿里默认返回statusCode: 204
				// 'Signature': resData.signature, //服务端返回的签名内容
				'token': 'token'
			},
			success: (res) => {
				var resData = res.data

				var resDataObj = JSON.parse(resData)

				if (resDataObj.code == 4000 || resDataObj.code == 400) {
					// console.log('参数错误，需要直接抛出异常内容')
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: resDataObj.message,
						showCancel: false,
						success: function(res) {}
					});

					return
				}


				var resDataObjData = resDataObj.data

				var file_data = {
					id: resDataObjData.id,
					file_id: resDataObjData.id,
					file_path: resDataObjData.path,
					path: resDataObjData.path,
				}
				
				resolve(file_data);
			},
			fail: (err) => {
				// console.log('uploadImage fail', err);
				throw new Error(err.errMsg);
			}
		});
		uploadTask.onProgressUpdate((res) => {
			console.log("上传进度" + res);
			console.log("上传进度" + res.progress);
		});


	})

}

//    阿里云直传oss
api.aliOssApiSync = (filePath) => {
	return new Promise((resolve, reject) => {

		//	------------------------------------------------------------------------------------------

		Vue.prototype._Api(Vue.prototype._Router.file_get_token)
			.then(resToken => {
				var resData = resToken.data

				var file_url_path = resData.file_url_path
				var file_url_path_all = resData.file_url_path_all

				var ww = {
					url: resData
					.host_url_http, //	如：https://testbucketname.oss-cn-huhehaote.aliyuncs.com
					filePath: filePath, //choostimage 返回的临时图片路径
					fileType: 'image',
					name: 'file',
					formData: { //下面的属性名称 大小写无所谓 都能通过
						'Key': file_url_path, //OSS存储路径/图片名称 => 如：task/test.jpg 别写成 /test.jpg 会有问题
						'Policy': resData.policy, //后端Base64编码格式的授权策略 用于签名
						'OSSAccessKeyId': resData.accessid, //OSS控制台获取
						'Success_Action_Status': '200', //让服务端返回200,不然，成功上传图片后阿里默认返回statusCode: 204
						'Signature': resData.signature, //服务端返回的签名内容
					}
				}
				//

				let uploadTask = uni.uploadFile({

					url: resData
					.host_url_http, //	如：https://testbucketname.oss-cn-huhehaote.aliyuncs.com
					filePath: filePath, //choostimage 返回的临时图片路径
					fileType: 'image',
					name: 'file',
					formData: { //下面的属性名称 大小写无所谓 都能通过
						'Key': file_url_path, //OSS存储路径/图片名称 => 如：task/test.jpg 别写成 /test.jpg 会有问题
						'Policy': resData.policy, //后端Base64编码格式的授权策略 用于签名
						'OSSAccessKeyId': resData.accessid, //OSS控制台获取
						'Success_Action_Status': '200', //让服务端返回200,不然，成功上传图片后阿里默认返回statusCode: 204
						'Signature': resData.signature, //服务端返回的签名内容
					},
					success: (res) => {
						resolve(resData);
					},
					fail: (err) => {
						console.log('uploadImage fail', err);
						throw new Error(err.errMsg);
					}
				});
				uploadTask.onProgressUpdate((res) => {
					console.log("上传进度" + res);
					console.log("上传进度" + res.progress);
				});


			})
	})

}


//	打开其他小程序
api._OpenSoft = async (app_id = '') => {

	// 打开:荔枝墙小程序
	uni.navigateToMiniProgram({
		appId: app_id,
		path: '',
		extraData: {
			'data1': 'test'
		},
		success(res) {
			// 打开成功
			// console.log('open-success')
		}
	})
}


//	分享小程序【需要自行修改】
api._onShareAppMessageApi = (res) => {
	// var 
	if (res.from === 'button') {
	    // console.log("来自页面内转发按钮2022-01");
	    // console.log(res.target);
	} else {
		// console.log("来自右上角转发菜单2022-02")
	}
	
	var userFind = Vue.prototype.$store.state.userFind
	var doorFind = Vue.prototype.$store.state.doorFind
	
	var door_name = doorFind.door_name
	var title = ''
	var path = ''
	
	if (door_name) {
		title = door_name
	}
	var door_no = uni.getStorageSync('door_no')
	path = '/pages/index/index?door_no='+door_no
	
	return {
		title: title,
		path: path,
		success: (res) => {
			// console.log("转发成功", res);
	    },
	    fail: (res) => {
	        // console.log("转发失败", res);
	    }
	}
}
//	-----------------------------------------------------------------

Vue.prototype._Common = api
