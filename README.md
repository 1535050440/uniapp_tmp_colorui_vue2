## 【已亲测】可能是最好用的项目模板,快速开发 vue2

## 2024-01-03

作者：插件地址： [https://ext.dcloud.net.cn/publisher?id=117346](https://ext.dcloud.net.cn/publisher?id=117346)



### 【已封装的方法】

| 已封装的方法       | 备注   |
| --------   |:----:  |
| 1.封装http请求    |  |   
| 2.数据为空时展示默认的缺省图|  |  
| 3.封装全局状态管理vuex (eg:用户信息Vuex中获取) |  |  
| 4.登录页面（微信授权手机号流程，已亲测可用） |  |  
| 5.全局统一分享接口 |  |  
| 6.全局打开微信小程序的激励视频广告ad,已有说明文档，直接复制就可以了 |  |  
| 7.已封装：复制、打开地图、放大图片、打电话、打开其他小程序、等等等等......目录（/common/） |  |  



### 【已集成插件 90%项目会用到】



| 插件       | 备注   |地址    |
| --------   |:----:  |:----:  |
| 1.colorui css模版(vue2)    | colorui |[https://ext.dcloud.net.cn/plugin?id=239](https://ext.dcloud.net.cn/plugin?id=239)  |   
| 2.mp-html富文本     | mp-html | [https://ext.dcloud.net.cn/plugin?id=805](https://ext.dcloud.net.cn/plugin?id=805) | 
| 3.uview css模板（v2.0.36）按需引入   | uview | [https://uviewui.com/components/calendar.html](https://uviewui.com/components/calendar.html) | 
| 4.z-paging    | z-paging |    [https://z-paging.zxlee.cn/](https://z-paging.zxlee.cn/)     |
| 5.d-tan滑动的弹框组件（超流畅）    | d-tan |    [https://ext.dcloud.net.cn/plugin?id=11663](https://ext.dcloud.net.cn/plugin?id=11663)     |
| 6.全局加载中的特效    | d-loading |    [https://ext.dcloud.net.cn/plugin?id=8533](https://ext.dcloud.net.cn/plugin?id=8533)     |
| 7.数据为空时展示默认的缺省图    | d-empty |    [https://ext.dcloud.net.cn/plugin?id=11660](https://ext.dcloud.net.cn/plugin?id=11660)     |






#### 发起http请求


````

路由文件地址： /common/_route.js

async onClickSave(type = 1) {
	var that = this
	
	var params = {
		
	}
	
	var resData = await that._Api(that._Router.saveDeposit,params,'POST')
	
	if (resData.data) {
		
	}
}


````
````

npm install moment

````

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2024-present, Deng