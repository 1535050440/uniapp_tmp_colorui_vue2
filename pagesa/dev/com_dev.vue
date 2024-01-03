<template>
	<view class="vueBox shenHeVue">
		<!-- header-start -->
		<view style="width: 100%;">
			<cu-custom bgColor="myThemeBg" :isBack="true">
			　　<block slot="backText" >返回</block>
			　　<block slot="content"></block>
			</cu-custom>
		</view>
		<!-- header-end -->
		
		<view class="">
			
		</view>
		
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
				loading:'',
				
			};
		},
		//	点击分享
		created() {
			var that = this
			setTimeout(function(){
				this.$forceUpdate()
			},1500)
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
