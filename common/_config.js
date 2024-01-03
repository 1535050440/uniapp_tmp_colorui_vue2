import Vue from 'vue'

//	接口请求地址
const apiUrl = 'http://127.0.0.1:9011'

const apiUrlPath = apiUrl+'/door_api'

//	jwt请求token
const webKeyToken = 'my_access_token'
//	jwt刷新token
const webKeyTokenTwo = 'my_access_token_update'
//	图片地址
const oss_img = 'https://myossimg.com'

var config = {
	apiUrl,
	apiUrlPath,
	webKeyToken,
	webKeyTokenTwo,
	oss_img
}

Vue.prototype._Config = config