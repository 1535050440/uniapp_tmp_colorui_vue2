import Vue from 'vue'

//	拨打电话
Vue.prototype._MobileTell = (mobile = '',name = '') => {
	console.log('拨打电话：'+mobile)
	if (!mobile) {
		return ''
	}
	
	var title = '确定拨打：'+mobile
	if (name) {
		title = '确定拨打：'+mobile+'('+name+')'
	}
	
	uni.showModal({
		title:title,
		confirmColor:"#33CB80",
		success(res) {
			if (res.confirm) {
				uni.makePhoneCall({
					phoneNumber: mobile //仅为示例
				});
			}
			
		}
	})
	
}

//	自动加https
Vue.prototype._https = function(url = '') {
	var url_end = ''
	if (!url) {
		return ''
	}
	
	console.log(url)
	
	var valueStrArray = url.split('http://')
	console.log(valueStrArray)
	console.log(valueStrArray.length)
	if (valueStrArray.length==2) {
		url_end = 'https://'+valueStrArray[1]
	}
	
	console.log(url_end)
	return url_end
}

//	价格：保留2位小数
Vue.prototype._Price = function(price = 0) {
	if (!price) {
		return 0
	}
	
	if (price == 0) {
		return 0
	}
	
	let price_end = parseFloat(price,2)

	return parseFloat(price_end.toFixed(2))
}


//	打开地图
Vue.prototype._MapOpen = function(lng = '',lat = '', name = '',address = '') {
	if (!lng) {
		return 
	}
	if (!lat) {
		return
	}
	
	uni.openLocation({
		longitude: Number(lng),
		latitude: Number(lat),
		name: name,
		address: address,
	})
}


//	获取时间
Vue.prototype.getDate = function(str = 'y-m-d') {
	// y-m-d h:i:s
	
	
	var date = new Date(),
	year = date.getFullYear(), //年
	month = date.getMonth() + 1, //月
	day = date.getDate(), //日
	hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(), //时
	minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(), //分
	second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
	month >= 1 && month <= 9 ? (month = "0" + month) : "";
	day >= 0 && day <= 9 ? (day = "0" + day) : "";
	hour >= 0 && hour <= 9 ? (hour = "0" + hour) : "";
	minute >= 0 && minute <= 9 ? (minute = "0" + minute) : "";
	second >= 0 && second <= 9 ? (second = "0" + second) : "";
	if(str.indexOf('y') != -1){
	str = str.replace('y', year)
	}
	if(str.indexOf('m') != -1){
	str = str.replace('m', month)
	}
	if(str.indexOf('d') != -1){
	str = str.replace('d', day)
	}
	if(str.indexOf('h') != -1){
	str = str.replace('h', hour)
	}
	if(str.indexOf('i') != -1){
	str = str.replace('i', minute)
	}
	if(str.indexOf('s') != -1){
	str = str.replace('s', second)
	}
	
	console.log('____________time__________'+str)
	return str
}


//	复制
Vue.prototype._Copy = function(str = '',type=0) {
	if (!str) {
		return 
	}
	
	uni.setClipboardData({
	    data: str,
	    success: function () {
	        console.log('success');
			
	    }
	});
}

//	跳转页面
Vue.prototype._JumpVue = function(path = '',status=false) {
	// console.log(path)
	// if (status) {
	// 	//	需要检测登录，未登录直接跳转到登录页面
	// 	var toeknStatus = api.getTokenStoreApi()
		
	// 	if (!toeknStatus) {
	// 		//	缓存不存在的话
	// 		api.jumpLoginApi()
	// 		return
	// 	}
	// }
		
	uni.navigateTo({
		url: path
	})
}



//	加密方式
Vue.prototype.json_encode = (valueObj, status = true) => {
	//	JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
	var json_str = JSON.stringify(valueObj)
	
	if (status) {
		json_str = encodeURIComponent(json_str)
	}
	
	return json_str;
}

//	解密方式
Vue.prototype.json_decode = (valueStr,status = true) => {
	// var 
	if (status) {
		valueStr = decodeURIComponent(valueStr)
	}
	
	var json_obj = JSON.parse(valueStr)
	
	return json_obj;
}

