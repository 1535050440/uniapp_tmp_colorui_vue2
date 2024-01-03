## 【已亲测】激励视频封装方法


#### vue2

````
<script>
	import Vue from 'vue'
	import Vuex from 'vuex'
	import adVideoUtils from "../../common/ad_video.js";
	
	Vue.prototype.$utils = {
	  ...adVideoUtils,
	};
	
	export default {
		data() {
			return {
				InputBottom: 0
			};
		},
		computed:{
			userFind(){
				return this.$store.state.userFind
			},
			bgColorFind() {
				
				return this.$store.state.bgColorFind
			}
		},
		async onLoad() {
			this.loadingStatus = false
			
			// videoAd.rewarded.load("adunit-6ef968030737245");
			
			var adUnitId = "adunit-317409f4f920de6d8"
			// onLoad 中 
			this.$utils.videoAdInit(adUnitId);
			
			
		},


			openAd() {
				var that = this
				
				
				
				
				
				// 显示
				this.$utils.videoAdShow()
				        .then((res) => {
							
							console.log(res)
							console.log('+++++++++++++++++++++++++++++++')
							console.log('+++++++++++++++++++++++++++++++')
							
							  if (res) {
							   // 成功
							   // console.log(res)
							   console.log('观看成功 将下发奖励')
								uni.showModal({
								    title: '提示',
								    content: '任务完成，恭喜您解锁成功，正式发布后即可使用',
									showCancel:false,
								    success: function (res) {
										that.adVideoSuccess();
								        if (res.confirm) {
								            console.log('用户点击确定');
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    }
								});
								
								
							  } else {
								 
								console.log('222222222222')
								setTimeout(function(){
									uni.showModal({
									    title: '提示',
									    content: '检测到：中途退出，请重新观看广告呦',
										showCancel:false,
									    success: function (res) {
											that.openAd()
									        if (res.confirm) {
									            console.log('用户点击确定');
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
								},1300)
								
								// this.adVideoErr();
							  }
				        })
				        .catch((err) => {
							
							console.log(err)
							console.log('视频加载失败了,稍后在试')
							that.onSendImTwo()
				          // this.showUToast("视频加载失败了,稍后在试", "error");
				        });
						
				// videoAd.rewarded.show(); 	
			},
````
