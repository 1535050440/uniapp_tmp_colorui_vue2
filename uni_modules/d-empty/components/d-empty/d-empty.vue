<template>
	<view>
		<view style="width: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
			<image style="width: 300rpx;height: 300rpx;flex: none;"
				:style="'margin-top:'+top+'rpx;'"
				src="data:image/png;base64,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"></image>
			
			<text style="margin-top: 50rpx;color: #ccc;">暂无数据</text>
			<view style="width: 100%;height: 100rpx;"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"d-empty",
		data() {
			return {
			};
		},
		props: {
			top: 0,
		},
		watch:{
			top(e){
			}
		},
	}
</script>

<style lang="scss">

</style>